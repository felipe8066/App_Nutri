-- Creación de tablas para la base de datos de alimentos
-- Basado en la pauta nutricional de Felipe Aguilar

-- Tabla de categorías de alimentos
CREATE TABLE food_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

-- Tabla de alimentos
CREATE TABLE foods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER,
  portion_size REAL,
  portion_unit TEXT,
  portion_description TEXT,
  calories INTEGER,
  FOREIGN KEY (category_id) REFERENCES food_categories(id)
);

-- Tabla de tipos de comida
CREATE TABLE meal_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

-- Tabla de plan nutricional
CREATE TABLE nutrition_plan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  meal_type_id INTEGER,
  food_category_id INTEGER,
  portions REAL,
  day_type TEXT DEFAULT 'regular',
  FOREIGN KEY (meal_type_id) REFERENCES meal_types(id),
  FOREIGN KEY (food_category_id) REFERENCES food_categories(id)
);

-- Inserción de datos iniciales

-- Categorías de alimentos
INSERT INTO food_categories (name, description) VALUES 
('Cereales', 'Incluye arroz, avena, fideos, pan, etc.'),
('Carnes bajas en grasas', 'Incluye vacuno, cerdo, pollo, pescados, mariscos y huevo'),
('Leguminosas', 'Incluye porotos, garbanzos y lentejas cocidos'),
('Verduras generales', 'Incluye acelga, alcachofa, brócoli, etc.'),
('Verduras de libre consumo', 'Incluye apio, lechuga, pepino, etc.'),
('Frutas', 'Diversas frutas con sus porciones específicas'),
('Lácteos', 'Incluye leche, yogurt, queso, etc.'),
('Alimentos ricos en lípidos', 'Incluye frutos secos, palta, aceitunas'),
('Aceites y grasas', 'Incluye aceites, margarinas, mayonesas'),
('Azúcares', 'Incluye azúcar, miel, mermelada, etc.');

-- Tipos de comida
INSERT INTO meal_types (name, description) VALUES 
('Desayuno', 'Primera comida del día'),
('Almuerzo', 'Comida del mediodía'),
('Colación PM', 'Merienda de la tarde'),
('Colación preentrenamiento', 'Comida ligera antes de entrenar'),
('Cena', 'Última comida del día');

-- Plan nutricional para día regular
INSERT INTO nutrition_plan (meal_type_id, food_category_id, portions, day_type) VALUES 
(1, 1, 1, 'regular'), -- Desayuno: 1 cereal
(1, 6, 1, 'regular'), -- Desayuno: 1 fruta
(1, 2, 3, 'regular'), -- Desayuno: 3 proteínas
(2, 1, 1.5, 'regular'), -- Almuerzo: 1.5 cereal
(2, 2, 4, 'regular'), -- Almuerzo: 4 proteínas
(2, 4, 1, 'regular'), -- Almuerzo: 1 verdura general
(2, 5, 1, 'regular'), -- Almuerzo: 1 verdura libre consumo
(3, 1, 1, 'regular'), -- Colación PM: 1 cereal
(3, 7, 1, 'regular'), -- Colación PM: 1 lácteo medio en grasa
(3, 6, 1, 'regular'), -- Colación PM: 1 fruta
(4, 6, 1, 'regular'), -- Colación preentrenamiento: 1 fruta
(5, 1, 1.5, 'regular'), -- Cena: 1.5 cereal
(5, 2, 4, 'regular'), -- Cena: 4 proteínas
(5, 7, 1, 'regular'); -- Cena: 1 lácteo

-- Plan nutricional para día con legumbres
INSERT INTO nutrition_plan (meal_type_id, food_category_id, portions, day_type) VALUES 
(1, 1, 1, 'legumbres'), -- Desayuno: 1 cereal
(1, 6, 1, 'legumbres'), -- Desayuno: 1 fruta
(1, 2, 3, 'legumbres'), -- Desayuno: 3 proteínas
(2, 1, 1, 'legumbres'), -- Almuerzo: 1 cereal
(2, 3, 1.5, 'legumbres'), -- Almuerzo: 1.5 leguminosa
(2, 4, 1, 'legumbres'), -- Almuerzo: 1 verdura general
(2, 5, 1, 'legumbres'), -- Almuerzo: 1 verdura libre consumo
(3, 1, 1, 'legumbres'), -- Colación PM: 1 cereal
(3, 7, 1, 'legumbres'), -- Colación PM: 1 lácteo medio en grasa
(3, 6, 1, 'legumbres'), -- Colación PM: 1 fruta
(4, 6, 1, 'legumbres'), -- Colación preentrenamiento: 1 fruta
(5, 1, 1.5, 'legumbres'), -- Cena: 1.5 cereal
(5, 2, 4, 'legumbres'), -- Cena: 4 proteínas
(5, 7, 1, 'legumbres'); -- Cena: 1 lácteo

