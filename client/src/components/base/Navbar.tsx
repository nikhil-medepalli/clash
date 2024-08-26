"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/UserAvatar";
import { useState } from "react";
import LogoutModal from "../auth/LogoutModal";

const Navbar = ({name:name}: {name: string | ""}) => {
    const [open, setOpen] = useState(false)
  return (
    <>
    {/* <p>data</p> */}
    <LogoutModal open={open} setOpen={setOpen}/>
        <nav className="flex justify-between items-center h-14 p-2 w-full">
          <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-transparent">
            Clash
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger><UserAvatar name={name} /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
    </>
  );
};
export default Navbar;
