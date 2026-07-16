import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//   // Ensures the hooks map inside the unified /api/auth router layer
// });
export const authClient = createAuthClient({
  baseURL: "http://localhost:3001", // or your actual API URL
});
