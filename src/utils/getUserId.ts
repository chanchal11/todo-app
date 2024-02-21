import { NextRequest } from "next/server";
import { verifyJwtToken } from "./verifyJwtToken";

export async function getUserId(req: NextRequest){
    const token = req.cookies.get('token')?.value || '';
    return (await verifyJwtToken(token))?.id;
}