import nodemailer from "nodemailer";
import { env } from "process";

export default async function sendEmail({
  to,
  subject,
  html,
  from = env.EMAIL_FROM || "admin@email.com",
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT ? parseInt(env.EMAIL_PORT) : 587,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({ from, to, subject, html });
}
