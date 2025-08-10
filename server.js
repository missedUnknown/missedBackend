// backend/server.js
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Contact form route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if(!name || !email || !message)
  {
    return res.status(400).json({ success: false, error: "All fields required" });
  }

  try
  {
    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP config
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact Form: ${name}`,
      text: message,
      html: `<p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Message:</b><br>${message}</p>`,
    });

    res.status(200).json({ success: true, message: "Message sent!" });
  } catch(error)
  {
    console.error(error);
    res.status(500).json({ success: false, error: "Error sending email" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
