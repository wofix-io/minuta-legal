"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Calendar,
  Mail,
  User,
  Settings,
  LogOut,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Calendario",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Correos",
    href: "/dashboard/mail",
    icon: Mail,
  },
  {
    title: "Perfil",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-all duration-300",
        isCollapsed && "w-20"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className={cn("text-lg font-semibold", isCollapsed && "hidden")}>
            Minuta Legal
          </span>
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className={isCollapsed ? "hidden" : ""}>{item.title}</span>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/avatars/abogado1.jpg" alt="Avatar" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className={cn("flex-1", isCollapsed && "hidden")}>
            <p className="text-sm font-medium">Dr. Juan Pérez</p>
            <p className="text-xs text-muted-foreground">juan.perez@minutalegal.com</p>
          </div>
        </div>
        <Link href="/" className="mt-4 block">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            <span className={isCollapsed ? "hidden" : ""}>Salir</span>
          </Button>
        </Link>
      </div>
    </div>
  )
} 