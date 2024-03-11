import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET() {
    const allUsers = await prisma.user.findMany()

    return NextResponse.json(allUsers, { status: 201 })
}