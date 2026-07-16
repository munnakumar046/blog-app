import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const session = true;

  console.log("proxy check");

  if (session) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/create-blog"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function proxy(request: NextRequest) {
//   // Better Auth real session cookies fetch karein
//   const sessionToken =
//     request.cookies.get("__Secure-better-auth.session_token")?.value ||
//     request.cookies.get("better-auth.session_token")?.value;

//   const { pathname } = request.nextUrl;

//   // Rule 1: Guard for Create Blog
//   if (!sessionToken && pathname === "/create-blog") {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Rule 2: Redirect for Login/Register
//   if (sessionToken && (pathname === "/login" || pathname === "/register")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // 👑 1. YAHAN FIT HOTA HAI: (Function ke bilkul aakhir me, closing bracket '}' se pehle)
//   // Agar upar ke dono rules match nahi hote, toh baaki bache routes (jaise /api/blogs) ko smooth chalne dein.
//   return NextResponse.next();
// }

// // 👑 2. YAHAN FIT HOTA HAI: (proxy function ka bracket band hone ke BILKUL BAAD, file ke end me)
// // Next.js ko batane ke liye ki yeh proxy sirf inhi specific urls par trigger karni hai.
// export const config = {
//   matcher: ["/create-blog", "/login", "/register"],
// };
