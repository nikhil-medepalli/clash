import ForgotPassword from "@/components/auth/ForgotPassword"
import ResetPassword from "@/components/auth/ResetPassword"

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl px-10 py-5 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p>Please enter your email and your new Password</p>
        <ResetPassword />
        
      </div>
    </div>
  )
}
export default page