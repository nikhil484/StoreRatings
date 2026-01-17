import bcrypt from "bcrypt";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    // 1️⃣ Required fields check
    if (!name || !email || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Name validation (20–60 chars)
    if (name.length < 20 || name.length > 60) {
      return res
        .status(400)
        .json({ message: "Name must be between 20 and 60 characters" });
    }

    // 3️⃣ Address validation (max 400 chars)
    if (address.length > 400) {
      return res
        .status(400)
        .json({ message: "Address must not exceed 400 characters" });
    }

    // 4️⃣ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 5️⃣ Password validation (8–16, uppercase, special char)
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8–16 characters, include one uppercase letter and one special character",
      });
    }

    // 6️⃣ Check if email already exists
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 7️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8️⃣ Set role (Admin can pass role, public signup defaults)
    const userRole = role || "NORMAL_USER";

    // 9️⃣ Insert user
    await pool.query(
      `INSERT INTO users (name, email, address, password, role)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, address, hashedPassword, userRole]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const [users] = await pool.query(
      "SELECT id, name, email, password, role FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be 8–16 characters, include one uppercase letter and one special character",
      });
    }

  
    const [rows] = await pool.query(
      "SELECT password FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedNewPassword, userId]
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
