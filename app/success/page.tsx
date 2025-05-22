

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SuccessContent from './SuccessContent';

export default function SuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      fetch('/api/payment/success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading success data...</div>}>
      <SuccessContent />
    </Suspense>
  );
} 