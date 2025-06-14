"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { users } from "@/lib/data"
import { Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [userType, setUserType] = useState<"abogado" | "cliente">("cliente")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const user = users.find(
      (u) => u.email === email && u.password === password && u.type === userType
    )

    if (user) {
      if (user.type === "abogado") {
        router.push("/dashboard")
      } else {
        router.push("/chat")
      }
    } else {
      setError("Credenciales inválidas o tipo de usuario incorrecto")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/">
                    <Home className="h-5 w-5" />
                  </Link>
                </Button>
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bienvenido a Minuta Legal</h1>
                  <p className="text-muted-foreground text-balance">
                    Inicia sesión en tu cuenta
                  </p>
                </div>
                <div className="w-10" /> {/* Espaciador para mantener el título centrado */}
              </div>

              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="text-sm text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  required 
                />
              </div>

              <div className="grid gap-3">
                <Label>Tipo de Usuario</Label>
                <RadioGroup
                  defaultValue="cliente"
                  onValueChange={(value: "abogado" | "cliente") => setUserType(value)}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cliente" id="cliente" />
                    <Label htmlFor="cliente">Cliente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="abogado" id="abogado" />
                    <Label htmlFor="abogado">Abogado</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>

              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <a href="/register" className="text-primary hover:underline">
                  Regístrate
                </a>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                <p>Usuarios de prueba:</p>
                <p>Abogados: juan@abogado.com / maria@abogado.com</p>
                <p>Clientes: carlos@cliente.com / ana@cliente.com</p>
                <p>Contraseña: 123456</p>
              </div>
            </div>
          </form>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              Minuta Legal
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  )
}
