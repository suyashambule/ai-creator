require("dotenv").config();

/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: "./utils/schema.tsx",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_kbpL0RiWn2tT@ep-frosty-sky-a4rutmmc-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
};
