import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  return (
			<div className="flex min-h-screen">
				<aside className="w-64 bg-muted p-6 hidden md:block border-r">
					<div className="mb-6">
						<h2 className="font-bold">Admin Dashboard</h2>
					</div>
					<nav className="space-y-2">
						<a href="/admin/categories" className="block p-2 hover:bg-background rounded">
							Categories
						</a>
						<a href="/admin/posts" className="block p-2 hover:bg-background rounded">
							Posts
						</a>

						<a href="/admin/media" className="block p-2 hover:bg-background rounded">
							Media
						</a>
						<a href="/" className="block p-2 mt-4 hover:bg-background rounded text-muted-foreground">
							Back to Site
						</a>
					</nav>
				</aside>
				<main className="flex-1 p-8">{children}</main>
			</div>
		);
}
