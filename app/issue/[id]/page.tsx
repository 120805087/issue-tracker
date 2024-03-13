import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import IssueDeleteButton from "./IssueDeleteButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();
  return (
    <div className="grid grid-flow-row auto-rows-max md:grid-flow-col md:auto-cols-max gap-3">
      <div className="flex flex-col space-y-4 w-full md:w-[520px]">
        <IssueDetails issue={issue} />
      </div>
      <div className="flex flex-col gap-4">
        {session && (
          <>
            <IssueEditButton issueId={issue.id} />
            <IssueDeleteButton issueId={issue.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default IssueDetailPage;
