import Hero from "@/components/base/Hero"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/options"

const App = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <Hero />
    </div>
  )
}
export default App