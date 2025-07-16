'use client'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/signin')
  }

  const signInWithEmail = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  }

  const signUpWithEmail = async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password })
  }

  const signInWithProvider = async (provider: 'google' | 'github') => {
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
  }

  return {
    session,
    user: session?.user,
    signOut,
    signInWithEmail,
    signUpWithEmail,
    signInWithProvider,
    isLoading: !session && typeof window !== 'undefined'
  }
} 