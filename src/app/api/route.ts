import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const cookieStore = cookies();
    cookieStore.set("access_token", body.access_token);
    return NextResponse.redirect(new URL("/", request.url));
}
