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
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New Contact: ${name.trim()}`,
      html: `
<div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;">

  <div style="background:#ffffff;border-top:4px solid #6366f1;border-radius:8px 8px 0 0;padding:36px 36px 28px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">

    <h2 style="color:#111827;font-size:20px;font-weight:700;margin:0 0 10px;">
      Hi <span style="color:#6366f1;">${name.trim()}</span>, thanks for reaching out!
    </h2>
    <p style="color:#6b7280;font-size:15px;line-height:1.75;margin:0 0 24px;">
      I've received your message and will personally reply within
      <strong style="color:#374151;">24–48 hours</strong>.
      Looking forward to connecting with you!
    </p>

    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-left:3px solid #6366f1;border-radius:6px;padding:16px 18px;margin-bottom:28px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <p style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0;font-weight:600;">Your message</p>
        <p style="color:#d1d5db;font-size:11px;margin:0;">
          ${new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <p style="color:#6b7280;font-size:14px;font-style:italic;margin:0;line-height:1.6;">
        "${message.trim().slice(0, 150)}${
        message.trim().length > 150 ? "..." : ""
      }"
      </p>
    </div>

    <div style="display:flex;gap:10px;margin-bottom:32px;">
      <a href="https://github.com/Awais748"
        style="flex:1;background:#6366f1;color:#fff;text-decoration:none;text-align:center;padding:11px;border-radius:6px;font-size:13px;font-weight:600;display:block;">
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/awais-tariq-9a2a45374"
        style="flex:1;background:#ffffff;color:#6366f1;text-decoration:none;text-align:center;padding:11px;border-radius:6px;font-size:13px;font-weight:600;border:1px solid #6366f1;display:block;">
        LinkedIn
      </a>
    </div>

    <div style="border-top:1px solid #f1f5f9;padding-top:20px;">
      <p style="color:#9ca3af;font-size:13px;margin:0 0 2px;">Cheers,</p>
      <p style="color:#111827;font-size:15px;font-weight:700;margin:0;">Awais Tariq</p>
    </div>
  </div>

  <div style="background:#f9fafb;padding:14px 36px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none;text-align:center;">
    <p style="color:#d1d5db;font-size:11px;margin:0;">
      You received this because you reached out via my portfolio. If this wasn't you, safely ignore this.
    </p>
  </div>

</div>
`,
    });

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error.message);
    return res.status(500).json({
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
