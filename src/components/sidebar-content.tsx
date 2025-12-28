"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Category {
  id: number
  name: string
  slug: string
  created_at: string
}

interface SidebarData {
  categories: Category[]
}

interface SidebarContentProps {
  content: SidebarData
  onCategoryClick?: () => void
  className?: string
}

export function SidebarContent({ content, onCategoryClick, className }: SidebarContentProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {/* Profile Card */}
      <Card>
        <CardHeader>Profile</CardHeader>
        <CardContent>Test</CardContent>
      </Card>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="flex flex-col gap-4">
          {content.categories?.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug || "#"}`}
              className="block hover:underline underline-offset-4 decoration-primary/50"
              onClick={onCategoryClick}
            >
              {category.name}
            </Link>
          ))}
          {content.categories?.length === 0 && (
            <div className="text-muted-foreground">No categories found.</div>
          )}
        </div>
      </div>
    </div>
  )
}
