"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
  
const ClashCardMenu = ({clash}: { clash: ClashType }) => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger>
    <EllipsisVertical /> 
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Copy Link</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  )
}
export default ClashCardMenu