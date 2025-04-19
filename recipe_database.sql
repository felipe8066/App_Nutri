-- Creación de tablas para recetas
-- Basado en la pauta nutricional de Felipe Aguilar

-- Tabla de recetas
CREATE TABLE recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  instructions TEXT,
  preparation_time INTEGER,
  difficulty TEXT,
  image_url TEXT,
  meal_type_id INTEGER,
  day_type TEXT DEFAULT 'regular',
  FOREIGN KEY (meal_type_id) REFERENCES meal_types(id)
);

-- Tabla de ingredientes de recetas
CREATE TABLE recipe_ingredients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_id INTEGER,
  food_id INTEGER,
  quantity REAL,
  unit TEXT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- Inserción de datos iniciales de recetas

-- Receta 1: Bowl de avena con frutas (Desayuno)
INSERT INTO recipes (name, instructions, preparation_time, difficulty, meal_type_id, day_type) VALUES 
('Bowl de avena con frutas', 
'1. Cocinar la avena con agua o leche descremada hasta que esté cremosa.\n2. Añadir la manzana picada y mezclar.\n3. Servir y agregar el huevo duro picado por encima.\n4. Opcionalmente, añadir canela al gusto.',
10, 'Fácil', 1, 'regular');

-- Ingredientes para Bowl de avena con frutas
INSERT INTO recipe_ingredients (recipe_id, food_id, quantity, unit) VALUES 
(1, 3, 40, 'g'),    -- Avena
(1, 12, 100, 'g'),  -- Manzana
(1, 21, 50, 'g');   -- Huevo

-- Receta 2: Ensalada de pollo con quinoa (Almuerzo)
INSERT INTO recipes (name, instructions, preparation_time, difficulty, meal_type_id, day_type) VALUES 
('Ensalada de pollo con quinoa', 
'1. Cocinar la quinoa según las instrucciones del paquete y dejar enfriar.\n2. Cocinar la pechuga de pollo a la plancha con un poco de sal y pimienta.\n3. Cortar el tomate, el pepino y la zanahoria en cubos pequeños.\n4. Mezclar todos los ingredientes en un bowl grande.\n5. Aliñar con limón y un poco de aceite de oliva.',
25, 'Media', 2, 'regular');

-- Ingredientes para Ensalada de pollo con quinoa
INSERT INTO recipe_ingredients (recipe_id, food_id, quantity, unit) VALUES 
(2, 6, 60, 'g'),     -- Quinoa (1.5 porciones)
(2, 9, 200, 'g'),    -- Pollo - Pechuga (4 porciones)
(2, 17, 120, 'g'),   -- Tomate (1 porción verdura general)
(2, 3, 100, 'g'),    -- Pepino ensalada (1 porción verdura libre)
(2, 11, 50, 'g'),    -- Zanahoria cruda
(2, 4, 10, 'ml');    -- Aceite de oliva (opcional)

-- Receta 3: Yogurt con frutas y granola (Colación PM)
INSERT INTO recipes (name, instructions, preparation_time, difficulty, meal_type_id, day_type) VALUES 
('Yogurt con frutas y granola', 
'1. Colocar el yogurt en un bowl.\n2. Añadir la fruta picada.\n3. Espolvorear la granola por encima.',
5, 'Fácil', 3, 'regular');

-- Ingredientes para Yogurt con frutas y granola
INSERT INTO recipe_ingredients (recipe_id, food_id, quantity, unit) VALUES 
(3, 20, 30, 'g'),    -- Granola
(3, 5, 115, 'g'),    -- Yogurt descremado
(3, 12, 100, 'g');   -- Manzana

-- Receta 4: Plátano pre-entrenamiento (Colación preentrenamiento)
INSERT INTO recipes (name, instructions, preparation_time, difficulty, meal_type_id, day_type) VALUES 
('Plátano pre-entrenamiento', 
'1. Pelar y consumir medio plátano aproximadamente 30 minutos antes de entrenar.',
1, 'Fácil', 4, 'regular');

-- Ingredientes para Plátano pre-entrenamiento
INSERT INTO recipe_ingredients (recipe_id, food_id, quantity, unit) VALUES 
(4, 17, 60, 'g');    -- Plátano (1/2 unidad)

