"use client"

import { LogOutIcon } from "lucide-react";
import { useTransition } from "react";
import { signOut } from "@/app/actions/auth";

export default function SignOutButton() {
    const [isPending, startTransition] = useTransition();

    const handleSignOut = () => {
        startTransition(async () => {
            await signOut();
        });
    };

    return (
        <button onClick={handleSignOut} disabled={isPending} className="flex items-center w-full px-2 py-2 gap-2 text-sm text-gray-500 hover:text-gray-700">
            <LogOutIcon size={20} className="mr-2" />
            <span>{isPending ? "Signing out..." : "Sign Out"}</span>
        </button>
    )

    
}