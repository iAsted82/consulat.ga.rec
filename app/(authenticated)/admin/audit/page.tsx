'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Activity, 
  Search, 
  Filter, 
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  UserX,
  Shield,
  Database,
  Settings
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure' | 'warning';
  category: string;
}

export default function AuditLogsPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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

  // Sample audit log data
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:15',
      user: 'Marie Dubois',
      userRole: 'ADMIN',
      action: 'LOGIN',
      resource: 'Authentication',
      details: 'Connexion réussie depuis Paris, France',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      category: 'auth',
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:42',
      user: 'Jean Martin',
      userRole: 'COLLABORATEUR',
      action: 'UPDATE_USER',
      resource: 'User Management',
      details: 'Modification du profil utilisateur ID: 12345',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success',
      category: 'user_management',
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:18',
      user: 'Système',
      userRole: 'SYSTEM',
      action: 'BACKUP_CREATED',
      resource: 'Database',
      details: 'Sauvegarde automatique créée (2.4 GB)',
      ipAddress: 'localhost',
      userAgent: 'System/Cron',
      status: 'success',
      category: 'system',
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:15:33',
      user: 'Sophie Leblanc',
      userRole: 'AGENT',
      action: 'LOGIN_FAILED',
      resource: 'Authentication',
      details: 'Tentative de connexion échouée - mot de passe incorrect',
      ipAddress: '172.16.0.25',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
      status: 'failure',
      category: 'auth',
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:10:07',
      user: 'Administrateur Système',
      userRole: 'SUPER_ADMIN',
      action: 'UPDATE_SETTINGS',
      resource: 'System Configuration',
      details: 'Modification des paramètres de sécurité - session timeout: 30min',
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0',
      status: 'success',
      category: 'settings',
    },
    {
      id: '6',
      timestamp: '2024-01-15 14:05:51',
      user: 'Jean Dupont',
      userRole: 'USER',
      action: 'DOCUMENT_UPLOAD',
      resource: 'Document Management',
      details: 'Upload de passeport.pdf (2.1 MB)',
      ipAddress: '203.0.113.45',
      userAgent: 'Mozilla/5.0 (Android 11; Mobile; rv:91.0)',
      status: 'success',
      category: 'documents',
    },
    {
      id: '7',
      timestamp: '2024-01-15 14:00:22',
      user: 'Système',
      userRole: 'SYSTEM',
      action: 'SECURITY_ALERT',
      resource: 'Security Monitor',
      details: 'Détection de tentatives de connexion multiples depuis 45.76.123.89',
      ipAddress: '45.76.123.89',
      userAgent: 'Unknown/Bot',
      status: 'warning',
      category: 'security',
    },
    {
      id: '8',
      timestamp: '2024-01-15 13:55:14',
      user: 'Marie Dubois',
      userRole: 'ADMIN',
      action: 'CREATE_USER',
      resource: 'User Management',
      details: 'Création du compte utilisateur: nouveau.agent@consulat.ga',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      category: 'user_management',
    },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failure':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      success: 'bg-green-100 text-green-700',
      failure: 'bg-red-100 text-red-700',
      warning: 'bg-yellow-100 text-yellow-700',
    };
    const labels = {
      success: 'Succès',
      failure: 'Échec',
      warning: 'Alerte',
    };
    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'auth':
        return <Shield className="w-4 h-4 text-blue-500" />;
      case 'user_management':
        return <UserX className="w-4 h-4 text-purple-500" />;
      case 'system':
        return <Database className="w-4 h-4 text-gray-500" />;
      case 'settings':
        return <Settings className="w-4 h-4 text-orange-500" />;
      case 'documents':
        return <Eye className="w-4 h-4 text-green-500" />;
      case 'security':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      SUPER_ADMIN: 'bg-purple-100 text-purple-700',
      ADMIN: 'bg-blue-100 text-blue-700',
      COLLABORATEUR: 'bg-green-100 text-green-700',
      AGENT: 'bg-orange-100 text-orange-700',
      USER: 'bg-gray-100 text-gray-700',
      SYSTEM: 'bg-red-100 text-red-700',
    };
    return (
      <Badge className={colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700'}>
        {role.replace('_', ' ')}
      </Badge>
    );
  };

  const categoryStats = [
    { category: 'auth', count: auditLogs.filter(log => log.category === 'auth').length, label: 'Authentification' },
    { category: 'user_management', count: auditLogs.filter(log => log.category === 'user_management').length, label: 'Gestion utilisateurs' },
    { category: 'security', count: auditLogs.filter(log => log.category === 'security').length, label: 'Sécurité' },
    { category: 'system', count: auditLogs.filter(log => log.category === 'system').length, label: 'Système' },
  ];

  return (
    <div className="section-spacing">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Journal d'audit</h1>
          <p className="text-muted-foreground">
            Surveillance et traçabilité de toutes les activités système
          </p>
        </div>
        <Button className="btn-primary">
          <Download className="w-4 h-4 mr-2" />
          Exporter les logs
        </Button>
      </div>

      {/* Statistiques par catégorie */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categoryStats.map((stat) => (
          <Card key={stat.category} className="card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.count}</p>
                </div>
                {getCategoryIcon(stat.category)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtres et recherche */}
      <Card className="card mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans les logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="auth">Authentification</SelectItem>
                  <SelectItem value="user_management">Gestion utilisateurs</SelectItem>
                  <SelectItem value="security">Sécurité</SelectItem>
                  <SelectItem value="system">Système</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="settings">Paramètres</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="success">Succès</SelectItem>
                  <SelectItem value="failure">Échec</SelectItem>
                  <SelectItem value="warning">Alerte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table des logs */}
      <Card className="card">
        <CardHeader>
          <CardTitle>
            Activités récentes ({filteredLogs.length} entrées)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Horodatage</TableHead>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Ressource</TableHead>
                  <TableHead>Détails</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{log.user}</span>
                        {getRoleBadge(log.userRole)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(log.category)}
                        <span className="font-medium">{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell>{log.resource}</TableCell>
                    <TableCell className="max-w-xs">
                      <span className="text-sm text-muted-foreground truncate block">
                        {log.details}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.ipAddress}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        {getStatusBadge(log.status)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune activité trouvée</h3>
              <p className="text-muted-foreground">
                Modifiez vos critères de recherche pour voir plus de résultats.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}