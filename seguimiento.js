// Sistema de seguimiento de comidas
// Este archivo contiene la lógica para registrar y visualizar el progreso del usuario

// Función para registrar una comida
export async function registrarComida(userId, datos) {
  try {
    const { 
      fecha, 
      tiempoComida, 
      alimentos, 
      notas 
    } = datos;
    
    // En una implementación real, esto se guardaría en la base de datos
    // Por ahora, simulamos el guardado devolviendo un objeto de respuesta
    
    // Verificar cumplimiento con la pauta nutricional
    const cumplimiento = verificarCumplimientoPauta(tiempoComida, alimentos);
    
    return {
      id: Date.now(), // Simulación de ID único
      fecha,
      tiempoComida,
      alimentos,
      notas,
      cumplimiento
    };
  } catch (error) {
    console.error('Error al registrar comida:', error);
    throw error;
  }
}

// Función para verificar el cumplimiento de la pauta nutricional
function verificarCumplimientoPauta(tiempoComida, alimentos) {
  // Definir requisitos según la pauta nutricional
  const requisitos = {
    desayuno: {
      cereal: 1,
      fruta: 1,
      proteina: 3
    },
    almuerzo: {
      cereal: 1.5,
      proteina: 4,
      verduraGeneral: 1,
      verduraLibre: 1
    },
    colacion_pm: {
      cereal: 1,
      lacteo: 1,
      fruta: 1
    },
    colacion_pre: {
      fruta: 1
    },
    cena: {
      cereal: 1.5,
      proteina: 4,
      lacteo: 1
    }
  };
  
  // Contar porciones por categoría
  const porciones = {
    cereal: 0,
    fruta: 0,
    proteina: 0,
    verduraGeneral: 0,
    verduraLibre: 0,
    lacteo: 0,
    leguminosa: 0
  };
  
  // Sumar porciones de cada alimento según su categoría
  alimentos.forEach(alimento => {
    if (alimento.categoria === 'cereal') porciones.cereal += alimento.porciones;
    else if (alimento.categoria === 'fruta') porciones.fruta += alimento.porciones;
    else if (alimento.categoria === 'proteina') porciones.proteina += alimento.porciones;
    else if (alimento.categoria === 'verduraGeneral') porciones.verduraGeneral += alimento.porciones;
    else if (alimento.categoria === 'verduraLibre') porciones.verduraLibre += alimento.porciones;
    else if (alimento.categoria === 'lacteo') porciones.lacteo += alimento.porciones;
    else if (alimento.categoria === 'leguminosa') porciones.leguminosa += alimento.porciones;
  });
  
  // Verificar cumplimiento según el tiempo de comida
  const req = requisitos[tiempoComida];
  if (!req) return { porcentaje: 0, mensaje: 'Tiempo de comida no reconocido' };
  
  // Calcular porcentaje de cumplimiento
  let cumplidos = 0;
  let total = 0;
  let detalles = [];
  
  for (const [categoria, requerido] of Object.entries(req)) {
    total++;
    const actual = porciones[categoria] || 0;
    
    if (actual >= requerido) {
      cumplidos++;
      detalles.push(`✓ ${categoria}: ${actual}/${requerido}`);
    } else {
      detalles.push(`✗ ${categoria}: ${actual}/${requerido}`);
    }
  }
  
  const porcentaje = total > 0 ? Math.round((cumplidos / total) * 100) : 0;
  
  return {
    porcentaje,
    detalles,
    mensaje: porcentaje === 100 
      ? '¡Excelente! Cumples perfectamente con tu pauta nutricional.' 
      : `Cumples con el ${porcentaje}% de tu pauta nutricional.`
  };
}

// Función para obtener el registro de comidas de un usuario
export async function obtenerRegistroComidas(userId, filtros = {}) {
  try {
    // En una implementación real, esto se obtendría de la base de datos
    // Por ahora, devolvemos datos de ejemplo
    
    const { fechaInicio, fechaFin, tiempoComida } = filtros;
    
    // Datos de ejemplo
    const registros = generarDatosEjemplo(userId);
    
    // Aplicar filtros si existen
    let registrosFiltrados = [...registros];
    
    if (fechaInicio) {
      registrosFiltrados = registrosFiltrados.filter(r => new Date(r.fecha) >= new Date(fechaInicio));
    }
    
    if (fechaFin) {
      registrosFiltrados = registrosFiltrados.filter(r => new Date(r.fecha) <= new Date(fechaFin));
    }
    
    if (tiempoComida) {
      registrosFiltrados = registrosFiltrados.filter(r => r.tiempoComida === tiempoComida);
    }
    
    return registrosFiltrados;
  } catch (error) {
    console.error('Error al obtener registro de comidas:', error);
    throw error;
  }
}

