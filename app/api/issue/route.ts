import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validateSchema";

export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validating = await issueSchema.safeParse(body);

  if (!validating.success)
    return NextResponse.json(validating.error.errors, { status: 400 });

  const user = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
