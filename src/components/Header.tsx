import { Link } from "@tanstack/react-router"
import {
	Drawer,
	// DrawerClose,
	DrawerContent,
	// DrawerDescription,
	// DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import BetterAuthHeader from "../integrations/better-auth/header-user.tsx"
import ThemeToggle from "./ThemeToggle"
import { Button } from "./ui/button.tsx"

export default function Header() {
	return (
		<header className="border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
			<nav className="flex flex-wrap h-full items-center gap-x-3 gap-y-2">
				<h2 className="m-0 flex shrink-0 text-base font-semibold">
					<Link
						to="/"
						className="inline-flex items-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
					>
						<span className="w-auto" />
						Can'tinapp
					</Link>
				</h2>

				<div className="ml-auto flex shrink gap-1.5 sm:gap-2">
					<BetterAuthHeader className="flex" profile={false} />
					<ThemeToggle />
					{/*<Button className="header-button">#</Button>*/}
					<Drawer swipeDirection="right">
						<DrawerTrigger render={<Button className="header-button" />}>
							#
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Navigation</DrawerTitle>
								{/*<DrawerDescription>
									This action cannot be undone.
								</DrawerDescription>*/}
							</DrawerHeader>
							<div className="p-4">
								{/* Content here */}
								<div className="flex flex-col w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
									<Link
										to="/"
										className="nav-link"
										activeProps={{ className: "nav-link is-active" }}
									>
										Home
									</Link>
									<Link
										to="/about"
										className="nav-link"
										activeProps={{ className: "nav-link is-active" }}
									>
										About
									</Link>
									<div className="relative w-full sm:w-auto">
										<p className="nav-link list-none cursor-pointer">Demos</p>
										<a
											href="/demo/better-auth"
											className="block rounded-lg px-3 py-2 text-sm text-[var(--sea-ink-soft)] no-underline transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
										>
											Better Auth
										</a>
										<a
											href="/demo/tanstack-query"
											className="block rounded-lg px-3 py-2 text-sm text-[var(--sea-ink-soft)] no-underline transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
										>
											TanStack Query
										</a>
										<a
											href="/demo/neon"
											className="block rounded-lg px-3 py-2 text-sm text-[var(--sea-ink-soft)] no-underline transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
										>
											Neon
										</a>
										<a
											href="/demo/form/simple"
											className="block rounded-lg px-3 py-2 text-sm text-[var(--sea-ink-soft)] no-underline transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
										>
											Simple Form
										</a>
										<a
											href="/demo/form/address"
											className="block rounded-lg px-3 py-2 text-sm text-[var(--sea-ink-soft)] no-underline transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
										>
											Address Form
										</a>
									</div>
								</div>
							</div>
							{/*<DrawerFooter>
								<Button>Submit</Button>
								<DrawerClose render={<Button variant="outline" />}>
									Cancel
								</DrawerClose>
							</DrawerFooter>*/}
						</DrawerContent>
					</Drawer>
				</div>
			</nav>
		</header>
	)
}
