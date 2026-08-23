import { RedirectToSignIn, SignedIn, UserButton } from "@neondatabase/auth-ui"
import { createFileRoute } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"

export const Route = createFileRoute("/")({
	component: Home,
})

function Home() {
	const { data } = authClient.useSession()

	return (
		<>
			<SignedIn>
				<div>
					<div className="text-center">
						<h1>Welcome!</h1>
						<p>You're successfully authenticated.</p>
						<UserButton />
						<p className="font-medium text-gray-700 dark:text-gray-200 mt-4">
							Session and User Data:
						</p>
						<pre className="overflow-y-scroll h-full bg-gray-900 p-4 rounded-lg  whitespace-pre-wrap break-words w-full max-w-full sm:max-w-2xl mx-auto ">
							<code className=" text-gray-100 text-sm text-left">
								{JSON.stringify(
									{ session: data?.session, user: data?.user },
									null,
									2,
								)}
							</code>
						</pre>
					</div>
				</div>
			</SignedIn>
			<RedirectToSignIn />
		</>
	)
}