-- Receta 5: Bowl de arroz con pollo y vegetales (Cena)
INSERT INTO recipes (name, instructions, preparation_time, difficulty, meal_type_id, day_type) VALUES 
('Bowl de arroz con pollo y vegetales', 
'1. Cocinar el arroz según las instrucciones del paquete.\n2. Saltear la pechuga de pollo cortada en cubos con un poco de aceite.\n3. Añadir el brócoli y la zanahoria y cocinar hasta que estén tiernos.\n4. Servir el arroz en un bowl y colocar el pollo y los vegetales encima.\n5. Añadir un poco de yogurt natural como aderezo.',
30, 'Media', 5, 'regular');

-- Ingredientes para Bowl de arroz con pollo y vegetales
INSERT INTO recipe_ingredients (recipe_id, food_id, quantity, unit) VALUES 
(5, 1, 150, 'g'),    -- Arroz cocido (1.5 porciones)
(5, 9, 200, 'g'),    -- Pollo - Pechuga (4 porciones)
(5, 6, 100, 'g'),    -- Brócoli
(5, 12, 70, 'g'),    -- Zanahoria cocida
(5, 5, 115, 'g');    -- Yogurt descremado (1 porción)

-- Receta 6: Ensalada de lentejas (Almuerzo - día con legumbres)
INSERT INTO recipes (name, instructions, preparation_time, difficulty, meal_type_id, day_type) VALUES 
('Ensalada de lentejas', 
'1. Cocinar las lentejas según las instrucciones del paquete y dejar enfriar.\n2. Cocinar el arroz y dejar enfriar.\n3. Picar el tomate, la cebolla y el pepino en cubos pequeños.\n4. Mezclar todos los ingredientes en un bowl grande.\n5. Aliñar con limón, un poco de aceite de oliva y especias al gusto.',
40, 'Media', 2, 'legumbres');

-- Ingredientes para Ensalada de lentejas
INSERT INTO recipe_ingredients (recipe_id, food_id, quantity, unit) VALUES 
(6, 3, 210, 'g'),    -- Lenteja cocida (1.5 porciones)
(6, 1, 100, 'g'),    -- Arroz cocido (1 porción)
(6, 17, 120, 'g'),   -- Tomate (1 porción verdura general)
(6, 14, 100, 'g'),   -- Cebolla cruda
(6, 3, 100, 'g'),    -- Pepino ensalada (1 porción verdura libre)
(6, 4, 10, 'ml');    -- Aceite de oliva (opcional)

-- Sistema de búsqueda de alimentos (implementado como vistas SQL)

-- Vista para búsqueda de alimentos por nombre
CREATE VIEW food_search AS
SELECT f.id, f.name, c.name as category, f.portion_size, f.portion_unit, f.portion_description, f.calories
FROM foods f
JOIN food_categories c ON f.category_id = c.id;

-- Vista para obtener alimentos por categoría
CREATE VIEW foods_by_category AS
SELECT c.name as category, f.id, f.name, f.portion_size, f.portion_unit, f.portion_description, f.calories
FROM foods f
JOIN food_categories c ON f.category_id = c.id
ORDER BY c.name, f.name;

-- Vista para obtener plan nutricional por tiempo de comida
CREATE VIEW nutrition_plan_by_meal AS
SELECT mt.name as meal_type, fc.name as food_category, np.portions, np.day_type
FROM nutrition_plan np
JOIN meal_types mt ON np.meal_type_id = mt.id
JOIN food_categories fc ON np.food_category_id = fc.id
ORDER BY np.day_type, mt.id, fc.name;

-- Vista para obtener recetas por tiempo de comida
CREATE VIEW recipes_by_meal AS
SELECT r.id, r.name, mt.name as meal_type, r.preparation_time, r.difficulty, r.day_type
FROM recipes r
JOIN meal_types mt ON r.meal_type_id = mt.id
ORDER BY r.day_type, mt.id, r.name;

-- Vista para obtener ingredientes de recetas
CREATE VIEW recipe_details AS
SELECT r.id as recipe_id, r.name as recipe_name, f.name as ingredient, ri.quantity, ri.unit, f.portion_description
FROM recipes r
JOIN recipe_ingredients ri ON r.id = ri.recipe_id
JOIN foods f ON ri.food_id = f.id
ORDER BY r.id, f.category_id;
