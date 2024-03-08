import React from "react";
import { IssueStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface Props {
  status: IssueStatus;
}

const issueStatusMap: Record<
  IssueStatus,
  { variant: "destructive" | "default" | "outline"; label: string }
> = {
  OPEN: { variant: "destructive", label: "open" },
  IN_PROGRESS: { variant: "default", label: "in progress" },
  CLOSED: { variant: "outline", label: "closed" },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge variant={issueStatusMap[status].variant}>
      {issueStatusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
