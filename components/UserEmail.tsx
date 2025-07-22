import { createClient } from "@/lib/supabase/client";
import { UserIcon } from "lucide-react";
import SignOutButton from "./SignOutButton";



const UserEmail = async() => {
    const supabase = await createClient()

    const {
      data: { user }
    } = await supabase.auth.getUser()

  return (
    <div className="space-y-1">
        <div className="flex items-center justify-start px-2 py-2">
            <UserIcon size={20} className="mr-2 text-gray-500" />
            <span className="hidden md:inline text-sm text-black truncate">{user?.email}</span>
        </div>
        <SignOutButton />
    </div>
  )
}

export default UserEmail
