import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl px-10 py-5 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Login</h1>
        <p>Welcome back</p>
        <form>
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-4 underline text-blue-500 flex justify-end">
            <Link href="" className="font-semibold">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4">
            <Button className="w-full">Login</Button>
          </div>
        </form>
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
