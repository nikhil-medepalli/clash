import { Router, Request, Response } from "express";
import prisma from "../config/database.js";
import { authLimitter } from "../config/rateLimit.js";
import { checkDateHourDiff, formatError, renderEmailEjs } from "../helper.js";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
} from "../validation/passwordValidation.js";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
const router = Router();

router.post(
  "/forget-password",
  authLimitter,
  async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const payload = forgetPasswordSchema.parse(body);
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });
      if (!user) {
        return res.status(422).json({
          message: "Invalid data",
          errors: {
            email: "No Account found with this email!",
          },
        });
      }

      // const id = generateRandomNum();
      const salt = await bcrypt.genSalt(10);
      const token = await bcrypt.hash(uuid4(), salt);
      await prisma.user.update({
        data: {
          password_reset_token: token,
          token_send_at: new Date().toISOString(),
        },
        where: {
          email: payload.email,
        },
      });

      const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`;

      const html = await renderEmailEjs("forgot-password", {
        name: user.name,
        url: url,
      });

      await emailQueue.add(emailQueueName, {
        to: payload.email,
        subject: "Reset your password",
        body: html,
      });

      return res
        .status(200)
        .json({ message: "Email sent successfully! please check your email!" });
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

// reset password
router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = resetPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      return res.status(422).json({
        message: "Invalid data",
        errors: {
          email:
            "Link is not correct make sure you have copied the link correctly",
        },
      });
    }

    // check token
    if (user.password_reset_token !== payload.token) {
      return res.status(422).json({
        message: "Invalid data",
        errors: {
          token:
            "Link is not correct make sure you have copied the link correctly",
        },
      });
    }

    // check token expiration
    const hoursDiff = checkDateHourDiff(user.token_send_at!);
    if (hoursDiff > 2) {
      return res.status(422).json({
        message: "Invalid data",
        errors: {
          token: "Link is expired! Please try again",
        },
      });
    }

    // update password
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(payload.password, salt);

    await prisma.user.update({
      data: {
        password: newPass,
        password_reset_token: null,
        token_send_at: null,
      },
      where: { email: payload.email },
    })

    return res.status(200).json({ message: "Password updated successfully!" });
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

export default router;
