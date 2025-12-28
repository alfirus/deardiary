import { SidebarContent } from "@/components/sidebar-content"

interface Category {
  id: number
  name: string
  slug: string
  created_at: string
}

interface SidebarData {
  categories: Category[]
}

interface SidebarProps {
  content: SidebarData
}

export function Sidebar({ content }: SidebarProps) {
  return (
    <section className="hidden md:flex flex-col">
      <SidebarContent content={content} />
    </section>
  )
}
