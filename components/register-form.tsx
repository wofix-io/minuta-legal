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

export function RegisterForm({
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
    const confirmPassword = formData.get("confirmPassword") as string
    const name = formData.get("name") as string
    const license = formData.get("license") as string

    // Validar que el email no esté en uso
    if (users.some(u => u.email === email)) {
      setError("Este email ya está registrado")
      return
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    // Validar que los abogados tengan licencia
    if (userType === "abogado" && !license) {
      setError("Los abogados deben proporcionar su número de licencia")
      return
    }

    // Aquí iría la lógica para guardar el usuario
    // Por ahora solo redirigimos
    if (userType === "abogado") {
      router.push("/dashboard")
    } else {
      router.push("/chat")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Crear una cuenta</h1>
                <p className="text-muted-foreground text-balance">
                  Únete a Minuta Legal
                </p>
              </div>

              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  required
                />
              </div>

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
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  required 
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  required 
                />
              </div>

              <div className="grid gap-3">
                <Label>Tipo de Usuario</Label>
                <RadioGroup
                  defaultValue="cliente"
                  onValueChange={(value: "abogado" | "cliente") => setUserType(value)}
                  className="flex gap-4"
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

              {userType === "abogado" && (
                <div className="grid gap-3">
                  <Label htmlFor="license">Número de Licencia</Label>
                  <Input
                    id="license"
                    name="license"
                    type="text"
                    placeholder="Tu número de licencia profesional"
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full">
                Registrarse
              </Button>

              <div className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Iniciar Sesión
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Imagen de fondo"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al registrarte, aceptas nuestros{" "}
        <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  )
} 