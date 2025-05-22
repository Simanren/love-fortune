export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import SuccessClient from './SuccessClient';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading success data...</div>}>
      <SuccessClient />
    </Suspense>
  );
} 