-- Alimentos: Cereales
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Arroz cocido', 1, 100, 'g', '¾ taza', 130),
('Arroz integral', 1, 120, 'g', '¾ taza', 140),
('Avena', 1, 40, 'g', '6 cdas o ½ taza', 150),
('Fideos cocidos', 1, 110, 'g', '¾ taza', 135),
('Harina trigo', 1, 40, 'g', '4 cdas o ¼ taza', 140),
('Quinoa', 1, 40, 'g', '4 cdas o ¼ taza', 160),
('Semola', 1, 40, 'g', '3 cdas o ¼ taza', 140),
('Cereales de desayuno', 1, 40, 'g', '½ taza', 150),
('Habas', 1, 150, 'g', '1 taza', 120),
('Cous cous', 1, 100, 'g', '¾ taza', 130),
('Arvejas', 1, 190, 'g', '1 ½ taza', 140),
('Camote', 1, 120, 'g', '1 ½ taza', 110),
('Choclo cocido', 1, 160, 'g', '1 taza', 120),
('Papa cocida', 1, 150, 'g', '1 unidad regular', 130),
('Natur', 1, 35, 'g', '1 bolsa chica', 120),
('Pan marraqueta', 1, 50, 'g', '½ unidad', 140),
('Pan molde', 1, 60, 'g', '3 rebanadas', 150),
('Pan molde integral', 1, 50, 'g', '1 ¼ rebanada', 130),
('Arepa mediana', 1, 50, 'g', '10 * 5', 140),
('Granola', 1, 30, 'g', '¼ taza', 150);

-- Alimentos: Carnes bajas en grasas
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Vacuno - Filete', 2, 50, 'g', 'Filete', 120),
('Vacuno - Lomo liso', 2, 50, 'g', 'Porción', 125),
('Vacuno - Pollo ganso', 2, 50, 'g', 'Porción', 120),
('Vacuno - Posta negra', 2, 50, 'g', 'Porción', 115),
('Vacuno - Posta rosada', 2, 50, 'g', 'Porción', 115),
('Cerdo - Filete', 2, 50, 'g', 'Filete', 130),
('Cerdo - Pulpa', 2, 50, 'g', 'Porción', 130),
('Pollo - Pierna', 2, 50, 'g', 'Porción', 120),
('Pollo - Pechuga', 2, 50, 'g', 'Porción', 110),
('Pavo', 2, 50, 'g', 'Porción', 105),
('Pejerrey', 2, 80, 'g', 'Filete', 90),
('Corvina', 2, 80, 'g', 'Filete', 95),
('Jurel', 2, 80, 'g', 'Filete', 100),
('Merluza', 2, 80, 'g', 'Filete', 85),
('Reineta', 2, 80, 'g', 'Filete', 90),
('Atún en agua', 2, 60, 'g', '1/3 taza', 100),
('Cholga', 2, 60, 'g', 'Porción', 80),
('Chorito', 2, 60, 'g', 'Porción', 80),
('Jaiva', 2, 60, 'g', 'Porción', 85),
('Almejas', 2, 60, 'g', 'Porción', 80),
('Huevo', 2, 50, 'g', '1 unidad', 70);

-- Alimentos: Leguminosas
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Porotos cocidos', 3, 100, 'g', '¾ taza', 120),
('Garbanzos cocidos', 3, 130, 'g', '¾ taza', 150),
('Lenteja cocida', 3, 140, 'g', '¾ taza', 140);

-- Alimentos: Verduras generales
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Acelga', 4, 110, 'g', '½ taza', 25),
('Alcachofa', 4, 50, 'g', '1 unidad chica', 40),
('Berenjena', 4, 100, 'g', '½ taza', 30),
('Betarraga cocida', 4, 90, 'g', '½ taza', 45),
('Bruselas', 4, 100, 'g', '½ taza', 40),
('Brocoli', 4, 100, 'g', '1 taza', 35),
('Champiñones enlatados', 4, 100, 'g', '¾ taza', 25),
('Champiñones crudos', 4, 150, 'g', '1 ½ taza', 30),
('Coliflor', 4, 110, 'g', '1 taza', 30),
('Poroto verde', 4, 70, 'g', '¾ taza', 35),
('Zanahoria cruda', 4, 50, 'g', '1 taza', 25),
('Zanahoria cocida', 4, 70, 'g', '1 taza', 30),
('Zapallito italiano', 4, 150, 'g', '1 taza', 25),
('Cebolla cruda', 4, 100, 'g', '¾ taza', 40),
('Zapallo', 4, 70, 'g', '½ taza', 30),
('Esparrago', 4, 100, 'g', '5 unidades', 25),
('Tomate', 4, 120, 'g', '1 unidad regular', 20),
('Espinaca', 4, 130, 'g', '½ taza', 25);

-- Alimentos: Verduras de libre consumo
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Apio', 5, 70, 'g', '1 taza', 15),
('Lechuga', 5, 50, 'g', '1 taza', 10),
('Pepino ensalada', 5, 100, 'g', '1 taza', 15),
('Pimentón rojo', 5, 60, 'g', '½ taza', 20),
('Pimentón verde', 5, 60, 'g', '½ taza', 20),
('Rabanito', 5, 50, 'g', '5 unidades', 15),
('Repollo', 5, 50, 'g', '1 taza', 15),
('Cochayuyo', 5, 100, 'g', '1 taza', 20);

