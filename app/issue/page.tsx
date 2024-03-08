import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const IssuePage = () => {
  return (
    <div>
      <Link href="/issue/new">
        <Button variant="default">New Issue</Button>
      </Link>
    </div>
  );
};

export default IssuePage;
