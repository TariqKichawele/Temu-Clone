import { getCurrentSession, loginUser } from '@/actions/auth'
import SignIn from '@/components/auth/SignIn'
import { redirect } from 'next/navigation'
import React from 'react'
import { z } from 'zod'

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

const SignInPage = async () => {
    const { user } = await getCurrentSession();
    if (user) {
        return redirect("/")
    }

    const action = async (prevState: { message: string } | undefined, formData: FormData) => {
        'use server';
        const parsed = signInSchema.safeParse(Object.fromEntries(formData));
        if (!parsed.success) {
            return {
                message: "Invalid email or password",
            }
        }

        const { email, password } = parsed.data;
        const { user, error } = await loginUser(email, password);
        if (error) {
            return {
                message: error,
            }
        } else if (user) {
            return redirect("/")
        }    
    }

  return (
    <SignIn action={action} />
  )
}

export default SignInPage