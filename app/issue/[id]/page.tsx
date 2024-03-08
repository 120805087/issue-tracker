import React from "react";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Markdown from "react-markdown";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatus";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();
  return (
    <div className="flex flex-col space-y-4">
      <div>{issue.title}</div>
      <div className="flex space-x-2">
        <div>
          <IssueStatusBadge status={issue.status} />
        </div>
        <div>
          {dayjs(issue.createdAt.toString()).format("YYYY-MM-DD hh:mm:ss")}
        </div>
      </div>
      <div className="border rounded-md p-4 prose">
        <Markdown>{issue.description}</Markdown>
      </div>
    </div>
  );
};

export default IssueDetailPage;
