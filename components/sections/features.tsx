'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  Globe, 
  Shield, 
  Clock, 
  Smartphone, 
  FileText, 
  Users,
  Calendar,
  MapPin
} from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Globe,
      title: 'Réseau mondial',
      description: 'Accès à toutes les représentations diplomatiques gabonaises dans le monde',
      color: 'text-blue-500',
    },
    {
      icon: Shield,
      title: 'Sécurité maximale',
      description: 'Vos données personnelles sont protégées par un cryptage de niveau bancaire',
      color: 'text-green-500',
    },
    {
      icon: Clock,
      title: 'Disponibilité 24/7',
      description: 'Effectuez vos démarches à tout moment, depuis n\'importe où',
      color: 'text-orange-500',
    },
    {
      icon: Smartphone,
      title: 'Interface mobile',
      description: 'Application optimisée pour smartphone et tablette',
      color: 'text-purple-500',
    },
    {
      icon: FileText,
      title: 'Documents sécurisés',
      description: 'Téléchargement et gestion de tous vos documents officiels',
      color: 'text-red-500',
    },
    {
      icon: Users,
      title: 'Support personnalisé',
      description: 'Assistance dédiée par nos agents consulaires',
      color: 'text-teal-500',
    },
    {
      icon: Calendar,
      title: 'Rendez-vous en ligne',
      description: 'Planification intelligente de vos rendez-vous consulaires',
      color: 'text-indigo-500',
    },
    {
      icon: MapPin,
      title: 'Géolocalisation',
      description: 'Trouvez automatiquement la représentation la plus proche',
      color: 'text-pink-500',
    },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Une plateforme moderne et sécurisée
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez toutes les fonctionnalités qui font de Consulat.ga 
            la référence en matière de services consulaires digitaux.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card card-hover">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-muted rounded-full">
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}