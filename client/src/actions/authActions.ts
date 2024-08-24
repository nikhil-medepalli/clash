"use server";

import {
  CHECK_CREDENTIALS_URL,
  FORGOT_PASSWORD_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
} from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

export async function registerAction(prevState: any, formdata: FormData) {
  try {
    const { data } = await axios.post(REGISTER_URL, {
      name: formdata.get("name"),
      email: formdata.get("email"),
      password: formdata.get("password"),
      confirm_password: formdata.get("confirm_password"),
    });
    return {
      status: 200,
      message:
        data?.message ??
        "Account created successfully. Please check your email to verify your account.",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.Please try again!",
      errors: {},
    };
  }
}

export async function loginAction(prevState: any, formdata: FormData) {
  try {
    const { data } = await axios.post(CHECK_CREDENTIALS_URL, {
      email: formdata.get("email"),
      password: formdata.get("password"),
    });
    return {
      status: 200,
      message: data?.message ?? "Logged in successfully.",
      errors: {},
      data: {
        email: formdata.get("email"),
        password: formdata.get("password"),
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
          data: {},
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.Please try again!",
      errors: {},
      data: {},
    };
  }
}

export async function forgotPasswordAction(prevState: any, formdata: FormData) {
  try {
    const { data } = await axios.post(FORGOT_PASSWORD_URL, {
      email: formdata.get("email"),
    });
    return {
      status: 200,
      message: data?.message ?? "Please check your email to reset your password.",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.Please try again!",
      errors: {},
    };
  }
}

export async function resetPasswordAction(prevState: any, formdata: FormData) {
  try {
    const { data } = await axios.post(RESET_PASSWORD_URL, {
      email: formdata.get("email"),
      password: formdata.get("password"),
      confirm_password: formdata.get("confirm_password"),
      token: formdata.get("token"),
    });
    return {
      status: 200,
      message:
        data?.message ??
        "Password reset successfully. Please login with your new password.",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.Please try again!",
      errors: {},
    };
  }
}