"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IssueStatus } from "@prisma/client";
import { useSearchParams, useRouter } from "next/navigation";

const IssueSelectStatus = () => {
  const searchParams = new URLSearchParams();
  const router = useRouter();
  const Statues: { label: string; value: IssueStatus }[] = [
    {
      label: "Open",
      value: "OPEN",
    },
    {
      label: "In Progress",
      value: "IN_PROGRESS",
    },
    {
      label: "Closed",
      value: "CLOSED",
    },
  ];

  return (
    <Select
      onValueChange={(value) => {
        searchParams.set("status", value);

        const query = searchParams.toString();

        console.log(query);

        router.push("/issue?" + query);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="请选择状态" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>可选状态</SelectLabel>
          <SelectItem value=" ">All</SelectItem>
          {Statues.map((status) => (
            <SelectItem key={status.label} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default IssueSelectStatus;