-- Alimentos: Frutas
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Cerezas', 6, 90, 'g', '15 unidades', 60),
('Ciruelas', 6, 110, 'g', '3 unidades', 65),
('Damasco', 6, 120, 'g', '3 unidades', 55),
('Durazno', 6, 130, 'g', '1 unidad', 60),
('Frambuesas', 6, 130, 'g', '1 taza', 65),
('Frutillas', 6, 200, 'g', '1 taza', 65),
('Pepino dulce', 6, 240, 'g', '1 unidad', 50),
('Pera', 6, 100, 'g', '1 unidad', 60),
('Sandia', 6, 200, 'g', '1 taza', 50),
('Kiwi', 6, 100, 'g', '2 unidades', 60),
('Mango', 6, 100, 'g', '½ unidad', 65),
('Manzana', 6, 100, 'g', '1 unidad', 60),
('Melón', 6, 180, 'g', '1 taza', 55),
('Mora', 6, 120, 'g', '½ taza', 60),
('Naranja', 6, 120, 'g', '1 unidad', 60),
('Piña', 6, 120, 'g', '¾ taza', 60),
('Plátano', 6, 60, 'g', '½ unidad', 55),
('Uvas', 6, 90, 'g', '10 unidades', 65),
('Tuna', 6, 150, 'g', '2 un. Regulares', 60);

-- Alimentos: Lácteos
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Leche descremada', 7, 200, 'ml', '1 taza', 90),
('Leche semidescremada', 7, 200, 'ml', '1 taza', 110),
('Leche entera', 7, 200, 'ml', '1 taza', 150),
('Leche en polvo descremada', 7, 20, 'g', '1 cucharada colmada', 75),
('Yogurt descremado', 7, 115, 'g', '1 vasito', 80),
('Yogurt semidescremado', 7, 115, 'g', '1 vasito', 100),
('Tofu', 7, 100, 'g', '1 rebanada', 80),
('Quesillo', 7, 40, 'g', '3 rodelas', 90),
('Queso', 7, 30, 'g', '½ lámina', 100),
('Ricota', 7, 50, 'g', 'Porción', 90),
('Crema de leche', 7, 30, 'ml', '2 cucharadas', 100),
('Crema ácida', 7, 45, 'ml', '3 cucharadas', 110);

-- Alimentos: Alimentos ricos en lípidos
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Almendra', 8, 25, 'g', '26 unidades', 150),
('Maní', 8, 30, 'g', '30 unidades', 170),
('Nuez', 8, 25, 'g', '5 unidades', 160),
('Pistacho', 8, 30, 'g', '40 unidades', 170),
('Avellanas', 8, 30, 'g', '50 unidades', 180),
('Aceitunas', 8, 40, 'g', '11 unidades', 60),
('Palta', 8, 90, 'g', '3 cucharadas', 160);

-- Alimentos: Aceites y grasas
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Aceite de maravilla', 9, 20, 'ml', '4 cucharaditas', 180),
('Aceite de soya', 9, 20, 'ml', '4 cucharaditas', 180),
('Aceite de canola', 9, 20, 'ml', '4 cucharaditas', 180),
('Aceite de oliva', 9, 20, 'ml', '4 cucharaditas', 180),
('Margarina light', 9, 20, 'g', '4 cucharaditas', 90),
('Aceite de coco', 9, 20, 'ml', '4 cucharaditas', 180),
('Mayonesa', 9, 15, 'g', '3 cucharaditas', 110),
('Not mayo', 9, 45, 'g', '3 cucharadas', 90),
('Mayonesa light', 9, 60, 'g', '4 cucharadas', 80),
('Salsa pesto', 9, 60, 'ml', '4 cucharadas', 150);

-- Alimentos: Azúcares
INSERT INTO foods (name, category_id, portion_size, portion_unit, portion_description, calories) VALUES 
('Azúcar refinada', 10, 5, 'g', '1 cucharadita', 20),
('Miel', 10, 7, 'g', '1 cucharadita', 25),
('Dulce de membrillo', 10, 10, 'g', '1 cucharadita', 30),
('Mermelada', 10, 10, 'g', '1 cucharadita', 25),
('Néctar', 10, 50, 'ml', '¼ taza', 50),
('Leche condensada', 10, 10, 'g', '1 cucharadita', 35),
('Jugo en polvo azucarado', 10, 5, 'g', '1 cucharadita', 20),
('Dátiles', 10, 10, 'g', '1 cucharadita', 30),
('Manjar', 10, 10, 'g', '1 cucharadita', 35),
('Chocolate amargo', 10, 35, 'g', '7 cucharaditas', 180),
('Cacao', 10, 5, 'g', '1 cucharadita', 15),
('Pasteles', 10, 50, 'g', 'Porción', 200);
