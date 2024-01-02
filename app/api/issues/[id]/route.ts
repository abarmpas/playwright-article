import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  return NextResponse.json(issue, { status: 201 })
}