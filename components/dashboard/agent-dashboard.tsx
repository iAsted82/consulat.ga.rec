'use client';

import { QuickActions } from '@/components/common/quick-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Users, 
  Phone,
  Mail,
  Clock,
  CheckCircle
} from 'lucide-react';

export function AgentDashboard() {
  const quickActions = [
    {
      id: 'register-appointment',
      title: 'Enregistrer RDV',
      description: 'Saisir nouveau rendez-vous',
      icon: Calendar,
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
      href: '/agent/appointments',
    },
    {
      id: 'data-entry',
      title: 'Saisie données',
      description: 'Traitement des formulaires',
      icon: FileText,
      color: 'bg-green-100 hover:bg-green-200 text-green-700',
      href: '/agent/data-entry',
    },
    {
      id: 'customer-service',
      title: 'Accueil usagers',
      description: 'Information et orientation',
      icon: Users,
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
      href: '/agent/reception',
    },
    {
      id: 'phone-support',
      title: 'Support téléphonique',
      description: 'Répondre aux appels',
      icon: Phone,
      color: 'bg-orange-100 hover:bg-orange-200 text-orange-700',
      href: '/agent/phone',
    },
  ];

  return (
    <div className="section-spacing">
      {/* En-tête */}
      <div className="gradient-bg rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Espace Agent</h1>
        <p className="text-blue-100">
          Bonjour Sophie Leblanc, Agent consulaire
        </p>
      </div>

      {/* Tâches du jour */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">RDV à traiter</p>
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
                <p className="text-sm font-medium text-muted-foreground">Formulaires</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Appels en attente</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Phone className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Terminées</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Actions rapides</h2>
        <QuickActions actions={quickActions} />
      </div>

      {/* Tâches en cours */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Tâches en cours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">Rendez-vous #{i + 100}</div>
                  <div className="text-sm text-muted-foreground">
                    Marie Dubois • 14:30 - Demande de passeport
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700">En cours</Badge>
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