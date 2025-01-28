"use server";

import { cookies } from "next/headers";

type AuthResult =
  | { success: true; user: any; error?: undefined }
  | { success: false; error: string };

export async function handleAuth(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const isLogin = formData.get("authType") === "login";

  try {
    const response = await fetch(
      `${process.env.API_URL}/auth/${isLogin ? "login/" : "registration/"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (response.ok) {
      const userData = await response.json();
      const setCookieHeader = response.headers.get("set-cookie");

      if (setCookieHeader) {
        const cookieArray = setCookieHeader.split(/,(?=[^;]+=[^;]+)/);

        cookieArray.forEach((cookieStr) => {
          const [name, value] = cookieStr.split(";")[0].trim().split("=");
          cookies().set(name, value, {
            path: "/",
            httpOnly: cookieStr.includes("HttpOnly"),
            secure: cookieStr.includes("Secure"),
            sameSite: getSameSite(cookieStr),
            maxAge: getMaxAge(cookieStr),
            expires: getExpires(cookieStr),
          });
        });
      }

      return { success: true, user: userData };
    } else {
      return { success: false, error: "Authentication failed" };
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return { success: false, error: "Error during authentication" };
  }
}

function getSameSite(cookieStr: string): "strict" | "lax" | "none" | undefined {
  if (cookieStr.includes("SameSite=None")) return "none";
  if (cookieStr.includes("SameSite=Strict")) return "strict";
  if (cookieStr.includes("SameSite=Lax")) return "lax";
  return undefined;
}

function getMaxAge(cookieStr: string): number | undefined {
  const maxAgeMatch = cookieStr.match(/Max-Age=(\d+)/);
  return maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : undefined;
}

function getExpires(cookieStr: string): Date | undefined {
  const expiresMatch = cookieStr.match(/expires=([^;]+)/i);
  return expiresMatch ? new Date(expiresMatch[1]) : undefined;
}

export async function handleLogout() {
  try {
    const nextCookies = cookies().getAll();
    const cookieHeader = nextCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const response = await fetch(`${process.env.API_URL}/auth/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (response.ok) {
      nextCookies.forEach((cookie) => {
        cookies().delete(cookie.name);
      });
      return { success: true };
    } else if (response.status === 401) {
      return { success: false, error: "Unauthorized" };
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, error: "Error during logout" };
  }
}
