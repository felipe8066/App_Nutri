// Archivo para la integración con la API de ChatGPT
// Este archivo contiene la lógica para conectar con la API de OpenAI
// y generar respuestas personalizadas basadas en la pauta nutricional

// Simulación de OpenAI para desarrollo
// En producción, se usaría la biblioteca real de OpenAI
const openaiSimulado = {
  chat: {
    completions: {
      create: async ({ messages, temperature, max_tokens }) => {
        console.log('Simulando llamada a OpenAI con:', { messages, temperature, max_tokens });
        
        // Simular una respuesta basada en el último mensaje
        const lastMessage = messages[messages.length - 1].content.toLowerCase();
        let respuestaSimulada = '';
        
        if (lastMessage.includes('pollo') && lastMessage.includes('brócoli')) {
          respuestaSimulada = "Puedes preparar una ensalada de pollo con brócoli y quinoa:\n\n- 150g de pechuga de pollo (3 porciones de proteína)\n- 1 taza de brócoli (1 porción de verdura general)\n- 3/4 taza de quinoa cocida (1.5 porciones de cereal)\n\nEsta combinación cumple perfectamente con tu pauta de almuerzo.";
        } else if (lastMessage.includes('agua')) {
          respuestaSimulada = "Según tu pauta nutricional, debes consumir al menos 3.5 litros de agua diarios. Esto es importante para mantener una buena hidratación, especialmente considerando tu rutina de entrenamiento.";
        } else if (lastMessage.includes('suplemento') || lastMessage.includes('proteína')) {
          respuestaSimulada = "Según tu pauta nutricional, debes tomar los siguientes suplementos:\n\n- Proteína: 1 scoop reemplaza a 2 CBG dentro de la pauta\n- Creatina: 5g diarios\n- Cafeína: 150mg como pre-entrenamiento\n- OMEGA 3: 2 cápsulas diarias\n- ZMA: 1 cápsula al día antes de dormir";
        } else {
          respuestaSimulada = "Estoy aquí para ayudarte con tu pauta nutricional. Puedo recomendarte recetas que cumplan con tus requerimientos, responder dudas sobre alimentos específicos o ayudarte a entender mejor tu plan de alimentación.";
        }
        
        return {
          choices: [
            {
              message: {
                content: respuestaSimulada
              }
            }
          ]
        };
      }
    }
  }
};

// Contexto base con la información de la pauta nutricional
const pautaNutricionalContext = `
Eres un asistente nutricional especializado que conoce en detalle la pauta nutricional de Felipe Aguilar.

PAUTA NUTRICIONAL:

DÍA REGULAR:
- Desayuno: 1 cereal + 1 fruta + 3 proteínas
- Almuerzo: 1 ½ cereal + 4 proteínas + 1 verdura general + 1 verdura libre consumo
- Colación PM: 1 cereal + 1 lácteo medio en grasa + 1 fruta
- Colación preentrenamiento: 1 fruta
- Cena: 1 ½ cereal + 4 proteínas + 1 lácteo

DÍA CON LEGUMBRES:
- Desayuno: 1 cereal + 1 fruta + 3 proteínas
- Almuerzo: 1 cereal + 1 ½ leguminosa + 1 verdura general + 1 verdura libre consumo
- Colación PM: 1 cereal + 1 lácteo medio en grasa + 1 fruta
- Colación preentrenamiento: 1 fruta
- Cena: 1 ½ cereal + 4 proteínas + 1 lácteo

OBJETIVOS:
- Recomposición corporal, disminución masa grasa
- Mantener por lo menos 4 sesiones de entrenamiento semanal, hacer 1 de crossfit
- Reforzar hidratación (3,5 litros de agua diarios)
- Mantener uso de suplementos

SUPLEMENTOS:
- Proteína: 1 scoop reemplaza a 2 CBG dentro de la pauta de alimentación
- Creatina monohidratada: 5g diarios
- Cafeína: 150mg como pre-entrenamiento (30-40 min antes)
- OMEGA 3: 2 cápsulas diarias
- ZMA: 1 cápsula al día antes de dormir
- Electrolitos: 1 sobre en 500ml, 3 veces a la semana en entrenamiento

Conoces todas las porciones de intercambio para cada grupo de alimentos y puedes recomendar platos que cumplan con la pauta.
`;

