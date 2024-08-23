"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitBtn } from "../common/SubmitBtn";
import { useFormState } from "react-dom";
import { loginAction } from "@/actions/authActions";
import { useEffect } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const Login = () => {

    const initState = {
        status: 0,
        message: "",
        errors: {},
        data:{}
    }

    const [state, formAction] = useFormState(loginAction, initState)
    
    useEffect(() => {
        if (state.status === 500) {
          toast.error(state.message);
        } else if (state.status === 200) {
          toast.success(state.message);
          signIn("credentials", {
              email: state.data?.email,
              password: state.data?.password,
              redirect: true,
              callbackUrl: "/dashboard"
          })
        }
      }, [state]);

  return (
    <form action={formAction}>
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <span className="text-red-500">{state.errors?.email}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <span className="text-red-500">{state.errors?.password}</span>
          </div>
          <div className="mt-4 underline text-blue-500 flex justify-end">
            <Link href="" className="font-semibold">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4">
            <SubmitBtn />
          </div>
        </form>
  )
}
export default Login