'use client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // In NextAuth v5 with App Router, SessionProvider is not needed
  // Session handling is done server-side
  return <>{children}</>;
}