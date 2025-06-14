"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Calendar, Mail, User, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home
  },
  {
    title: "Calendario",
    href: "/dashboard/calendar",
    icon: Calendar
  },
  {
    title: "Correos",
    href: "/dashboard/mail",
    icon: Mail
  },
  {
    title: "Perfil",
    href: "/dashboard/profile",
    icon: User
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: Settings
  }
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Botón de menú para móvil */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Sidebar para desktop */}
      <div className="hidden md:block w-80 border-r bg-card">
        <SidebarContent />
      </div>
    </>
  )
}

function SidebarContent() {
  const pathname = usePathname()

  return (
    <>
      <div className="flex h-16 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Minuta Legal</h2>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-1 p-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <a href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </a>
            </Button>
          ))}
        </div>

        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/avatars/user.jpg" alt="Usuario" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Usuario Cliente</p>
              <p className="text-xs text-muted-foreground truncate">
                cliente@ejemplo.com
              </p>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <a href="/">
                <LogOut className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </>
  )
} 