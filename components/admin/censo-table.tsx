"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Search, Phone, Mail, MapPin } from "lucide-react"

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

type CensoTableProps = {
  comercios: CensoComercio[]
}

const interesLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  muy_interesado: { label: "Muy interesado", variant: "default" },
  interesado: { label: "Interesado", variant: "secondary" },
  poco_interesado: { label: "Poco interesado", variant: "outline" },
  no_interesado: { label: "No interesado", variant: "destructive" },
}

const frecuenciaLabels: Record<string, string> = {
  diario: "Diario",
  semanal: "Semanal",
  quincenal: "Quincenal",
  mensual: "Mensual",
  ocasional: "Ocasional",
}

const cantidadLabels: Record<string, string> = {
  poco: "Poco (menos del 10%)",
  moderado: "Moderado (10-25%)",
  bastante: "Bastante (25-50%)",
  mucho: "Mucho (mas del 50%)",
}

const queHacenLabels: Record<string, string> = {
  desecha: "Se desecha/bota",
  descuento: "Vende con descuento",
  empleados: "Se da a empleados",
  dona: "Dona a fundaciones",
  otro: "Otro",
}

export function CensoTable({ comercios }: CensoTableProps) {
  const [search, setSearch] = useState("")
  const [filterTipo, setFilterTipo] = useState<string>("todos")
  const [filterInteres, setFilterInteres] = useState<string>("todos")

  const tipos = [...new Set(comercios.map(c => c.tipo_negocio))]

  const filtered = comercios.filter(c => {
    const matchSearch = 
      c.nombre_negocio.toLowerCase().includes(search.toLowerCase()) ||
      c.nombre_contacto.toLowerCase().includes(search.toLowerCase()) ||
      c.barrio?.toLowerCase().includes(search.toLowerCase())
    
    const matchTipo = filterTipo === "todos" || c.tipo_negocio === filterTipo
    const matchInteres = filterInteres === "todos" || c.interes_app === filterInteres
    
    return matchSearch && matchTipo && matchInteres
  })

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, contacto o barrio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterTipo} onValueChange={setFilterTipo}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tipo de negocio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            {tipos.map(tipo => (
              <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterInteres} onValueChange={setFilterInteres}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Nivel de interes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="muy_interesado">Muy interesado</SelectItem>
            <SelectItem value="interesado">Interesado</SelectItem>
            <SelectItem value="poco_interesado">Poco interesado</SelectItem>
            <SelectItem value="no_interesado">No interesado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contador de resultados */}
      <p className="text-sm text-muted-foreground">
        Mostrando {filtered.length} de {comercios.length} comercios
      </p>

      {/* Tabla */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Negocio</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Barrio</TableHead>
              <TableHead>Interes</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((comercio) => (
              <TableRow key={comercio.id}>
                <TableCell className="font-medium">{comercio.nombre_negocio}</TableCell>
                <TableCell>
                  <Badge variant="outline">{comercio.tipo_negocio}</Badge>
                </TableCell>
                <TableCell>{comercio.nombre_contacto}</TableCell>
                <TableCell>{comercio.barrio || "-"}</TableCell>
                <TableCell>
                  <Badge variant={interesLabels[comercio.interes_app]?.variant || "outline"}>
                    {interesLabels[comercio.interes_app]?.label || comercio.interes_app}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(comercio.created_at).toLocaleDateString("es-CO")}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{comercio.nombre_negocio}</DialogTitle>
                        <DialogDescription>
                          Detalles completos del censo
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 mt-4">
                        {/* Información del negocio */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Informacion del Negocio</h4>
                          <div className="grid gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{comercio.tipo_negocio}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              <a href={`tel:${comercio.telefono}`} className="hover:text-primary">
                                {comercio.telefono}
                              </a>
                            </div>
                            {comercio.email && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <a href={`mailto:${comercio.email}`} className="hover:text-primary">
                                  {comercio.email}
                                </a>
                              </div>
                            )}
                            {(comercio.direccion || comercio.barrio) && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {[comercio.direccion, comercio.barrio].filter(Boolean).join(", ")}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Sobre los excedentes */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Sobre los Excedentes</h4>
                          <div className="grid gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Frecuencia:</span>
                              <span>{frecuenciaLabels[comercio.frecuencia_excedentes] || comercio.frecuencia_excedentes}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cantidad:</span>
                              <span>{cantidadLabels[comercio.cantidad_excedentes] || comercio.cantidad_excedentes}</span>
                            </div>
                            {comercio.tipos_excedentes && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tipos:</span>
                                <span>{comercio.tipos_excedentes}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-muted-foreground">Que hacen actualmente:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {comercio.que_hacen_excedentes.map(q => (
                                  <Badge key={q} variant="secondary" className="text-xs">
                                    {queHacenLabels[q] || q}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            {comercio.que_hacen_otro && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Otro:</span>
                                <span>{comercio.que_hacen_otro}</span>
                              </div>
                            )}
                            {comercio.perdida_estimada && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Perdida estimada:</span>
                                <span>{comercio.perdida_estimada}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Opinión sobre la app */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Opinion sobre La Ñapa</h4>
                          <div className="grid gap-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Nivel de interes:</span>
                              <Badge variant={interesLabels[comercio.interes_app]?.variant || "outline"}>
                                {interesLabels[comercio.interes_app]?.label || comercio.interes_app}
                              </Badge>
                            </div>
                            {comercio.beneficios_esperados && (
                              <div>
                                <span className="text-muted-foreground">Beneficios esperados:</span>
                                <p className="mt-1 text-foreground">{comercio.beneficios_esperados}</p>
                              </div>
                            )}
                            {comercio.preocupaciones && (
                              <div>
                                <span className="text-muted-foreground">Preocupaciones:</span>
                                <p className="mt-1 text-foreground">{comercio.preocupaciones}</p>
                              </div>
                            )}
                            {comercio.comentarios_adicionales && (
                              <div>
                                <span className="text-muted-foreground">Comentarios adicionales:</span>
                                <p className="mt-1 text-foreground">{comercio.comentarios_adicionales}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
