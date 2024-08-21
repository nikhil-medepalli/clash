import { sendMail } from '../config/mail.js';
import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";

export const emailQueueName = "emailQueue";

interface EmailJobDataType {
  to: string;
  subject: string;
  body: string;
}

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueOptions,
});

// worker

export const queueWorker = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data:EmailJobDataType = job.data;
    await sendMail(data.to, data.subject, data.body);
  },
  {
    connection: redisConnection,
  }
);