// Función para generar datos de ejemplo
function generarDatosEjemplo(userId) {
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);
  const anteayer = new Date(hoy);
  anteayer.setDate(hoy.getDate() - 2);
  
  return [
    {
      id: 1,
      userId,
      fecha: hoy.toISOString().split('T')[0],
      tiempoComida: 'desayuno',
      alimentos: [
        { id: 16, nombre: 'Pan integral', categoria: 'cereal', porciones: 1 },
        { id: 12, nombre: 'Manzana', categoria: 'fruta', porciones: 1 },
        { id: 21, nombre: 'Huevo', categoria: 'proteina', porciones: 1 },
        { id: 9, nombre: 'Pechuga de pollo', categoria: 'proteina', porciones: 2 }
      ],
      notas: 'Desayuno completo',
      cumplimiento: {
        porcentaje: 100,
        detalles: [
          '✓ cereal: 1/1',
          '✓ fruta: 1/1',
          '✓ proteina: 3/3'
        ],
        mensaje: '¡Excelente! Cumples perfectamente con tu pauta nutricional.'
      }
    },
    {
      id: 2,
      userId,
      fecha: ayer.toISOString().split('T')[0],
      tiempoComida: 'almuerzo',
      alimentos: [
        { id: 1, nombre: 'Arroz', categoria: 'cereal', porciones: 1.5 },
        { id: 9, nombre: 'Pechuga de pollo', categoria: 'proteina', porciones: 4 },
        { id: 17, nombre: 'Tomate', categoria: 'verduraGeneral', porciones: 1 },
        { id: 3, nombre: 'Lechuga', categoria: 'verduraLibre', porciones: 1 }
      ],
      notas: 'Almuerzo balanceado',
      cumplimiento: {
        porcentaje: 100,
        detalles: [
          '✓ cereal: 1.5/1.5',
          '✓ proteina: 4/4',
          '✓ verduraGeneral: 1/1',
          '✓ verduraLibre: 1/1'
        ],
        mensaje: '¡Excelente! Cumples perfectamente con tu pauta nutricional.'
      }
    },
    {
      id: 3,
      userId,
      fecha: anteayer.toISOString().split('T')[0],
      tiempoComida: 'cena',
      alimentos: [
        { id: 1, nombre: 'Arroz', categoria: 'cereal', porciones: 1 },
        { id: 9, nombre: 'Pechuga de pollo', categoria: 'proteina', porciones: 3 },
        { id: 5, nombre: 'Yogurt', categoria: 'lacteo', porciones: 1 }
      ],
      notas: 'Cena ligera',
      cumplimiento: {
        porcentaje: 67,
        detalles: [
          '✗ cereal: 1/1.5',
          '✗ proteina: 3/4',
          '✓ lacteo: 1/1'
        ],
        mensaje: 'Cumples con el 67% de tu pauta nutricional.'
      }
    }
  ];
}

