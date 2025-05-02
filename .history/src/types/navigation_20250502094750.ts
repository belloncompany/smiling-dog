export type MenuItem = {
  id: string;
  label: string;
  href: string;
  icon?: string;
  items?: MenuItem[];
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'contracts',
    label: 'Contratos',
    href: '/contracts',
    items: [
      { id: 'client-contracts', label: 'Contratos Clientes', href: '/contracts/clients' },
      { id: 'consultant-contracts', label: 'Contratos Consultores', href: '/contracts/consultants' },
      { id: 'contract-types', label: 'Tipos de Contratos', href: '/contracts/types' },
      { id: 'base-contracts', label: 'Base de Contratos', href: '/contracts/base' },
      { id: 'wyoming-contracts', label: 'Contratos Base Wyoming', href: '/contracts/wyoming' },
      { id: 'tallin-contracts', label: 'Contratos Base Tallin', href: '/contracts/tallin' },
    ]
  },
  {
    id: 'users',
    label: 'Usuarios',
    href: '/users',
    items: [
      { id: 'registered-clients', label: 'Clientes Registrados', href: '/users/clients' },
      { id: 'registered-consultants', label: 'Consultores Registrados', href: '/users/consultants' },
      { id: 'employees', label: 'Empleados', href: '/users/employees' },
      { id: 'roles', label: 'Roles', href: '/users/roles' },
      { id: 'permissions', label: 'Módulos/Permisos', href: '/users/permissions' },
    ]
  },
  {
    id: 'disputes',
    label: 'Disputas',
    href: '/disputes',
    items: [
      { id: 'open-disputes', label: 'Disputas Abiertas', href: '/disputes/open' },
      { id: 'closed-disputes', label: 'Disputas Cerradas', href: '/disputes/closed' },
      { id: 'wyoming-lawyers', label: 'Abogados Wyoming', href: '/disputes/wyoming-lawyers' },
      { id: 'tallin-lawyers', label: 'Abogados Tallin', href: '/disputes/tallin-lawyers' },
    ]
  },
  {
    id: 'meetings',
    label: 'Reuniones',
    href: '/meetings',
    items: [
      { id: 'scheduled-interviews', label: 'Entrevistas Programadas', href: '/meetings/interviews/scheduled' },
      { id: 'completed-interviews', label: 'Entrevistas Concluidas', href: '/meetings/interviews/completed' },
      { id: 'scheduled-meetings', label: 'Reuniones Programadas', href: '/meetings/scheduled' },
      { id: 'completed-meetings', label: 'Reuniones Concluidas', href: '/meetings/completed' },
      { id: 'tripartite-chat', label: 'Chat Tripartito', href: '/meetings/tripartite-chat' },
      { id: 'tripartite-meeting', label: 'Reunión Tripartita', href: '/meetings/tripartite-meeting' },
    ]
  },
  {
    id: 'payments',
    label: 'Pagos',
    href: '/payments',
    items: [
      { id: 'pending-consultant-payments', label: 'Pagos Consultores Pendientes', href: '/payments/consultants/pending' },
      { id: 'completed-consultant-payments', label: 'Pagos Consultores Completos', href: '/payments/consultants/completed' },
      { id: 'scheduled-client-payments', label: 'Pagos Clientes Programados', href: '/payments/clients/scheduled' },
      { id: 'completed-client-payments', label: 'Pagos Clientes Completos', href: '/payments/clients/completed' },
      { id: 'pending-employee-payments', label: 'Pagos Empleados', href: '/payments/employees/pending' },
      { id: 'completed-employee-payments', label: 'Pagos Empleados Completos', href: '/payments/employees/completed' },
      { id: 'client-payment-methods', label: 'Medios de Pago Clientes', href: '/payments/methods/clients' },
      { id: 'consultant-payment-methods', label: 'Medios de Pago Consultores', href: '/payments/methods/consultants' },
    ]
  },
  {
    id: 'performance',
    label: 'Rendimiento',
    href: '/performance',
    items: [
      { id: 'objectives-review', label: 'Revisión de Objetivos', href: '/performance/objectives/review' },
      { id: 'employee-objectives', label: 'Objetivos Empleados', href: '/performance/objectives/employees' },
      { id: 'employee-incentives', label: 'Incentivos Empleados', href: '/performance/incentives' },
      { id: 'financial-indicators', label: 'Indicadores Financieros', href: '/performance/financial' },
      { id: 'seller-closed-contracts', label: 'Contratos Cerrados por Vendedor', href: '/performance/sellers/closed' },
      { id: 'seller-open-contracts', label: 'Contratos Abiertos por Vendedor', href: '/performance/sellers/open' },
      { id: 'moderator-closed-disputes', label: 'Disputas Cerradas por Moderador', href: '/performance/moderators/closed' },
      { id: 'moderator-open-disputes', label: 'Disputas Abiertas por Moderador', href: '/performance/moderators/open' },
      { id: 'manager-hired-consultants', label: 'Consultores Contratados por Gestor', href: '/performance/managers/hired' },
      { id: 'manager-pending-interviews', label: 'Entrevistas Pendientes por Gestor', href: '/performance/managers/pending' },
    ]
  },
  {
    id: 'settings',
    label: 'Configuración',
    href: '/settings',
    items: [
      { id: 'languages', label: 'Idiomas', href: '/settings/languages' },
      { id: 'timezones', label: 'Zonas Horarias', href: '/settings/timezones' },
      { id: 'integrations', label: 'Integraciones', href: '/settings/integrations' },
      { id: 'partners', label: 'Partners/Proveedores', href: '/settings/partners' },
    ]
  },
  {
    id: 'benefits',
    label: 'Beneficios',
    href: '/benefits',
    items: [
      { id: 'consultant-benefits', label: 'Beneficios Consultores', href: '/benefits/consultants' },
      { id: 'vacations', label: 'Vacaciones', href: '/benefits/vacations' },
      { id: 'time-off', label: 'Tiempo Libre', href: '/benefits/time-off' },
      { id: 'maternity', label: 'Maternidad', href: '/benefits/maternity' },
      { id: 'paternity', label: 'Paternidad', href: '/benefits/paternity' },
      { id: 'pension-plan', label: 'Plan de Pensión', href: '/benefits/pension' },
      { id: 'garden-leave', label: 'Licencias de Jardín', href: '/benefits/garden-leave' },
    ]
  },
  {
    id: 'development',
    label: 'Desarrollo',
    href: '/development',
    items: [
      { id: 'training', label: 'Formaciones', href: '/development/training' },
      { id: 'certifications', label: 'Certificaciones', href: '/development/certifications' },
      { id: 'online-after-hours', label: 'After Hour En Línea', href: '/development/after-hours/online' },
      { id: 'in-person-after-hours', label: 'After Hour Presencial', href: '/development/after-hours/in-person' },
    ]
  },
  {
    id: 'documentation',
    label: 'Documentación',
    href: '/documentation',
    items: [
      { id: 'seller-manual', label: 'Manual Vendedor', href: '/documentation/manuals/seller' },
      { id: 'client-manual', label: 'Manual Cliente Empresarial', href: '/documentation/manuals/client' },
      { id: 'consultant-manual', label: 'Manual Consultor', href: '/documentation/manuals/consultant' },
      { id: 'moderator-manual', label: 'Manual Moderador', href: '/documentation/manuals/moderator' },
      { id: 'manager-manual', label: 'Manual Gestor', href: '/documentation/manuals/manager' },
      { id: 'terms-of-service', label: 'Condiciones de Servicio', href: '/documentation/terms-of-service' },
      { id: 'terms-and-conditions', label: 'Términos y Condiciones', href: '/documentation/terms-and-conditions' },
    ]
  },
  {
    id: 'pricing',
    label: 'Precios',
    href: '/pricing',
    items: [
      { id: 'consultant-cost', label: 'Costo Consultor', href: '/pricing/consultant/cost' },
      { id: 'consultant-price', label: 'Precio Consultor', href: '/pricing/consultant/price' },
      { id: 'seller-commissions', label: 'Comisiones por Vendedor', href: '/pricing/seller-commissions' },
      { id: 'client-fees', label: 'Honorarios por Clientes', href: '/pricing/client-fees' },
    ]
  },
]; 