// Prompts específicos para diferentes tipos de consultas nutricionales
const prompts = {
  recomendacionPlato: (ingredientes, tiempoComida) => {
    return `${pautaNutricionalContext}
    
    El usuario tiene disponibles los siguientes ingredientes: ${ingredientes.join(', ')}.
    Necesita una recomendación para ${tiempoComida}.
    
    Genera una receta que cumpla con la pauta nutricional para ese tiempo de comida, utilizando los ingredientes disponibles.
    Incluye:
    1. Nombre del plato
    2. Ingredientes con cantidades exactas según las porciones de la pauta
    3. Instrucciones de preparación paso a paso
    4. Explicación de cómo este plato cumple con la pauta nutricional
    `;
  },
  
  consultaAlimento: (alimento) => {
    return `${pautaNutricionalContext}
    
    El usuario pregunta sobre ${alimento}.
    
    Proporciona información sobre:
    1. A qué grupo de alimentos pertenece según la pauta
    2. Cuál es la porción recomendada
    3. En qué tiempos de comida sería más adecuado consumirlo
    4. Beneficios nutricionales específicos
    5. Sugerencias de combinación con otros alimentos dentro de la pauta
    `;
  },
  
  dudaGeneral: (pregunta) => {
    return `${pautaNutricionalContext}
    
    El usuario pregunta: "${pregunta}"
    
    Responde de manera clara y concisa, basándote en la pauta nutricional y en conocimientos generales de nutrición.
    Si la pregunta no está relacionada con la nutrición o la pauta específica, indica amablemente que tu especialidad es brindar asesoramiento nutricional.
    `;
  },
  
  seguimientoProgreso: (datosRegistro) => {
    return `${pautaNutricionalContext}
    
    El usuario ha registrado los siguientes datos de seguimiento:
    ${JSON.stringify(datosRegistro, null, 2)}
    
    Analiza el cumplimiento de la pauta nutricional y proporciona:
    1. Evaluación del cumplimiento (porcentaje aproximado)
    2. Aspectos positivos que está siguiendo correctamente
    3. Áreas de mejora específicas
    4. Recomendaciones prácticas para ajustarse mejor a la pauta
    5. Palabras de motivación para mantener el progreso
    `;
  }
};

// Función principal para generar respuestas del chatbot
export async function generarRespuestaChatbot(mensaje, historialChat = [], tipoConsulta = 'dudaGeneral', parametrosAdicionales = {}) {
  try {
    // Determinar qué prompt utilizar según el tipo de consulta
    let promptFinal;
    
    switch (tipoConsulta) {
      case 'recomendacionPlato':
        promptFinal = prompts.recomendacionPlato(
          parametrosAdicionales.ingredientes || [], 
          parametrosAdicionales.tiempoComida || 'almuerzo'
        );
        break;
      case 'consultaAlimento':
        promptFinal = prompts.consultaAlimento(parametrosAdicionales.alimento || '');
        break;
      case 'seguimientoProgreso':
        promptFinal = prompts.seguimientoProgreso(parametrosAdicionales.datosRegistro || {});
        break;
      case 'dudaGeneral':
      default:
        promptFinal = prompts.dudaGeneral(mensaje);
        break;
    }
    
    // Construir los mensajes para la API incluyendo el historial de chat
    const mensajes = [
      { role: 'system', content: promptFinal }
    ];
    
    // Añadir historial de chat si existe
    if (historialChat && historialChat.length > 0) {
      historialChat.forEach(msg => {
        mensajes.push({
          role: msg.tipo === 'usuario' ? 'user' : 'assistant',
          content: msg.texto
        });
      });
    }
    
    // Añadir el mensaje actual del usuario
    mensajes.push({ role: 'user', content: mensaje });
    
    // Llamar a la API simulada de OpenAI
    const respuesta = await openaiSimulado.chat.completions.create({
      model: 'gpt-4', // Usar el modelo más avanzado para mejor comprensión nutricional
      messages: mensajes,
      temperature: 0.7, // Balance entre creatividad y precisión
      max_tokens: 800, // Respuestas detalladas pero no excesivamente largas
    });
    
    // Devolver el texto de la respuesta
    return respuesta.choices[0].message.content;
  } catch (error) {
    console.error('Error al generar respuesta del chatbot:', error);
    return 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta nuevamente.';
  }
}

