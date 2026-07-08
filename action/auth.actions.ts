"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

// ==========================================
// 1. Signup / Register Action
// ==========================================
export const register = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }

  try {
    await auth.api.signUpEmail({ body: { name, email, password } });
    // success → let client know
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Registration failed." };
  }
};

// ==========================================
// 2. Login Action
// ==========================================
export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Please enter both fields." };

  try {
    await auth.api.signInEmail({ body: { email, password } });
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Invalid credentials." };
  }
};

// ==========================================
// 3. Logout Action
// ==========================================
export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("better-auth.session_token");
    cookieStore.delete("__Secure-better-auth.session_token");

    await auth.api.signOut({
      headers: { Cookie: cookieStore.toString() },
    });
  } catch (error) {
    console.error("Logout backend execution error:", error);
  }
  redirect("/login");
};

// "use server";

// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";
// import { cookies } from "next/headers";

// // ==========================================
// // 1. Signup / Register Action
// // ==========================================
// export const register = async (formData: FormData) => {
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   if (!name || !email || !password) {
//     return { error: "All fields are required." };
//   }

//   try {
//     await auth.api.signUpEmail({ body: { name, email, password } });
//   } catch (error: any) {
//     return { error: error.message || "Registration failed." };
//   }
//   redirect("/login");
// };

// // ==========================================
// // 2. Login Action (Clean Solution Without next/headers)
// // ==========================================
// export const login = async (formData: FormData) => {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   if (!email || !password) return { error: "Please enter both fields." };

//   try {
//     // Better Auth client authentication process run karein
//     await auth.api.signInEmail({
//       body: { email, password },
//     });
//   } catch (error: any) {
//     return { error: error.message || "Invalid credentials." };
//   }
//   redirect("/");
// };

// // ==========================================
// // 3. Logout Action
// // ==========================================
// export const logout = async () => {
//   try {
//     // 1. Next.js backend store se cookies delete karein
//     const cookieStore = await cookies();
//     cookieStore.delete("better-auth.session_token");
//     cookieStore.delete("__Secure-better-auth.session_token");

//     // 2. Better Auth internal API se session clear karein
//     await auth.api.signOut({
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });
//   } catch (error) {
//     console.error("Logout backend execution error:", error);
//   }

//   // 3. User ko safely login page par push karein
//   redirect("/login");
// };
