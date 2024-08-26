"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import DeleteClash from "./DeleteClash";
const EditClash = dynamic(() => import("./EditClash"));

const ClashCardMenu = ({
  clash,
  token,
}: {
  clash: ClashType;
  token: string;
}) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  
  return (
    <>
      {open && ( 
        <Suspense fallback={<p>Loading...</p>}>
          <EditClash clash={clash} open={deleteOpen} setOpen={setDeleteOpen} token={token} />
        </Suspense>
      )}
      {deleteOpen && ( 
        <Suspense fallback={<p>Loading...</p>}>
          <DeleteClash id={clash.id} open={deleteOpen} setOpen={setDeleteOpen} token={token} />
        </Suspense>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default ClashCardMenu;
