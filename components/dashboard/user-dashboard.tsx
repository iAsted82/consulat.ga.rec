'use client';

import { QuickActions } from '@/components/common/quick-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  MapPin,
  Bell
} from 'lucide-react';

export function UserDashboard() {
  const quickActions = [
    {
      id: 'new-request',
      title: 'Nouvelle demande',
      description: 'Démarrer une nouvelle démarche',
      icon: FileText,
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
      href: '/services/new-request',
    },
    {
      id: 'appointments',
      title: 'Mes rendez-vous',
      description: 'Voir et gérer vos RDV',
      icon: Calendar,
      color: 'bg-green-100 hover:bg-green-200 text-green-700',
      href: '/appointments',
    },
    {
      id: 'track-request',
      title: 'Suivre ma demande',
      description: 'Vérifier le statut',
      icon: TrendingUp,
      color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700',
      href: '/requests/track',
    },
    {
      id: 'documents',
      title: 'Mes documents',
      description: 'Gérer vos documents',
      icon: FileText,
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-700',
      href: '/documents',
    },
    {
      id: 'assistance',
      title: 'Assistance',
      description: 'Aide et support',
      icon: Bell,
      color: 'bg-sky-100 hover:bg-sky-200 text-sky-700',
      href: '/support',
    },
    {
      id: 'profile',
      title: 'Mon profil',
      description: 'Modifier mes informations',
      icon: MapPin,
      color: 'bg-orange-100 hover:bg-orange-200 text-orange-700',
      href: '/profile',
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      title: 'Rendez-vous pour passeport',
      date: '2024-01-15',
      time: '14:00',
      location: 'Consulat Paris',
      status: 'confirmed',
    },
    {
      id: 2,
      title: 'Entretien visa étudiant',
      date: '2024-01-18',
      time: '10:30',
      location: 'Ambassade Londres',
      status: 'pending',
    },
  ];

  const activeRequests = [
    {
      id: 1,
      title: 'Demande de passeport',
      status: 'in_progress',
      progress: 65,
      lastUpdate: '2024-01-10',
    },
    {
      id: 2,
      title: 'Certificat de vie',
      status: 'pending_documents',
      progress: 30,
      lastUpdate: '2024-01-08',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700">Confirmé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-700">En cours</Badge>;
      case 'pending_documents':
        return <Badge className="bg-orange-100 text-orange-700">Documents requis</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="section-spacing">
      {/* En-tête de bienvenue */}
      <div className="gradient-bg rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Bonjour, Jean Dupont</h1>
        <p className="text-blue-100">
          Bienvenue sur votre espace personnel Consulat.ga
        </p>
      </div>

      {/* Actions rapides */}
      <div>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Actions rapides
        </h2>
        <QuickActions actions={quickActions} />
      </div>

      {/* Informations principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statut d'inscription */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Statut d'inscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Profil complété</span>
                <Badge className="bg-green-100 text-green-700">85%</Badge>
              </div>
              <Progress value={85} className="h-2" />
              <div className="text-sm text-muted-foreground">
                Il vous reste à télécharger votre justificatif de domicile
              </div>
              <Button variant="outline" size="sm">
                Compléter mon profil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Prochains rendez-vous */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Prochains rendez-vous
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{appointment.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {appointment.date} à {appointment.time}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {appointment.location}
                    </div>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                Voir tous mes rendez-vous
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demandes en cours */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Mes demandes en cours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <div key={request.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">{request.title}</div>
                  {getStatusBadge(request.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progression</span>
                    <span>{request.progress}%</span>
                  </div>
                  <Progress value={request.progress} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    Dernière mise à jour: {request.lastUpdate}
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Voir toutes mes demandes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            Notifications récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="p-1 bg-blue-500 rounded-full">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Rendez-vous confirmé</div>
                <div className="text-sm text-muted-foreground">
                  Votre rendez-vous du 15 janvier a été confirmé
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="p-1 bg-yellow-500 rounded-full">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Document requis</div>
                <div className="text-sm text-muted-foreground">
                  Veuillez télécharger votre justificatif de domicile
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}