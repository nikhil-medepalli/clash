"use client"

import { Upload } from "lucide-react"
import { Button } from "../ui/button"

const AddClashItems = ({token, clashId}: {token: string, clashId: number}) => {
  return (
    <div className="mt-10">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
            {/* first block */}
            <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                <div className="w-full flex justify-center items-center rounded-md border-4 border-dashed p-2 h-[300px] cursor-pointer">
                    <h1 className="flex items-center space-x-2 text-xl cursor-pointer">
                        <Upload /> <span>Upload file</span>
                    </h1>
                </div>
            </div>

            {/* vs block */}
            <div className="w-full flex lg:w-auto justify-center items-center">
            <h1 className="text-6xl font-extrabold bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-transparent">VS</h1>
            </div>
            
            {/* second block */}
            <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                <div className="w-full flex justify-center items-center rounded-md border-4 border-dashed p-2 h-[300px] cursor-pointer">
                    <h1 className="flex items-center space-x-2 text-xl">
                        <Upload /> <span>Upload file</span>
                    </h1>
                </div>
            </div>
        </div>

        <div className="text-center mt-4">
            <Button className="w-52">Create</Button>
        </div>
    </div>
  )
}
export default AddClashItems