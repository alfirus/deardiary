"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { MessageCircle } from "lucide-react"

type Comment = {
  id: number
  content: string
  created_at: string
  parent_id: number | null
  author_id: string
  profiles: {
    display_name: string
    avatar_url: string
  }
  children?: Comment[]
}

function CommentItem({ comment, onReply }: { comment: Comment, onReply: (id: number) => void }) {
  return (
    <div className="border-l-2 border-muted pl-4 py-2 my-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold">{comment.profiles?.display_name || "User"}</span>
        <span className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</span>
      </div>
      <p className="mb-2">{comment.content}</p>
      <Button variant="ghost" size="sm" onClick={() => onReply(comment.id)}>Reply</Button>

      {comment.children && comment.children.length > 0 && (
        <div className="ml-4">
          {comment.children.map(child => (
            <CommentItem key={child.id} comment={child} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Comments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState("")
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function fetchComments() {
      const { data } = await supabase
        .from("comments")
        .select("*, profiles(display_name, avatar_url)")
        .eq("post_id", postId)
        .order("created_at", { ascending: true })

      if (data) {
        // Build tree
        const map = new Map<number, Comment>()
        const roots: Comment[] = []

        data.forEach((c: any) => {
          c.children = []
          map.set(c.id, c)
        })

        data.forEach((c: any) => {
          if (c.parent_id) {
            map.get(c.parent_id)?.children?.push(c)
          } else {
            roots.push(c)
          }
        })

        setComments(roots)
      }
      setLoading(false)
    }

    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchComments()
    getUser()
  }, [postId, supabase])

  async function handleSubmit() {
    if (!content.trim()) return
    if (!user) {
      toast.error("Please login to comment")
      return
    }

    const { error } = await supabase
      .from("comments")
      .insert({
        content,
        post_id: postId,
        parent_id: replyTo,
        author_id: user.id
      })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Comment posted")
    setContent("")
    setReplyTo(null)
    router.refresh()
    // Ideally refetch comments locally or use realtime
    // For simplicity, reload window or refetch
    window.location.reload()
  }

  if (loading) return <div>Loading comments...</div>

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <MessageCircle /> Comments
      </h3>

      {!user ? (
        <div className="p-4 bg-muted rounded text-center mb-6">
          <p>Please <a href="/login" className="text-primary underline">login</a> to read or post comments.</p>
        </div>
      ) : (
        <>
           <div className="mb-8">
             {replyTo && (
               <div className="flex justify-between items-center mb-2 bg-muted p-2 rounded">
                 <span className="text-sm">Replying to comment #{replyTo}</span>
                 <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>Cancel</Button>
               </div>
             )}
             <Textarea
               placeholder="Write a comment..."
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="mb-2"
             />
             <Button onClick={handleSubmit}>Post Comment</Button>
           </div>

           <div>
             {comments.length === 0 ? (
               <p className="text-muted-foreground">No comments yet.</p>
             ) : (
               comments.map(comment => (
                 <CommentItem key={comment.id} comment={comment} onReply={setReplyTo} />
               ))
             )}
           </div>
        </>
      )}
    </div>
  )
}
