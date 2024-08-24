"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitBtn } from "../common/SubmitBtn";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { forgotPasswordAction } from "@/actions/authActions";

const ForgotPassword = () => {

    const initState = {
        status: 0,
        message: "",
        errors: {},
    }

    const [state, formAction] = useFormState(forgotPasswordAction, initState)
    
    useEffect(() => {
        if (state.status === 500) {
          toast.error(state.message);
        } else if (state.status === 200) {
          toast.success(state.message);
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
            <SubmitBtn />
          </div>
        </form>
  )
}
export default ForgotPassword