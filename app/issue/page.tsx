import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiBase } from "@/lib/apiBase";
import { Issue, IssueStatus } from "@prisma/client";
import Link from "next/link";
import dayjs from "dayjs";
import { IssueStatusBadge } from "@/app/components";
import ActionButton from "./ActionButton";
import IssueSelectStatus from "./IssueSelectStatus";
import prisma from "@/prisma/client";

const IssuePage = async ({
  searchParams,
}: {
  searchParams: { status: IssueStatus };
}) => {
  // 方法一：
  // const res = await import("@/app/api/issue/route");
  // const issues = await (await res.GET()).json();

  // 方法二：
  // const res = await fetch(`${apiBase()}/api/issue`);
  // const issues = await res.json();

  const statues = Object.values(IssueStatus);
  const whereStatus = statues.includes(searchParams.status)
    ? {
        status: searchParams.status,
      }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: whereStatus,
  });

  return (
    <div>
      <div className="flex justify-between">
        <IssueSelectStatus />
        <ActionButton />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
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
                  {dayjs(issue.createdAt.toString()).format(
                    "YYYY-MM-DD hh:mm:ss"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
