import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import Routes from "./routes/index.js";
// import { sendMail } from "./config/mail.js";
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// setting view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.use(Routes);
app.get("/", async (req, res) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, { name: "John Doe" });
    // await sendMail("nikhil.medepalli2702@gmail.com", "Test Email", html)
    await emailQueue.add(emailQueueName, { to: "nikhil.medepalli2702@gmail.com", subject: "Testing queue email", body: html });
    return res.json({ message: "Email sent" });
});
// queue
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
