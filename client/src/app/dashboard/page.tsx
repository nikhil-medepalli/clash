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
        <div className="flex space-x-5 space-y-4 items-center flex-wrap">
          {clashs.length > 0 && clashs.map((item, index) => <ClashCard clash={item} key={index} />)}
        </div>
    </div>
  )
}
export default dashboard