import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        if(request.cookies.get('token')){
            return NextResponse.json({
                message: "alreay logged in",
            }, { status: 200 });
        }else {
            return NextResponse.json({
                message: "not logged in",
            }, { status: 401 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

