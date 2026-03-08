import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ─── CORS fix ────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.options("/{*path}", cors());

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
});

// ─── Nodemailer ───────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Email transporter error:", error.message);
  } else {
    console.log("Email transporter is ready");
  }
});

// ─── Validation ───────────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm({ name, email, message }) {
  if (!name?.trim() || !email?.trim() || !message?.trim())
    return "All fields are required.";
  if (!EMAIL_REGEX.test(email)) return "Please provide a valid email address.";
  if (name.trim().length > 100) return "Name must be under 100 characters.";
  if (message.trim().length > 2000)
    return "Message must be under 2000 characters.";
  return null;
}

// ─── POST /api/contact ────────────────────────────────────────────────────────
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  const validationError = validateContactForm({ name, email, message });
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  try {
    // 1. Tumhe notification
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New Contact: ${name.trim()}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:8px;">
          <h2 style="color:#6366f1;margin-bottom:16px;">New Message from Portfolio</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-weight:bold;width:80px;color:#374151;">Name:</td>
              <td style="padding:8px 0;color:#6b7280;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:bold;color:#374151;">Email:</td>
              <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#6366f1;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:bold;vertical-align:top;color:#374151;">Message:</td>
              <td style="padding:8px 0;color:#6b7280;white-space:pre-wrap;">${message.trim()}</td>
            </tr>
          </table>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    // 2. Sender ko auto-reply
    await transporter.sendMail({
      from: `"Awais Tariq" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:8px;">
          <h2 style="color:#6366f1;">Hey ${name.trim()}, thanks for your message!</h2>
          <p style="color:#6b7280;line-height:1.6;">I've received your message and will get back to you as soon as possible, usually within 24-48 hours.</p>
          <p style="color:#6b7280;line-height:1.6;">
            In the meantime, feel free to check out my work on
            <a href="https://github.com/Awais748" style="color:#6366f1;">GitHub</a> or connect on
            <a href="https://www.linkedin.com/in/awais-tariq-9a2a45374" style="color:#6366f1;">LinkedIn</a>.
          </p>
          <p style="margin-top:24px;color:#374151;">— Awais Tariq</p>
        </div>
      `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
