import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
}


const Navlink = ({ href, icon, label, isActive }: NavLinkProps) => {
  return (
    <>
        <Link href={href} className={cn(
            "flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700",
            isActive ? "bg-gray-100 text-gray-700" : "text-gray-500"
        )}>
            <span className="text-gray-500 mr-3">{icon}</span>
            <span className="hidden md:inline">{label}</span>
        </Link>
    </>
  )
}

export default Navlink;
