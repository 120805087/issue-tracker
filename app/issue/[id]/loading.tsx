import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
