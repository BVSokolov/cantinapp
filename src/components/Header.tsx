import { Link } from '@tanstack/react-router'
import BetterAuthHeader from '../integrations/better-auth/header-user.tsx'
import { NavPanel } from './NavPanel.tsx'
import ThemeToggle from './ThemeToggle'

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
          <NavPanel />
        </div>
      </nav>
    </header>
  )
}
