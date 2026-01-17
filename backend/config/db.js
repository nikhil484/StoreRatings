// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();

// const pool = mysql
//   .createPool({
//     host: "localhost",
//     user: "app_user",
//     password: process.env.DB_PASSWORD,
//     database: "store_ratings",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   })
//   .promise();

// export default pool;


import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: true } : false,
  waitForConnections: true,
  connectionLimit: 10,
}).promise();

export default pool;
