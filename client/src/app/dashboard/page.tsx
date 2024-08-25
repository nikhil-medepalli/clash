import Navbar from "@/components/base/Navbar"
import { authOptions } from "../../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import AddClash from "@/components/clash/AddClash";

const dashboard = async () => {
    const data = JSON.stringify(await getServerSession(authOptions)).split(",")
    const name = data[1].split(":")[1].split('"')[1]
  return (
    <div className="container">
        <Navbar name={name}/>
        <div className="flex justify-end mt-10">
          <AddClash />
        </div>
    </div>
  )
}
export default dashboard