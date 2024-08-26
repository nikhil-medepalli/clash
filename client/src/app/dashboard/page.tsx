import Navbar from "@/components/base/Navbar"
import AddClash from "@/components/clash/AddClash";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchClashs } from "../fetch/clashFetch";
import ClashCard from "@/components/clash/ClashCard";

const dashboard = async () => {
    const session:CustomSession|null = await getServerSession(authOptions)
    const clashs: Array<ClashType> | [] = await fetchClashs(session?.user?.token!)
    // console.log(clashs)
  return (
    <div className="container">
        <Navbar name={session?.user?.name!}/>
        <div className="flex justify-end mt-10">
          <AddClash user={session?.user!} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {clashs.length > 0 && clashs.map((item, index) => <ClashCard clash={item} key={index} />)}
        </div>
    </div>
  )
}
export default dashboard