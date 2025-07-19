'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { 
  Menu,
  X,
  Globe,
  Home,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Bell,
  User,
  Building,
  Users,
  Sun,
  Moon,
  ChevronDown,
  BarChart3,
  Activity
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Rendez-vous', href: '/appointments', icon: Calendar },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Profil', href: '/profile', icon: User },
  ];

  const adminNavigation = [
    { name: 'Organisations', href: '/admin/organizations', icon: Building },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Audit', href: '/admin/audit', icon: Activity },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
  ];

  const showAdminNav = session?.user?.role === 'SUPER_ADMIN' || session?.user?.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar mobile */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 z-50 w-72 bg-card border-r">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">Consulat.ga</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <nav className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <a href={item.href}>
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                </Button>
              );
            })}
            
            {showAdminNav && (
              <>
                <div className="pt-4 pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Administration</h3>
                </div>
                {adminNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={item.href}>
                        <Icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </a>
                    </Button>
                  );
                })}
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-1 bg-card border-r">
          <div className="flex items-center gap-2 p-6">
            <Globe className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Consulat.ga</span>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <a href={item.href}>
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                </Button>
              );
            })}
            
            {showAdminNav && (
              <>
                <div className="pt-4 pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Administration</h3>
                </div>
                {adminNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={item.href}>
                        <Icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </a>
                    </Button>
                  );
                })}
              </>
            )}
          </nav>
          
          <div className="p-4 border-t">
            <div className="text-xs text-muted-foreground text-center">
              Version 2.1.0
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold">
                  {session?.user?.role === 'SUPER_ADMIN' && 'Administration Globale'}
                  {session?.user?.role === 'ADMIN' && 'Administration'}
                  {session?.user?.role === 'COLLABORATEUR' && 'Espace Collaborateur'}
                  {session?.user?.role === 'AGENT' && 'Espace Agent'}
                  {session?.user?.role === 'USER' && 'Mon Espace'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={session?.user?.image || ''} />
                      <AvatarFallback>
                        {session?.user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-medium">{session?.user?.name}</div>
                      <div className="text-xs text-muted-foreground">{session?.user?.role}</div>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Mon profil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <main className="p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}