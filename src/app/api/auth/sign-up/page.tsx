"use client"

import type { ButtonProps } from "@base-ui/react/button"
import {
  type AnyFieldApi,
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form"
import { z } from "zod"
import { useSignUpMutation } from "@/app/hooks/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const SubmitButton = ({ className, ...props }: ButtonProps) => (
  <Button className={className} type="submit" {...props}>
    Submit brev
  </Button>
)
const FormFieldLabelled = ({
  field,
  label,
  ...props
}: React.ComponentProps<"input"> & {
  field: AnyFieldApi
  label?: string
}) => (
  <Field>
    {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
    <Input
      id={field.name}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      {...props}
    />
  </Field>
)

const { fieldContext, formContext } = createFormHookContexts()
const { useAppForm } = createFormHook({
  fieldComponents: {
    FormFieldLabelled,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})

const formDataSchema = z.object({
  userName: z.string(),
  email: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
})

// type FormData = z.infer<typeof formDataSchema>

export default function SignUpForm() {
  const signUpMutation = useSignUpMutation()
  const form = useAppForm({
    validators: {
      onChange: ({ value }) => {
        console.log("got value ", value)
        formDataSchema.parse(value)
      },
    },
    defaultValues: {
      userName: "asd",
      email: "asd@asd.asd",
      password: "123Aabc_Gk!",
      passwordConfirm: "",
    },
    onSubmit: ({ value: formData }) => signUpMutation.mutate(formData),
  })
  // const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <form
      className="flex flex-col gap-5 min-h-screen items-center justify-center bg-gray-900"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <h1 className="text-2xl text-stone-300">Sign Up</h1>
      <Card className="w-full max-w-1/4">
        <CardHeader>
          <CardTitle>Create your free account</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <form.AppField
                name="userName"
                children={(field) => (
                  <field.FormFieldLabelled
                    field={field}
                    label="Select a username"
                  />
                )}
              />
              <form.AppField
                name="email"
                children={(field) => (
                  <field.FormFieldLabelled
                    field={field}
                    label="Type in your email"
                  />
                )}
              />
              <form.AppField
                name="password"
                children={(field) => (
                  <field.FormFieldLabelled
                    field={field}
                    label="Choose a stronk password"
                    type="password"
                  />
                )}
              />
              <form.AppField
                name="passwordConfirm"
                children={(field) => (
                  <field.FormFieldLabelled
                    field={field}
                    label="Confirm the stronk password"
                    type="password"
                  />
                )}
              />
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-center">
          <form.AppForm>
            <form.SubmitButton />
          </form.AppForm>
        </CardFooter>
      </Card>
    </form>
    // <form action={formAction}

    //   {state?.error && (
    //     <div className="rounded-md px-3 py-2 text-sm text-red-500">
    //       {state.error}
    //     </div>
    //   )}

    //   <button type="submit" disabled={isPending}
    //     className="flex w-sm justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400">
    //     {isPending ? 'Creating account...' : 'Create Account'}
    //   </button>
    // </form>
  )
}
