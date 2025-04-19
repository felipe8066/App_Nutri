// Sistema de recomendación de platos basado en ingredientes disponibles
// Este archivo contiene la lógica para recomendar platos que cumplan con la pauta nutricional

// Importar funciones del chatbot para reutilizar los prompts
import { generarRespuestaChatbot } from './chatbot';

// Función para generar recomendaciones de platos basados en ingredientes disponibles
export async function generarRecomendacionesPlatos(ingredientes, tiempoComida) {
  try {
    // Utilizar el prompt de recomendación de platos del chatbot
    const mensaje = `Necesito una receta para ${tiempoComida} utilizando estos ingredientes: ${ingredientes.join(', ')}`;
    
    // Parámetros para la generación de la recomendación
    const parametrosAdicionales = {
      ingredientes,
      tiempoComida
    };
    
    // Generar recomendación utilizando la API de ChatGPT
    const respuestaDetallada = await generarRespuestaChatbot(
      mensaje,
      [],
      'recomendacionPlato',
      parametrosAdicionales
    );
    
    // Procesar la respuesta para extraer información estructurada
    // En una implementación real, esto sería más sofisticado
    const recomendacion = procesarRespuestaReceta(respuestaDetallada);
    
    return recomendacion;
  } catch (error) {
    console.error('Error al generar recomendaciones de platos:', error);
    throw error;
  }
}

// Función para procesar la respuesta de la API y extraer información estructurada
function procesarRespuestaReceta(respuestaDetallada) {
  // En una implementación real, esto utilizaría NLP para extraer información estructurada
  // Por ahora, implementamos una versión simplificada
  
  // Intentar extraer el nombre del plato (primera línea o frase antes del primer punto)
  const lineas = respuestaDetallada.split('\n');
  const nombrePlato = lineas[0].includes(':') 
    ? lineas[0].split(':')[1].trim() 
    : lineas[0].split('.')[0].trim();
  
  // Intentar extraer ingredientes (líneas que comienzan con - o *)
  const ingredientesRegex = /[-*]\s+(.*)/g;
  const ingredientesMatches = [...respuestaDetallada.matchAll(ingredientesRegex)];
  const ingredientes = ingredientesMatches.map(match => match[1].trim());
  
  // Intentar extraer instrucciones (todo lo que viene después de "Instrucciones" o "Preparación")
  let instrucciones = "";
  if (respuestaDetallada.includes("Instrucciones")) {
    instrucciones = respuestaDetallada.split("Instrucciones")[1].trim();
  } else if (respuestaDetallada.includes("Preparación")) {
    instrucciones = respuestaDetallada.split("Preparación")[1].trim();
  } else if (respuestaDetallada.includes("Para preparar")) {
    instrucciones = respuestaDetallada.split("Para preparar")[1].trim();
  }
  
  // Extraer explicación nutricional (todo lo que viene después de "cumple con" o "Explicación")
  let explicacionNutricional = "";
  if (respuestaDetallada.includes("cumple con")) {
    const partes = respuestaDetallada.split("cumple con");
    if (partes.length > 1) {
      explicacionNutricional = "Cumple con " + partes[1].split('\n')[0].trim();
    }
  } else if (respuestaDetallada.includes("Explicación")) {
    explicacionNutricional = respuestaDetallada.split("Explicación")[1].trim();
  }
  
  return {
    nombre: nombrePlato,
    ingredientes,
    instrucciones,
    explicacionNutricional,
    respuestaCompleta: respuestaDetallada
  };
}

// Función para filtrar recetas según preferencias del usuario
export function filtrarRecetasPorPreferencias(recetas, preferencias) {
  // Implementación básica de filtrado por preferencias
  return recetas.filter(receta => {
    // Filtrar por ingredientes excluidos
    if (preferencias.ingredientesExcluidos && preferencias.ingredientesExcluidos.length > 0) {
      for (const ingredienteExcluido of preferencias.ingredientesExcluidos) {
        if (receta.ingredientes.some(i => i.toLowerCase().includes(ingredienteExcluido.toLowerCase()))) {
          return false;
        }
      }
    }
    
    // Filtrar por tiempo de preparación máximo
    if (preferencias.tiempoMaximo && receta.tiempoPreparacion > preferencias.tiempoMaximo) {
      return false;
    }
    
    // Filtrar por dificultad
    if (preferencias.dificultad && receta.dificultad !== preferencias.dificultad) {
      return false;
    }
    
    return true;
  });
}

