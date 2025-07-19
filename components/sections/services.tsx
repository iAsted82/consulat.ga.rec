'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  CreditCard, 
  Calendar, 
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

export function Services() {
  const services = [
    {
      id: 'passport',
      title: 'Passeport biométrique',
      description: 'Demande et renouvellement de passeport gabonais avec suivi en temps réel',
      icon: CreditCard,
      color: 'text-blue-500',
      badge: 'Populaire',
      badgeColor: 'bg-blue-100 text-blue-700',
      features: [
        'Formulaire en ligne sécurisé',
        'Upload de photos conformes',
        'Suivi de dossier en temps réel',
        'Retrait en consulat ou livraison'
      ]
    },
    {
      id: 'visa',
      title: 'Visas et autorisations',
      description: 'Traitement des demandes de visa pour les ressortissants étrangers',
      icon: FileText,
      color: 'text-green-500',
      badge: 'Nouveau',
      badgeColor: 'bg-green-100 text-green-700',
      features: [
        'Visa touristique et affaires',
        'Visa de long séjour',
        'Autorisation de travail',
        'Visa diplomatique'
      ]
    },
    {
      id: 'civil-status',
      title: 'État civil',
      description: 'Actes de naissance, mariage, décès et autres documents officiels',
      icon: FileText,
      color: 'text-purple-500',
      badge: 'Essentiel',
      badgeColor: 'bg-purple-100 text-purple-700',
      features: [
        'Demande d\'actes de naissance',
        'Certificats de mariage',
        'Légalisation de documents',
        'Attestations diverses'
      ]
    },
    {
      id: 'appointments',
      title: 'Rendez-vous consulaires',
      description: 'Planification intelligente de vos rendez-vous avec les services consulaires',
      icon: Calendar,
      color: 'text-orange-500',
      badge: 'Pratique',
      badgeColor: 'bg-orange-100 text-orange-700',
      features: [
        'Réservation en ligne 24/7',
        'Choix du créneau horaire',
        'Rappels automatiques',
        'Reprogrammation facile'
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Services consulaires disponibles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accédez à l'ensemble des services consulaires gabonais en ligne, 
            avec des processus simplifiés et un suivi transparent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="card card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className={`w-6 h-6 ${service.color}`} />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <Badge className={service.badgeColor}>{service.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Demander ce service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Informations pratiques */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card text-center">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Délais de traitement</h3>
              <p className="text-sm text-muted-foreground">
                Délais optimisés grâce à la digitalisation des processus
              </p>
            </CardContent>
          </Card>
          
          <Card className="card text-center">
            <CardContent className="p-6">
              <MapPin className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">247 Représentations</h3>
              <p className="text-sm text-muted-foreground">
                Réseau mondial de consulats et ambassades
              </p>
            </CardContent>
          </Card>
          
          <Card className="card text-center">
            <CardContent className="p-6">
              <FileText className="w-8 h-8 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Documents sécurisés</h3>
              <p className="text-sm text-muted-foreground">
                Téléchargement et archivage sécurisés
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}