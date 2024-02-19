import { jwtVerify } from "jose";

export async function verifyJwtToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET!));
        return payload;
    }
    catch (error) {
        return null;
    }
}