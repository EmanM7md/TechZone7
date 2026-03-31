const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Signup user
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Sanitize inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const [existingUsers] = await db.execute('SELECT * FROM users WHERE email = ?', [trimmedEmail]);
    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }

    // Hash password with 10 rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [trimmedName, trimmedEmail, hashedPassword]
    );

    // Generate JWT token (expires in 7 days)
    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data and token
    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        name: trimmedName,
        email: trimmedEmail,
        token,
      },
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Database error. Please try again later.',
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Sanitize inputs
    const trimmedEmail = email.trim().toLowerCase();

    // Find user by email
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [trimmedEmail]);
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token (expires in 7 days)
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data and token
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Database error. Please try again later.',
    });
  }
};

module.exports = { signup, login };