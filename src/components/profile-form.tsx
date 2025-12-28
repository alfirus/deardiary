"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateProfile } from "@/actions/update-profile"

const profileSchema = z.object({
  display_name: z.string().min(1, "Display name is required"),
  avatar_url: z.string().optional(),
  facebook_url: z.string().url("Invalid Facebook URL").optional().or(z.literal("")),
  twitter_url: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
  github_url: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  telegram_username: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
  initialData: {
    display_name: string
    avatar_url?: string
    facebook_url?: string
    twitter_url?: string
    github_url?: string
    telegram_username?: string
  }
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: initialData.display_name || "",
      avatar_url: initialData.avatar_url || "",
      facebook_url: initialData.facebook_url || "",
      twitter_url: initialData.twitter_url || "",
      github_url: initialData.github_url || "",
      telegram_username: initialData.telegram_username || "",
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true)
    try {
      const result = await updateProfile(data)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Profile updated successfully")
        router.refresh()
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/avatar.png" {...field} />
              </FormControl>
              <FormDescription>
                A link to your profile picture.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 md:grid-cols-2">
			<FormField
			control={form.control}
			name="facebook_url"
			render={({ field }) => (
				<FormItem>
				<FormLabel>Facebook URL</FormLabel>
				<FormControl>
					<Input placeholder="https://facebook.com/username" {...field} />
				</FormControl>
				<FormMessage />
				</FormItem>
			)}
			/>
			<FormField
			control={form.control}
			name="twitter_url"
			render={({ field }) => (
				<FormItem>
				<FormLabel>Twitter URL</FormLabel>
				<FormControl>
					<Input placeholder="https://twitter.com/username" {...field} />
				</FormControl>
				<FormMessage />
				</FormItem>
			)}
			/>
			<FormField
			control={form.control}
			name="github_url"
			render={({ field }) => (
				<FormItem>
				<FormLabel>GitHub URL</FormLabel>
				<FormControl>
					<Input placeholder="https://github.com/username" {...field} />
				</FormControl>
				<FormMessage />
				</FormItem>
			)}
			/>
			<FormField
			control={form.control}
			name="telegram_username"
			render={({ field }) => (
				<FormItem>
				<FormLabel>Telegram Username</FormLabel>
				<FormControl>
					<Input placeholder="username" {...field} />
				</FormControl>
				<FormMessage />
				</FormItem>
			)}
			/>
		</div>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
}
