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
import Env from "@/lib/env";
import { toast } from "sonner";
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
  
  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/clash/${clash.id}`);
    toast.success("Link copied successfully!");
  };
  
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
          <DropdownMenuItem onClick={handleCopy}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default ClashCardMenu;
