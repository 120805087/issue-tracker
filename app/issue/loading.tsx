import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ActionButton from "./ActionButton";

const issueLoadingPage = () => {
  const issues = [1, 2, 3, 4];
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
            {issues.map((issue) => (
              <TableRow key={issue}>
                <TableCell className="font-medium">
                  <Skeleton />
                  <div className="block md:hidden">
                    <Skeleton />
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default issueLoadingPage;
