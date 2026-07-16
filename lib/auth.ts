// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce",
);
await client.connect();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },

  advanced: {
    database: {
      generateId: false,
    },
    trustedProxyHeaders: true,
  },
});
