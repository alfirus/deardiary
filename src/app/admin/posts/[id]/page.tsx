import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import PostForm from "@/components/post-form"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()

  const { data: categories } = await supabase
    .from("categories")
    .select("*")

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-bold mb-6">Edit Post</h1>
      <PostForm post={post} categories={categories || []} />
    </div>
  )
}
