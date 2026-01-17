import pool from "../config/db.js";


export const getOwnerDashboard = async (req, res) => {
  try {
    const { ownerId } = req.params;

  
    const [storeRows] = await pool.query(
      `
      SELECT 
        s.id AS store_id,
        s.name AS store_name,
        ROUND(AVG(r.rating), 1) AS avg_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.owner_id = ?
      GROUP BY s.id
      `,
      [ownerId]
    );

    if (storeRows.length === 0) {
      return res.status(404).json({ message: "Store not found for this owner" });
    }

    const store = storeRows[0];

   
    const [ratings] = await pool.query(
      `
      SELECT 
        u.name,
        u.email,
        r.rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ?
      `,
      [store.store_id]
    );

    res.status(200).json({
      storeName: store.store_name,
      avgRating: store.avg_rating ?? "No ratings yet",
      ratings,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch owner dashboard" });
  }
};
