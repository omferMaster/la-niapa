-- Agregar columnas faltantes a la tabla censo_comercios
ALTER TABLE public.censo_comercios 
ADD COLUMN IF NOT EXISTS nombre_negocio TEXT,
ADD COLUMN IF NOT EXISTS tipo_negocio TEXT,
ADD COLUMN IF NOT EXISTS tipos_excedentes TEXT,
ADD COLUMN IF NOT EXISTS que_hacen_excedentes TEXT[],
ADD COLUMN IF NOT EXISTS que_hacen_otro TEXT,
ADD COLUMN IF NOT EXISTS perdida_estimada TEXT,
ADD COLUMN IF NOT EXISTS interes_app TEXT,
ADD COLUMN IF NOT EXISTS beneficios_esperados_texto TEXT,
ADD COLUMN IF NOT EXISTS preocupaciones_texto TEXT,
ADD COLUMN IF NOT EXISTS comentarios_adicionales TEXT;

-- Hacer que las columnas NOT NULL sean opcionales para el nuevo formulario
ALTER TABLE public.censo_comercios 
ALTER COLUMN nombre_comercio DROP NOT NULL,
ALTER COLUMN tipo_comercio DROP NOT NULL,
ALTER COLUMN direccion DROP NOT NULL,
ALTER COLUMN barrio DROP NOT NULL,
ALTER COLUMN interes_participar DROP NOT NULL;
