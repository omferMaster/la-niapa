import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, ShoppingBag, Store, Tractor, TrendingDown, Users, Utensils } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">La Ñapa</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">
              Como funciona
            </Link>
            <Link href="#beneficios" className="text-muted-foreground hover:text-foreground transition-colors">
              Beneficios
            </Link>
            <Link href="/censo" className="text-muted-foreground hover:text-foreground transition-colors">
              Registra tu negocio
            </Link>
          </nav>
          <Button asChild>
            <Link href="/censo">Unete ahora</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Movimiento anti-desperdicio en el área metropolitana de Cúcuta
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
              Salvemos la comida que aun es buena
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              Conectamos restaurantes, panaderias y comercios de Cucuta con personas que quieren
              aprovechar excedentes de comida a precios increibles. Juntos reducimos el desperdicio alimentario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base">
                <Link href="/censo">
                  <Store className="w-5 h-5 mr-2" />
                  Registra tu negocio
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base">
                <Link href="#como-funciona">
                  Conoce mas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "30%", label: "de la comida se desperdicia" },
              { value: "2.5M", label: "toneladas al año en Colombia" },
              { value: "70%", label: "de descuento promedio" },
              { value: "0", label: "razon para botar comida buena" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Como funciona</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Un proceso simple para salvar comida y ahorrar dinero
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Store,
                title: "El comercio publica",
                description: "Restaurantes y panaderias publican sus excedentes del dia a precios reducidos",
              },
              {
                icon: ShoppingBag,
                title: "Tu reservas",
                description: "Explora las ofertas cerca de ti y reserva tu bolsa sorpresa con descuentos hasta del 70%",
              },
              {
                icon: Utensils,
                title: "Recoges y disfrutas",
                description: "Pasa por el local en el horario indicado, recoge tu pedido y disfruta comida deliciosa",
              },
            ].map((step, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="absolute top-4 right-4 text-6xl font-bold text-muted/30">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Beneficios para todos</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Un ecosistema donde todos ganan: comercios, consumidores y el planeta
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 border-primary/20 bg-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <Store className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Para comercios</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <TrendingDown className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Recupera ingresos de productos que normalmente se pierden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Atrae nuevos clientes que luego vuelven a precio completo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Mejora tu imagen como negocio sostenible y responsable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Accede a los productos del campo a precios accesibles y sin mucho problema</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="p-8 border-2 border-accent/40 bg-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Para consumidores</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ShoppingBag className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Ahorra hasta 70% en comida de calidad que todavia tiene uso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Utensils className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Descubre nuevos restaurantes y locales que antes no conocias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Atrevete a comprar paquetes sorpresa, no sabras que te espera</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>Apoya a los negocios locales y contribuye a reducir el desperdicio en la ciudad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="p-8 border-2 border-green-500/30 bg-green-50/30 dark:border-green-500/20 dark:bg-green-950/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                  <Tractor className="w-6 h-6 text-green-700 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Para campesinos</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ShoppingBag className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                      <span>Recupera ingresos de la mercancia que normalmente se pierden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Utensils className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                      <span>Ofrece directamente tus productos a los negociantes de una manera ágil y sencilla</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                      <span>Sin más intermediarios, recibe tu pago directamente y sin preocupaciones</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Eres comercio en Cucuta o su área metropolitana?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Queremos conocerte. Completa nuestro censo para entender tus necesidades
            y como podemos ayudarte a reducir el desperdicio mientras generas ingresos extra.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-base">
            <Link href="/censo">
              Completar censo de negocio
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">La Ñapa</span>
            </div>
            <p className="text-background/60 text-sm">
              Lo bueno que sobra, a precio de ñapa. Hecho para Cucuta.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
