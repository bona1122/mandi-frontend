'use client';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import useUser from '@/hooks/useUser';

export function UserProvider({ children }: { children: React.ReactNode }) {
  useUser();

  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
