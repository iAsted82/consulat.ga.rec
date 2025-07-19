'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Shield, 
  Mail, 
  Database, 
  Globe,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Key,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

export default function SystemSettingsPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // Verify super admin access
  if (session?.user?.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Accès refusé</h2>
          <p className="text-muted-foreground">Vous devez être super administrateur pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  // System configuration state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Consulat.ga',
    siteDescription: 'Plateforme Diplomatique Gabonaise',
    contactEmail: 'contact@consulat.ga',
    supportEmail: 'support@consulat.ga',
    timezone: 'Europe/Paris',
    language: 'fr',
    maintenanceMode: false,
    registrationEnabled: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorRequired: false,
    ipWhitelistEnabled: false,
    auditLogRetention: 365,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.consulat.ga',
    smtpPort: 587,
    smtpUsername: 'noreply@consulat.ga',
    smtpPassword: '••••••••',
    smtpEncryption: 'TLS',
    emailFromName: 'Consulat.ga',
    emailFromAddress: 'noreply@consulat.ga',
    emailEnabled: true,
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackupEnabled: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    lastBackup: '2024-01-15 03:00:00',
    backupSize: '2.4 GB',
    cloudBackupEnabled: true,
  });

  const handleSaveSettings = async (settingsType: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Paramètres ${settingsType} sauvegardés avec succès`);
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Email de test envoyé avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email de test');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackupNow = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setBackupSettings(prev => ({
        ...prev,
        lastBackup: new Date().toLocaleString('fr-FR'),
      }));
      toast.success('Sauvegarde créée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la création de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section-spacing">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Paramètres système</h1>
        <p className="text-muted-foreground">
          Configuration globale de la plateforme consulaire
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="backup">Sauvegarde</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        {/* Paramètres généraux */}
        <TabsContent value="general">
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Paramètres généraux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de contact</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select 
                    value={generalSettings.timezone}
                    onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                      <SelectItem value="Africa/Libreville">Africa/Libreville (UTC+1)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                      <SelectItem value="Asia/Dubai">Asia/Dubai (UTC+4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Langue par défaut</Label>
                  <Select 
                    value={generalSettings.language}
                    onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Description du site</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mode maintenance</Label>
                    <p className="text-sm text-muted-foreground">Désactiver l'accès public temporairement</p>
                  </div>
                  <Switch
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Inscription ouverte</Label>
                    <p className="text-sm text-muted-foreground">Permettre la création de nouveaux comptes</p>
                  </div>
                  <Switch
                    checked={generalSettings.registrationEnabled}
                    onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, registrationEnabled: checked }))}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('généraux')}
                  disabled={isLoading}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres de sécurité */}
        <TabsContent value="security">
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Paramètres de sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>Attention:</strong> Les modifications des paramètres de sécurité affectent tous les utilisateurs et prennent effet immédiatement.
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Longueur minimale du mot de passe</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    min="6"
                    max="32"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Expiration de session (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="1440"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Tentatives de connexion max</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    min="3"
                    max="10"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="auditLogRetention">Rétention des logs (jours)</Label>
                  <Input
                    id="auditLogRetention"
                    type="number"
                    min="30"
                    max="2555"
                    value={securitySettings.auditLogRetention}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, auditLogRetention: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Majuscules obligatoires</Label>
                    <p className="text-sm text-muted-foreground">Exiger au moins une majuscule</p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordRequireUppercase}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, passwordRequireUppercase: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chiffres obligatoires</Label>
                    <p className="text-sm text-muted-foreground">Exiger au moins un chiffre</p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordRequireNumbers}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, passwordRequireNumbers: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Caractères spéciaux obligatoires</Label>
                    <p className="text-sm text-muted-foreground">Exiger au moins un caractère spécial</p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordRequireSymbols}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, passwordRequireSymbols: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">Obligatoire pour les administrateurs</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorRequired}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorRequired: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Liste blanche IP</Label>
                    <p className="text-sm text-muted-foreground">Restreindre l'accès par adresse IP</p>
                  </div>
                  <Switch
                    checked={securitySettings.ipWhitelistEnabled}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, ipWhitelistEnabled: checked }))}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('de sécurité')}
                  disabled={isLoading}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres email */}
        <TabsContent value="email">
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Configuration email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">Serveur SMTP</Label>
                  <Input
                    id="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Port SMTP</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">Nom d'utilisateur SMTP</Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">Mot de passe SMTP</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpEncryption">Chiffrement</Label>
                  <Select 
                    value={emailSettings.smtpEncryption}
                    onValueChange={(value) => setEmailSettings(prev => ({ ...prev, smtpEncryption: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TLS">TLS</SelectItem>
                      <SelectItem value="SSL">SSL</SelectItem>
                      <SelectItem value="none">Aucun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailFromAddress">Email expéditeur</Label>
                  <Input
                    id="emailFromAddress"
                    type="email"
                    value={emailSettings.emailFromAddress}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, emailFromAddress: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Service email activé</Label>
                  <p className="text-sm text-muted-foreground">Activer l'envoi d'emails automatiques</p>
                </div>
                <Switch
                  checked={emailSettings.emailEnabled}
                  onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, emailEnabled: checked }))}
                />
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handleTestEmail}
                  disabled={isLoading}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Tester l'email
                </Button>
                <Button 
                  onClick={() => handleSaveSettings('email')}
                  disabled={isLoading}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres de sauvegarde */}
        <TabsContent value="backup">
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Sauvegarde et restauration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Dernière sauvegarde</Label>
                  <p className="text-sm font-medium">{backupSettings.lastBackup}</p>
                </div>
                <div className="space-y-2">
                  <Label>Taille de la sauvegarde</Label>
                  <p className="text-sm font-medium">{backupSettings.backupSize}</p>
                </div>
                <div className="space-y-2">
                  <Label>Statut</Label>
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Fonctionnel
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Fréquence de sauvegarde</Label>
                  <Select 
                    value={backupSettings.backupFrequency}
                    onValueChange={(value) => setBackupSettings(prev => ({ ...prev, backupFrequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Toutes les heures</SelectItem>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backupRetention">Rétention (jours)</Label>
                  <Input
                    id="backupRetention"
                    type="number"
                    min="7"
                    max="365"
                    value={backupSettings.backupRetention}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, backupRetention: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sauvegarde automatique</Label>
                    <p className="text-sm text-muted-foreground">Effectuer des sauvegardes automatiques</p>
                  </div>
                  <Switch
                    checked={backupSettings.autoBackupEnabled}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, autoBackupEnabled: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sauvegarde cloud</Label>
                    <p className="text-sm text-muted-foreground">Sauvegarder vers le stockage cloud</p>
                  </div>
                  <Switch
                    checked={backupSettings.cloudBackupEnabled}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, cloudBackupEnabled: checked }))}
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handleBackupNow}
                  disabled={isLoading}
                >
                  <Database className="w-4 h-4 mr-2" />
                  Sauvegarder maintenant
                </Button>
                <Button 
                  onClick={() => handleSaveSettings('de sauvegarde')}
                  disabled={isLoading}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance */}
        <TabsContent value="maintenance">
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Outils de maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 border-2 border-blue-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold">Cache système</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Vider le cache pour améliorer les performances
                    </p>
                    <Button variant="outline" className="w-full">
                      Vider le cache
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-4 border-2 border-green-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-green-500" />
                      <h3 className="font-semibold">Optimisation BDD</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Optimiser les performances de la base de données
                    </p>
                    <Button variant="outline" className="w-full">
                      Optimiser
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-4 border-2 border-orange-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Key className="w-5 h-5 text-orange-500" />
                      <h3 className="font-semibold">Régénérer clés</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Régénérer les clés de sécurité du système
                    </p>
                    <Button variant="outline" className="w-full">
                      Régénérer
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-4 border-2 border-red-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-red-500" />
                      <h3 className="font-semibold">Mode maintenance</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Activer le mode maintenance pour les mises à jour
                    </p>
                    <Button variant="outline" className="w-full">
                      Activer
                    </Button>
                  </div>
                </Card>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <strong>Zone de danger:</strong> Les actions ci-dessous sont irréversibles et peuvent affecter le fonctionnement du système.
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="destructive" className="w-full">
                  Réinitialiser les permissions
                </Button>
                <Button variant="destructive" className="w-full">
                  Purger les logs système
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}