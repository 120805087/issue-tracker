import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <FaRegEdit className="mr-1" />
      <Link href={`/issue/${issueId}/edit`}>Edit</Link>
    </Button>
  );
};

export default IssueEditButton;
