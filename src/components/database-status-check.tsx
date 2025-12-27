import { createClient } from "@/lib/supabase/server"
import { DatabaseSetupInstructions } from "./database-setup-instructions"
import fs from 'fs'
import path from 'path'

export async function DatabaseStatusCheck() {
  const supabase = await createClient()

  // Try to fetch one profile to check if table exists
  // We use head: true and count: exact for minimal overhead, 
  // but just a simple select matching nothing is safer if RLS denies everything.
  // Actually, catching the error is the key.
  const { error } = await supabase
    .from("profiles")
    .select("id")
    .limit(1)

  // PGRST205 is "relation does not exist"
  const isMissing = error?.code === "PGRST205" || (error?.message && error.message.includes("does not exist"))

  if (!isMissing) {
    return null
  }

  // Load schema.sql
  const schemaPath = path.join(process.cwd(), 'schema.sql')
  let schemaSql = ""
  try {
     if (fs.existsSync(schemaPath)) {
        schemaSql = fs.readFileSync(schemaPath, 'utf8')
     } else {
        schemaSql = "-- schema.sql not found in project root"
     }
  } catch (e) {
     console.error("Failed to read schema.sql", e)
     schemaSql = "-- Error reading schema.sql"
  }

  // Append current user as admin
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin User'
    schemaSql += `
\n\n-- Make CURRENT user an admin immediately
INSERT INTO public.profiles (id, display_name, role)
VALUES ('${user.id}', '${displayName.replace(/'/g, "''")}', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
`
  }

  return <DatabaseSetupInstructions schemaSql={schemaSql} />
}
