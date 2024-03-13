import { issueSchema } from "@/app/validateSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validating = await issueSchema.safeParse(body);

  if (!validating.success)
    return NextResponse.json(validating.error.errors, { status: 400 });

  let issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });

  issue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issue);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });

  issue = await prisma.issue.delete({
    where: {
      id: issue!.id,
    },
  });

  return NextResponse.json({ message: "Issue deleted" });
}
