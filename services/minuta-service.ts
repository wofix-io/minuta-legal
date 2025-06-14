import { MinutaRequest, MinutaTemplate, MinutaGenerada } from "@/types/minuta"

// Simulación de base de datos
const minutas: MinutaRequest[] = []
const templates: MinutaTemplate[] = [
  {
    id: "1",
    tipo: "compra_venta_vehiculo",
    nombre: "Compra Venta de Vehículo",
    descripcion: "Minuta para la compra venta de un vehículo",
    campos: [
      {
        nombre: "vendedor",
        tipo: "texto",
        requerido: true,
        descripcion: "Nombre completo del vendedor"
      },
      {
        nombre: "comprador",
        tipo: "texto",
        requerido: true,
        descripcion: "Nombre completo del comprador"
      },
      {
        nombre: "marca",
        tipo: "texto",
        requerido: true,
        descripcion: "Marca del vehículo"
      },
      {
        nombre: "modelo",
        tipo: "texto",
        requerido: true,
        descripcion: "Modelo del vehículo"
      },
      {
        nombre: "año",
        tipo: "numero",
        requerido: true,
        descripcion: "Año del vehículo"
      },
      {
        nombre: "precio",
        tipo: "moneda",
        requerido: true,
        descripcion: "Precio acordado"
      }
    ],
    contenido: `
      MINUTA DE COMPRA VENTA DE VEHÍCULO

      En Santiago, a {{fecha}}, entre los suscritos:

      {{vendedor}}, mayor de edad, cédula de identidad N° {{cedula_vendedor}}, 
      domiciliado en {{direccion_vendedor}}, a quien en lo sucesivo se le denominará "EL VENDEDOR";

      Y

      {{comprador}}, mayor de edad, cédula de identidad N° {{cedula_comprador}}, 
      domiciliado en {{direccion_comprador}}, a quien en lo sucesivo se le denominará "EL COMPRADOR";

      HAN CONVENIDO CELEBRAR EL PRESENTE CONTRATO DE COMPRA VENTA DE VEHÍCULO, 
      DE CONFORMIDAD CON LAS SIGUIENTES CLÁUSULAS:

      PRIMERA: OBJETO DEL CONTRATO
      EL VENDEDOR transfiere al COMPRADOR la propiedad del vehículo marca {{marca}}, 
      modelo {{modelo}}, año {{año}}, por el precio de {{precio}} pesos.

      SEGUNDA: FORMA DE PAGO
      El COMPRADOR pagará el precio total en efectivo al momento de la firma de esta minuta.

      TERCERA: ENTREGA
      EL VENDEDOR se compromete a entregar el vehículo en el estado en que se encuentra, 
      con todos sus accesorios y documentación correspondiente.

      CUARTA: GARANTÍAS
      EL VENDEDOR garantiza ser el legítimo dueño del vehículo y que se encuentra libre 
      de gravámenes y embargos.

      En fe de lo cual, firman por duplicado ejemplar de un mismo tenor y a un solo efecto, 
      en el lugar y fecha indicados en el encabezamiento.

      EL VENDEDOR                                EL COMPRADOR
      _________________                         _________________
      {{vendedor}}                              {{comprador}}
    `
  }
]

export const MinutaService = {
  // Obtener todas las minutas
  getMinutas: () => {
    return minutas
  },

  // Obtener minutas por estado
  getMinutasByEstado: (estado: MinutaRequest["estado"]) => {
    return minutas.filter(m => m.estado === estado)
  },

  // Obtener minutas por abogado
  getMinutasByAbogado: (abogadoId: string) => {
    return minutas.filter(m => m.abogado === abogadoId)
  },

  // Crear nueva minuta
  createMinuta: (minuta: Omit<MinutaRequest, "id" | "fecha" | "estado">) => {
    const nuevaMinuta: MinutaRequest = {
      ...minuta,
      id: Math.random().toString(36).substr(2, 9),
      fecha: new Date().toISOString(),
      estado: "pendiente"
    }
    minutas.push(nuevaMinuta)
    return nuevaMinuta
  },

  // Actualizar estado de minuta
  updateMinutaEstado: (id: string, estado: MinutaRequest["estado"], abogadoId?: string) => {
    const minuta = minutas.find(m => m.id === id)
    if (minuta) {
      minuta.estado = estado
      if (abogadoId) {
        minuta.abogado = abogadoId
        minuta.fechaRevision = new Date().toISOString()
      }
    }
    return minuta
  },

  // Obtener templates
  getTemplates: () => {
    return templates
  },

  // Obtener template por tipo
  getTemplateByTipo: (tipo: string) => {
    return templates.find(t => t.tipo === tipo)
  },

  // Generar minuta
  generateMinuta: (minuta: MinutaRequest): MinutaGenerada => {
    const template = templates.find(t => t.tipo === minuta.tipo)
    if (!template) {
      throw new Error("Template no encontrado")
    }

    let contenido = template.contenido
    Object.entries(minuta.datos).forEach(([key, value]) => {
      contenido = contenido.replace(new RegExp(`{{${key}}}`, "g"), value)
    })

    return {
      ...minuta,
      documento: contenido,
      fechaGeneracion: new Date().toISOString(),
      version: 1,
      firmas: {
        cliente: false,
        abogado: false
      }
    }
  }
} 