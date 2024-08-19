import express, {Application, Request, Response} from "express";
import "dotenv/config";
import path from "path";
import {fileURLToPath} from "url";
const app: Application = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// setting view engine
app.set("view engine", "ejs");
app.set("views",path.resolve(__dirname, "./views"));

app.get("/", (req: Request, res: Response) => {
    res.render("welcome");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})