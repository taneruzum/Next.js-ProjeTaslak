import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { keysToCamelCase } from "@/lib/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function proxyRequest(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    if (!API_BASE_URL) {
        return NextResponse.json({ message: "API Configuration Error" }, { status: 500 });
    }

    try {
        const { path } = await params;
        const pathStr = path.join("/");
        const queryString = req.nextUrl.search; // keeps ?page=1&size=10 etc.
        const targetUrl = `${API_BASE_URL}/${pathStr}${queryString}`;

        const cookieStore = await cookies();
        const token = cookieStore.get("TOKEN_NAME")?.value;

        const incomingContentType = req.headers.get("content-type");

        const isMultipart = incomingContentType?.includes("multipart/form-data");

        const headers: Record<string, string> = {
            "Accept": "application/json",
            "User-Agent": req.headers.get("user-agent") || "NextJS-Proxy",
        };

        // For multipart, we MUST forward the original Content-Type header because it contains the boundary.
        // For others, we default to application/json.
        if (isMultipart && incomingContentType) {
            headers["Content-Type"] = incomingContentType;
        } else {
            headers["Content-Type"] = "application/json";
        }

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        // Prepare options
        const options: RequestInit = {
            method: req.method,
            headers: headers,
        };

        // If it's a request with body (POST, PUT, PATCH)
        if (req.method !== "GET" && req.method !== "HEAD") {
            if (isMultipart) {
                options.body = req.body;
                // @ts-ignore
                options.duplex = "half";
            } else {
                try {
                    const body = await req.json();
                    options.body = JSON.stringify(body);
                } catch (e) {
                    // Body parsing failed or empty
                }
            }
        }

        const response = await fetch(targetUrl, options);

        // Forward the response status and data
        // If the backend returns JSON, parse and return it.
        // If it returns authentication error, the client fetcher interceptor will handle it.

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            const camelCaseData = keysToCamelCase(data);
            return NextResponse.json(camelCaseData, { status: response.status });
        } else {
            const text = await response.text();
            return new NextResponse(text, {
                status: response.status,
                headers: { "Content-Type": contentType || "text/plain" }
            });
        }

    } catch (error: any) {
        console.error("PROXY ERROR:", error);
        return NextResponse.json({ message: error.message || "Internal Server Error", error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }, { status: 500 });
    }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
