import { createClient } from "@/lib/supabase/server"
import CategoriesClient from "./client"

export default async function CategoriesPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from("categories").select("*").order("id")

  return <CategoriesClient categories={categories || []} />
}
