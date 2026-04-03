-- Drop and recreate the table with correct structure
DROP TABLE IF EXISTS censo_comercios;

CREATE TABLE censo_comercios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Información del negocio
  nombre_negocio TEXT NOT NULL,
  tipo_negocio TEXT NOT NULL,
  nombre_contacto TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT,
  direccion TEXT,
  barrio TEXT NOT NULL,
  
  -- Sobre excedentes
  frecuencia_excedentes TEXT NOT NULL,
  cantidad_excedentes TEXT NOT NULL,
  tipos_excedentes TEXT[] DEFAULT '{}',
  que_hacen_excedentes TEXT[] DEFAULT '{}',
  que_hacen_otro TEXT,
  perdida_estimada TEXT,
  
  -- Opinión sobre la app
  interes_app TEXT NOT NULL,
  beneficios_esperados TEXT[] DEFAULT '{}',
  preocupaciones TEXT[] DEFAULT '{}',
  comentarios_adicionales TEXT
);

-- Enable RLS
ALTER TABLE censo_comercios ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for the census form)
CREATE POLICY "Allow public inserts" ON censo_comercios
  FOR INSERT
  WITH CHECK (true);

-- Allow reading own submissions (optional, for future use)
CREATE POLICY "Allow public read" ON censo_comercios
  FOR SELECT
  USING (true);
