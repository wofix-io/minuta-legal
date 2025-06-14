import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Linkedin, Instagram } from "lucide-react";
import { LandingCharts } from "@/components/landing/landing-charts";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Minuta Legal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Tu asistente legal inteligente. Simplifica la gestión de documentos legales y obtén respuestas precisas a tus consultas jurídicas.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline">
                Ir al Chat
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">¿Por qué Minuta Legal?</h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-3xl">
            <span className="font-semibold text-primary">Minuta Legal</span> es la plataforma que revoluciona la generación y gestión de documentos legales en Latinoamérica. Nuestra IA especializada permite a abogados y clientes crear minutas profesionales en minutos, reducir errores y acelerar procesos legales.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-6">
            <li className="flex flex-col items-center">
              <span className="text-5xl mb-2">⚡️</span>
              <span className="font-semibold text-lg">Rápido y Eficiente</span>
              <span className="text-gray-600 dark:text-gray-400">Genera documentos en minutos, no horas.</span>
            </li>
            <li className="flex flex-col items-center">
              <span className="text-5xl mb-2">🤖</span>
              <span className="font-semibold text-lg">IA Legal Especializada</span>
              <span className="text-gray-600 dark:text-gray-400">Precisión y calidad en cada minuta.</span>
            </li>
            <li className="flex flex-col items-center">
              <span className="text-5xl mb-2">🌎</span>
              <span className="font-semibold text-lg">Enfocado en LATAM</span>
              <span className="text-gray-600 dark:text-gray-400">Adaptado a la realidad jurídica de la región.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Documentos Legales</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Gestiona y organiza tus documentos legales de manera eficiente.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Asistente IA</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Obtén respuestas precisas a tus consultas jurídicas con nuestro asistente inteligente.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Dashboard Personalizado</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Accede a tu panel de control personalizado para gestionar todos tus asuntos legales.
            </p>
          </Card>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Planes de Suscripción</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Plan Personal */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-2">Personal</h3>
            <p className="text-5xl font-extrabold text-primary mb-2">$20<span className="text-lg font-medium text-gray-500 dark:text-gray-400">/mes</span></p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li>✔️ Generación ilimitada de minutas</li>
              <li>✔️ Acceso al chat legal IA</li>
              <li>✔️ Soporte por email</li>
              <li>✔️ Panel de usuario</li>
            </ul>
            <Button size="lg" className="w-full">Elegir Personal</Button>
          </div>
          {/* Plan Empresarial */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-2 border-primary">
            <h3 className="text-2xl font-bold mb-2">Empresarial</h3>
            <p className="text-4xl font-extrabold text-primary mb-2">A convenir</p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li>✔️ Todo lo del plan Personal</li>
              <li>✔️ Integración con sistemas empresariales</li>
              <li>✔️ Soporte prioritario</li>
              <li>✔️ Minutas personalizadas y API</li>
              <li>✔️ Gestión multiusuario</li>
            </ul>
            <Button size="lg" variant="outline" className="w-full">Contactar Ventas</Button>
          </div>
        </div>
      </div>

      {/* App Flow Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">¿Cómo funciona Minuta Legal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl mb-2">📝</span>
            <h4 className="font-semibold mb-1">1. Solicita tu minuta</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">El usuario describe su necesidad legal en el chat.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl mb-2">🤖</span>
            <h4 className="font-semibold mb-1">2. IA genera el borrador</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">La IA crea un documento legal personalizado en minutos.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl mb-2">👨‍⚖️</span>
            <h4 className="font-semibold mb-1">3. Revisión profesional</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Un abogado revisa y valida la minuta para asegurar calidad.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl mb-2">✅</span>
            <h4 className="font-semibold mb-1">4. Firma y descarga</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">El usuario recibe la minuta lista para firmar y usar.</p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Resultados y Eficiencia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 flex flex-col items-center text-center">
            <span className="text-5xl mb-2">⏱️</span>
            <h3 className="text-2xl font-bold mb-2 text-primary">80% menos tiempo</h3>
            <p className="text-gray-700 dark:text-gray-300">Reducción promedio en la generación de documentos legales.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 flex flex-col items-center text-center">
            <span className="text-5xl mb-2">📈</span>
            <h3 className="text-2xl font-bold mb-2 text-primary">+95% precisión</h3>
            <p className="text-gray-700 dark:text-gray-300">Minutas validadas por abogados y adaptadas a cada caso.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 flex flex-col items-center text-center">
            <span className="text-5xl mb-2">💼</span>
            <h3 className="text-2xl font-bold mb-2 text-primary">+500 usuarios</h3>
            <p className="text-gray-700 dark:text-gray-300">Clientes satisfechos en toda Latinoamérica.</p>
          </div>
        </div>
      </div>

      {/* Dashboard-like Charts Section */}
      <LandingCharts />

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center gap-4">
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Minuta Legal</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tu asistente legal inteligente para una gestión jurídica eficiente.
            </p>
          </div>
          <div className="flex gap-4 mt-2">
            <a href="https://www.linkedin.com/company/wofix-io" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-primary transition" />
            </a>
            <a href="https://instagram.com/wofix.io" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-primary transition" />
            </a>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center text-xs text-gray-500 dark:text-gray-400 mt-2">
            <a href="mailto:info@minutalegal.com" className="underline hover:text-primary">Contacto</a>
            <a href="/terminos" className="underline hover:text-primary">Términos y Condiciones</a>
            <span>Esta aplicación fue creada por <a href="https://wofix.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">wofix.io</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
