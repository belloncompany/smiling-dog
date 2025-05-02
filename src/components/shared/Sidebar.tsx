"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users, FileText, AlertTriangle, Calendar,
  DollarSign, ChartBar, Settings, Book,
  Shield, Briefcase, Award, Heart,
  MessageSquare, Clock, GraduationCap, 
  PartyPopper, ChevronDown
} from 'lucide-react';

interface MenuItem {
  label: string;
  href?: string;
  icon?: any;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Contratos',
    icon: FileText,
    submenu: [
      { label: 'Base de Contratos', href: '/dashboard/contracts/base' },
      { label: 'Contratos Wyoming', href: '/dashboard/contracts/wyoming' },
      { label: 'Contratos Tallin', href: '/dashboard/contracts/tallin' },
      { label: 'Tipos de Contratos', href: '/dashboard/contracts/types' },
      { label: 'Por Vendedor', submenu: [
        { label: 'Contratos Abiertos', href: '/dashboard/contracts/open-by-seller' },
        { label: 'Contratos Cerrados', href: '/dashboard/contracts/closed-by-seller' },
      ]},
    ]
  },
  {
    label: 'Usuarios',
    icon: Users,
    submenu: [
      { label: 'Clientes Registrados', href: '/dashboard/clients/registered' },
      { label: 'Consultores Registrados', href: '/dashboard/consultants/registered' },
      { label: 'Empleados', href: '/dashboard/hr/employees' },
    ]
  },
  {
    label: 'Disputas',
    icon: AlertTriangle,
    submenu: [
      { label: 'Disputas Abiertas', href: '/dashboard/disputes/open' },
      { label: 'Disputas Cerradas', href: '/dashboard/disputes/closed' },
      { label: 'Por Moderador', submenu: [
        { label: 'Abiertas', href: '/dashboard/disputes/open-by-moderator' },
        { label: 'Cerradas', href: '/dashboard/disputes/closed-by-moderator' },
      ]},
    ]
  },
  {
    label: 'Reuniones',
    icon: Calendar,
    submenu: [
      { label: 'Entrevistas Programadas', href: '/dashboard/interviews/scheduled' },
      { label: 'Entrevistas Concluidas', href: '/dashboard/interviews/completed' },
      { label: 'Reuniones Programadas', href: '/dashboard/meetings/scheduled' },
      { label: 'Reuniones Concluidas', href: '/dashboard/meetings/completed' },
    ]
  },
  {
    label: 'Pagos',
    icon: DollarSign,
    submenu: [
      { label: 'Consultores', submenu: [
        { label: 'Pagos Pendientes', href: '/dashboard/payments/consultants/pending' },
        { label: 'Pagos Completados', href: '/dashboard/payments/consultants/completed' },
      ]},
      { label: 'Clientes', submenu: [
        { label: 'Pagos Programados', href: '/dashboard/payments/clients/scheduled' },
        { label: 'Pagos Completados', href: '/dashboard/payments/clients/completed' },
      ]},
      { label: 'Empleados', submenu: [
        { label: 'Pagos Pendientes', href: '/dashboard/hr/payments/pending' },
        { label: 'Pagos Completados', href: '/dashboard/hr/payments/completed' },
      ]},
    ]
  },
  {
    label: 'Rendimiento',
    icon: ChartBar,
    submenu: [
      { label: 'Objetivos', href: '/dashboard/management/objectives' },
      { label: 'Indicadores Financieros', href: '/dashboard/indicators/financial' },
      { label: 'Comisiones', href: '/dashboard/finance/commissions' },
      { label: 'Honorarios', href: '/dashboard/finance/fees' },
    ]
  },
  {
    label: 'Configuración',
    icon: Settings,
    submenu: [
      { label: 'Módulos/Permisos', href: '/dashboard/management/modules' },
      { label: 'Roles', href: '/dashboard/management/roles' },
      { label: 'Zonas Horarias', href: '/dashboard/settings/timezones' },
      { label: 'Integraciones', href: '/dashboard/settings/integrations' },
      { label: 'Medios de Pago', submenu: [
        { label: 'Para Clientes', href: '/dashboard/finance/payment-methods/clients' },
        { label: 'Para Consultores', href: '/dashboard/finance/payment-methods/consultants' },
      ]},
    ]
  },
  {
    label: 'Documentación',
    icon: Book,
    submenu: [
      { label: 'Términos', submenu: [
        { label: 'Condiciones de Servicio', href: '/dashboard/legal/terms-of-service' },
        { label: 'Términos y Condiciones', href: '/dashboard/legal/terms-and-conditions' },
      ]},
      { label: 'Manuales', submenu: [
        { label: 'Para Vendedor', href: '/dashboard/manuals/seller' },
        { label: 'Para Cliente', href: '/dashboard/manuals/client' },
        { label: 'Para Consultor', href: '/dashboard/manuals/consultant' },
        { label: 'Para Moderador', href: '/dashboard/manuals/moderator' },
        { label: 'Para Gestor', href: '/dashboard/manuals/manager' },
      ]},
    ]
  },
  {
    label: 'Legal',
    icon: Shield,
    submenu: [
      { label: 'Abogados Wyoming', href: '/dashboard/legal/lawyers/wyoming' },
      { label: 'Abogados Tallin', href: '/dashboard/legal/lawyers/tallin' },
      { label: 'Background Checks', href: '/dashboard/background-checks' },
    ]
  },
  {
    label: 'Partners',
    icon: Briefcase,
    href: '/dashboard/partners',
  },
  {
    label: 'Beneficios',
    icon: Heart,
    submenu: [
      { label: 'Consultores', href: '/dashboard/benefits/consultants' },
      { label: 'Garden Leave', href: '/dashboard/benefits/garden-leave' },
      { label: 'Vacaciones', href: '/dashboard/benefits/vacation' },
      { label: 'Tiempo Libre', href: '/dashboard/benefits/time-off' },
      { label: 'Maternidad', href: '/dashboard/benefits/maternity' },
      { label: 'Paternidad', href: '/dashboard/benefits/paternity' },
      { label: 'Plan de Pensión', href: '/dashboard/benefits/pension' },
    ]
  },
  {
    label: 'Comunicación',
    icon: MessageSquare,
    submenu: [
      { label: 'Chat Tripartito', href: '/dashboard/communication/chat' },
      { label: 'Reuniones Tripartitas', href: '/dashboard/communication/meetings' },
    ]
  },
  {
    label: 'Gestión de Tiempo',
    icon: Clock,
    submenu: [
      { label: 'Disponibilidad Consultores', href: '/dashboard/consultants/availability' },
      { label: 'Salidas Anticipadas', href: '/dashboard/processes/early-exit' },
    ]
  },
  {
    label: 'Formación',
    icon: GraduationCap,
    submenu: [
      { label: 'Cursos', href: '/dashboard/training/courses' },
      { label: 'Certificaciones', href: '/dashboard/training/certifications' },
    ]
  },
  {
    label: 'Eventos',
    icon: PartyPopper,
    submenu: [
      { label: 'After Hour Online', href: '/dashboard/events/online' },
      { label: 'After Hour Presencial', href: '/dashboard/events/in-person' },
    ]
  },
];

function MenuItem({ item, level = 0 }: { item: MenuItem; level?: number }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = item.href === pathname;
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <div>
      {item.href ? (
        <Link
          href={item.href}
          className={`
            flex items-center space-x-2 px-4 py-2 text-sm rounded-lg
            ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
            ${level > 0 ? 'ml-4' : ''}
          `}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          <span>{item.label}</span>
        </Link>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg
            ${level > 0 ? 'ml-4' : ''}
            text-gray-700 hover:bg-gray-100
          `}
        >
          <div className="flex items-center space-x-2">
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.label}</span>
          </div>
          {hasSubmenu && (
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            />
          )}
        </button>
      )}
      
      {hasSubmenu && isOpen && (
        <div className="mt-1">
          {item.submenu!.map((subItem, index) => (
            <MenuItem key={index} item={subItem} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900">Panel Admin</h1>
      </div>
      
      <nav className="mt-4 space-y-1">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </nav>
    </div>
  );
} 