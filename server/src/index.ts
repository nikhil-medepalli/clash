import express, {Application, Request, Response} from "express";
import "dotenv/config";
const app: Application = express();

const port = process.env.PORT || 7000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})