## Diseño de la Estructura de la Aplicación Web para Seguimiento Nutricional

### Arquitectura de la Aplicación

Basado en los requisitos del usuario y el análisis de la pauta nutricional, se propone una arquitectura de aplicación web progresiva (PWA) utilizando Next.js, que permitirá un funcionamiento óptimo en dispositivos móviles y proporcionará una experiencia similar a una aplicación nativa.

#### Diagrama de Arquitectura

```
+----------------------------------+
|           Cliente (PWA)          |
|  +----------------------------+  |
|  |        Componentes UI      |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  |      Estado (Context API)  |  |
|  +----------------------------+  |
+----------------------------------+
              |
              | API Calls
              v
+----------------------------------+
|         Servidor Next.js         |
|  +----------------------------+  |
|  |        API Routes          |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  |     Lógica de Negocio      |  |
|  +----------------------------+  |
+----------------------------------+
              |
              v
+----------------------------------+
|           Base de Datos          |
|  +----------------------------+  |
|  |       Cloudflare D1        |  |
|  |  (SQLite compatible DB)    |  |
|  +----------------------------+  |
+----------------------------------+
              |
              v
+----------------------------------+
|        Servicios Externos        |
|  +----------------------------+  |
|  |       API de ChatGPT       |  |
|  +----------------------------+  |
+----------------------------------+
```

### Modelo de Datos

#### Tablas Principales

