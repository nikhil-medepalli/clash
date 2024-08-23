import { Router, Request, Response } from "express";
import prisma from "../config/database.js";
import { authLimitter } from "../config/rateLimit.js";
import { formatError } from "../helper.js";
import { ZodError } from "zod";
import { forgetPasswordSchema } from "../validation/passwordValidation.js";
const router = Router();

router.post(
  "/forget-password",
  authLimitter,
  async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = forgetPasswordSchema.parse(body);

        // check the user
        // let user = await prisma
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

export default router;
