import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/components/base/Navbar";
import AddClashItems from "@/components/clash/AddClashItems";
import ViewClashItems from "@/components/clash/ViewClashItems";
import { fetchClash } from "@/fetch/clashFetch";
import { getServerSession } from "next-auth";

const clashItems = async ({ params }: { params: { id: number } }) => {
  const clash: ClashType | null = await fetchClash(params.id);
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="container">
      <Navbar name="" />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
        <p className="text-lg">{clash?.description}</p>
      </div>
      {clash?.ClashItem && clash?.ClashItem.length > 0 ? (
       <ViewClashItems clash={clash} />
      ) : (
        <AddClashItems token={session?.user?.token!} clashId={params.id} />
      )}
    </div>
  );
};
export default clashItems;
