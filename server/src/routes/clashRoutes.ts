import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import {
  formatError,
  imageValidator,
  removeImage,
  uploadImage,
} from "../helper.js";
import { clashSchema } from "../validation/clashValidation.js";
import { UploadedFile } from "express-fileupload";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const clash = await prisma.clash.findMany({
      where: {
        user_id: req.user?.id!,
      },
      orderBy:{
        id: "desc"
      }
    });
    return res
      .status(200)
      .json({ message: "Clash fetched successfully", data: clash });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again!" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clash = await prisma.clash.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res
      .status(200)
      .json({ message: "Clash fetched successfully", data: clash });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again!" });
  }
});

router.post("/",authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = clashSchema.parse(body);

    // check if files are present
    if (req.files?.image) {
      const image = req.files?.image as UploadedFile;
      const validMsg = imageValidator(image.size, image.mimetype);
      if (validMsg) {
        return res.status(422).json({ errors: { image: validMsg } });
      }
      payload.image = await uploadImage(image);
    } else {
      return res.status(422).json({ errors: { image: "Image is required" } });
    }

    await prisma.clash.create({
      data: {
        title: payload.title,
        description: payload?.description,
        image: payload?.image,
        user_id: req.user?.id!,
        expire_at: new Date(payload.expire_at),
      },
    });

    return res.status(201).json({ message: "Clash created successfully" });
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

router.put("/:id", authMiddleware,async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const payload = clashSchema.parse(body);

    // check if files are present
    if (req.files?.image) {
      const image = req.files?.image as UploadedFile;
      const validMsg = imageValidator(image.size, image.mimetype);
      if (validMsg) {
        return res.status(422).json({ errors: { image: validMsg } });
      }

      // get old image
      const clash = await prisma.clash.findUnique({
        select: {
          image: true,
          id: true,
        },
        where: {
          id: Number(id),
        },
      });
      if (clash) removeImage(clash?.image);
      payload.image = await uploadImage(image);
    }

    await prisma.clash.update({
      where: {
        id: Number(id),
      },
      data: {
        title: payload.title,
        description: payload?.description,
        image: payload?.image,
        user_id: req.user?.id!,
        expire_at: new Date(payload.expire_at),
      },
    });

    return res.status(201).json({ message: "Clash updated successfully" });
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

router.delete("/:id",authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clash = await prisma.clash.findUnique({
      select: {
        image: true,
        id: true,
      },
      where: {
        id: Number(id),
      },
    });
    if (clash) removeImage(clash?.image);
    await prisma.clash.delete({
      where: {
        id: Number(id),
      },
    });
    return res
      .status(200)
      .json({ message: "Clash deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again!" });
  }
});

// Clash item routes
router.post("/items",authMiddleware, async (req: Request, res: Response) => {
  
})

export default router;
