"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, TrendingUp, Store } from "lucide-react"

type StatsCardsProps = {
  totalComercios: number
  interesados: number
  tipoMasComun: [string, number] | undefined
}

export function StatsCards({ totalComercios, interesados, tipoMasComun }: StatsCardsProps) {
  const tasaInteres = totalComercios > 0 ? Math.round((interesados / totalComercios) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Comercios
          </CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{totalComercios}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Respuestas recibidas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Interesados
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{interesados}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Muy interesados o interesados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Tasa de Interes
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{tasaInteres}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            De los encuestados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Tipo mas comun
          </CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {tipoMasComun ? tipoMasComun[0] : "-"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {tipoMasComun ? `${tipoMasComun[1]} comercios` : "Sin datos"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
