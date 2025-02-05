import { getCurrentSession, loginUser, registerUser } from '@/actions/auth'
import SignUp from '@/components/auth/SignUp'
import { redirect } from 'next/navigation'
import React from 'react'
import { z } from 'zod'

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

const SignUpPage = async () => {
    const { user } = await getCurrentSession();
    if (user) {
        redirect("/")
    };

    const action = async (prevState: { message: string } | undefined, formData: FormData) => {
        "use server";
        const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
        if (!parsed.success) {
            return {
                message: "Invalid form data",
            };
        }

        const { email, password } = parsed.data;
        const { user, error } = await registerUser(email, password);

        if (error) {
            return { message: error.toString() };
        } else if(user) {
            await loginUser(email, password);
            return redirect("/");
        }
    }
  return (
    <SignUp action={action} />
  )
}

export default SignUpPage