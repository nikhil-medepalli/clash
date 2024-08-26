"use client";
import { clearCache } from "@/actions/commonActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CLASH_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import { headers } from "next/headers";
import { useState } from "react";
import { toast } from "sonner";

const DeleteClash = ({
  open,
  setOpen,
  id,
  token,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  token: string;
}) => {
  const deleteClash = async () => {
    try {
        setLoading(true)
        const {data} = await axios.delete(`${CLASH_URL}/${id}`, {
            headers: {
                Authorization: token,
            }
        })
        if(data?.message){
            setLoading(false)
            clearCache("dashboard")
            toast.success(data.message)
        }
    } catch (error) {
        setLoading(false)
        toast.error("Something went wrong. Please try again later")
    }

  };
  const [loading, setLoading] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you really want to Delete this clash?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400"
            onClick={deleteClash}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteClash;
