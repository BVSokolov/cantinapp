"use server"

import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/server"

// TODO this is defined in two different places now, fix
type SignUpFormData = {
  userName: string
  email: string
  password: string
}
export async function signUpWithEmail(
  // _prevState: { error: string } | null,
  formData: SignUpFormData,
) {
  const email = formData.email

  if (!email) {
    return { error: "Email address must be provided." }
  }

  // Optionally restrict sign ups based on email address
  // if (!email.trim().endsWith("@my-company.com")) {
  //  return { error: 'Email must be from my-company.com' };
  // }

  console.log("ok sending email")
  const { error, data } = await auth.signUp.email({
    email,
    name: formData.userName,
    password: formData.password,
  })
  console.log("sent, is there error? ", error)
  if (error) {
    console.log("Error creating user ", error)
  }

  return { error, data }

  // redirect("/home");
}
