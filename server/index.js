import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from root directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 8081;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(bodyParser.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running!", timestamp: new Date().toISOString() });
});

// POST /api/contact
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
      return res.status(500).json({ error: "Email service not configured properly." });
    }

    console.log("Creating SMTP transporter...");
    
    // Try different SMTP configurations for Gmail
    const transporterConfigs = [
      // Configuration 1: Gmail with OAuth2-like setup
      {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        name: "localhost",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
          ciphers: 'SSLv3'
        }
      },
      // Configuration 2: Gmail with SSL
      {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        name: "localhost",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      },
      // Configuration 3: Gmail service shorthand
      {
        service: 'gmail',
        name: "localhost",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    ];

    let transporter = null;
    let lastError = null;

    // Try each configuration until one works
    for (let i = 0; i < transporterConfigs.length; i++) {
      try {
        console.log(`Trying SMTP configuration ${i + 1}...`);
        transporter = nodemailer.createTransport(transporterConfigs[i]);
        
        // Test the connection
        await transporter.verify();
        console.log(`SMTP configuration ${i + 1} successful!`);
        break;
      } catch (error) {
        console.log(`SMTP configuration ${i + 1} failed:`, error.message);
        lastError = error;
        transporter = null;
      }
    }

    if (!transporter) {
      console.error("All SMTP configurations failed. Last error:", lastError);
      throw lastError;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER, // Use authenticated email as sender
      replyTo: email, // Set reply-to as the contact form submitter
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #4CAF50;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #4CAF50;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent from the YogirajOil contact form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", process.env.EMAIL_TO || process.env.EMAIL_USER);
    res.status(200).json({ message: "Message sent successfully!" });
    
  } catch (err) {
    console.error("Email sending error:", err);
    
    // Provide more specific error messages
    if (err.code === 'EAUTH') {
      res.status(500).json({ 
        error: "Email authentication failed. Please check your email credentials or use an App Password for Gmail." 
      });
    } else if (err.code === 'ECONNECTION') {
      res.status(500).json({ 
        error: "Unable to connect to email service. Please check your internet connection and email settings." 
      });
    } else if (err.message && err.message.includes('Invalid login')) {
      res.status(500).json({ 
        error: "Invalid email credentials. For Gmail, please use an App Password instead of your regular password." 
      });
    } else {
      res.status(500).json({ 
        error: "Failed to send message. Please try again later or contact support." 
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email configured for: ${process.env.EMAIL_USER || 'Not configured'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});