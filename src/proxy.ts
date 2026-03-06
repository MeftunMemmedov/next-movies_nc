import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("access")?.value;
  const refreshToken = req.cookies.get("refresh")?.value;
  const response = NextResponse.next();

  if (accessToken) {
    try {
      const decoded: { exp: number } = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp - currentTime < 10) {
        if (!refreshToken) throw new Error("Refresh token not found");

        const refreshRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/token?grant_type=refresh_token`,
          {
            method: "POST",
            headers: {
              apikey: process.env.NEXT_PUBLIC_API_KEY!,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          }
        );

        const data = await refreshRes.json();

        if (data.access_token) {
          response.cookies.set("access", data.access_token, {
            httpOnly: true,
            secure: true,
            path: "/",
          });
          response.cookies.set("refresh", data.refresh_token ?? refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
          });

          return response;
        }
      }
    } catch (error) {
      console.error("PROXY JWT ERROR:", error);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
