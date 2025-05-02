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
      { label: 'Base de Contratos', href: '/contracts/base' },
      { label: 'Contratos Wyoming', href: '/contracts/wyoming' },
      { label: 'Contratos Tallin', href: '/contracts/tallin' },
      { label: 'Tipos de Contratos', href: '/contracts/types' },
      { label: 'Por Vendedor', submenu: [
        { label: 'Contratos Abiertos', href: '/contracts/open-by-seller' },
        { label: 'Contratos Cerrados', href: '/contracts/closed-by-seller' },
      ]},
    ]
  },
  {
    label: 'Usuarios',
    icon: Users,
    submenu: [
      { label: 'Clientes Registrados', href: '/clients/registered' },
      { label: 'Consultores Registrados', href: '/consultants/registered' },
      { label: 'Empleados', href: '/hr/employees' },
    ]
  },
  {
    label: 'Disputas',
    icon: AlertTriangle,
    submenu: [
      { label: 'Disputas Abiertas', href: '/disputes/open' },
      { label: 'Disputas Cerradas', href: '/disputes/closed' },
      { label: 'Por Moderador', submenu: [
        { label: 'Abiertas', href: '/disputes/open-by-moderator' },
        { label: 'Cerradas', href: '/disputes/closed-by-moderator' },
      ]},
    ]
  },
  {
    label: 'Reuniones',
    icon: Calendar,
    submenu: [
      { label: 'Entrevistas Programadas', href: '/interviews/scheduled' },
      { label: 'Entrevistas Concluidas', href: '/interviews/completed' },
      { label: 'Reuniones Programadas', href: '/meetings/scheduled' },
      { label: 'Reuniones Concluidas', href: '/meetings/completed' },
    ]
  },
  {
    label: 'Pagos',
    icon: DollarSign,
    submenu: [
      { label: 'Consultores', submenu: [
        { label: 'Pagos Pendientes', href: '/payments/consultants/pending' },
        { label: 'Pagos Completados', href: '/payments/consultants/completed' },
      ]},
      { label: 'Clientes', submenu: [
        { label: 'Pagos Programados', href: '/payments/clients/scheduled' },
        { label: 'Pagos Completados', href: '/payments/clients/completed' },
      ]},
      { label: 'Empleados', submenu: [
        { label: 'Pagos Pendientes', href: '/hr/payments/pending' },
        { label: 'Pagos Completados', href: '/hr/payments/completed' },
      ]},
    ]
  },
  {
    label: 'Rendimiento',
    icon: ChartBar,
    submenu: [
      { label: 'Objetivos', href: '/management/objectives' },
      { label: 'Indicadores Financieros', href: '/indicators/financial' },
      { label: 'Comisiones', href: '/finance/commissions' },
      { label: 'Honorarios', href: '/finance/fees' },
    ]
  },
  {
    label: 'Configuración',
    icon: Settings,
    submenu: [
      { label: 'Módulos/Permisos', href: '/management/modules' },
      { label: 'Roles', href: '/management/roles' },
      { label: 'Zonas Horarias', href: '/settings/timezones' },
      { label: 'Integraciones', href: '/settings/integrations' },
      { label: 'Medios de Pago', submenu: [
        { label: 'Para Clientes', href: '/finance/payment-methods/clients' },
        { label: 'Para Consultores', href: '/finance/payment-methods/consultants' },
      ]},
    ]
  },
  {
    label: 'Documentación',
    icon: Book,
    submenu: [
      { label: 'Términos', submenu: [
        { label: 'Condiciones de Servicio', href: '/legal/terms-of-service' },
        { label: 'Términos y Condiciones', href: '/legal/terms-and-conditions' },
      ]},
      { label: 'Manuales', submenu: [
        { label: 'Para Vendedor', href: '/manuals/seller' },
        { label: 'Para Cliente', href: '/manuals/client' },
        { label: 'Para Consultor', href: '/manuals/consultant' },
        { label: 'Para Moderador', href: '/manuals/moderator' },
        { label: 'Para Gestor', href: '/manuals/manager' },
      ]},
    ]
  },
  {
    label: 'Legal',
    icon: Shield,
    submenu: [
      { label: 'Abogados Wyoming', href: '/legal/lawyers/wyoming' },
      { label: 'Abogados Tallin', href: '/legal/lawyers/tallin' },
      { label: 'Background Checks', href: '/background-checks' },
    ]
  },
  {
    label: 'Partners',
    icon: Briefcase,
    href: '/partners',
  },
  {
    label: 'Beneficios',
    icon: Heart,
    submenu: [
      { label: 'Consultores', href: '/benefits/consultants' },
      { label: 'Garden Leave', href: '/benefits/garden-leave' },
      { label: 'Vacaciones', href: '/benefits/vacation' },
      { label: 'Tiempo Libre', href: '/benefits/time-off' },
      { label: 'Maternidad', href: '/benefits/maternity' },
      { label: 'Paternidad', href: '/benefits/paternity' },
      { label: 'Plan de Pensión', href: '/benefits/pension' },
    ]
  },
  {
    label: 'Comunicación',
    icon: MessageSquare,
    submenu: [
      { label: 'Chat Tripartito', href: '/communication/chat' },
      { label: 'Reuniones Tripartitas', href: '/communication/meetings' },
    ]
  },
  {
    label: 'Gestión de Tiempo',
    icon: Clock,
    submenu: [
      { label: 'Disponibilidad Consultores', href: '/consultants/availability' },
      { label: 'Salidas Anticipadas', href: '/processes/early-exit' },
    ]
  },
  {
    label: 'Formación',
    icon: GraduationCap,
    submenu: [
      { label: 'Cursos', href: '/training/courses' },
      { label: 'Certificaciones', href: '/training/certifications' },
    ]
  },
  {
    label: 'Eventos',
    icon: PartyPopper,
    submenu: [
      { label: 'After Hour Online', href: '/events/online' },
      { label: 'After Hour Presencial', href: '/events/in-person' },
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