import type { NextConfig } from "next";
import * as dotenv from 'dotenv';

dotenv.config();

const nextConfig: NextConfig = {
  env: {
    DB_GITARRE_PASSWORD: process.env.DB_GITARRE_PASSWORD,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    // Weitere Variablen hier hinzufügen
  },
  /* config options here */
};

export default nextConfig;
