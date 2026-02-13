'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface DashboardGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'seller' | 'customer')[];
}

export default function DashboardGuard({ children, allowedRoles }: DashboardGuardProps) {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!profile) {
        router.push('/login');
      } else if (allowedRoles && !allowedRoles.includes(profile.role)) {
        router.push('/'); // Redirect unauthorized to home
      }
    }
  }, [profile, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Verifying Access...</p>
        </div>
      </div>
    );
  }

  if (!profile || (allowedRoles && !allowedRoles.includes(profile.role))) {
    return null;
  }

  return <>{children}</>;
}
