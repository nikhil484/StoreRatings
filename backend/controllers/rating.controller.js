import pool from "../config/db.js";

export const submitRating = async (req, res) => {
  try {
    const { user_id, store_id, rating } = req.body;

    if (!user_id || !store_id || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    await pool.query(
      `
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE rating = ?
      `,
      [user_id, store_id, rating, rating]
    );

    res.status(200).json({ message: "Rating submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit rating" });
  }
};



export const getUserRatings = async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT 
        s.id AS store_id,
        s.name AS store_name,
        s.address,
        r.rating
      FROM ratings r
      JOIN stores s ON r.store_id = s.id
      WHERE r.user_id = ?
      `,
      [userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user ratings" });
  }
};
