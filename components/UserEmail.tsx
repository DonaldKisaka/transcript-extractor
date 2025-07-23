import { createClient } from "@/lib/supabase/client";
import { UserIcon } from "lucide-react";
import SignOutButton from "./SignOutButton";

const UserEmail = async() => {
    const supabase = await createClient()

    const {
      data: { user }
    } = await supabase.auth.getUser()

  return (
    <div className="space-y-2">
        <div className="flex items-center justify-start px-3 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <UserIcon size={18} className="mr-3 text-slate-400 flex-shrink-0" />
            <div className="hidden md:block min-w-0 flex-1">
                <span className="text-sm font-medium text-slate-800 truncate block leading-tight">
                    {user?.email}
                </span>
                <span className="text-xs text-slate-500 -mt-0.5 block">Free Plan</span>
            </div>
        </div>
        <SignOutButton />
    </div>
  )
}

export default UserEmail
