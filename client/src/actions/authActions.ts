"use server"

import { REGISTER_URL } from "@/lib/apiEndPoints"
import axios, { AxiosError } from "axios"

export async function registerAction(prevState: any, formdata: FormData){
    console.log(formdata)
    try {
        await axios.post(REGISTER_URL, {
            name: formdata.get("name"),
            email: formdata.get("email"),
            password: formdata.get("password"),
            confirm_password: formdata.get("confirm_password")
        })
        return {
            status: 200,
            message: "Account created successfully. Please check your email to verify your account."
        }
    } catch (error) {
        if(error instanceof AxiosError){
            if(error.response?.status === 422){
                return {
                    status: 422,
                    message: error.response?.data?.message,
                    errors: error.response?.data?.errors
                }
            }
        }
        return {
            status: 500,
            message: "Something went wrong.Please try again!",
            errors: {}
        }
    }
}