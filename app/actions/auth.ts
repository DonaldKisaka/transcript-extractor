'use server'

import { redirect } from "next/navigation"
import { z } from "zod"
import { createClient } from '@/lib/supabase/server'

const SignInSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'), 
    password: z.string().min(1, 'Password is required'),
})

const SignUpSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
})
.refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

export type SignInData = z.infer<typeof SignInSchema>
export type SignUpData = z.infer<typeof SignUpSchema>

export type ActionResponse = {
    success: boolean
    message: string
    errors?: Record<string, string[]>
    error?: string
}

export const signIn = async (formData: FormData): Promise<ActionResponse> => {
    try {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const validationResult = SignInSchema.safeParse(data)

        if (!validationResult.success) {
            return {
                success: false,
                message: 'Validation failed',
                errors: validationResult.error.flatten().fieldErrors,
            }
        }

        const supabase = await createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        if (error) {
            return {
                success: false,
                message: 'Invalid email or password',
                errors: {
                    email: ['Invalid email or password'],
                },
            }
        }

        return {
            success: true,
            message: 'Sign in successful',
        }
        
    } catch (e) {
        console.error(e)
        return {
            success: false,
            message: 'An error occurred',
            error: 'An error occurred',
        }
    }
}

export const signUp = async (formData: FormData): Promise<ActionResponse> => {
    try {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        }

        const validationResult = SignUpSchema.safeParse(data)

        if (!validationResult.success) {
            return {
                success: false,
                message: 'Validation failed',
                errors: validationResult.error.flatten().fieldErrors,
            }
        }

        const supabase = await createClient()

        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard`
            }
        })

        if (error) {
            if (error.message.includes('already registered')) {
                return {
                    success: false,
                    message: 'User already exists',
                    errors: {
                        email: ['User already exists'],
                    },
                }
            }
            
            return {
                success: false,
                message: error.message,
                error: error.message,
            }
        }

        return {
            success: true,
            message: 'Account created successfully',
        }

    } catch (e) {
        console.error(e)
        return {
            success: false,
            message: 'An error occurred',
        }
    }
}

export const signOut = async () => {
    try {
        const supabase = await createClient()
        await supabase.auth.signOut()
    } catch (e) {
        console.error(e)
        throw e
    } finally {
        redirect('/signin')
    }
}

