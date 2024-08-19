import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// setting view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
