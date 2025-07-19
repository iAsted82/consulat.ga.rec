export interface User {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'COLLABORATEUR' | 'AGENT' | 'USER';
  organizationId?: string;
  organizationName?: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'AMBASSADE' | 'CONSULAT_GENERAL' | 'CONSULAT' | 'BUREAU_CONSULAIRE';
  country: string;
  city: string;
  status: 'active' | 'inactive' | 'pending';
  userCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface AuditLog {
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
  category: 'auth' | 'user_management' | 'security' | 'system' | 'documents' | 'settings';
}

export interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    supportEmail: string;
    timezone: string;
    language: string;
    maintenanceMode: boolean;
    registrationEnabled: boolean;
  };
  security: {
    passwordMinLength: number;
    passwordRequireUppercase: boolean;
    passwordRequireNumbers: boolean;
    passwordRequireSymbols: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    twoFactorRequired: boolean;
    ipWhitelistEnabled: boolean;
    auditLogRetention: number;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    smtpEncryption: string;
    emailFromName: string;
    emailFromAddress: string;
    emailEnabled: boolean;
  };
  backup: {
    autoBackupEnabled: boolean;
    backupFrequency: string;
    backupRetention: number;
    lastBackup: string;
    backupSize: string;
    cloudBackupEnabled: boolean;
  };
}

export interface AnalyticsData {
  userGrowth: Array<{
    month: string;
    users: number;
    newUsers: number;
  }>;
  requestsByType: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  organizationStats: Array<{
    name: string;
    requests: number;
    users: number;
  }>;
  performanceData: Array<{
    day: string;
    responseTime: number;
    satisfaction: number;
  }>;
}