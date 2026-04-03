import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Leaf, ArrowLeft, Heart } from "lucide-react"

export const metadata = {
  title: "Gracias por participar - La Ñapa",
  description: "Tu respuesta ha sido registrada exitosamente.",
}

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardContent className="pt-10 pb-8 px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Gracias por participar
          </h1>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Hemos recibido tu informacion. Tu participacion es muy valiosa para entender 
            la situacion del desperdicio de comida en Cucuta y crear una solucion que 
            realmente funcione para todos.
          </p>

          <div className="bg-muted/50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-primary font-medium mb-2">
              <Heart className="w-5 h-5" />
              <span>Que sigue?</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Nos pondremos en contacto contigo pronto para contarte mas sobre la app 
              y como puedes ser parte de los primeros comercios en unirse a La Ñapa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">
                <Leaf className="w-4 h-4 mr-2" />
                Conocer mas
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
