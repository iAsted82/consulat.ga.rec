'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Calendar,
  Building,
  MapPin,
  Activity,
  Download,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const [timeRange, setTimeRange] = useState('30d');

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

  // Sample data for charts
  const userGrowthData = [
    { month: 'Jan', users: 1200, newUsers: 150 },
    { month: 'Fév', users: 1350, newUsers: 180 },
    { month: 'Mar', users: 1480, newUsers: 130 },
    { month: 'Avr', users: 1620, newUsers: 140 },
    { month: 'Mai', users: 1750, newUsers: 130 },
    { month: 'Jun', users: 1890, newUsers: 140 },
  ];

  const requestsByType = [
    { name: 'Passeports', value: 45, color: '#0d40af' },
    { name: 'Visas', value: 25, color: '#3b4b6b' },
    { name: 'État civil', value: 20, color: '#ffd733' },
    { name: 'Autres', value: 10, color: '#16a34a' },
  ];

  const organizationStats = [
    { name: 'France', requests: 450, users: 1200 },
    { name: 'Maroc', requests: 320, users: 890 },
    { name: 'EAU', requests: 180, users: 450 },
    { name: 'Sénégal', requests: 150, users: 380 },
    { name: 'Canada', requests: 120, users: 320 },
  ];

  const performanceData = [
    { day: 'Lun', responseTime: 2.1, satisfaction: 4.8 },
    { day: 'Mar', responseTime: 1.9, satisfaction: 4.7 },
    { day: 'Mer', responseTime: 2.3, satisfaction: 4.6 },
    { day: 'Jeu', responseTime: 2.0, satisfaction: 4.8 },
    { day: 'Ven', responseTime: 1.8, satisfaction: 4.9 },
    { day: 'Sam', responseTime: 2.2, satisfaction: 4.7 },
    { day: 'Dim', responseTime: 2.4, satisfaction: 4.6 },
  ];

  const globalStats = [
    {
      title: 'Utilisateurs totaux',
      value: '15,420',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Demandes ce mois',
      value: '2,847',
      change: '+8.3%',
      trend: 'up',
      icon: FileText,
      color: 'text-green-500',
    },
    {
      title: 'Organisations actives',
      value: '247',
      change: '+2.1%',
      trend: 'up',
      icon: Building,
      color: 'text-purple-500',
    },
    {
      title: 'Temps de réponse',
      value: '2.1j',
      change: '-15.2%',
      trend: 'down',
      icon: Activity,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="section-spacing">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Rapports</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble des performances globales du système
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">90 derniers jours</SelectItem>
              <SelectItem value="1y">1 année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
          <Button className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {globalStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`} />
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Croissance des utilisateurs */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Croissance des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#0d40af" strokeWidth={2} />
                <Line type="monotone" dataKey="newUsers" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition des demandes */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Répartition des demandes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={requestsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {requestsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance et organisations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance hebdomadaire */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Performance hebdomadaire</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="responseTime" fill="#0d40af" name="Temps de réponse (j)" />
                <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#16a34a" name="Satisfaction" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top organisations */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Top organisations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {organizationStats.map((org, index) => (
                <div key={org.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{org.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {org.users} utilisateurs
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{org.requests}</div>
                    <div className="text-sm text-muted-foreground">demandes</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes et notifications */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Alertes système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <div className="font-medium">Pic de trafic détecté</div>
                  <div className="text-sm text-muted-foreground">
                    Augmentation de 45% des connexions simultanées
                  </div>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-700">Attention</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="font-medium">Maintenance programmée</div>
                  <div className="text-sm text-muted-foreground">
                    Mise à jour système prévue dimanche 3h-5h
                  </div>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Info</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium">Nouvelle organisation activée</div>
                  <div className="text-sm text-muted-foreground">
                    Bureau consulaire de Londres opérationnel
                  </div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Succès</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}