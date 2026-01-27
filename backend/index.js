const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json());

// Rate limiting for /api routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", apiLimiter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and message.",
      });
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      TO_EMAIL,
      FROM_EMAIL,
    } = process.env;

    if (!SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
      console.error("Missing SMTP environment variables");
      return res.status(500).json({
        success: false,
        message: "Email service is not configured on the server.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || "smtp.gmail.com",
      port: Number(SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // 1) Email to you (owner)
    await transporter.sendMail({
      from: FROM_EMAIL || SMTP_USER,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from portfolio contact form - ${name}`,
      text: `Name: ${name}
Email: ${email}

Message:
${message}`,
    });

    // 2) Auto-response to user
    await transporter.sendMail({
      from: FROM_EMAIL || SMTP_USER,
      to: email,
      subject: "I’ve received your message",
      text: `Hi ${name},

Thanks for getting in touch!
Your message has been successfully received.
I’ll respond soon after reviewing the details.

Regards,
Awais`,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send the message. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

module.exports = app;

