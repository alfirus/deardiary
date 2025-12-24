import { createClient } from "@/lib/supabase/server"
import PublicLayout from "@/components/public-layout"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("posts")
    .select("*, categories(name)")
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <PublicLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.id} className="group">
            <Card className="h-full transition-colors hover:bg-muted/50">
              {post.featured_image && (
                 <img src={post.featured_image} alt={post.title} className="w-full h-48 object-cover rounded-t-xl" />
              )}
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {post.categories?.name} • {new Date(post.created_at).toLocaleDateString()}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {posts?.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No posts found.
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
