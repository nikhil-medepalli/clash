"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import {signOut} from "next-auth/react"
  
const LogoutModal = ({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const logoutUser = async () => {
    await signOut({
      callbackUrl: "/login",
      redirect: true
    })
  }
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
      <AlertDialogAction className="bg-red-500 hover:bg-red-400" onClick={logoutUser}>Logout</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
export default LogoutModal