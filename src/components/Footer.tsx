export default function Footer() {
	const year = new Date().getFullYear()

	return (
		<footer className="border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)] site-footer">
			<div className="h-full flex justify-around items-center text-center">
				<p className="m-0 text-sm">
					&copy; {year} Branimir Sokolov. All rights reserved.
				</p>
			</div>
		</footer>
	)
}
