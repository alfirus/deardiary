import { createClient } from "@/lib/supabase/server"
import MediaClient from "./client"

export default async function MediaPage() {
  const supabase = await createClient()
  const { data: media } = await supabase.from("media").select("*").order("created_at", { ascending: false })

  return <MediaClient media={media || []} />
}
