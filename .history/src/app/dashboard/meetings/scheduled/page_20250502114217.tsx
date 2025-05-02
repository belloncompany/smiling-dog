"use client";

import { PageTemplate } from '@/components/shared/PageTemplate';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  location: string;
}

const mockMeetings: Meeting[] = [
  {
    id: 'M001',
    title: 'Entrevista Inicial - Desarrollador Senior',
    date: '2024-03-15',
    time: '10:00 - 11:00',
    participants: ['Juan Pérez', 'María García', 'Carlos López'],
    location: 'Google Meet'
  },
  {
    id: 'M002',
    title: 'Seguimiento Proyecto Cloud',
    date: '2024-03-15',
    time: '14:30 - 15:30',
    participants: ['Ana Martínez', 'Pedro Rodríguez'],
    location: 'Sala Virtual 2'
  },
];

export default function ScheduledMeetingsPage() {
  return (
    <PageTemplate
      title="Reuniones Programadas"
      description="Calendario y gestión de próximas reuniones y entrevistas"
      isUnderConstruction={false}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {mockMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(meeting.date).toLocaleDateString('es-AR')}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{meeting.participants.join(', ')}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