// Función para detectar el tipo de consulta basado en el análisis del mensaje
export function detectarTipoConsulta(mensaje) {
  const mensajeLower = mensaje.toLowerCase();
  
  // Detectar si es una consulta sobre recomendación de plato
  if (
    mensajeLower.includes('receta') || 
    mensajeLower.includes('plato') || 
    mensajeLower.includes('preparar') || 
    mensajeLower.includes('cocinar') ||
    (mensajeLower.includes('qué') && mensajeLower.includes('comer'))
  ) {
    return 'recomendacionPlato';
  }
  
  // Detectar si es una consulta sobre un alimento específico
  if (
    mensajeLower.includes('alimento') ||
    mensajeLower.includes('porción') ||
    mensajeLower.includes('cantidad') ||
    mensajeLower.includes('grupo')
  ) {
    // Intentar extraer el alimento mencionado
    // En una implementación real, esto sería más sofisticado
    const palabrasClave = mensajeLower.split(' ');
    const alimentosPosibles = ['pollo', 'arroz', 'pan', 'leche', 'huevo', 'fruta', 'verdura', 'carne'];
    
    for (const palabra of palabrasClave) {
      if (alimentosPosibles.includes(palabra)) {
        return 'consultaAlimento';
      }
    }
  }
  
  // Detectar si es una consulta sobre seguimiento de progreso
  if (
    mensajeLower.includes('progreso') ||
    mensajeLower.includes('avance') ||
    mensajeLower.includes('cumplimiento') ||
    mensajeLower.includes('seguimiento')
  ) {
    return 'seguimientoProgreso';
  }
  
  // Por defecto, considerar como duda general
  return 'dudaGeneral';
}

// Función para extraer parámetros adicionales del mensaje
export function extraerParametros(mensaje, tipoConsulta) {
  const mensajeLower = mensaje.toLowerCase();
  const parametros = {};
  
  if (tipoConsulta === 'recomendacionPlato') {
    // Extraer ingredientes mencionados
    const ingredientesPosibles = [
      'pollo', 'carne', 'pescado', 'arroz', 'quinoa', 'pasta', 'pan', 
      'leche', 'yogurt', 'queso', 'huevo', 'manzana', 'plátano', 'naranja',
      'brócoli', 'zanahoria', 'tomate', 'lechuga', 'espinaca', 'cebolla',
      'lentejas', 'garbanzos', 'porotos', 'nueces', 'almendras', 'palta'
    ];
    
    const ingredientesEncontrados = [];
    
    for (const ingrediente of ingredientesPosibles) {
      if (mensajeLower.includes(ingrediente)) {
        ingredientesEncontrados.push(ingrediente);
      }
    }
    
    parametros.ingredientes = ingredientesEncontrados.length > 0 ? ingredientesEncontrados : ['pollo', 'arroz', 'verduras'];
    
    // Extraer tiempo de comida
    if (mensajeLower.includes('desayuno')) {
      parametros.tiempoComida = 'desayuno';
    } else if (mensajeLower.includes('almuerzo')) {
      parametros.tiempoComida = 'almuerzo';
    } else if (mensajeLower.includes('colación') || mensajeLower.includes('colacion')) {
      if (mensajeLower.includes('pm')) {
        parametros.tiempoComida = 'colación PM';
      } else if (mensajeLower.includes('pre') || mensajeLower.includes('antes de entrenar')) {
        parametros.tiempoComida = 'colación preentrenamiento';
      } else {
        parametros.tiempoComida = 'colación';
      }
    } else if (mensajeLower.includes('cena')) {
      parametros.tiempoComida = 'cena';
    } else {
      parametros.tiempoComida = 'almuerzo'; // Por defecto
    }
  } else if (tipoConsulta === 'consultaAlimento') {
    // Extraer el alimento mencionado
    const alimentosPosibles = [
      'pollo', 'carne', 'pescado', 'arroz', 'quinoa', 'pasta', 'pan', 
      'leche', 'yogurt', 'queso', 'huevo', 'manzana', 'plátano', 'naranja',
      'brócoli', 'zanahoria', 'tomate', 'lechuga', 'espinaca', 'cebolla',
      'lentejas', 'garbanzos', 'porotos', 'nueces', 'almendras', 'palta'
    ];
    
    for (const alimento of alimentosPosibles) {
      if (mensajeLower.includes(alimento)) {
        parametros.alimento = alimento;
        break;
      }
    }
  }
  
  return parametros;
}

// Exportar todas las funciones para su uso en la aplicación
export default {
  generarRespuestaChatbot,
  detectarTipoConsulta,
  extraerParametros
};
