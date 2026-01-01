import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
			<div className="min-h-screen flex flex-col">
				<header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="container mx-auto px-4 h-14 flex items-center justify-between">
						<Link href="/" className="font-bold text-lg">
							Alfirus
						</Link>
						<nav className="flex items-center gap-4">
							<ModeToggle />
							{user ? (
								<>
									<span className="text-muted-foreground text-sm hidden md:inline">{user.email}</span>
									<form action="/auth/signout" method="post">
										<Button variant="outline" type="submit" size="sm">
											Logout
										</Button>
									</form>
								</>
							) : (
								<Link href="/login">
									<Button size="sm">Login</Button>
								</Link>
							)}
						</nav>
					</div>
				</header>
				<main className="flex-1">{children}</main>
				<footer className="border-t py-4 text-center text-sm text-muted-foreground bg-muted/30">© {new Date().getFullYear()} Alfirus. Built with Next.js & Tailwind CSS.</footer>
			</div>
		);
}
