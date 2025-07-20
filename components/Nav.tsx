import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"


const Nav = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white py-2">
        <div className="container mx-auto px-4 flex gap-10 items-center">
            <Link href="/">
               <Image src="/transcript.png" alt="Transcripts Extractor" width={50} height={50}/>
            </Link>

            <div className="flex gap-10 items-center">
                <Link href='#howitworks' className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    How it works
                </Link>
                <Link href='#features' className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    Features
                </Link>
                <Link href='#use-cases' className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    Use Cases
                </Link>
                <Link href='#faq' className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    FAQ
                </Link>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center space-x-4">
                  <Link href='/signin'>
                     <Button variant="outline" className="cursor-pointer">
                        Sign in 
                     </Button>
                 </Link>

                 <Link href='/signup'>
                    <Button variant="outline" className="bg-black text-white cursor-pointer">
                        Sign up
                    </Button>
                </Link>
                </div>
            </div>
 
        </div>

    </nav>
  )
}

export default Nav;
