import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="">
        <Image
          src="/banner_img.svg"
          alt="banner_img"
          width={500}
          height={500}
        />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-transparent">Clash</h1>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Get the better choice, together</p>
        <Link href="/login">
            <Button className="mt-2">Start free</Button>
        </Link>
      </div>
    </div>
  );
};
export default Hero;
