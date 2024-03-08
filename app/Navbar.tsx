"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";

const Navbar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issue",
      href: "/issue",
    },
  ];

  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6 h-16 border-b px-6">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={classNames("transition-colors", {
              "text-zinc-500": href !== pathname,
              "text-zinc-900": href === pathname,
              "hover:text-zinc-800": true,
            })}
          >
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
