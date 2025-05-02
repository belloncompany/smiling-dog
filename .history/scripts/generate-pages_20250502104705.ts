const fs = require('fs');
const path = require('path');

interface PageConfig {
  route: string;
  title: string;
  description: string;
}

const pages: PageConfig[] = [
  // Disputas
  {
    route: 'dashboard/disputes/open',
    title: 'Disputas Abiertas',
    description: 'Gestión de disputas activas que requieren atención y resolución',
  },
  {
    route: 'dashboard/disputes/closed',
    title: 'Disputas Cerradas',
    description: 'Histórico de disputas resueltas y su documentación',
  },
  // Entrevistas
  {
    route: 'dashboard/interviews/scheduled',
    title: 'Entrevistas Programadas',
    description: 'Calendario y gestión de entrevistas próximas',
  },
  {
    route: 'dashboard/interviews/completed',
    title: 'Entrevistas Concluidas',
    description: 'Registro histórico de entrevistas realizadas',
  },
  // Pagos
  {
    route: 'dashboard/payments/consultants/pending',
    title: 'Pagos a Consultores Pendientes',
    description: 'Gestión de pagos pendientes a consultores',
  },
  {
    route: 'dashboard/payments/consultants/completed',
    title: 'Pagos a Consultores Completados',
    description: 'Registro de pagos realizados a consultores',
  },
  {
    route: 'dashboard/payments/clients/scheduled',
    title: 'Pagos de Clientes Programados',
    description: 'Control de pagos programados por clientes',
  },
  {
    route: 'dashboard/payments/clients/completed',
    title: 'Pagos de Clientes Completados',
    description: 'Historial de pagos realizados por clientes',
  },
  // Reuniones
  {
    route: 'dashboard/meetings/scheduled',
    title: 'Reuniones Programadas',
    description: 'Calendario de reuniones próximas',
  },
  {
    route: 'dashboard/meetings/completed',
    title: 'Reuniones Concluidas',
    description: 'Histórico de reuniones realizadas',
  },
  // Gestión
  {
    route: 'dashboard/management/objectives',
    title: 'Revisión de Objetivos',
    description: 'Seguimiento y evaluación de objetivos',
  },
  {
    route: 'dashboard/management/modules',
    title: 'Módulos/Permisos',
    description: 'Gestión de permisos y accesos del sistema',
  },
  {
    route: 'dashboard/management/roles',
    title: 'Roles',
    description: 'Administración de roles y responsabilidades',
  },
  // Recursos Humanos
  {
    route: 'dashboard/hr/employees',
    title: 'Empleados',
    description: 'Gestión del personal interno',
  },
  {
    route: 'dashboard/hr/languages',
    title: 'Idiomas',
    description: 'Gestión de idiomas y capacidades lingüísticas',
  },
  {
    route: 'dashboard/hr/payments/pending',
    title: 'Pagos a Empleados',
    description: 'Control de pagos pendientes a empleados',
  },
  {
    route: 'dashboard/hr/payments/completed',
    title: 'Pagos a Empleados Completos',
    description: 'Registro de pagos realizados a empleados',
  },
  // Finanzas
  {
    route: 'dashboard/finance/payment-methods/clients',
    title: 'Medios de Pago para Clientes',
    description: 'Gestión de métodos de pago disponibles para clientes',
  },
  {
    route: 'dashboard/finance/payment-methods/consultants',
    title: 'Medios de Pago para Consultores',
    description: 'Gestión de métodos de pago disponibles para consultores',
  },
  // Objetivos e Incentivos
  {
    route: 'dashboard/objectives/employees',
    title: 'Objetivos de Empleados',
    description: 'Seguimiento de objetivos del personal',
  },
  {
    route: 'dashboard/incentives/employees',
    title: 'Incentivos Empleados',
    description: 'Gestión de programas de incentivos',
  },
  // Indicadores
  {
    route: 'dashboard/indicators/financial',
    title: 'Indicadores Financieros',
    description: 'Métricas y KPIs financieros',
  },
  // Contratos
  {
    route: 'dashboard/contracts/closed-by-seller',
    title: 'Contratos Cerrados por Vendedor',
    description: 'Seguimiento de contratos finalizados por vendedor',
  },
  {
    route: 'dashboard/contracts/open-by-seller',
    title: 'Contratos Abiertos por Vendedor',
    description: 'Seguimiento de contratos activos por vendedor',
  },
  // Disputas por Moderador
  {
    route: 'dashboard/disputes/closed-by-moderator',
    title: 'Disputas Cerradas por Moderador',
    description: 'Registro de disputas resueltas por moderador',
  },
  {
    route: 'dashboard/disputes/open-by-moderator',
    title: 'Disputas Abiertas por Moderador',
    description: 'Seguimiento de disputas activas por moderador',
  },
  // Consultores por Gestor
  {
    route: 'dashboard/consultants/hired-by-manager',
    title: 'Consultores Contratados por Gestor',
    description: 'Registro de consultores contratados por cada gestor',
  },
  {
    route: 'dashboard/consultants/pending-interviews-by-manager',
    title: 'Consultores con Entrevistas Pendientes por Gestor',
    description: 'Seguimiento de entrevistas pendientes por gestor',
  },
  // Configuración
  {
    route: 'dashboard/settings/timezones',
    title: 'Zonas Horarias',
    description: 'Configuración de zonas horarias',
  },
  {
    route: 'dashboard/settings/integrations',
    title: 'Integraciones',
    description: 'Gestión de integraciones con sistemas externos',
  },
  // Comisiones y Honorarios
  {
    route: 'dashboard/finance/commissions',
    title: 'Comisiones por Vendedor',
    description: 'Control de comisiones del equipo de ventas',
  },
  {
    route: 'dashboard/finance/fees',
    title: 'Honorarios por Clientes',
    description: 'Gestión de honorarios por cliente',
  },
  // Contratos Base
  {
    route: 'dashboard/contracts/base',
    title: 'Base de Contratos',
    description: 'Biblioteca de contratos base',
  },
  {
    route: 'dashboard/contracts/wyoming',
    title: 'Contratos Base Oficina en Wyoming',
    description: 'Contratos específicos para Wyoming',
  },
  {
    route: 'dashboard/contracts/tallin',
    title: 'Contratos Base Oficina en Tallin',
    description: 'Contratos específicos para Tallin',
  },
  {
    route: 'dashboard/contracts/types',
    title: 'Tipos de Contratos',
    description: 'Catálogo de tipos de contratos disponibles',
  },
  // Legal
  {
    route: 'dashboard/legal/lawyers/wyoming',
    title: 'Abogados Litigadores Wyoming',
    description: 'Directorio de abogados en Wyoming',
  },
  {
    route: 'dashboard/legal/lawyers/tallin',
    title: 'Abogados Litigadores Tallin',
    description: 'Directorio de abogados en Tallin',
  },
  // Partners y Background
  {
    route: 'dashboard/partners',
    title: 'Partners/Proveedores',
    description: 'Gestión de socios y proveedores',
  },
  {
    route: 'dashboard/background-checks',
    title: 'Background Criminales',
    description: 'Verificación de antecedentes',
  },
  // Consultores
  {
    route: 'dashboard/consultants/availability',
    title: 'Tiempo Disponible por Consultor',
    description: 'Control de disponibilidad de consultores',
  },
  // Documentación Legal
  {
    route: 'dashboard/legal/terms-of-service',
    title: 'Condiciones de Servicio',
    description: 'Términos y condiciones de uso del servicio',
  },
  {
    route: 'dashboard/legal/terms-and-conditions',
    title: 'Términos y Condiciones',
    description: 'Condiciones generales de uso',
  },
  // Manuales
  {
    route: 'dashboard/manuals/seller',
    title: 'Manual de Uso para Vendedor',
    description: 'Guía de uso para el equipo de ventas',
  },
  {
    route: 'dashboard/manuals/client',
    title: 'Manual de Uso para Cliente Empresarial',
    description: 'Guía de uso para clientes empresariales',
  },
  {
    route: 'dashboard/manuals/consultant',
    title: 'Manual de Uso para Consultor',
    description: 'Guía de uso para consultores',
  },
  {
    route: 'dashboard/manuals/moderator',
    title: 'Manual de Uso para Moderador',
    description: 'Guía de uso para moderadores',
  },
  {
    route: 'dashboard/manuals/manager',
    title: 'Manual de Uso para Gestor',
    description: 'Guía de uso para gestores',
  },
  // Comunicación
  {
    route: 'dashboard/communication/chat',
    title: 'Chat Tripartito de Gestión',
    description: 'Comunicación entre moderador, consultor y cliente',
  },
  {
    route: 'dashboard/communication/meetings',
    title: 'Reunión Tripartita de Moderación',
    description: 'Gestión de reuniones tripartitas',
  },
  // Procesos
  {
    route: 'dashboard/processes/early-exit',
    title: 'Proceso de Salida Anticipada de Consultor',
    description: 'Gestión de salidas anticipadas',
  },
  // Beneficios
  {
    route: 'dashboard/benefits/garden-leave',
    title: 'Licencias de Jardín por Consultor',
    description: 'Gestión de licencias de jardín',
  },
  {
    route: 'dashboard/benefits/consultants',
    title: 'Beneficios a Consultores',
    description: 'Administración de beneficios para consultores',
  },
  {
    route: 'dashboard/benefits/vacation',
    title: 'Vacaciones',
    description: 'Gestión de períodos vacacionales',
  },
  {
    route: 'dashboard/benefits/time-off',
    title: 'Tiempo Libre',
    description: 'Control de tiempo libre y ausencias',
  },
  {
    route: 'dashboard/benefits/maternity',
    title: 'Maternidad',
    description: 'Gestión de licencias por maternidad',
  },
  {
    route: 'dashboard/benefits/paternity',
    title: 'Paternidad',
    description: 'Gestión de licencias por paternidad',
  },
  {
    route: 'dashboard/benefits/pension',
    title: 'Plan de Pensión',
    description: 'Administración de planes de pensión',
  },
  // Formación
  {
    route: 'dashboard/training/courses',
    title: 'Formaciones',
    description: 'Gestión de programas de formación',
  },
  {
    route: 'dashboard/training/certifications',
    title: 'Certificaciones',
    description: 'Control de certificaciones',
  },
  // Eventos
  {
    route: 'dashboard/events/online',
    title: 'After Hour En Línea',
    description: 'Gestión de eventos virtuales',
  },
  {
    route: 'dashboard/events/in-person',
    title: 'After Hour En Presencial',
    description: 'Gestión de eventos presenciales',
  },
  // Costos y Precios
  {
    route: 'dashboard/finance/consultant-cost',
    title: 'Costo Consultor',
    description: 'Gestión de costos por consultor',
  },
  {
    route: 'dashboard/finance/consultant-price',
    title: 'Precio Consultor',
    description: 'Gestión de precios por consultor',
  },
];

const template = (title: string, description: string) => `"use client";

import { PageTemplate } from '@/components/shared/PageTemplate';

export default function Page() {
  return (
    <PageTemplate
      title="${title}"
      description="${description}"
    />
  );
}
`;

function createDirectoryIfNotExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function generatePages() {
  const baseDir = path.join(process.cwd(), 'src', 'app');

  pages.forEach(({ route, title, description }) => {
    // Remove the /dashboard prefix if it exists
    const cleanRoute = route.replace(/^dashboard\//, '');
    const fullPath = path.join(baseDir, cleanRoute);
    createDirectoryIfNotExists(fullPath);

    const filePath = path.join(fullPath, 'page.tsx');
    fs.writeFileSync(filePath, template(title, description));

    console.log(`Generated page: ${cleanRoute}`);
  });
}

generatePages(); 