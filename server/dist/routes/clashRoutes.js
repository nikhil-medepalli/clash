import { Router } from "express";
import { ZodError } from "zod";
import { formatError, imageValidator, uploadImage } from "../helper.js";
import { clashSchema } from "../validation/clashValidation.js";
import prisma from "../config/database.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const payload = clashSchema.parse(body);
        // check if files are present
        if (req.files?.image) {
            const image = req.files?.image;
            const validMsg = imageValidator(image.size, image.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } });
            }
            payload.image = await uploadImage(image);
        }
        else {
            return res.status(422).json({ errors: { image: "Image is required" } });
        }
        await prisma.clash.create({
            data: {
                ...payload,
                user_id: req.user?.id,
                expire_at: new Date(payload.expire_at)
            }
        });
        return res.status(201).json({ message: "Clash created successfully" });
    }
    catch (error) {
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
