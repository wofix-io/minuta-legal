export type MinutaRequest = {
  id: string
  tipo: string
  cliente: string
  fecha: string
  estado: "pendiente" | "en_revision" | "completada" | "rechazada"
  datos: Record<string, string>
  abogado?: string
  fechaRevision?: string
  comentarios?: string
}

export type MinutaTemplate = {
  id: string
  tipo: string
  nombre: string
  descripcion: string
  campos: {
    nombre: string
    tipo: "texto" | "numero" | "fecha" | "moneda"
    requerido: boolean
    descripcion: string
  }[]
  contenido: string
}

export type MinutaGenerada = MinutaRequest & {
  documento: string
  fechaGeneracion: string
  version: number
  firmas: {
    cliente: boolean
    abogado: boolean
  }
} 