import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-4'>
      <Image src="/not_found.svg" alt='not_found' width={600} height={600}/>
      <Button className='font-semibold text-white underline bg-blue-500' variant="ghost">Return Home</Button>
    </div>
  )
}