import React from "react";
import { Skeleton } from "@/app/components";

const IssueDetailLoading = () => {
  return (
    <div>
      <div>
        <Skeleton />
      </div>
      <div>
        <Skeleton />
      </div>
      <div>
        <Skeleton />
      </div>
      <div>
        <Skeleton />
      </div>
    </div>
  );
};

export default IssueDetailLoading;
