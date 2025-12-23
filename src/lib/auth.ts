import { jwtVerify } from "jose";

import { Logger } from "@/utils/logger";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
Logger.log("JWT_SECRET:", process.env.JWT_SECRET);
export async function verifyToken(token: string) {

    return jwtVerify(token, secret);
}