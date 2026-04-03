-- Crear tabla para el censo de comercios
CREATE TABLE IF NOT EXISTS public.censo_comercios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Información básica del comercio
  nombre_comercio TEXT NOT NULL,
  tipo_comercio TEXT NOT NULL, -- restaurante, panaderia, supermercado, fruteria, hotel, otro
  nombre_contacto TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT,
  direccion TEXT NOT NULL,
  barrio TEXT NOT NULL,
  
  -- Información sobre excedentes
  tiene_excedentes BOOLEAN NOT NULL DEFAULT false,
  frecuencia_excedentes TEXT, -- diario, semanal, ocasional
  tipo_excedentes TEXT[], -- comida_preparada, pan, frutas, verduras, lacteos, carnes, otros
  cantidad_excedentes TEXT, -- pequena, mediana, grande
  horario_excedentes TEXT,
  
  -- Qué hacen actualmente con los excedentes
  destino_excedentes TEXT[], -- basura, empleados, donacion, venta_reducida, compostaje, otro
  destino_otro TEXT,
  
  -- Opinión sobre la app
  interes_participar TEXT NOT NULL, -- muy_interesado, interesado, tal_vez, no_interesado
  beneficios_esperados TEXT[], -- ingresos_extra, reducir_desperdicio, imagen_sostenible, ayudar_comunidad
  preocupaciones TEXT[], -- logistica, calidad, reputacion, tiempo, ninguna
  precio_sugerido TEXT, -- 5000-10000, 10000-15000, 15000-20000, 20000+
  comentarios TEXT,
  
  -- Disponibilidad
  dias_disponibles TEXT[], -- lunes, martes, miercoles, jueves, viernes, sabado, domingo
  acepta_contacto BOOLEAN NOT NULL DEFAULT false
);

-- Habilitar RLS
ALTER TABLE public.censo_comercios ENABLE ROW LEVEL SECURITY;

-- Política pública para insertar (cualquiera puede enviar el formulario)
CREATE POLICY "allow_public_insert" ON public.censo_comercios
  FOR INSERT
  WITH CHECK (true);

-- Política para lectura solo con service role (admin)
CREATE POLICY "allow_service_role_select" ON public.censo_comercios
  FOR SELECT
  USING (auth.role() = 'service_role');
