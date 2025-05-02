import * as fs from 'fs';
import * as path from 'path';

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
  // ... Agregar el resto de las páginas aquí
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
    const fullPath = path.join(baseDir, route);
    createDirectoryIfNotExists(fullPath);

    const filePath = path.join(fullPath, 'page.tsx');
    fs.writeFileSync(filePath, template(title, description));

    console.log(`Generated page: ${route}`);
  });
}

generatePages(); 