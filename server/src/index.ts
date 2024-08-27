import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import cors from "cors";
import Routes from "./routes/index.js";
import fileUpload from "express-fileupload";
import { Server } from "socket.io";
import { createServer, Server as HttpServer } from "http";

const port = process.env.PORT || 7000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();

const server: HttpServer = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_APP_URL,
  },
});

export { io };
setupSocket(io);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(appLimitter);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.static("public"))

// setting view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(Routes);

app.get("/", async (req: Request, res: Response) => {
  const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
    name: "John Doe",
  });
  // await sendMail("nikhil.medepalli2702@gmail.com", "Test Email", html)
  await emailQueue.add(emailQueueName, {
    to: "nikhil.medepalli2702@gmail.com",
    subject: "Testing queue email",
    body: html,
  });
  return res.json({ message: "Email sent" });
});

// queue
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";
import { appLimitter } from "./config/rateLimit.js";
import { setupSocket } from "./socket.js";

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
