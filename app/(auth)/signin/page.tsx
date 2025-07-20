'use client'

import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { signIn, ActionResponse } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Form, FormGroup, FormLabel, FormInput, FormError } from '@/components/ui/Form'
import toast from 'react-hot-toast'
import Link from 'next/link'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function SignInPage() {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signIn(formData)

      if (result.success) {
        toast.success('Signed in successfully')
        router.push('/dashboard')
        router.refresh()
      }

      return result
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <Form action={formAction} className='space-y-6'>
          {state?.message && !state.success && (
            <FormError>
              {state.message}
            </FormError>
          )}

          <FormGroup>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <FormInput 
               id='email'
               name='email'
               type='email'
               autoComplete='email'
               required
               disabled={isPending}
               aria-describedby='email-error'
               className={state?.errors?.email ? 'border-red-500' : ''} />
               {state?.errors?.email && (
                <p id='email-error' className='text-red-500 text-sm'>
                  {state.errors.email[0]}
                </p>
               )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <FormInput 
               id='password'
               name='password'
               type='password'
               autoComplete='current-password'
               required
               disabled={isPending}
               aria-describedby='password-error'
               className={state?.errors?.password ? 'border-red-500' : ''} />
               {state?.errors?.password && (
                <p id='password-error' className='text-red-500 text-sm'>
                  {state.errors.password[0]}
                </p>
               )}
          </FormGroup>

          <div>
            <Button type='submit' disabled={isPending} className='w-full'>
              Sign in
            </Button>
          </div>
          </Form>

          <div className='mt-6'>
            <p className='text-center text-sm text-gray-600'>
              Don&apos;t have an account?{' '}
              <Link href='/signup' className='font-medium text-indigo-600 hover:text-indigo-500'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
