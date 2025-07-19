'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Users, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserX, 
  UserCheck,
  Filter,
  Download
} from 'lucide-react';
import { UserCreateEditModal } from '@/components/admin/user-create-edit-modal';
import { UserDeleteModal } from '@/components/admin/user-delete-modal';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId?: string;
  organizationName?: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt: string;
}

export default function UsersManagementPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Administrateur Système',
      email: 'superadmin@consulat.ga',
      role: 'SUPER_ADMIN',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Marie Dubois',
      email: 'consul.general@consulat.ga',
      role: 'ADMIN',
      organizationId: '1',
      organizationName: 'Consulat Général du Gabon en France',
      status: 'active',
      lastLogin: '2024-01-15 10:45',
      createdAt: '2024-01-02',
    },
    {
      id: '3',
      name: 'Jean Martin',
      email: 'vice.consul@consulat.ga',
      role: 'COLLABORATEUR',
      organizationId: '1',
      organizationName: 'Consulat Général du Gabon en France',
      status: 'active',
      lastLogin: '2024-01-14 16:20',
      createdAt: '2024-01-03',
    },
    {
      id: '4',
      name: 'Sophie Leblanc',
      email: 'agent@consulat.ga',
      role: 'AGENT',
      organizationId: '1',
      organizationName: 'Consulat Général du Gabon en France',
      status: 'active',
      lastLogin: '2024-01-15 09:15',
      createdAt: '2024-01-04',
    },
    {
      id: '5',
      name: 'Jean Dupont',
      email: 'user@consulat.ga',
      role: 'USER',
      organizationId: '1',
      organizationName: 'Consulat Général du Gabon en France',
      status: 'suspended',
      lastLogin: '2024-01-10 12:00',
      createdAt: '2024-01-05',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const colors = {
      SUPER_ADMIN: 'bg-purple-100 text-purple-700',
      ADMIN: 'bg-blue-100 text-blue-700',
      COLLABORATEUR: 'bg-green-100 text-green-700',
      AGENT: 'bg-orange-100 text-orange-700',
      USER: 'bg-gray-100 text-gray-700',
    };
    return (
      <Badge className={colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700'}>
        {role.replace('_', ' ')}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      suspended: 'bg-red-100 text-red-700',
    };
    const labels = {
      active: 'Actif',
      inactive: 'Inactif',
      suspended: 'Suspendu',
    };
    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const handleToggleUserStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus as any } : user
    ));
    toast.success(`Utilisateur ${newStatus === 'active' ? 'activé' : 'suspendu'} avec succès`);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setShowDeleteModal(false);
    setSelectedUser(null);
    toast.success('Utilisateur supprimé avec succès');
  };

  const handleCreateUser = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, newUser]);
    setShowCreateModal(false);
    toast.success('Utilisateur créé avec succès');
  };

  const handleEditUser = (userData: any) => {
    setUsers(prev => prev.map(user => 
      user.id === selectedUser?.id ? { ...user, ...userData } : user
    ));
    setShowEditModal(false);
    setSelectedUser(null);
    toast.success('Utilisateur modifié avec succès');
  };

  const stats = [
    { title: 'Total utilisateurs', value: users.length.toString(), icon: Users },
    { title: 'Actifs', value: users.filter(u => u.status === 'active').length.toString(), icon: UserCheck },
    { title: 'Suspendus', value: users.filter(u => u.status === 'suspended').length.toString(), icon: UserX },
    { title: 'Super Admins', value: users.filter(u => u.role === 'SUPER_ADMIN').length.toString(), icon: Users },
  ];

  return (
    <div className="section-spacing">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez tous les utilisateurs du système consulaire
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel utilisateur
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
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
                  </div>
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Outils de recherche et filtres */}
      <Card className="card mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des utilisateurs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table des utilisateurs */}
      <Card className="card">
        <CardHeader>
          <CardTitle>
            Utilisateurs ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      {user.organizationName ? (
                        <span className="text-sm">{user.organizationName}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      {user.lastLogin ? (
                        <span className="text-sm">{user.lastLogin}</span>
                      ) : (
                        <span className="text-muted-foreground">Jamais</span>
                      )}
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleUserStatus(user.id, user.status)}
                          >
                            {user.status === 'active' ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Suspendre
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activer
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showCreateModal && (
        <UserCreateEditModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateUser}
          mode="create"
        />
      )}

      {showEditModal && selectedUser && (
        <UserCreateEditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSave={handleEditUser}
          mode="edit"
          user={selectedUser}
        />
      )}

      {showDeleteModal && selectedUser && (
        <UserDeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          onConfirm={() => handleDeleteUser(selectedUser.id)}
          user={selectedUser}
        />
      )}
    </div>
  );
}