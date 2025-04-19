import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-6">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Mi Nutrición</h1>
        
        {/* Resumen del Día */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Resumen del Día Actual</h2>
          
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Agua: 1.5/3.5L</span>
                <span className="text-sm">43%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "43%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Sueño: 6/7.5h</span>
                <span className="text-sm">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm">Suplementos:</span>
              <div className="flex space-x-1">
                <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</span>
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">✓</span>
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">✓</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Próxima Comida */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Próxima Comida</h2>
          
          <div className="mb-2">
            <h3 className="font-medium">Almuerzo (12:30)</h3>
            <ul className="text-sm text-gray-600 ml-4 list-disc">
              <li>1½ cereal</li>
              <li>4 proteínas</li>
              <li>1 verdura general</li>
              <li>1 verdura libre</li>
            </ul>
          </div>
          
          <div className="flex space-x-2">
            <Link href="/comidas/registrar" className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
              Registrar
            </Link>
            <Link href="/comidas/sugerencias" className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
              Sugerencias
            </Link>
          </div>
        </div>
        
        {/* Progreso Semanal */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Progreso Semanal</h2>
          
          <div className="h-32 flex items-end justify-between px-2">
            <div className="flex flex-col items-center">
              <div className="bg-blue-400 w-8 rounded-t-md" style={{ height: "60%" }}></div>
              <span className="text-xs mt-1">Lun</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-400 w-8 rounded-t-md" style={{ height: "80%" }}></div>
              <span className="text-xs mt-1">Mar</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-400 w-8 rounded-t-md" style={{ height: "70%" }}></div>
              <span className="text-xs mt-1">Mié</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-400 w-8 rounded-t-md" style={{ height: "90%" }}></div>
              <span className="text-xs mt-1">Jue</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-500 w-8 rounded-t-md" style={{ height: "75%" }}></div>
              <span className="text-xs mt-1">Vie</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 w-8 rounded-t-md" style={{ height: "0%" }}></div>
              <span className="text-xs mt-1">Sáb</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 w-8 rounded-t-md" style={{ height: "0%" }}></div>
              <span className="text-xs mt-1">Dom</span>
            </div>
          </div>
        </div>
        
        {/* Barra de navegación */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center p-2 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs">Inicio</span>
          </Link>
          <Link href="/comidas" className="flex flex-col items-center p-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs">Comidas</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center p-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-xs">Chat</span>
          </Link>
          <Link href="/perfil" className="flex flex-col items-center p-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">Perfil</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
