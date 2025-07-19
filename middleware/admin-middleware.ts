import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to verify super admin access for admin routes
 */
export async function verifyAdminAccess(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  if (token.role !== 'SUPER_ADMIN') {
    // Log unauthorized access attempt
    console.warn(`Unauthorized admin access attempt by user: ${token.email} (${token.role})`);
    
    return NextResponse.json(
      { error: 'Accès administrateur requis' },
      { status: 403 }
    );
  }

  return null; // Access granted
}

/**
 * Rate limiting for sensitive admin operations
 */
export class AdminRateLimiter {
  private static requests = new Map<string, number[]>();
  private static readonly MAX_REQUESTS = 10; // Max requests per window
  private static readonly WINDOW_MS = 60 * 1000; // 1 minute window

  static checkLimit(userEmail: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(userEmail) || [];
    
    // Remove requests outside the window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.WINDOW_MS
    );
    
    if (validRequests.length >= this.MAX_REQUESTS) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    this.requests.set(userEmail, validRequests);
    
    return true; // Request allowed
  }
}

/**
 * Audit logging utility for admin actions
 */
export async function createAuditLog({
  user,
  userRole,
  action,
  resource,
  details,
  ipAddress,
  userAgent,
  status = 'success',
  category,
}: {
  user: string;
  userRole: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status?: 'success' | 'failure' | 'warning';
  category: string;
}) {
  // In production: Save to database
  console.log('Audit Log:', {
    timestamp: new Date().toISOString(),
    user,
    userRole,
    action,
    resource,
    details,
    ipAddress,
    userAgent,
    status,
    category,
  });
  
  // Example database operation:
  // await db.auditLog.create({
  //   data: {
  //     timestamp: new Date(),
  //     user,
  //     userRole,
  //     action,
  //     resource,
  //     details,
  //     ipAddress,
  //     userAgent,
  //     status,
  //     category,
  //   }
  // });
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * Security headers for admin pages
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}