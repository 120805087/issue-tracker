import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import dayjs from "dayjs";
import React from "react";
import Markdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
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
    </>
  );
};

export default IssueDetails;
