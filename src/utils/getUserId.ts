import { NextRequest } from "next/server";
import { verifyJwtToken } from "./verifyJWTToken";

export async function getUserId(req: NextRequest){
    const token = req.cookies.get('token')?.value || '';
    return (await verifyJwtToken(token))?.id;
}