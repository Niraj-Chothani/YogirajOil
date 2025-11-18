import nodemailer from "nodemailer";

// All transporter configurations
const transporterConfigs = [
  // Configuration 1: Gmail with Port 587
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
  // Configuration 2: Gmail with SSL (Port 465)
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

/**
 * Tries to create and verify a working Nodemailer transporter
 * @returns {nodemailer.Transporter} A verified transporter
 * @throws {Error} If all configurations fail
 */
const getTransporter = async () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
    throw new Error("Email service not configured properly.");
  }

  let transporter = null;
  let lastError = null;

  for (let i = 0; i < transporterConfigs.length; i++) {
    try {
      console.log(`Trying SMTP configuration ${i + 1}...`);
      transporter = nodemailer.createTransport(transporterConfigs[i]);
      
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

  return transporter;
};

/**
 * Sends the contact form email
 * @param {object} contactDetails - { name, email, message }
 ** @throws {Error} If sending fails
 */
export const sendContactEmail = async ({ name, email, message }) => {
  try {
    const transporter = await getTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER, // Authenticated sender
      replyTo: email, // Reply-To field for the person who filled the form
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Where you receive the email
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

  } catch (err) {
    console.error("Email sending error:", err);
    
    // Throw specific, user-friendly errors for the controller to catch
    if (err.code === 'EAUTH' || (err.message && err.message.includes('Invalid login'))) {
      throw new Error("Email authentication failed. Please check your credentials or use an App Password for Gmail.");
    } else if (err.code === 'ECONNECTION') {
      throw new Error("Unable to connect to email service. Check internet/email settings.");
    } else {
      throw new Error("Failed to send message. Please try again later.");
    }
  }
};