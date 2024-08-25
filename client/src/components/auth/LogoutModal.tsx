"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
const LogoutModal = ({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Do you really want to sign out?</AlertDialogTitle>
      {/* <AlertDialogDescription>
        Do you really want to sign out?
      </AlertDialogDescription> */}
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-500 hover:bg-red-400">Logout</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
export default LogoutModal