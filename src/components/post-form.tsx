"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

const postSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  category_id: z.string().optional(),
  featured_image: z.string().optional(),
  published: z.boolean().default(false).optional(),
})

interface PostFormProps {
  post?: any;
  categories: any[];
  onSuccess?: () => void;
}

export default function PostForm({ post, categories, onSuccess }: PostFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      category_id: post?.category_id ? String(post.category_id) : undefined,
      featured_image: post?.featured_image || "",
      published: post?.published || false,
    },
  })

  async function onSubmit(values: z.infer<typeof postSchema>) {
    const { data: { user } } = await supabase.auth.getUser()

    let error;

    if (post) {
      const { error: updateError } = await supabase
        .from("posts")
        .update({
          ...values,
          category_id: values.category_id ? parseInt(values.category_id) : null,
        })
        .eq("id", post.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase
        .from("posts")
        .insert({
          ...values,
          category_id: values.category_id ? parseInt(values.category_id) : null,
          author_id: user?.id
        })
      error = insertError
    }

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success(post ? "Post updated" : "Post created")
    if (onSuccess) onSuccess()
    router.refresh()
    if (post) router.push("/admin/posts")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    if (!post) { // Only auto-generate slug for new posts
                        const slug = e.target.value
                            .toLowerCase()
                            .replace(/ /g, '-')
                            .replace(/[^\w-]+/g, '');
                        form.setValue('slug', slug);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                        <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                        <Editor initialContent={field.value} onChange={(value) => field.onChange(value)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>Published</FormLabel>
                    </div>
                </FormItem>
            )}
        />
        <Button type="submit">{post ? "Update Post" : "Create Post"}</Button>
      </form>
    </Form>
  )
}
