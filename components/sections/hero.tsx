'use client';

import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, Shield, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="text-center space-y-8">
          {/* Logo et badge */}
          <div className="flex justify-center">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Globe className="w-8 h-8 text-white" />
              <span className="text-white font-semibold">Consulat.ga</span>
            </div>
          </div>
          
          {/* Titre principal */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
              Services Consulaires
              <span className="block text-accent-gold">Digitalisés</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Plateforme moderne de gestion des services consulaires gabonais. 
              Simplifiez vos démarches administratives où que vous soyez dans le monde.
            </p>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent-gold text-black hover:bg-accent-gold/90 font-semibold"
              asChild
            >
              <Link href="/login">
                Accéder à mon espace
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link href="/services">
                Découvrir les services
              </Link>
            </Button>
          </div>
          
          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">247</div>
              <div className="text-blue-100">Représentations mondiales</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">99.8%</div>
              <div className="text-blue-100">Sécurité garantie</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-blue-100">Support disponible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}