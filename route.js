// API route para el chatbot nutricional
// Este archivo maneja las solicitudes a la API de ChatGPT

import { NextResponse } from 'next/server';
import { generarRespuestaChatbot, detectarTipoConsulta, extraerParametros } from '@/lib/chatbot';

export async function POST(request) {
  try {
    // Obtener datos de la solicitud
    const { mensaje, historialChat } = await request.json();
    
    if (!mensaje) {
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      );
    }
    
    // Detectar el tipo de consulta
    const tipoConsulta = detectarTipoConsulta(mensaje);
    
    // Extraer parámetros adicionales según el tipo de consulta
    const parametrosAdicionales = extraerParametros(mensaje, tipoConsulta);
    
    // Generar respuesta del chatbot
    const respuesta = await generarRespuestaChatbot(
      mensaje,
      historialChat,
      tipoConsulta,
      parametrosAdicionales
    );
    
    // Devolver la respuesta
    return NextResponse.json({ respuesta });
  } catch (error) {
    console.error('Error en la API del chatbot:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
