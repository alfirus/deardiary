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
				<header className="border-b">
					<div className="container mx-auto px-4 h-16 flex items-center justify-between">
						<Link href="/" className="font-bold">
							Alfirus
						</Link>
						<nav className="flex items-center gap-4">
							<ModeToggle />
							{user ? (
								<>
									<span className="text-muted-foreground">{user.email}</span>
									<form action="/auth/signout" method="post">
										<Button variant="outline" type="submit">
											Logout
										</Button>
									</form>
								</>
							) : (
								<Link href="/login">
									<Button>Login</Button>
								</Link>
							)}
						</nav>
					</div>
				</header>
				<main className="flex-1 container mx-auto px-4 py-8">{children}</main>
				<footer className="border-t py-6 text-center text-muted-foreground">© 2024 Blog App</footer>
			</div>
		);
}
