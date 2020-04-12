export default {
  JWT_SECRET: process.env.JWT_SECRET || "superlocalsecret",
  PORT: Number(process.env.PORT) || 5000,
};
