export default {
  JWT_SECRET: process.env.JWT_SECRET || "superlocalsecret",
  PORT: Number(process.env.PORT) || 5000,
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "password",
};
