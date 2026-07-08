import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "./db";

export const auth = betterAuth({
  // Dynamic initialization closure solves the 500 server crash
  database: async () => {
    const mongooseInstance = await connectDB();
    const db = mongooseInstance.connection.db;

    if (!db) {
      throw new Error(
        "Better Auth could not catch the active MongoDB driver instance.",
      );
    }

    return mongodbAdapter(db);
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Logs the user in automatically upon successful registration
  },

  advanced: {
    database: {
      generateId: false, // Essential configuration for Mongoose ObjectIds
    },
    trustedProxyHeaders: true,
  },
});
