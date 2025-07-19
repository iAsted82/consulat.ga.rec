'use client';

import { useSession } from 'next-auth/react';
import { SuperAdminDashboard } from '@/components/dashboard/super-admin-dashboard';
import { AdminDashboard } from '@/components/dashboard/admin-dashboard';
import { CollaborateurDashboard } from '@/components/dashboard/collaborateur-dashboard';
import { AgentDashboard } from '@/components/dashboard/agent-dashboard';
import { UserDashboard } from '@/components/dashboard/user-dashboard';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Chargement...</div>;
  }

  const renderDashboard = () => {
    switch (session.user.role) {
      case 'SUPER_ADMIN':
        return <SuperAdminDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      case 'COLLABORATEUR':
        return <CollaborateurDashboard />;
      case 'AGENT':
        return <AgentDashboard />;
      case 'USER':
        return <UserDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}