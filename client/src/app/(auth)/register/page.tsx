import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl px-10 py-5 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Register</h1>
        <p>Create you account</p>
        <form>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
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
          <div className="mt-4">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
            />
          </div>
          <div className="mt-4">
            <Button className="w-full">Register</Button>
          </div>
        </form>
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