1. **Users**
   ```sql
   CREATE TABLE users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     email TEXT UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **FoodCategories**
   ```sql
   CREATE TABLE food_categories (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     description TEXT
   );
   ```

3. **Foods**
   ```sql
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
   ```

4. **MealTypes**
   ```sql
   CREATE TABLE meal_types (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     description TEXT
   );
   ```

5. **NutritionPlan**
   ```sql
   CREATE TABLE nutrition_plan (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     meal_type_id INTEGER,
     food_category_id INTEGER,
     portions REAL,
     day_type TEXT DEFAULT 'regular',
     FOREIGN KEY (meal_type_id) REFERENCES meal_types(id),
     FOREIGN KEY (food_category_id) REFERENCES food_categories(id)
   );
   ```

6. **DailyLogs**
   ```sql
   CREATE TABLE daily_logs (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER,
     date DATE,
     water_intake REAL DEFAULT 0,
     sleep_hours REAL DEFAULT 0,
     workout_done BOOLEAN DEFAULT 0,
     supplements_taken BOOLEAN DEFAULT 0,
     notes TEXT,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

7. **MealLogs**
   ```sql
   CREATE TABLE meal_logs (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER,
     date DATE,
     meal_type_id INTEGER,
     food_id INTEGER,
     portions REAL,
     notes TEXT,
     FOREIGN KEY (user_id) REFERENCES users(id),
     FOREIGN KEY (meal_type_id) REFERENCES meal_types(id),
     FOREIGN KEY (food_id) REFERENCES foods(id)
   );
   ```

8. **Recipes**
   ```sql
   CREATE TABLE recipes (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     instructions TEXT,
     preparation_time INTEGER,
     difficulty TEXT,
     image_url TEXT
   );
   ```

9. **RecipeIngredients**
   ```sql
   CREATE TABLE recipe_ingredients (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     recipe_id INTEGER,
     food_id INTEGER,
     quantity REAL,
     unit TEXT,
     FOREIGN KEY (recipe_id) REFERENCES recipes(id),
     FOREIGN KEY (food_id) REFERENCES foods(id)
   );
   ```

10. **ChatHistory**
    ```sql
    CREATE TABLE chat_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      message TEXT,
      response TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    ```

### Funcionalidades Principales

1. **Registro y Seguimiento de Comidas**
   - Registro diario de alimentos consumidos por tiempo de comida
   - Visualización de cumplimiento de la pauta nutricional
   - Historial de alimentación

2. **Recomendación de Platos**
   - Sugerencia de platos basados en ingredientes disponibles
   - Filtrado por tipo de comida y preferencias
   - Generación de recetas que cumplan con la pauta nutricional

3. **Chatbot Nutricional**
   - Consultas sobre alimentación y nutrición
   - Recomendaciones personalizadas
   - Respuestas a dudas específicas sobre la pauta

4. **Seguimiento de Objetivos**
   - Registro de consumo de agua
   - Seguimiento de horas de sueño
   - Registro de entrenamientos
   - Control de suplementos

5. **Gestión de Recetas**
   - Biblioteca de recetas que cumplen con la pauta
   - Posibilidad de guardar recetas favoritas
   - Compartir recetas

### Wireframes para Interfaz Móvil

#### Pantalla Principal (Dashboard)
```
+----------------------------------+
|           Mi Nutrición           |
+----------------------------------+
|                                  |
| +------------------------------+ |
| |     Resumen del Día Actual   | |
| |                              | |
| | Agua: [===>      ] 1.5/3.5L  | |
| | Sueño: [=======  ] 6/7.5h    | |
| | Suplementos: [x] [ ] [ ]     | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| |     Próxima Comida           | |
| |                              | |
| | Almuerzo (12:30)             | |
| | - 1½ cereal                  | |
| | - 4 proteínas                | |
| | - 1 verdura general          | |
| | - 1 verdura libre            | |
| |                              | |
| | [Registrar] [Sugerencias]    | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| |     Progreso Semanal         | |
| |                              | |
| | [Gráfico de cumplimiento]    | |
| |                              | |
| +------------------------------+ |
|                                  |
+----------------------------------+
|  [Home] [Comidas] [Chat] [Perfil]|
+----------------------------------+
```

#### Pantalla de Registro de Comida
```
+----------------------------------+
|        Registrar Comida          |
+----------------------------------+
|                                  |
| Tiempo de comida:                |
| [Desayuno ▼]                     |
|                                  |
| Fecha: [Hoy ▼]                   |
|                                  |
| Alimentos:                       |
|                                  |
| Cereales (1 porción):            |
| [Buscar alimento...      ] [+]   |
| - Pan integral (1 rebanada)  [x] |
|                                  |
| Frutas (1 porción):              |
| [Buscar alimento...      ] [+]   |
| - Manzana (1 unidad)        [x]  |
|                                  |
| Proteínas (3 porciones):         |
| [Buscar alimento...      ] [+]   |
| - Huevo (1 unidad)          [x]  |
| - Pechuga de pollo (50g)    [x]  |
|                                  |
| [Añadir más alimentos]           |
|                                  |
| Notas:                           |
| [                           ]    |
|                                  |
| [Cancelar]        [Guardar]      |
|                                  |
+----------------------------------+
|  [Home] [Comidas] [Chat] [Perfil]|
+----------------------------------+
```

#### Pantalla de Chatbot Nutricional
```
+----------------------------------+
|       Nutricionista Virtual      |
+----------------------------------+
|                                  |
| +------------------------------+ |
| | Hola Felipe, ¿en qué puedo   | |
| | ayudarte hoy?                | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | ¿Qué puedo preparar con      | |
| | pollo y brócoli que cumpla   | |
| | con mi pauta?                | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | Puedes preparar una          | |
| | ensalada de pollo con        | |
| | brócoli y quinoa:            | |
| |                              | |
| | - 150g de pechuga de pollo   | |
| | - 1 taza de brócoli          | |
| | - 3/4 taza de quinoa cocida  | |
| |                              | |
| | Esta combinación cumple con  | |
| | tu pauta de almuerzo.        | |
| | ¿Quieres la receta completa? | |
| +------------------------------+ |
|                                  |
| [Escribe tu mensaje...]  [Enviar]|
|                                  |
+----------------------------------+
|  [Home] [Comidas] [Chat] [Perfil]|
+----------------------------------+
```

#### Pantalla de Recomendación de Platos
```
+----------------------------------+
|      Recomendación de Platos     |
+----------------------------------+
|                                  |
| Tiempo de comida:                |
| [Almuerzo ▼]                     |
|                                  |
| Ingredientes disponibles:        |
| [Buscar ingrediente...    ] [+]  |
| - Pollo                      [x] |
| - Arroz integral             [x] |
| - Zanahoria                  [x] |
| - Cebolla                    [x] |
|                                  |
| [Generar recomendaciones]        |
|                                  |
| Recomendaciones:                 |
|                                  |
| +------------------------------+ |
| | Salteado de pollo con arroz  | |
| | integral y vegetales         | |
| |                              | |
| | [Ver receta] [Guardar]       | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | Bowl de arroz con pollo y    | |
| | vegetales asados             | |
| |                              | |
| | [Ver receta] [Guardar]       | |
| +------------------------------+ |
|                                  |
+----------------------------------+
|  [Home] [Comidas] [Chat] [Perfil]|
+----------------------------------+
```

### Tecnologías a Utilizar

1. **Frontend**:
   - Next.js como framework principal
   - Tailwind CSS para estilos responsive
   - React Context API para gestión de estado
   - Service Workers para funcionalidad offline

2. **Backend**:
   - API Routes de Next.js
   - Cloudflare D1 (SQLite compatible) para base de datos
   - Integración con API de ChatGPT para el chatbot

3. **Despliegue**:
   - Cloudflare Pages para hosting
   - PWA para instalación en dispositivos móviles

### Consideraciones Adicionales

1. **Modo Offline**: La aplicación debe funcionar sin conexión, sincronizando datos cuando se restablezca la conexión.

2. **Rendimiento**: Optimizar la carga de la aplicación para dispositivos móviles con conexiones lentas.

3. **Seguridad**: Implementar medidas básicas de seguridad para proteger los datos del usuario.

4. **Escalabilidad**: Diseñar la arquitectura para permitir futuras expansiones como análisis nutricional más detallado o integración con dispositivos de fitness.

5. **Accesibilidad**: Asegurar que la aplicación sea accesible para usuarios con diferentes capacidades.
