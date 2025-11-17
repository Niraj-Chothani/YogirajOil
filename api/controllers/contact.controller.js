import { sendContactEmail } from "../services/email.service.js";

export const handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Pass the work to the email service
    await sendContactEmail({ name, email, message });
    res.status(200).json({ message: "Message sent successfully!" });

  } catch (err) {
    console.error("Error in contact controller:", err.message);

    // Send the specific error message from the service
    res.status(500).json({ 
      error: err.message || "Failed to send message. Please try again later."
    });
  }
};