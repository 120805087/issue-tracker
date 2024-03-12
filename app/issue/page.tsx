import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiBase } from "@/lib/apiBase";
import { Issue } from "@prisma/client";
import Link from "next/link";
import { IssueStatusBadge } from "@/app/components";
import ActionButton from "./ActionButton";

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

export const dynamic = "force-dynamic";

export default IssuePage;
