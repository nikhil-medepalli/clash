"use client";

import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { CLASH_ITEMS_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const AddClashItems = ({
  token,
  clashId,
}: {
  token: string;
  clashId: number;
}) => {
  const [items, setItems] = useState<Array<ClashItemForm>>([
    { image: null },
    { image: null },
  ]);

  const router = useRouter();
  const [urls, setUrls] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const imgRef1 = useRef<HTMLInputElement | null>(null);
  const imgRef2 = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedItems = [...items];
      updatedItems[index].image = file;
      setItems(updatedItems);
      const imageUrl = URL.createObjectURL(file);
      const updatedUrls = [...urls];
      updatedUrls[index] = imageUrl;
      setUrls(updatedUrls);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", clashId.toString());
      items.map((item) => {
        if (item.image) {
          formData.append("images[]", item.image);
        }
      });
      if (formData.get("images[]")) {
        setLoading(true);
        const {data} = await axios.post(CLASH_ITEMS_URL, formData, {
          headers: {
            Authorization: token,
          },
        });
        if(data?.message){
          toast.success(data?.message);
          setTimeout(() => {
            router.push("/dashboard")
          }, 1000)
        }
        setLoading(false);
      } else {
        toast.error("Please upload both images");
      }
    } catch (error) {
      setLoading(false);
      if(error instanceof AxiosError){
        if(error.response?.status === 422){
          if(error?.response?.data?.errors){
            error?.response?.data?.errors?.map((err: string) => {
              toast.error(err);
            })
          }
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {/* first block */}
        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          <input
            type="file"
            className="hidden"
            ref={imgRef1}
            onChange={(e) => handleImageChange(e, 0)}
          />
          <div
            className="w-full flex justify-center items-center rounded-md border-4 border-dashed p-2 h-[300px] cursor-pointer"
            onClick={() => imgRef1?.current?.click()}
          >
            {urls.length > 0 && urls?.[0] !== "" ? (
              <Image
                src={urls?.[0]}
                alt="preview_1"
                width={500}
                height={500}
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex items-center space-x-2 text-xl">
                <Upload /> <span>Upload file</span>
              </h1>
            )}
          </div>
        </div>

        {/* vs block */}
        <div className="w-full flex lg:w-auto justify-center items-center">
          <h1 className="text-6xl font-extrabold bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-transparent">
            VS
          </h1>
        </div>

        {/* second block */}
        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          <input
            type="file"
            className="hidden"
            ref={imgRef2}
            onChange={(e) => handleImageChange(e, 1)}
          />
          <div
            className="w-full flex justify-center items-center rounded-md border-4 border-dashed p-2 h-[300px] cursor-pointer"
            onClick={() => imgRef2?.current?.click()}
          >
            {urls.length > 0 && urls?.[1] !== "" ? (
              <Image
                src={urls?.[1]}
                alt="preview_1"
                width={500}
                height={500}
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex items-center space-x-2 text-xl">
                <Upload /> <span>Upload file</span>
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Button className="w-52" onClick={handleSubmit} disabled={loading}>{loading ? "Loading..." : "Create"}</Button>
      </div>
    </div>
  );
};
export default AddClashItems;
