import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import moment from "moment";
import { supportMimes } from "./config/filesystem.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
export const formatError = (error) => {
    let errors = {};
    error.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message;
    });
    return errors;
};
export const renderEmailEjs = async (fileName, payload) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const html = await ejs.renderFile(__dirname + `/views/emails/${fileName}.ejs`, payload);
    return html;
};
export const checkDateHourDiff = (date) => {
    const now = moment();
    const tokenSendAt = moment(date);
    const difference = moment.duration(now.diff(tokenSendAt)).asHours();
    return difference;
};
export const imageValidator = (size, mime) => {
    if (bytesToMB(size) > 2) {
        return "Image size should be less than 2MB";
    }
    else if (!supportMimes.includes(mime)) {
        return "Invalid image format";
    }
    return null;
};
export const bytesToMB = (bytes) => {
    return bytes / (1024 * 1024);
};
export const uploadImage = async (image) => {
    const imgExt = image?.name.split(".");
    const imageName = uuidv4() + "." + imgExt[1];
    const uploadPath = process.cwd() + "/public/images/" + imageName;
    image.mv(uploadPath, (err) => {
        if (err)
            throw err;
    });
    return imageName;
};
export const removeImage = (imageName) => {
    const path = process.cwd() + "/public/images/" + imageName;
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};
