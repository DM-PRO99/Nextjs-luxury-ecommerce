import cron, { ScheduledTask } from "node-cron";
import nodemailer from "nodemailer";

declare global {
  // eslint-disable-next-line no-var
  var __luxuryDailyJob: ScheduledTask | undefined;
}

const scheduleExpression = process.env.CRON_DAILY_SCHEDULE ?? "0 14 * * *"; // 9 AM COL
const dailyRecipient =
  process.env.CRON_DAILY_EMAIL ?? process.env.EMAIL_USER ?? "";

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER and EMAIL_PASS are required to run cron emails");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const startDailyEmailJob = () => {
  if (!dailyRecipient) {
    console.warn("[cron] No recipient configured for daily email job");
    return;
  }

  if (global.__luxuryDailyJob) {
    return;
  }

  const transporter = createTransporter();

  global.__luxuryDailyJob = cron.schedule(
    scheduleExpression,
    async () => {
      try {
        await transporter.sendMail({
          from: `"Chronos Automation" <${process.env.EMAIL_USER}>`,
          to: dailyRecipient,
          subject: "⏰ Recordatorio diario Chronos",
          html: `
            <div style="font-family: Inter, sans-serif; padding: 24px; background-color: #0b0f1f; color: #f5f5f5;">
              <h2>Reporte diario de Chronos</h2>
              <p>Este es un correo automático programado con <strong>node-cron</strong>.</p>
              <p>Recuerda revisar tu panel de productos y órdenes.</p>
              <p style="font-size: 12px; color: #c1c1c1;">Enviado ${new Date().toLocaleString("es-CO", {
                timeZone: "America/Bogota",
              })}</p>
            </div>
          `,
        });
        console.log("[cron] Daily digest email sent");
      } catch (error) {
        console.error("[cron] Daily email failed", error);
      }
    },
    {
      timezone: "America/Bogota",
    }
  );
};

export const ensureCronJobs = () => {
  startDailyEmailJob();
};

