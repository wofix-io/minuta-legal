import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Minutas Legales
            <span className="text-primary"> Inteligentes</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Genera minutas legales profesionales en minutos con nuestra IA especializada.
            Ahorra tiempo y asegura la precisión en tus documentos legales.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/chat/demo">
                Probar Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">
                Iniciar Sesión
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 