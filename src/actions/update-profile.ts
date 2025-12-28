"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const profileSchema = z.object({
  display_name: z.string().min(1, "Display name is required"),
  avatar_url: z.string().optional(),
  facebook_url: z.string().url("Invalid Facebook URL").optional().or(z.literal("")),
  twitter_url: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
  github_url: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  telegram_username: z.string().optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export async function updateProfile(data: ProfileFormValues) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const result = profileSchema.safeParse(data)

  if (!result.success) {
    return { error: "Invalid data" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: data.display_name,
      avatar_url: data.avatar_url,
      facebook_url: data.facebook_url,
      twitter_url: data.twitter_url,
      github_url: data.github_url,
      telegram_username: data.telegram_username,
    })
    .eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/profile/edit")
  revalidatePath("/admin")
  return { success: true }
}
