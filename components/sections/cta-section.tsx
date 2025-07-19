'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Shield, Globe, Clock } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="card overflow-hidden">
          <div className="gradient-bg p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Commencez dès maintenant
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de ressortissants gabonais qui utilisent déjà 
              Consulat.ga pour leurs démarches administratives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-accent-gold text-black hover:bg-accent-gold/90 font-semibold"
                asChild
              >
                <Link href="/login">
                  Créer mon compte
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/contact">
                  Nous contacter
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">100% Sécurisé</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-sm">Accès Mondial</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Support 24/7</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}