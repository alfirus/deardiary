import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminProfileEditPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm
            initialData={{
              display_name: profile?.display_name || user.user_metadata?.full_name || "",
              avatar_url: profile?.avatar_url || "",
              facebook_url: profile?.facebook_url || "",
              twitter_url: profile?.twitter_url || "",
              github_url: profile?.github_url || "",
              telegram_username: profile?.telegram_username || "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
