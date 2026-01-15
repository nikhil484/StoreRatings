import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: "localhost",
    user: "app_user",
    password: process.env.DB_PASSWORD,
    database: "store_ratings",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

export default pool;
