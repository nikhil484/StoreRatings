import pool from "../config/db.js";



export const getAllStores = async (req, res) => {
  try {
    const { userId, search = "", sortBy = "name", order = "asc" } = req.query;

    console.log("=== getAllStores Request ===");
    console.log("userId:", userId);
    console.log("search:", search);
    console.log("sortBy:", sortBy);
    console.log("order:", order);

    const validSortFields = {
      name: "s.name",
      rating: "avg_rating",
    };

    const sortColumn = validSortFields[sortBy] || "s.name";
    const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const query = `
      SELECT 
        s.id,
        s.name,
        s.address,
        ROUND(AVG(r.rating), 1) AS avg_rating,
        MAX(ur.rating) AS user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      LEFT JOIN ratings ur 
        ON s.id = ur.store_id AND ur.user_id = ?
      WHERE s.name LIKE ? OR s.address LIKE ?
      GROUP BY s.id, s.name, s.address
      ORDER BY ${sortColumn} ${sortOrder}
    `;

    console.log("SQL Query:", query);
    console.log("Query params:", [userId, `%${search}%`, `%${search}%`]);

    const [stores] = await pool.query(query, [userId, `%${search}%`, `%${search}%`]);

    console.log("Stores found:", stores.length);
    console.log("Stores data:", stores);

    res.status(200).json(stores);
  } catch (error) {
    console.error("=== Backend Error ===");
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch stores" });
  }
};

export const addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await pool.query(
      "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
      [name, email, address, owner_id || null]
    );

    res.status(201).json({ message: "Store added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add store" });
  }
};
