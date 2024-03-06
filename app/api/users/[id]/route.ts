import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return NextResponse.json(user, { status: 201 })
}