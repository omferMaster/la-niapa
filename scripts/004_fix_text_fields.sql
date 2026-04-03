-- Change array columns to text for free-form textarea inputs
ALTER TABLE censo_comercios 
  ALTER COLUMN beneficios_esperados TYPE TEXT USING array_to_string(beneficios_esperados, ', '),
  ALTER COLUMN preocupaciones TYPE TEXT USING array_to_string(preocupaciones, ', '),
  ALTER COLUMN tipos_excedentes TYPE TEXT USING array_to_string(tipos_excedentes, ', ');
