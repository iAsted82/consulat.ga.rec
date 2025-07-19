import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Test users database - In production, replace with real database
const testUsers = [
  // Super Admin Level
  {
    id: 'super-admin-1',
    name: 'Administrateur Système',
    email: 'superadmin@consulat.ga',
    password: 'SuperAdmin2024!',
    role: 'SUPER_ADMIN',
    organizationId: null,
    organizationName: null,
  },
  // Organization Level - Consulat Général du Gabon en France
  {
    id: 'admin-1',
    name: 'Marie Dubois',
    email: 'consul.general@consulat.ga',
    password: 'ConsulGen2024!',
    role: 'ADMIN',
    organizationId: '1',
    organizationName: 'Consulat Général du Gabon en France',
  },
  {
    id: 'collaborateur-1',
    name: 'Jean Martin',
    email: 'vice.consul@consulat.ga',
    password: 'ViceConsul2024!',
    role: 'COLLABORATEUR',
    organizationId: '1',
    organizationName: 'Consulat Général du Gabon en France',
  },
  {
    id: 'agent-1',
    name: 'Sophie Leblanc',
    email: 'agent@consulat.ga',
    password: 'Agent2024!',
    role: 'AGENT',
    organizationId: '1',
    organizationName: 'Consulat Général du Gabon en France',
  },
  {
    id: 'user-1',
    name: 'Jean Dupont',
    email: 'user@consulat.ga',
    password: 'User2024!',
    role: 'USER',
    organizationId: '1',
    organizationName: 'Consulat Général du Gabon en France',
  },
];

export const authConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user in test database
        const user = testUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          return null;
        }

        // Return user object that will be stored in the session
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          organizationId: user.organizationId,
          organizationName: user.organizationName,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.role = user.role;
        token.organizationId = user.organizationId;
        token.organizationName = user.organizationName;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.organizationId = token.organizationId as string;
        session.user.organizationName = token.organizationName as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = nextUrl.pathname.startsWith('/login');
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      // Redirect authenticated users away from auth pages
      if (isOnAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }

      // Protect dashboard routes
      if (isOnDashboard) {
        if (!isLoggedIn) {
          return Response.redirect(new URL('/login', nextUrl));
        }
        return true;
      }

      // Protect admin routes - only SUPER_ADMIN and ADMIN can access
      if (isOnAdmin) {
        if (!isLoggedIn) {
          return Response.redirect(new URL('/login', nextUrl));
        }
        
        const userRole = auth?.user?.role;
        if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN') {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }

      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-key',
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);