// Función para obtener estadísticas de cumplimiento
export async function obtenerEstadisticas(userId, periodo = 'semana') {
  try {
    // En una implementación real, esto se calcularía a partir de datos en la base de datos
    // Por ahora, generamos estadísticas de ejemplo
    
    // Obtener registros
    const registros = await obtenerRegistroComidas(userId);
    
    // Calcular cumplimiento promedio
    const cumplimientoPromedio = registros.reduce((sum, r) => sum + r.cumplimiento.porcentaje, 0) / registros.length;
    
    // Generar datos para gráfico según el periodo
    let datosGrafico = [];
    
    if (periodo === 'semana') {
      // Datos para los últimos 7 días
      const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      datosGrafico = diasSemana.map((dia, index) => {
        // Simulamos diferentes porcentajes de cumplimiento
        const porcentaje = index < 5 ? 70 + Math.floor(Math.random() * 30) : 0;
        return { dia, porcentaje };
      });
    } else if (periodo === 'mes') {
      // Datos para las últimas 4 semanas
      datosGrafico = [
        { semana: 'Semana 1', porcentaje: 75 + Math.floor(Math.random() * 25) },
        { semana: 'Semana 2', porcentaje: 75 + Math.floor(Math.random() * 25) },
        { semana: 'Semana 3', porcentaje: 75 + Math.floor(Math.random() * 25) },
        { semana: 'Semana 4', porcentaje: 75 + Math.floor(Math.random() * 25) }
      ];
    }
    
    // Calcular distribución por tiempo de comida
    const distribucionTiemposComida = {
      desayuno: { total: 0, cumplimiento: 0 },
      almuerzo: { total: 0, cumplimiento: 0 },
      colacion_pm: { total: 0, cumplimiento: 0 },
      colacion_pre: { total: 0, cumplimiento: 0 },
      cena: { total: 0, cumplimiento: 0 }
    };
    
    registros.forEach(r => {
      if (distribucionTiemposComida[r.tiempoComida]) {
        distribucionTiemposComida[r.tiempoComida].total++;
        distribucionTiemposComida[r.tiempoComida].cumplimiento += r.cumplimiento.porcentaje;
      }
    });
    
    // Calcular promedio de cumplimiento por tiempo de comida
    for (const tiempo in distribucionTiemposComida) {
      if (distribucionTiemposComida[tiempo].total > 0) {
        distribucionTiemposComida[tiempo].promedio = 
          Math.round(distribucionTiemposComida[tiempo].cumplimiento / distribucionTiemposComida[tiempo].total);
      } else {
        distribucionTiemposComida[tiempo].promedio = 0;
      }
    }
    
    return {
      cumplimientoPromedio: Math.round(cumplimientoPromedio),
      datosGrafico,
      distribucionTiemposComida,
      totalRegistros: registros.length,
      registrosPerfectos: registros.filter(r => r.cumplimiento.porcentaje === 100).length
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
}

// Función para registrar otros indicadores (agua, sueño, suplementos)
export async function registrarIndicadores(userId, datos) {
  try {
    const { 
      fecha, 
      aguaLitros, 
      suenoHoras, 
      suplementos, 
      entrenamientos,
      notas 
    } = datos;
    
    // En una implementación real, esto se guardaría en la base de datos
    // Por ahora, simulamos el guardado devolviendo un objeto de respuesta
    
    return {
      id: Date.now(), // Simulación de ID único
      userId,
      fecha,
      aguaLitros,
      suenoHoras,
      suplementos,
      entrenamientos,
      notas
    };
  } catch (error) {
    console.error('Error al registrar indicadores:', error);
    throw error;
  }
}

// Función para obtener el registro de indicadores
export async function obtenerRegistroIndicadores(userId, filtros = {}) {
  try {
    // En una implementación real, esto se obtendría de la base de datos
    // Por ahora, devolvemos datos de ejemplo
    
    const { fechaInicio, fechaFin } = filtros;
    
    // Datos de ejemplo
    const registros = generarDatosIndicadoresEjemplo(userId);
    
    // Aplicar filtros si existen
    let registrosFiltrados = [...registros];
    
    if (fechaInicio) {
      registrosFiltrados = registrosFiltrados.filter(r => new Date(r.fecha) >= new Date(fechaInicio));
    }
    
    if (fechaFin) {
      registrosFiltrados = registrosFiltrados.filter(r => new Date(r.fecha) <= new Date(fechaFin));
    }
    
    return registrosFiltrados;
  } catch (error) {
    console.error('Error al obtener registro de indicadores:', error);
    throw error;
  }
}

// Función para generar datos de indicadores de ejemplo
function generarDatosIndicadoresEjemplo(userId) {
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);
  const anteayer = new Date(hoy);
  anteayer.setDate(hoy.getDate() - 2);
  
  return [
    {
      id: 1,
      userId,
      fecha: hoy.toISOString().split('T')[0],
      aguaLitros: 3.0,
      suenoHoras: 7.5,
      suplementos: {
        proteina: true,
        creatina: true,
        omega3: true,
        zma: false
      },
      entrenamientos: {
        tipo: 'pesas',
        duracion: 60,
        intensidad: 'alta'
      },
      notas: 'Buen día, me sentí con energía'
    },
    {
      id: 2,
      userId,
      fecha: ayer.toISOString().split('T')[0],
      aguaLitros: 2.5,
      suenoHoras: 6.5,
      suplementos: {
        proteina: true,
        creatina: true,
        omega3: true,
        zma: true
      },
      entrenamientos: {
        tipo: 'crossfit',
        duracion: 45,
        intensidad: 'alta'
      },
      notas: 'Me sentí un poco cansado'
    },
    {
      id: 3,
      userId,
      fecha: anteayer.toISOString().split('T')[0],
      aguaLitros: 3.2,
      suenoHoras: 8.0,
      suplementos: {
        proteina: true,
        creatina: true,
        omega3: true,
        zma: true
      },
      entrenamientos: {
        tipo: 'descanso',
        duracion: 0,
        intensidad: 'ninguna'
      },
      notas: 'Día de descanso'
    }
  ];
}

// Exportar todas las funciones para su uso en la aplicación
export default {
  registrarComida,
  obtenerRegistroComidas,
  obtenerEstadisticas,
  registrarIndicadores,
  obtenerRegistroIndicadores
};
