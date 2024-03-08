import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ActionButton = () => {
  return (
    <Link href="/issue/new" className="inline-block mb-6">
      <Button variant="default">New Issue</Button>
    </Link>
  );
};

export default ActionButton;
