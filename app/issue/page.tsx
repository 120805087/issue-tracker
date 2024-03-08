import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Issue } from "@prisma/client";
import { apiBase } from "@/lib/apiBase";
import IssueStatusBadge from "../components/IssueStatus";
import ActionButton from "./ActionButton";
import Link from "next/link";

const IssuePage = async () => {
  // 方法一：
  // const res = await import("@/app/api/issue/route");
  // const issues = await (await res.GET()).json();

  // 方法二：
  const res = await fetch(`${apiBase()}/api/issue`);
  const issues = await res.json();

  return (
    <div>
      <ActionButton />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue: Issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium">
                  <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {issue.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IssuePage;
