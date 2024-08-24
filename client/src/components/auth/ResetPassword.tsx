"use client";

import { registerAction, resetPasswordAction } from "@/actions/authActions";
import { SubmitBtn } from "@/components/common/SubmitBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPassword = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useFormState(resetPasswordAction, initState);
  const sParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      setTimeout(() => {
          router.replace("/login");
      }, 1000)
    }
  }, [state]);

  return (
    <form action={formAction}>
        <input type="hidden" name="token" value={sParams.get("token") ?? ""} />
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
        //   placeholder="Enter your email"
          readOnly
          value={sParams.get("email") || ""}
        />
        <span className="text-red-500">{state.errors?.email}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="password">New Password</Label>
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
  );
};
export default ResetPassword;
