"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import { Store, Package, Lightbulb, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react"

const TIPO_NEGOCIO_OPTIONS = [
  "Restaurante",
  "Panaderia",
  "Pasteleria",
  "Fruteria/Verduleria",
  "Supermercado/Tienda",
  "Cafeteria",
  "Hotel",
  "Comidas rapidas",
  "Otro",
]

const FRECUENCIA_EXCEDENTES = [
  { value: "diario", label: "Todos los dias" },
  { value: "varias_semana", label: "Varias veces por semana" },
  { value: "semanal", label: "Una vez por semana" },
  { value: "ocasional", label: "Ocasionalmente" },
  { value: "casi_nunca", label: "Casi nunca" },
]

const CANTIDAD_EXCEDENTES = [
  { value: "menos_5kg", label: "Menos de 5 kg" },
  { value: "5_10kg", label: "Entre 5 y 10 kg" },
  { value: "10_20kg", label: "Entre 10 y 20 kg" },
  { value: "mas_20kg", label: "Mas de 20 kg" },
]

const QUE_HACEN_EXCEDENTES = [
  { id: "botan", label: "Los botamos a la basura" },
  { id: "empleados", label: "Los regalamos a empleados" },
  { id: "conocidos", label: "Los regalamos a conocidos/vecinos" },
  { id: "fundaciones", label: "Los donamos a fundaciones" },
  { id: "animales", label: "Se los damos a animales" },
  { id: "compostaje", label: "Los usamos para compostaje" },
  { id: "descuentos", label: "Los vendemos con descuento" },
  { id: "otro", label: "Otro" },
]

const INTERES_OPTIONS = [
  { value: "muy_interesado", label: "Muy interesado, quiero participar" },
  { value: "interesado", label: "Interesado, me gustaria saber mas" },
  { value: "tal_vez", label: "Tal vez, depende de las condiciones" },
  { value: "no_interesado", label: "No me interesa por ahora" },
]

const CIUDADES = ["Cúcuta", "Los Patios", "Villa del Rosario", "El Zulia"]

const BARRIOS_POR_CIUDAD: Record<string, string[]> = {
  "Cúcuta": [
    "Centro",
    "Caobos",
    "La Riviera",
    "Quinta Oriental",
    "Blanco",
    "Guaimaral",
    "San Luis",
    "Latino",
    "Ceiba II",
    "Atalaya",
    "Comuneros",
    "La Libertad",
    "Otro",
  ],
  "Los Patios": [
    "Altamira",
    "Barrio Bonito",
    "Bellavista",
    "Betania",
    "Brisas del Llano",
    "Cataluña",
    "Daniel Jordán y Minuto de Dios",
    "Doce de Octubre",
    "El Chaparral",
    "El limonar",
    "El Mirador",
    "El Portal de Los Patios",
    "El Sol",
    "Iscaligua I",
    "Iscaligua II",
    "Juana Paulav",
    "Juana Paula",
    "Kilometro Nueve",
    "Kilometro Ocho",
    "La Arboleda",
    "La Campiña",
    "La Cordialidad",
    "La Esperanza",
    "La Floresta",
    "La Sabana",
    "Las Cumbres",
    "Llanitos",
    "Llano Grande",
    "Los Colorados",
    "Miradores del Pamplonita",
    "Nazaret",
    "Once de Noviembre",
    "Patio Antiguo",
    "Patios Centro",
    "Pensilvania",
    "Pinar del rio",
    "Pisarreal",
    "San Carlos",
    "San Fernando",
    "San Francisco",
    "San Remo",
    "San Victorino",
    "Santa Ana",
    "Santa Clara",
    "Santa Rosa de Lima",
    "Sinai",
    "Tasajero",
    "Tierra Linda",
    "Valles del Mirador",
    "Videlso",
    "Villa Betania",
    "Villa Camila",
    "Villa Celina",
    "Villa Esperanza",
    "Villa Sonia",
    "Villa Verde",
    "Otro"
  ],
  "Villa del Rosario": [
    "20 de julio",
    "Antonio Nariño",
    "Bellavista",
    "El Centro",
    "El Páramo",
    "Fátima",
    "Gramalote",
    "Gran Colombia",
    "La Esperanza",
    "La Palmita",
    "La Parada",
    "Las Pampas",
    "Lomitas",
    "Montevideo",
    "Piedecuesta",
    "Primero de mayo",
    "San Gregorio",
    "San José",
    "San Judas Tadeo",
    "San Martín",
    "Santa Bárbara",
    "Santander",
    "Sendero de Paz",
    "Turbay Ayala",
    "Villa Antigua",
    "Otro"
  ],
  "El Zulia": [
    "La Alejandra",
    "Alfonso López",
    "El Centro",
    "El Triunfo",
    "Francisco de Paula Santander",
    "La Ayala",
    "Pueblo Nuevo",
    "Otro"
  ]
}

