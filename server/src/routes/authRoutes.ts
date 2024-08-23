import { Router, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import { string, ZodError } from "zod";
import { formatError, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import jwt from "jsonwebtoken";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { authLimitter } from "../config/rateLimit.js";

const router = Router();

// login route
router.post("/login", authLimitter, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = loginSchema.parse(body);

    // check if user exists
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user || user === null) {
      return res.status(422).json({ errors: { email: "No User found" } });
    }

    const compare = await bcrypt.compare(payload.password, user.password);

    if (!compare) {
      return res.status(422).json({ errors: { email: "Invalid Credentials" } });
    }

    // JWT payload
    let JWTPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(JWTPayload, process.env.SECRET_KEY!, {
      expiresIn: "365d",
    });

    return res.json({
      message: "Login Successful",
      data: {
        ...JWTPayload,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      return res.status(422).json({ message: "Invalid Data", errors });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again!" });
  }
});

// login check
router.post(
  "/check/credentials",
  authLimitter,
  async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const payload = loginSchema.parse(body);

      // check if user exists
      let user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!user || user === null) {
        return res.status(422).json({ errors: { email: "No User found" } });
      }

      // password check
      const compare = await bcrypt.compare(payload.password, user.password);

      if (!compare) {
        return res
          .status(422)
          .json({ errors: { email: "Invalid Credentials" } });
      }

      return res.json({
        message: "Login Successful",
        data: {},
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = formatError(error);
        return res.status(422).json({ message: "Invalid Data", errors });
      }
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
);

// Register route
router.post("/register", authLimitter, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (user) {
      return res.status(422).json({
        errors: {
          email: "Email already exists. Please try another one. ",
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);

    const token = await bcrypt.hash(uuid4(), salt);
    const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;

    const emailBody = await renderEmailEjs("email-verify", {
      name: payload.name,
      url: url,
    });

    // send email

    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "Clash Email Verification",
      body: emailBody,
    });

    await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        email_verify_token: token,
      },
    });
    return res.status(201).json({ message: "Please verify your email" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      return res.status(422).json({ message: "Invalid Data", errors });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again!" });
  }
});

// Get User
router.get("/user", authMiddleware, async (req: Request, res: Response) => {
  const user = req.user;
  return res.json({ data: user });
});

export default router;