// Base de datos en memoria de recetas predefinidas que cumplen con la pauta nutricional
export const recetasPredefinidas = {
  desayuno: [
    {
      id: 1,
      nombre: "Bowl de avena con frutas y huevo",
      descripcion: "Un desayuno completo que cumple con tu pauta nutricional",
      ingredientes: [
        "40g de avena (1 porción de cereal)",
        "1 manzana mediana (1 porción de fruta)",
        "1 huevo cocido (1 porción de proteína)",
        "100g de pechuga de pollo desmenuzada (2 porciones de proteína)"
      ],
      instrucciones: "1. Cocinar la avena con agua o leche descremada hasta que esté cremosa.\n2. Añadir la manzana picada y mezclar.\n3. Servir y agregar el huevo duro picado y el pollo desmenuzado por encima.\n4. Opcionalmente, añadir canela al gusto.",
      tiempoPreparacion: 10,
      dificultad: "Fácil",
      explicacionNutricional: "Cumple con la pauta de desayuno: 1 cereal + 1 fruta + 3 proteínas"
    },
    {
      id: 2,
      nombre: "Tostadas integrales con huevo y palta",
      descripcion: "Desayuno equilibrado con grasas saludables",
      ingredientes: [
        "2 rebanadas de pan integral (1 porción de cereal)",
        "1 huevo (1 porción de proteína)",
        "100g de pechuga de pavo (2 porciones de proteína)",
        "1/2 plátano (1 porción de fruta)",
        "30g de palta (opcional, como fuente de lípidos)"
      ],
      instrucciones: "1. Tostar el pan integral.\n2. Cocinar el huevo al gusto (revuelto o frito con mínimo aceite).\n3. Cortar el pavo en láminas finas.\n4. Untar la palta en las tostadas y añadir el huevo y el pavo encima.\n5. Consumir el plátano como acompañamiento.",
      tiempoPreparacion: 15,
      dificultad: "Fácil",
      explicacionNutricional: "Cumple con la pauta de desayuno: 1 cereal + 1 fruta + 3 proteínas"
    }
  ],
  almuerzo: [
    {
      id: 3,
      nombre: "Ensalada de pollo con quinoa",
      descripcion: "Almuerzo equilibrado rico en proteínas y fibra",
      ingredientes: [
        "60g de quinoa cruda (1.5 porciones de cereal)",
        "200g de pechuga de pollo (4 porciones de proteína)",
        "1 tomate mediano (1 porción de verdura general)",
        "100g de pepino (1 porción de verdura libre)",
        "50g de zanahoria cruda",
        "10ml de aceite de oliva (opcional)"
      ],
      instrucciones: "1. Cocinar la quinoa según las instrucciones del paquete y dejar enfriar.\n2. Cocinar la pechuga de pollo a la plancha con un poco de sal y pimienta.\n3. Cortar el tomate, el pepino y la zanahoria en cubos pequeños.\n4. Mezclar todos los ingredientes en un bowl grande.\n5. Aliñar con limón y un poco de aceite de oliva.",
      tiempoPreparacion: 25,
      dificultad: "Media",
      explicacionNutricional: "Cumple con la pauta de almuerzo: 1½ cereal + 4 proteínas + 1 verdura general + 1 verdura libre consumo"
    },
    {
      id: 4,
      nombre: "Bowl de arroz con pollo y vegetales",
      descripcion: "Plato completo ideal para después del entrenamiento",
      ingredientes: [
        "150g de arroz cocido (1.5 porciones de cereal)",
        "200g de pollo (4 porciones de proteína)",
        "100g de brócoli (1 porción de verdura general)",
        "100g de lechuga (1 porción de verdura libre)",
        "Especias al gusto"
      ],
      instrucciones: "1. Cocinar el arroz según las instrucciones del paquete.\n2. Saltear la pechuga de pollo cortada en cubos con un poco de aceite.\n3. Añadir el brócoli y cocinar hasta que esté tierno.\n4. Servir el arroz en un bowl y colocar el pollo y los vegetales encima.\n5. Añadir la lechuga fresca picada por encima.",
      tiempoPreparacion: 30,
      dificultad: "Media",
      explicacionNutricional: "Cumple con la pauta de almuerzo: 1½ cereal + 4 proteínas + 1 verdura general + 1 verdura libre consumo"
    }
  ],
  colacion_pm: [
    {
      id: 5,
      nombre: "Yogurt con frutas y granola",
      descripcion: "Colación equilibrada para la tarde",
      ingredientes: [
        "30g de granola (1 porción de cereal)",
        "115g de yogurt descremado (1 porción de lácteo)",
        "1 manzana mediana (1 porción de fruta)"
      ],
      instrucciones: "1. Colocar el yogurt en un bowl.\n2. Añadir la fruta picada.\n3. Espolvorear la granola por encima.",
      tiempoPreparacion: 5,
      dificultad: "Fácil",
      explicacionNutricional: "Cumple con la pauta de colación PM: 1 cereal + 1 lácteo medio en grasa + 1 fruta"
    },
    {
      id: 6,
      nombre: "Tostada integral con quesillo y fruta",
      descripcion: "Colación rápida y nutritiva",
      ingredientes: [
        "2 rebanadas de pan integral (1 porción de cereal)",
        "40g de quesillo (1 porción de lácteo)",
        "1 naranja mediana (1 porción de fruta)"
      ],
      instrucciones: "1. Tostar el pan integral.\n2. Añadir el quesillo en rodajas sobre las tostadas.\n3. Consumir la naranja como acompañamiento.",
      tiempoPreparacion: 5,
      dificultad: "Fácil",
      explicacionNutricional: "Cumple con la pauta de colación PM: 1 cereal + 1 lácteo medio en grasa + 1 fruta"
    }
  ],
  colacion_pre: [
    {
      id: 7,
      nombre: "Plátano pre-entrenamiento",
      descripcion: "Energía rápida antes de entrenar",
      ingredientes: [
        "1/2 plátano (1 porción de fruta)"
      ],
      instrucciones: "Consumir medio plátano aproximadamente 30 minutos antes de entrenar.",
      tiempoPreparacion: 1,
      dificultad: "Fácil",
      explicacionNutricional: "Cumple con la pauta de colación preentrenamiento: 1 fruta"
    },
    {
      id: 8,
      nombre: "Manzana pre-entrenamiento",
      descripcion: "Opción ligera antes del ejercicio",
      ingredientes: [
        "1 manzana mediana (1 porción de fruta)"
      ],
      instrucciones: "Consumir una manzana aproximadamente 30 minutos antes de entrenar.",
      tiempoPreparacion: 1,
      dificultad: "Fácil",
      explicacionNutricional: "Cumple con la pauta de colación preentrenamiento: 1 fruta"
    }
  ],
  cena: [
    {
      id: 9,
      nombre: "Bowl de arroz con atún y yogurt",
      descripcion: "Cena ligera y nutritiva",
      ingredientes: [
        "150g de arroz cocido (1.5 porciones de cereal)",
        "240g de atún en agua (4 porciones de proteína)",
        "115g de yogurt natural (1 porción de lácteo)"
      ],
      instrucciones: "1. Cocinar el arroz según las instrucciones del paquete.\n2. Escurrir bien el atún y desmenuzarlo.\n3. Mezclar el arroz con el atún.\n4. Añadir el yogurt natural como aderezo y mezclar bien.",
      tiempoPreparacion: 20,
      dificultad: "Fácil",
      explicacionNutricional: "Cumple con la pauta de cena: 1½ cereal + 4 proteínas + 1 lácteo"
    },
    {
      id: 10,
      nombre: "Wrap de pavo con queso",
      descripcion: "Cena rápida y satisfactoria",
      ingredientes: [
        "3 tortillas de maíz (1.5 porciones de cereal)",
        "200g de pechuga de pavo (4 porciones de proteína)",
        "30g de queso (1 porción de lácteo)",
        "Especias al gusto"
      ],
      instrucciones: "1. Calentar ligeramente las tortillas.\n2. Rellenar con el pavo y el queso.\n3. Añadir especias al gusto.\n4. Enrollar y servir.",
      tiempoPreparacion: 10,
      dificultad: "Fácil",
      explicacionNutricional: "Cumple con la pauta de cena: 1½ cereal + 4 proteínas + 1 lácteo"
    }
  ]
};

// Exportar todas las funciones para su uso en la aplicación
export default {
  generarRecomendacionesPlatos,
  filtrarRecetasPorPreferencias,
  recetasPredefinidas
};