type FormData = {
  nombre_negocio: string
  tipo_negocio: string
  tipo_negocio_otro: string
  nombre_contacto: string
  telefono: string
  email: string
  direccion: string
  ciudad: string
  barrio: string
  frecuencia_excedentes: string
  cantidad_excedentes: string
  tipos_excedentes: string
  que_hacen_excedentes: string[]
  que_hacen_otro: string
  perdida_estimada: string
  interes_app: string
  beneficios_esperados: string
  preocupaciones: string
  comentarios_adicionales: string
}

const initialFormData: FormData = {
  nombre_negocio: "",
  tipo_negocio: "",
  tipo_negocio_otro: "",
  nombre_contacto: "",
  telefono: "",
  email: "",
  direccion: "",
  ciudad: "",
  barrio: "",
  frecuencia_excedentes: "",
  cantidad_excedentes: "",
  tipos_excedentes: "",
  que_hacen_excedentes: [],
  que_hacen_otro: "",
  perdida_estimada: "",
  interes_app: "",
  beneficios_esperados: "",
  preocupaciones: "",
  comentarios_adicionales: "",
}

export function CensoForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const steps = [
    { title: "Informacion del negocio", icon: Store, description: "Datos basicos de tu establecimiento" },
    { title: "Sobre los excedentes", icon: Package, description: "Cuentanos sobre tu situacion actual" },
    { title: "Tu opinion sobre la app", icon: Lightbulb, description: "Que piensas de esta iniciativa" },
  ]

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleExcedenteOption = (id: string) => {
    setFormData(prev => ({
      ...prev,
      que_hacen_excedentes: prev.que_hacen_excedentes.includes(id)
        ? prev.que_hacen_excedentes.filter(item => item !== id)
        : [...prev.que_hacen_excedentes, id]
    }))
  }

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.nombre_negocio && formData.tipo_negocio && formData.nombre_contacto && formData.telefono && formData.ciudad && formData.barrio
    }
    if (currentStep === 1) {
      return formData.frecuencia_excedentes && formData.cantidad_excedentes && formData.que_hacen_excedentes.length > 0
    }
    return formData.interes_app
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const supabase = createClient()
      
      const dataToInsert = {
        nombre_negocio: formData.nombre_negocio,
        tipo_negocio: formData.tipo_negocio === "Otro" ? formData.tipo_negocio_otro : formData.tipo_negocio,
        nombre_contacto: formData.nombre_contacto,
        telefono: formData.telefono,
        email: formData.email || null,
        direccion: formData.direccion || null,
        ciudad: formData.ciudad,
        barrio: formData.barrio,
        frecuencia_excedentes: formData.frecuencia_excedentes,
        cantidad_excedentes: formData.cantidad_excedentes,
        tipos_excedentes: formData.tipos_excedentes || null,
        que_hacen_excedentes: formData.que_hacen_excedentes,
        que_hacen_otro: formData.que_hacen_excedentes.includes("otro") ? formData.que_hacen_otro : null,
        perdida_estimada: formData.perdida_estimada || null,
        interes_app: formData.interes_app,
        beneficios_esperados: formData.beneficios_esperados || null,
        preocupaciones: formData.preocupaciones || null,
        comentarios_adicionales: formData.comentarios_adicionales || null,
      }

      const { error } = await supabase.from("censo_comercios").insert([dataToInsert])

      if (error) throw error

      router.push("/censo/gracias")
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("Hubo un error al enviar el formulario. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              index <= currentStep 
                ? "bg-primary border-primary text-primary-foreground" 
                : "bg-card border-border text-muted-foreground"
            }`}>
              {index < currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`hidden sm:block w-24 md:w-32 h-1 mx-2 rounded ${
                index < currentStep ? "bg-primary" : "bg-border"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground">{steps[currentStep].title}</h2>
        <p className="text-muted-foreground mt-1">{steps[currentStep].description}</p>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {/* Step 1: Business Information */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre_negocio">Nombre del negocio *</Label>
                  <Input
                    id="nombre_negocio"
                    placeholder="Ej: Panaderia La Esperanza"
                    value={formData.nombre_negocio}
                    onChange={(e) => updateField("nombre_negocio", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo_negocio">Tipo de negocio *</Label>
                  <Select value={formData.tipo_negocio} onValueChange={(value) => updateField("tipo_negocio", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPO_NEGOCIO_OPTIONS.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.tipo_negocio === "Otro" && (
                <div className="space-y-2">
                  <Label htmlFor="tipo_negocio_otro">Especifica el tipo de negocio</Label>
                  <Input
                    id="tipo_negocio_otro"
                    placeholder="Describe tu tipo de negocio"
                    value={formData.tipo_negocio_otro}
                    onChange={(e) => updateField("tipo_negocio_otro", e.target.value)}
                  />
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre_contacto">Nombre de contacto *</Label>
                  <Input
                    id="nombre_contacto"
                    placeholder="Tu nombre completo"
                    value={formData.nombre_contacto}
                    onChange={(e) => updateField("nombre_contacto", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Telefono / WhatsApp *</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="Ej: 3001234567"
                    value={formData.telefono}
                    onChange={(e) => updateField("telefono", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electronico (opcional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Direccion (opcional)</Label>
                  <Input
                    id="direccion"
                    placeholder="Calle, carrera, numero"
                    value={formData.direccion}
                    onChange={(e) => updateField("direccion", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Municipio *</Label>
                  <Select 
                    value={formData.ciudad} 
                    onValueChange={(value) => {
                      updateField("ciudad", value)
                      updateField("barrio", "")
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el municipio" />
                    </SelectTrigger>
                    <SelectContent>
                      {CIUDADES.map((ciudad) => (
                        <SelectItem key={ciudad} value={ciudad}>{ciudad}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barrio">Barrio / Zona *</Label>
                  <Select 
                    value={formData.barrio} 
                    onValueChange={(value) => updateField("barrio", value)}
                    disabled={!formData.ciudad}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData.ciudad ? "Selecciona el barrio" : "Primero elige un municipio"} />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.ciudad && BARRIOS_POR_CIUDAD[formData.ciudad]?.map((barrio) => (
                        <SelectItem key={barrio} value={barrio}>{barrio}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: About Excedentes */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Con que frecuencia tienes excedentes de comida? *</Label>
                <RadioGroup
                  value={formData.frecuencia_excedentes}
                  onValueChange={(value) => updateField("frecuencia_excedentes", value)}
                  className="space-y-2"
                >
                  {FRECUENCIA_EXCEDENTES.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={`freq-${option.value}`} />
                      <Label htmlFor={`freq-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Aproximadamente, cuanta cantidad de excedentes generas? *</Label>
                <RadioGroup
                  value={formData.cantidad_excedentes}
                  onValueChange={(value) => updateField("cantidad_excedentes", value)}
                  className="space-y-2"
                >
                  {CANTIDAD_EXCEDENTES.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={`cant-${option.value}`} />
                      <Label htmlFor={`cant-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipos_excedentes">Que tipos de productos suelen sobrar?</Label>
                <Textarea
                  id="tipos_excedentes"
                  placeholder="Ej: Pan del dia, postres, almuerzos, frutas maduras..."
                  value={formData.tipos_excedentes}
                  onChange={(e) => updateField("tipos_excedentes", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>Actualmente, que haces con los excedentes? * (selecciona todas las que apliquen)</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {QUE_HACEN_EXCEDENTES.map((option) => (
                    <div key={option.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={`que-${option.id}`}
                        checked={formData.que_hacen_excedentes.includes(option.id)}
                        onCheckedChange={() => toggleExcedenteOption(option.id)}
                      />
                      <Label htmlFor={`que-${option.id}`} className="font-normal cursor-pointer leading-tight">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {formData.que_hacen_excedentes.includes("otro") && (
                <div className="space-y-2">
                  <Label htmlFor="que_hacen_otro">Especifica que otro uso le das</Label>
                  <Input
                    id="que_hacen_otro"
                    placeholder="Describe que haces con los excedentes"
                    value={formData.que_hacen_otro}
                    onChange={(e) => updateField("que_hacen_otro", e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="perdida_estimada">Cuanto estimas que pierdes en pesos por excedentes al mes?</Label>
                <Input
                  id="perdida_estimada"
                  placeholder="Ej: $200.000, $500.000, No lo se..."
                  value={formData.perdida_estimada}
                  onChange={(e) => updateField("perdida_estimada", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Opinion about the App */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-primary">Sobre La Ñapa</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80">
                    Estamos creando una app que te permite publicar tus excedentes del dia a precios 
                    reducidos (30-70% de descuento). Los usuarios cercanos pueden reservar y recoger 
                    la comida en tu local. Tu ganas ingresos extra y reduces el desperdicio.
                  </CardDescription>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Label>Que tan interesado estarias en participar? *</Label>
                <RadioGroup
                  value={formData.interes_app}
                  onValueChange={(value) => updateField("interes_app", value)}
                  className="space-y-2"
                >
                  {INTERES_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={`interes-${option.value}`} />
                      <Label htmlFor={`interes-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficios_esperados">Que beneficios te gustaria obtener al usar esta app?</Label>
                <Textarea
                  id="beneficios_esperados"
                  placeholder="Ej: Recuperar parte de la inversion, atraer nuevos clientes, ayudar al medio ambiente..."
                  value={formData.beneficios_esperados}
                  onChange={(e) => updateField("beneficios_esperados", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preocupaciones">Tienes alguna preocupacion o duda sobre participar?</Label>
                <Textarea
                  id="preocupaciones"
                  placeholder="Ej: Tiempo extra requerido, logistica, comisiones, imagen del negocio..."
                  value={formData.preocupaciones}
                  onChange={(e) => updateField("preocupaciones", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios_adicionales">Comentarios adicionales o sugerencias</Label>
                <Textarea
                  id="comentarios_adicionales"
                  placeholder="Cualquier otra cosa que quieras contarnos..."
                  value={formData.comentarios_adicionales}
                  onChange={(e) => updateField("comentarios_adicionales", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Message */}
      {submitError && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {submitError}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button
            onClick={() => setCurrentStep(prev => prev + 1)}
            disabled={!canProceed()}
          >
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner className="mr-2" />
                Enviando...
              </>
            ) : (
              "Enviar censo"
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
