import pool from "../config/db.js";

export const getAdminStats = async (req, res) => {
  try {
    const [[users]] = await pool.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[stores]] = await pool.query(
      "SELECT COUNT(*) AS totalStores FROM stores"
    );

    const [[ratings]] = await pool.query(
      "SELECT COUNT(*) AS totalRatings FROM ratings"
    );

    res.status(200).json({
      totalUsers: users.totalUsers,
      totalStores: stores.totalStores,
      totalRatings: ratings.totalRatings,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const { search = "", role = "" } = req.query;

    const [rows] = await pool.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        u.address,
        u.role,
        ROUND(AVG(sr.avg_rating), 1) AS store_rating
      FROM users u
      LEFT JOIN stores s ON u.id = s.owner_id
      LEFT JOIN (
        SELECT store_id, AVG(rating) AS avg_rating
        FROM ratings
        GROUP BY store_id
      ) sr ON s.id = sr.store_id
      WHERE
        (u.name LIKE ? OR u.email LIKE ? OR u.address LIKE ?)
        AND (? = '' OR u.role = ?)
      GROUP BY
        u.id, u.name, u.email, u.address, u.role
      `,
      [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        role,
        role,
      ]
    );

    res.json(rows);
  } catch (err) {
    console.error("ADMIN USERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


export const getAdminStores = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const [rows] = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        u.email AS owner_email,
        s.address,
        ROUND(AVG(r.rating),1) AS avg_rating
      FROM stores s
      LEFT JOIN users u ON s.owner_id = u.id
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE
        s.name LIKE ? OR u.email LIKE ? OR s.address LIKE ?
      GROUP BY s.id
      `,
      [`%${search}%`, `%${search}%`, `%${search}%`]
    );

    res.json(rows);
  } catch {
    res.status(500).json({ message: "Failed to fetch stores" });
  }
};


export const addStoreByAdmin = async (req, res) => {
  try {
    const { name, address, ownerEmail } = req.body;

   
    if (!name || !address || !ownerEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    const [users] = await pool.query(
      "SELECT id, role FROM users WHERE email = ?",
      [ownerEmail]
    );

  
    if (users.length === 0) {
      return res.status(400).json({
        message: "Owner must exist",
      });
    }

    const owner = users[0];

   
    if (owner.role !== "STORE_OWNER") {
      return res.status(400).json({
        message: "User is not a Store Owner",
      });
    }

 
    await pool.query(
      "INSERT INTO stores (name,email, address, owner_id) VALUES (?, ?, ?,?)",
      [name,ownerEmail, address, owner.id]
    );

    res.status(201).json({
      message: "Store added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add store",
    });
  }
};


