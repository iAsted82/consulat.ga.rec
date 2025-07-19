'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Users, MapPin, Plus } from 'lucide-react';

export default function OrganizationsPage() {
  const { data: session } = useSession();

  // Verify admin access
  if (session?.user?.role !== 'SUPER_ADMIN' && session?.user?.role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Accès refusé</h2>
          <p className="text-muted-foreground">Vous devez être administrateur pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  const organizations = [
    {
      id: '1',
      name: 'Consulat Général du Gabon en France',
      type: 'CONSULAT_GENERAL',
      country: 'France',
      city: 'Paris',
      status: 'active',
      userCount: 156,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Ambassade du Gabon au Maroc',
      type: 'AMBASSADE',
      country: 'Maroc',
      city: 'Rabat',
      status: 'active',
      userCount: 89,
      createdAt: '2024-01-10',
    },
    {
      id: '3',
      name: 'Bureau consulaire - Dubaï',
      type: 'BUREAU_CONSULAIRE',
      country: 'Émirats Arabes Unis',
      city: 'Dubaï',
      status: 'pending',
      userCount: 23,
      createdAt: '2024-01-08',
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestion des organisations</h1>
          <p className="text-muted-foreground">
            {session?.user?.role === 'SUPER_ADMIN' 
              ? 'Gérez toutes les organisations diplomatiques' 
              : 'Gérez votre organisation'
            }
          </p>
        </div>
        {session?.user?.role === 'SUPER_ADMIN' && (
          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle organisation
          </Button>
        )}
      </div>

      {/* Liste des organisations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {organizations
          .filter(org => 
            session?.user?.role === 'SUPER_ADMIN' || 
            org.id === session?.user?.organizationId
          )
          .map((org) => (
            <Card key={org.id} className="card card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    <Badge className={getOrgTypeColor(org.type)}>
                      {org.type.replace('_', ' ')}
                    </Badge>
                  </div>
                  {getStatusBadge(org.status)}
                </div>
                <CardTitle className="text-lg">{org.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{org.city}, {org.country}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{org.userCount} utilisateurs</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Créée le {org.createdAt}
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      Gérer l'organisation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {session?.user?.role === 'SUPER_ADMIN' && (
        <Card className="card mt-8">
          <CardHeader>
            <CardTitle>Actions globales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                <Building className="w-8 h-8 mb-2 text-blue-500" />
                <span className="font-medium">Créer une organisation</span>
                <span className="text-sm text-muted-foreground">Nouvelle représentation</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                <Users className="w-8 h-8 mb-2 text-green-500" />
                <span className="font-medium">Import en masse</span>
                <span className="text-sm text-muted-foreground">Ajouter plusieurs orgs</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                <MapPin className="w-8 h-8 mb-2 text-purple-500" />
                <span className="font-medium">Carte mondiale</span>
                <span className="text-sm text-muted-foreground">Vue géographique</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}