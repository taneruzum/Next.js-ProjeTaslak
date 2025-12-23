import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Logger } from "@/utils/logger";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiBaseUrl) {
            return NextResponse.json(
                { message: "API URL configuration missing" },
                { status: 500 }
            );
        }

        // Call external backend
        const res = await fetch(`${apiBaseUrl}/api/Auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return NextResponse.json(
                { message: errorData.message || "Login failed" },
                { status: res.status }
            );
        }

        const data = await res.json();
        Logger.log("DATA:", data);
        const token = data.data.Token;
        const userId = data.data.UserId;
        const restaurantId = data.data.RestaurantId;
        const expiresAt = new Date(data.Expiration);

        Logger.log("TOKEN:", token);
        Logger.log("EXPIRES AT:", expiresAt);
        // Set HttpOnly cookie
        const cookieStore = await cookies();
        cookieStore.set("TOKEN_NAME", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: expiresAt,
        });

        // Set Public Cookies for IDs
        if (userId) {
            cookieStore.set("restaurant-user-id", userId, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                expires: expiresAt,
            });
        }

        if (restaurantId) {
            cookieStore.set("restaurant-id", restaurantId, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                expires: expiresAt,
            });
        }

        return NextResponse.json({ success: true, ...data });
    } catch (error) {
        console.error("Login route error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
