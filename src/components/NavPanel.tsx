import { Link } from '@tanstack/react-router'
import React from 'react'
import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  // DrawerDescription,
  // DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from './ui/button.tsx'

export const NavPanel = () => {
  const [open, setOpen] = React.useState(false)
  const onClickLink = () => setOpen(false)

  return (
    <Drawer swipeDirection="right" open={open} onOpenChange={setOpen}>
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
              activeProps={{ className: 'nav-link is-active' }}
              onClick={onClickLink}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
              onClick={onClickLink}
            >
              About
            </Link>
            <Link
              to="/meal/create"
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
              onClick={onClickLink}
            >
              Create Meal
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
  )
}
