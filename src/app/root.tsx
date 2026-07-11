"use client"

import { useGetRoot } from "./hooks"

export default function Root() {
  const { data, isPending, isSuccess, error } = useGetRoot()

  if (!isPending && !isSuccess)
    return <div>something went wrong tho :/ {error.message}</div>

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-gray-900 sm:items-start">
        Hey :) <br /> Server said {JSON.stringify(data)}
      </main>
    </div>
  )
}
