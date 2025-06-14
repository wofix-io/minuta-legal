"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Camera } from "lucide-react"

const userData = {
  nombre: "Dr. Juan Pérez",
  email: "juan.perez@minutalegal.com",
  telefono: "+56 9 1234 5678",
  direccion: "Av. Libertador Bernardo O'Higgins 1234, Santiago",
  especialidad: "Derecho Civil",
  colegio: "Colegio de Abogados de Chile",
  numeroColegio: "12345",
  biografia: "Abogado especializado en derecho civil con más de 10 años de experiencia en la redacción y revisión de minutas legales.",
  avatar: "/avatars/abogado1.jpg"
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
  }

  // Utilidades para mostrar placeholders amigables
  const showValue = (value: string, placeholder: string) => value?.trim() ? value : <span className="text-muted-foreground italic">{placeholder}</span>;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 flex items-start justify-start p-2 sm:p-4 md:p-6 md:ml-64 lg:ml-32 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <Card className="p-3 sm:p-6 shadow-lg bg-white dark:bg-gray-900 flex flex-col items-center min-h-[480px]">
            <div className="flex flex-col items-center w-full">
              <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-1 mb-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.avatar} alt={formData.nombre} />
                  <AvatarFallback>{formData.nombre.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
              </div>
              <h1 className="text-xl font-bold text-center w-full break-words">{showValue(formData.nombre, "Nombre no ingresado")}</h1>
              <p className="text-xs text-muted-foreground text-center w-full break-words mb-1">{showValue(formData.email, "Correo no ingresado")}</p>
              <div className="flex gap-2 mt-1 mb-2 flex-wrap justify-center">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">Abogado verificado</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">Miembro desde 2024</span>
              </div>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                className="mt-2 mb-4 w-full sm:w-auto"
              >
                {isEditing ? "Cancelar" : "Editar Perfil"}
              </Button>
            </div>

            <Tabs defaultValue="personal" className="w-full mt-2">
              <TabsList className="w-full flex flex-wrap gap-1 md:gap-2 text-xs md:text-base justify-center mb-4">
                <TabsTrigger value="personal" className="flex-1">Información Personal</TabsTrigger>
                <TabsTrigger value="profesional" className="flex-1">Información Profesional</TabsTrigger>
                <TabsTrigger value="seguridad" className="flex-1">Seguridad</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <form onSubmit={handleSubmit} className="space-y-3 w-full">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="nombre">Nombre Completo</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Nombre no ingresado"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Correo no ingresado"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Teléfono no ingresado"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="direccion">Dirección</Label>
                      <Input
                        id="direccion"
                        value={formData.direccion}
                        onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Dirección no ingresada"
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <Button type="submit" className="w-full">Guardar Cambios</Button>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="profesional">
                <form onSubmit={handleSubmit} className="space-y-3 w-full">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="especialidad">Especialidad</Label>
                      <Input
                        id="especialidad"
                        value={formData.especialidad}
                        onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Especialidad no ingresada"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="colegio">Colegio de Abogados</Label>
                      <Input
                        id="colegio"
                        value={formData.colegio}
                        onChange={(e) => setFormData({...formData, colegio: e.target.value})}
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Colegio no ingresado"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="numeroColegio">Número de Colegiado</Label>
                      <Input
                        id="numeroColegio"
                        value={formData.numeroColegio}
                        onChange={(e) => setFormData({...formData, numeroColegio: e.target.value})}
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Número no ingresado"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="biografia">Biografía</Label>
                      <textarea
                        id="biografia"
                        className="w-full min-h-[80px] p-2 border rounded-md resize-y text-xs md:text-base break-words"
                        value={formData.biografia}
                        onChange={(e) => setFormData({...formData, biografia: e.target.value})}
                        disabled={!isEditing}
                        placeholder="Biografía no ingresada"
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <Button type="submit" className="w-full">Guardar Cambios</Button>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="seguridad">
                <form onSubmit={handleSubmit} className="space-y-3 w-full">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="currentPassword">Contraseña Actual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Ingresa tu contraseña actual"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Nueva contraseña"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Confirma la nueva contraseña"
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <Button type="submit" className="w-full">Cambiar Contraseña</Button>
                  )}
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
} 