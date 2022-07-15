import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: null
}

if(process.env.MODE === "PROD"){
  dbConfig.ssl = {
    rejectUnauthorized: false
  }
}

const { Pool } = pg;
export const connection = new Pool(dbConfig);
