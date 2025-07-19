'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Globe, 
  Building, 
  Users, 
  TrendingUp,
  MapPin,
  Calendar,
  FileText,
  Settings,
  Plus,
  BarChart3
} from 'lucide-react';

export function SuperAdminDashboard() {
  const globalStats = [
    {
      title: 'Organisations mondiales',
      value: '247',
      change: '+12',
      icon: Building,
      color: 'text-blue-500',
    },
    {
      title: 'Utilisateurs actifs',
      value: '15,420',
      change: '+245',
      icon: Users,
      color: 'text-green-500',
    },
    {
      title: 'Demandes ce mois',
      value: '2,847',
      change: '+18%',
      icon: FileText,
      color: 'text-purple-500',
    },
    {
      title: 'Rendez-vous programmés',
      value: '1,234',
      change: '+8%',
      icon: Calendar,
      color: 'text-orange-500',
    },
  ];

  const recentOrganizations = [
    {
      id: 1,
      name: 'Consulat du Gabon à Marseille',
      type: 'CONSULAT',
      country: 'France',
      status: 'active',
      users: 45,
      lastUpdate: '2024-01-10',
    },
    {
      id: 2,
      name: 'Ambassade du Gabon au Maroc',
      type: 'AMBASSADE',
      country: 'Maroc',
      status: 'active',
      users: 78,
      lastUpdate: '2024-01-08',
    },
    {
      id: 3,
      name: 'Bureau consulaire - Dubaï',
      type: 'BUREAU_CONSULAIRE',
      country: 'Émirats Arabes Unis',
      status: 'pending',
      users: 12,
      lastUpdate: '2024-01-05',
    },
  ];

  const getOrgTypeColor = (type: string) => {
    switch (type) {
      case 'AMBASSADE':
        return 'bg-blue-100 text-blue-700';
      case 'CONSULAT_GENERAL':
        return 'bg-green-100 text-green-700';
      case 'CONSULAT':
        return 'bg-yellow-100 text-yellow-700';
      case 'BUREAU_CONSULAIRE':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Actif</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-700">Inactif</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="section-spacing">
      {/* En-tête */}
      <div className="gradient-bg rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Globe className="w-6 h-6" />
          Tableau de bord global
        </h1>
        <p className="text-blue-100">
          Gestion de l'écosystème diplomatique gabonais mondial
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {globalStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="card card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Actions rapides Super Admin */}
      <div>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Actions d'administration
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/organizations/new">
            <Button 
            className="quick-action bg-blue-100 hover:bg-blue-200 text-blue-700"
            >
            <div>
              <Plus className="w-6 h-6" />
              <span className="font-medium">Nouvelle organisation</span>
              <span className="text-sm text-blue-600">Créer une représentation</span>
            </div>
            </Button>
          </Link>
          
          <Link href="/admin/organizations">
            <Button 
            className="quick-action bg-green-100 hover:bg-green-200 text-green-700"
            >
            <div>
              <Building className="w-6 h-6" />
              <span className="font-medium">Gérer les organisations</span>
              <span className="text-sm text-green-600">Voir toutes les structures</span>
            </div>
            </Button>
          </Link>
          
          <Link href="/admin/users">
            <Button 
            className="quick-action bg-purple-100 hover:bg-purple-200 text-purple-700"
            >
            <div>
              <Users className="w-6 h-6" />
              <span className="font-medium">Gestion des utilisateurs</span>
              <span className="text-sm text-purple-600">Comptes et rôles</span>
            </div>
            </Button>
          </Link>
          
          <Link href="/admin/analytics">
            <Button 
            className="quick-action bg-orange-100 hover:bg-orange-200 text-orange-700"
            >
            <div>
              <BarChart3 className="w-6 h-6" />
              <span className="font-medium">Rapports et analytics</span>
              <span className="text-sm text-orange-600">Statistiques détaillées</span>
            </div>
            </Button>
          </Link>
          
          <Link href="/admin/world-map">
            <Button 
            className="quick-action bg-red-100 hover:bg-red-200 text-red-700"
            >
            <div>
              <MapPin className="w-6 h-6" />
              <span className="font-medium">Carte mondiale</span>
              <span className="text-sm text-red-600">Vue géographique</span>
            </div>
            </Button>
          </Link>
          
          <Link href="/admin/settings">
            <Button 
            className="quick-action bg-teal-100 hover:bg-teal-200 text-teal-700"
            >
            <div>
              <Settings className="w-6 h-6" />
              <span className="font-medium">Configuration système</span>
              <span className="text-sm text-teal-600">Paramètres globaux</span>
            </div>
            </Button>
          </Link>
        </div>
      </div>

      {/* Organisations récentes */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-500" />
            Organisations récemment créées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrganizations.map((org) => (
              <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="font-medium">{org.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Badge className={getOrgTypeColor(org.type)}>
                      {org.type.replace('_', ' ')}
                    </Badge>
                    <span>•</span>
                    <span>{org.country}</span>
                    <span>•</span>
                    <span>{org.users} utilisateurs</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Créée le {org.lastUpdate}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(org.status)}
                  <Button variant="outline" size="sm">
                    Gérer
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Voir toutes les organisations
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="p-1 bg-green-500 rounded-full">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Nouvelle organisation créée</div>
                  <div className="text-sm text-muted-foreground">
                    Consulat du Gabon à Marseille
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="p-1 bg-blue-500 rounded-full">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Nouvel administrateur</div>
                  <div className="text-sm text-muted-foreground">
                    Marie Dubois - Ambassade Londres
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="p-1 bg-purple-500 rounded-full">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Mise à jour système</div>
                  <div className="text-sm text-muted-foreground">
                    Version 2.1.0 déployée
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              Performance globale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Organisations actives</span>
                <span className="text-sm text-muted-foreground">98.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Temps de réponse moyen</span>
                <span className="text-sm text-green-600">2.3 jours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Satisfaction utilisateurs</span>
                <span className="text-sm text-green-600">4.8/5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Demandes traitées</span>
                <span className="text-sm text-blue-600">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}