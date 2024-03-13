"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/app/components";
import classNames from "classnames";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

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
    <nav className="flex items-center border-b px-6 h-16">
      <div className="flex  space-x-6">
        <Link href="/" className="flex items-center">
          <FaBug />
        </Link>
        <ul className="flex space-x-6">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={classNames({
                  "link-style": true,
                  "!text-zinc-900": href === pathname,
                })}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="ms-auto">{LoginStatus()}</div>
    </nav>
  );
};

const LoginStatus = () => {
  const { data: session, status } = useSession();
  console.log(status);

  if (status === "loading")
    return (
      <div className="w-12 rounded-full">
        <Skeleton />
      </div>
    );

  if (status === "authenticated") return DropdownLogoutMenu(session);

  return (
    <Link className="link-style" href={"/api/auth/signin"}>
      Login
    </Link>
  );
};

const DropdownLogoutMenu = (session: Session) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={session.user?.image!}
            alt="@shadcn"
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MdLogout className="mr-2 h-4 w-4" />
          <Link href={"/api/auth/signout"} className="w-full">
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
