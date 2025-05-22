'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/40 to-black">
        <div className="mystic-card p-8 text-center">
          <h1 className="text-3xl font-bold text-green-400 mb-4">Payment Successful!</h1>
          <p className="text-lg text-purple-100 mb-4">Thank you for your question. We will send a detailed answer to your email within 24 hours.</p>
          <a href="/result" className="mystic-button px-6 py-2">Back to Result</a>
        </div>
      </main>
    </Suspense>
  );
} 