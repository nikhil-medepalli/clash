import { ZodError } from "zod";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import moment from "moment";
import { supportMime } from "./config/filesystem.js";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";

export const formatError = (error: ZodError): any => {
  let errors: any = {};
  error.errors?.map((issue) => {
    errors[issue.path?.[0]] = issue.message;
  });

  return errors;
};

export const renderEmailEjs = async (
  fileName: string,
  payload: any
): Promise<string> => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const html: string = await ejs.renderFile(
    __dirname + `/views/emails/${fileName}.ejs`,
    payload
  );
  return html;
};

export const checkDateHourDiff = (date: Date | string): number => {
  const now = moment();
  const tokenSendAt = moment(date);
  const difference = moment.duration(now.diff(tokenSendAt)).asHours();
  return difference;
};

export const imageValidator = (size: number, mime: string): string | null => {
  if (bytesToMB(size) > 2) {
    return "Image size should be less than 2MB";
  } else if (!supportMime.includes(mime)) {
    return "Invalid image format";
  }
  return null;
};

export const bytesToMB = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

export const uploadImage = async (image: UploadedFile) => {
  const imgExt = image?.name.split(".");
  const imageName = uuidv4() + "." + imgExt[1];
  const uploadPath = process.cwd() + "/public/images/" + imageName;
  image.mv(uploadPath, (err) => {
    if (err) throw err;
  });
  return imageName;
};
