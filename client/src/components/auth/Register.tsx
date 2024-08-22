"use client"

import { registerAction } from "@/actions/authActions";
import { SubmitBtn } from "@/components/common/SubmitBtn"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const Register = () => {

    const initState = {
        status: 0,
        message: "",
        errors: {}
    }

    const [state, formAction] = useFormState(registerAction, initState)

    useEffect(() => {
        if(state.status === 500){
            toast.error(state.message)
        } else if(state.status === 200){
            toast.success(state.message)
        }
    }, [state]
    )
    
  return (
    <form action={formAction}>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
            <span className="text-red-500">{state.errors?.name}</span>
          </div>
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
          <div className="mt-4">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirm_password"
              placeholder="Confirm your password"
            />
            <span className="text-red-500">{state.errors?.confirm_password}</span>
          </div>
          <div className="mt-4">
            <SubmitBtn />
          </div>
        </form>
  )
}
export default Register