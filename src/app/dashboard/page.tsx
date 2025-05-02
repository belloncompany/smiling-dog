"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Estadísticas rápidas */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Contratos Activos</h3>
          <p className="mt-2 text-3xl font-semibold">128</p>
          <p className="mt-1 text-sm text-green-600">+12% vs mes anterior</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Consultores</h3>
          <p className="mt-2 text-3xl font-semibold">543</p>
          <p className="mt-1 text-sm text-green-600">+8% vs mes anterior</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Disputas Abiertas</h3>
          <p className="mt-2 text-3xl font-semibold">12</p>
          <p className="mt-1 text-sm text-red-600">+2 vs mes anterior</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Pagos Pendientes</h3>
          <p className="mt-2 text-3xl font-semibold">$45.2k</p>
          <p className="mt-1 text-sm text-gray-600">Actualizado hace 5 min</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad Reciente */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {[
              'Nuevo contrato firmado con Cliente A',
              'Disputa resuelta #1234',
              'Pago procesado para Consultor B',
              'Nueva entrevista programada',
              'Actualización de términos de servicio'
            ].map((activity, i) => (
              <div key={i} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <p>{activity}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tareas Pendientes */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Tareas Pendientes</h2>
          <div className="space-y-4">
            {[
              'Revisar 3 contratos pendientes',
              'Aprobar solicitudes de vacaciones',
              'Actualizar política de pagos',
              'Reunión con equipo legal',
              'Revisar KPIs mensuales'
            ].map((task, i) => (
              <div key={i} className="flex items-center space-x-3 text-sm">
                <input type="checkbox" className="rounded text-blue-500" />
                <p>{task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 