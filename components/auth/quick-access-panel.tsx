'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Crown, Users, UserCheck, User, Building2, Globe } from 'lucide-react';
import { useState } from 'react';

interface QuickAccessPanelProps {
  onFillCredentials: (email: string, password: string) => void;
}

interface UserAccount {
  role: string;
  email: string;
  password: string;
  name: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  organizationId?: string;
  organizationName?: string;
}

const superAdminAccounts: UserAccount[] = [
  {
    role: 'SUPER_ADMIN',
    email: 'superadmin@consulat.ga',
    password: 'SuperAdmin2024!',
    name: 'Administrateur Système',
    title: 'Super Admin',
    description: 'Gestion globale écosystème',
    icon: Crown,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
  }
];

const organizationAccounts: UserAccount[] = [
  {
    role: 'ADMIN',
    email: 'consul.general@consulat.ga',
    password: 'ConsulGen2024!',
    name: 'Marie Dubois',
    title: 'Consul Général',
    description: 'Direction consulat',
    icon: Shield,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    organizationId: '1',
    organizationName: 'Consulat Général du Gabon en France'
  },
  {
    role: 'COLLABORATEUR',
    email: 'vice.consul@consulat.ga',
    password: 'ViceConsul2024!',
    name: 'Jean Martin',
    title: 'Vice-Consul',
    description: 'Validation niveau 1',
    icon: Users,
    color: 'bg-gradient-to-r from-green-500 to-teal-500',
    organizationId: '1',
    organizationName: 'Consulat Général du Gabon en France'
  },
  {
    role: 'AGENT',
    email: 'agent@consulat.ga',
    password: 'Agent2024!',
    name: 'Sophie Leblanc',
    title: 'Agent Consulaire',
    description: 'Saisie et traitement',
    icon: UserCheck,
    color: 'bg-gradient-to-r from-orange-500 to-red-500',
    organizationId: '1',
    organizationName: 'Consulat Général du Gabon en France'
  },
  {
    role: 'USER',
    email: 'user@consulat.ga',
    password: 'User2024!',
    name: 'Jean Dupont',
    title: 'Ressortissant',
    description: 'Services consulaires',
    icon: User,
    color: 'bg-gradient-to-r from-gray-500 to-gray-600',
    organizationId: '1',
    organizationName: 'Consulat Général du Gabon en France'
  }
];

export function QuickAccessPanel({ onFillCredentials }: QuickAccessPanelProps) {
  const [expandedOrg, setExpandedOrg] = useState<string | null>('1');

  const toggleOrganization = (orgId: string) => {
    setExpandedOrg(expandedOrg === orgId ? null : orgId);
  };

  const renderAccountButton = (account: UserAccount, isOrgAccount: boolean = false) => {
    const Icon = account.icon;
    return (
      <Button
        key={account.role + account.organizationId}
        variant="outline"
        className={`
          h-auto p-4 flex flex-col items-center space-y-2 
          transition-all duration-200 hover:scale-105
          border-2 hover:border-primary/50
          ${isOrgAccount ? 'ml-4' : ''}
        `}
        onClick={() => onFillCredentials(account.email, account.password)}
      >
        <div className={`p-2 rounded-lg ${account.color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="text-center">
          <div className="font-semibold text-sm">{account.title}</div>
          <div className="text-xs text-muted-foreground mb-1">
            {account.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {account.description}
          </div>
        </div>
      </Button>
    );
  };

  return (
    <Card className="card animate-slide-up">
      <CardHeader>
        <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
          🚀 Developer Quick Access System
          <Badge variant="outline" className="text-xs">Segmented Architecture</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Super Admin Level */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-base">Super Admin Level</h3>
            <Badge className="bg-purple-100 text-purple-700 text-xs">Global Access</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {superAdminAccounts.map((account) => renderAccountButton(account))}
          </div>
        </div>

        <Separator />

        {/* Organization Level */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-base">Organization Level</h3>
            <Badge className="bg-blue-100 text-blue-700 text-xs">Scoped Access</Badge>
          </div>

          {/* Organization Header */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Consulat Général du Gabon en France</div>
                  <div className="text-sm text-muted-foreground">
                    Organization ID: 1 • {organizationAccounts.length} accounts
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleOrganization('1')}
              >
                {expandedOrg === '1' ? '−' : '+'}
              </Button>
            </div>

            {/* Organization Accounts */}
            {expandedOrg === '1' && (
              <div className="space-y-2 pt-2 border-t">
                <div className="text-sm font-medium text-muted-foreground mb-3">
                  Organization Accounts:
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {organizationAccounts.map((account) => renderAccountButton(account, true))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* System Information */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          <div className="text-sm font-medium">System Architecture:</div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>• <strong>Super Admin:</strong> Global system management</div>
            <div>• <strong>Organization:</strong> Scoped account management</div>
            <div>• <strong>Hierarchy:</strong> Clear separation of concerns</div>
            <div>• <strong>Security:</strong> Role-based access control</div>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Click any account to auto-fill login credentials
        </div>
      </CardContent>
    </Card>
  );
}