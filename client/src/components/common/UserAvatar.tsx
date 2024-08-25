"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({name}: {name: string}) => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
