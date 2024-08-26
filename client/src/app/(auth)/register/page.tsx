import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Register from "@/components/auth/Register";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const register = async () => {
  const session = await getServerSession(authOptions)

  if(session){
    redirect("/dashboard")
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl px-10 py-5 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Register</h1>
        <p>Create you account</p>
        <Register />
        <p className="mt-4">
          Already have an account ?{" "}
          <Link href="/login" className="underline text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default register;
