// import { NextRequest, NextResponse } from "next/server";

// export const middleware = async (req: NextRequest) => {
//   const token = req.cookies.get("access");

//   if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }
//   return NextResponse.next();
// };
