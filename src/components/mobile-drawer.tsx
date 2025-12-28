"use client"

import * as React from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarContent, SidebarData } from '@/components/sidebar-content';

interface MobileDrawerProps {
  content: SidebarData
}

export function MobileDrawer({ content }: MobileDrawerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full md:hidden mb-6">
          <Menu className="mr-2 h-4 w-4" />
         	Menu
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left sr-only">
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-[80vh] px-4 pt-4">
          <SidebarContent content={content} onCategoryClick={() => setOpen(false)} />
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
