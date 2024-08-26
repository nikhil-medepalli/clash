import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Login from "@/components/auth/Login";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const login = async () => {
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
        <h1 className="text-3xl font-bold">Login</h1>
        <p>Welcome back</p>
        <Login />
        <p className="mt-4">
          Don't have an account ?{" "}
          <Link
            href="/register"
            className="underline text-blue-500 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default login;
