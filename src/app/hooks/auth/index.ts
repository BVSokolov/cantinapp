import { treaty } from "@elysia/eden/treaty2"
import { useMutation } from "@tanstack/react-query"
import type { App } from "@/app/api/[[...slugs]]/route"

// import { authClient } from "lib/auth/client"

const client = treaty<App>("localhost:3000") // TODO change to use env var

type SignUpFormData = {
  userName: string
  email: string
  password: string
}

// TODO type this correctly
const useSignUpMutation = () =>
  useMutation({
    mutationFn: async (formData: SignUpFormData) => {
      const { status, data } =
        await client.api.v1.auth["sign-up"].post(formData)
      if (status !== 200 || !data) return "aw shucks, didn't work"
      return data.data
      // const { data } = await authClient.getSession();
      // if (data === null) {
      //   console.log("session token is null");
      //   return null;
      // }
      // fetch("https://localhost:3000/api/v1/auth/sign-up", {
      //   headers: { Authorization: `Bearer ${data.session.token}` },
      // });
      //
      // fetch("https://localhost:3000/api/v1/auth/sign-up", { // TODO fix this url
      //   body: {}
      // })
    },
    onSuccess: (result) => {
      console.log("mutation returns ", result)
    },
  })

export { useSignUpMutation }
