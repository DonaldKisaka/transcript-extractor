import Link from "next/link"
import { HomeIcon, FileIcon, LogInIcon } from "lucide-react"
import UserEmail from "./UserEmail"
import { Suspense } from "react"
import Navlink from "./Navlink"
import Image from "next/image"



const Navigation = () => {
  return (
      <aside className="fixed inset-y-0 left-0 w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col py-4 px-2 md:px-4">
        <div className="flex items-center justify-center md:justify-start mb-8 px-2">
          <Link href="/">
            <Image className="hidden md:inline" src="/transcript.png" alt="logo" width={30} height={30} />
          </Link>
        </div>

        <nav className="flex-1 flex flex-col space-y-1">
          <Navlink href="/dashboard" icon={<HomeIcon size={20} />} label="Dashboard" />
          <Navlink href="/dashboard/upload" icon={<FileIcon size={20} />} label="Upload" />
        </nav>

        <div className="pt-4 border-t border-gray-200">
          <Suspense 
             fallback={
              <Navlink 
                 href="/signin"
                 icon={<LogInIcon size={20} />}
                 label="Sign In"
              />
             }
          >
            <UserEmail />
          </Suspense>

        </div>
        </aside>      
  )
}

export default Navigation
