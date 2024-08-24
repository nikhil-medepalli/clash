import ForgotPassword from "@/components/auth/ForgotPassword"

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[550px] bg-white rounded-xl px-10 py-5 shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p>Please enter your email</p>
        <ForgotPassword />
        
      </div>
    </div>
  )
}
export default page