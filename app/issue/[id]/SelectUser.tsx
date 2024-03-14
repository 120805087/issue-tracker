"use client";

import { Skeleton } from "@/app/components";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function SelectUser({ issue }: { issue: Issue }) {
  const { data: users, isLoading } = useUser();

  if (isLoading) return <Skeleton className="w-[280px] h-10" />;

  const handleValueChange = async (userId: string) => {
    try {
      await axios.patch(`/api/issue/${issue.id}`, {
        assignedToUserId: userId || null,
      });
    } catch (error) {}
  };

  return (
    <Select
      defaultValue={issue.assignedToUserId || " "}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="可分配用户" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>选择用户</SelectLabel>
          <SelectItem value=" ">为分配</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/user").then((res) => res.data),
    select: (data) => {
      console.log("data", data);
      return data;
    },
    staleTime: 60 * 1000, // 1 minute cache
  });

export default SelectUser;
