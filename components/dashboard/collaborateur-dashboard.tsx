'use client';

import { QuickActions } from '@/components/common/quick-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

export function CollaborateurDashboard() {
  const quickActions = [
    {
      id: 'validate-requests',
      title: 'Valider les demandes',
      description: 'Traitement niveau 1',
      icon: CheckCircle,
      color: 'bg-green-100 hover:bg-green-200 text-green-700',
      href: '/collaborateur/validate',
    },
    {
      id: 'schedule-appointments',
      title: 'Programmer RDV',
      description: 'Organiser les rendez-vous',
      icon: Calendar,
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
      href: '/collaborateur/appointments',
    },
    {
      id: 'manage-documents',
      title: 'Gérer documents',
      description: 'Vérifier et archiver',
      icon: FileText,
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
      href: '/collaborateur/documents',
    },
    {
      id: 'assist-users',
      title: 'Assistance usagers',
      description: 'Support et information',
      icon: Users,
      color: 'bg-orange-100 hover:bg-orange-200 text-orange-700',
      href: '/collaborateur/support',
    },
  ];

  return (
    <div className="section-spacing">
      {/* En-tête */}
      <div className="gradient-bg rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Espace Collaborateur</h1>
        <p className="text-blue-100">
          Bonjour Jean Martin, Vice-Consul
        </p>
      </div>

      {/* Statistiques du jour */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">À traiter</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Validées</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">RDV programmés</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Productivité</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Actions rapides</h2>
        <QuickActions actions={quickActions} />
      </div>

      {/* Demandes en attente */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Demandes en attente de validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">Demande de visa #{i + 2000}</div>
                  <div className="text-sm text-muted-foreground">
                    Sophie Martin • Déposée le 12/01/2024
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>
                  <Button variant="outline" size="sm">
                    Examiner
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