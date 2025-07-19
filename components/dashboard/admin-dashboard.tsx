'use client';

import { QuickActions } from '@/components/common/quick-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp,
  Settings,
  Plus,
  BarChart3,
  MapPin
} from 'lucide-react';

export function AdminDashboard() {
  const quickActions = [
    {
      id: 'manage-staff',
      title: 'Gérer le personnel',
      description: 'Ajouter et modifier les comptes',
      icon: Users,
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
      href: '/admin/staff',
    },
    {
      id: 'appointments',
      title: 'Gérer les RDV',
      description: 'Calendrier des rendez-vous',
      icon: Calendar,
      color: 'bg-green-100 hover:bg-green-200 text-green-700',
      href: '/admin/appointments',
    },
    {
      id: 'requests',
      title: 'Traiter les demandes',
      description: 'Validation des dossiers',
      icon: FileText,
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
      href: '/admin/requests',
    },
    {
      id: 'reports',
      title: 'Rapports',
      description: 'Statistiques et analytics',
      icon: BarChart3,
      color: 'bg-orange-100 hover:bg-orange-200 text-orange-700',
      href: '/admin/reports',
    },
  ];

  const stats = [
    { title: 'Demandes en attente', value: '23', icon: FileText, color: 'text-orange-500' },
    { title: 'RDV cette semaine', value: '45', icon: Calendar, color: 'text-green-500' },
    { title: 'Personnel actif', value: '12', icon: Users, color: 'text-blue-500' },
    { title: 'Taux de satisfaction', value: '4.8', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="section-spacing">
      {/* En-tête */}
      <div className="gradient-bg rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Building className="w-6 h-6" />
          Administration Consulat
        </h1>
        <p className="text-blue-100">
          Consulat Général du Gabon - Paris
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Actions rapides */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Actions rapides</h2>
        <QuickActions actions={quickActions} />
      </div>

      {/* Demandes récentes */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Demandes récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">Demande de passeport #{i + 1000}</div>
                  <div className="text-sm text-muted-foreground">
                    Jean Dupont • Déposée le 10/01/2024
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>
                  <Button variant="outline" size="sm">
                    Traiter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}