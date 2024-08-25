"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

const ClashCard = ({ clash }: { clash: ClashType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{clash.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {clash?.image && <Image src={getImageUrl(clash.image)} alt={clash.title} width={500} height={500} className="rounded-md w-full h-[220px] object-contain"/>}
        <p>{clash.description}</p>
        <p>
            <span className="font-semibold">Expires At:</span>
            {new Date(clash.expire_at).toDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Button>Items</Button>
      </CardFooter>
    </Card>
  );
};
export default ClashCard;
