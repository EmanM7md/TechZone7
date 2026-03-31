const db = require('../config/db');

// Send message
const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
    }

    // Sanitize inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // Insert into contacts table
    const [result] = await db.execute(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [trimmedName, trimmedEmail, message.trim()]
    );

    // Return inserted data
    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        name: trimmedName,
        email: trimmedEmail,
        message: message.trim(),
      },
    });
  } catch (error) {
    console.error('Contact message error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Database error. Please try again later.',
    });
  }
};

module.exports = { sendMessage };