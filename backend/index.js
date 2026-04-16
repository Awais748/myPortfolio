import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
const adminEmail = process.env.ADMIN_EMAIL || process.env.TO_EMAIL || emailUser;
const configuredOrigins = (
  process.env.CLIENT_ORIGINS ||
  process.env.CLIENT_ORIGIN ||
  ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins =
  configuredOrigins.length > 0
    ? configuredOrigins
    : ["http://localhost:5173", "http://127.0.0.1:5173"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;

app.set("trust proxy", 1);
app.use(express.json({ limit: "50kb" }));

const sanitize = (value) => String(value ?? "").trim();
const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy blocked this origin."));
    },
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.options("/{*path}", cors());

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please wait a minute and try again.",
  },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  if (!emailUser || !emailPass || !adminEmail) {
    return res.status(500).json({
      success: false,
      message: "Server email configuration is missing.",
    });
  }

  const name = sanitize(req.body?.name);
  const email = sanitize(req.body?.email).toLowerCase();
  const message = sanitize(req.body?.message);

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (name.length > MAX_NAME_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Name must be ${MAX_NAME_LENGTH} characters or fewer.`,
    });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
    });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  try {
    // (A) Email to Admin
    await transporter.sendMail({
      from: `"${safeName}" <${emailUser}>`,
      replyTo: email,
      to: adminEmail,
      subject: "New Contact Form Message",
      text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="margin-top: 0; color: #111827;">New Contact Form Message</h2>
          <p style="color: #6b7280; font-size: 14px;">You received a new message from your portfolio contact form.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <table style="width: 100%; font-size: 15px; color: #374151;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 80px;">Name:</td>
              <td style="padding: 6px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${safeEmail}" style="color: #6366f1;">${safeEmail}</a></td>
            </tr>
          </table>
          <div style="margin-top: 16px;">
            <p style="font-weight: bold; color: #374151; margin-bottom: 6px;">Message:</p>
            <div style="background: #f9fafb; border-left: 4px solid #6366f1; padding: 14px 16px; border-radius: 4px; color: #374151; white-space: pre-line;">${safeMessage}</div>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">Sent via your portfolio contact form.</p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"Awais Tariq" <${emailUser}>`,
      to: email,
      subject: "We received your message",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-width: 600px; width: 100%;">

                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 40px 32px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">Message Received ✓</h1>
                      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 15px;">Thank you for getting in touch!</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 16px; font-size: 16px; color: #111827;">Hi <strong>${safeName}</strong>,</p>

                      <p style="margin: 0 0 16px; font-size: 15px; color: #374151; line-height: 1.7;">
                        Thank you for reaching out! I've successfully received your message and will get back to you as soon as possible — usually within <strong>24 hours</strong>.
                      </p>

                      <p style="margin: 0 0 24px; font-size: 15px; color: #374151; line-height: 1.7;">
                        In the meantime, feel free to connect with me on <a href="https://www.linkedin.com/in/awais-tariq-9a2a45374" style="color: #6366f1; text-decoration: none; font-weight: 600;">LinkedIn</a> or explore my work on <a href="https://github.com/Awais748" style="color: #6366f1; text-decoration: none; font-weight: 600;">GitHub</a>.
                      </p>

                      <!-- Confirmation Box -->
                      <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 8px; padding: 20px 24px; margin-bottom: 28px;">
                        <p style="margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.5px;">Your message summary</p>
                        <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6; white-space: pre-line;">${safeMessage}</p>
                      </div>

                      <p style="margin: 0; font-size: 15px; color: #374151;">
                        Best regards,<br />
                        <strong style="color: #111827; font-size: 16px;">Awais Tariq</strong><br />
                        <span style="color: #6b7280; font-size: 13px;">Full Stack Developer</span>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
                      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                        This is an automated reply — please do not reply directly to this email.<br />
                        © ${new Date().getFullYear()} Awais Tariq. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "API is healthy" });
});

app.use((err, _req, res, _next) => {
  if (err?.message?.includes("CORS")) {
    return res
      .status(403)
      .json({ success: false, message: "Origin is not allowed by CORS." });
  }

  return res
    .status(500)
    .json({ success: false, message: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
