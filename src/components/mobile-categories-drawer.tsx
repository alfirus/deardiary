"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Category {
  id: number
  name: string
  slug: string
  created_at: string
}

interface MobileCategoriesDrawerProps {
  categories: Category[]
}

export function MobileCategoriesDrawer({ categories }: MobileCategoriesDrawerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full md:hidden mb-6">
          <Menu className="mr-2 h-4 w-4" />
          Browse Categories
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Categories</DrawerTitle>
          <DrawerDescription>
            Select a category to filter posts based on your interests.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[50vh] px-4">
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug || "#"}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b last:border-0"
              >
                {category.name}
              </Link>
            ))}
            {categories.length === 0 && (
              <div className="py-4 text-center text-muted-foreground">
                No categories found.
              </div>
            )}
          </div>
        </ScrollArea>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
