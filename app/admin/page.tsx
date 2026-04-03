import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, TrendingUp, AlertCircle } from "lucide-react"
import { CensoTable } from "@/components/admin/censo-table"
import { StatsCards } from "@/components/admin/stats-cards"

export const metadata = {
  title: "Panel Admin - La Ñapa",
  description: "Dashboard administrativo para gestionar el censo de comercios",
}

type CensoComercio = {
  id: string
  created_at: string
  nombre_negocio: string
  tipo_negocio: string
  nombre_contacto: string
  telefono: string
  email: string | null
  direccion: string | null
  barrio: string | null
  frecuencia_excedentes: string
  cantidad_excedentes: string
  tipos_excedentes: string | null
  que_hacen_excedentes: string[]
  que_hacen_otro: string | null
  perdida_estimada: string | null
  interes_app: string
  beneficios_esperados: string | null
  preocupaciones: string | null
  comentarios_adicionales: string | null
}

export default async function AdminPage() {
  const supabase = await createClient()
  
  const { data: censos, error } = await supabase
    .from("censo_comercios")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <Card className="max-w-md mx-auto border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error al cargar datos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const comercios = (censos || []) as CensoComercio[]
  
  // Calcular estadísticas
  const totalComercios = comercios.length
  const interesados = comercios.filter(c => c.interes_app === "muy_interesado" || c.interes_app === "interesado").length
  const porTipo = comercios.reduce((acc, c) => {
    acc[c.tipo_negocio] = (acc[c.tipo_negocio] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const tipoMasComun = Object.entries(porTipo).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Panel Admin</h1>
              <p className="text-muted-foreground">La Ñapa - Gestión del censo de comercios</p>
            </div>
            <Badge variant="outline" className="text-primary border-primary">
              {totalComercios} respuestas
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <StatsCards 
          totalComercios={totalComercios}
          interesados={interesados}
          tipoMasComun={tipoMasComun}
        />

        {/* Tabla de comercios */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Respuestas del Censo</CardTitle>
            <CardDescription>
              Listado de todos los comercios que han respondido el formulario
            </CardDescription>
          </CardHeader>
          <CardContent>
            {comercios.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No hay respuestas todavía</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Los comercios que respondan el censo aparecerán aquí
                </p>
              </div>
            ) : (
              <CensoTable comercios={comercios} />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
