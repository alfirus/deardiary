import { createClient } from "@/lib/supabase/server"
import PostsClient from "./client"

export default async function PostsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false })
  const { data: categories } = await supabase.from("categories").select("*")

  return <PostsClient posts={posts || []} categories={categories || []} />
}
