import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,

  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  CLIENT_URL: process.env.CLIENT_URL,

  VITE_API_URL: process.env.VITE_API_URL,
};
