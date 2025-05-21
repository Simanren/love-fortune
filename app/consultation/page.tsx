'use client';

import { useState } from 'react';
import Link from 'next/link';

const CONSULTATION_PRICE = 9.9;

export default function Consultation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
    agreeToTerms: false
  });
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement payment processing and email service
    setSubmitted(true);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCharCount(text.length);
    setFormData(prev => ({ ...prev, question: text }));
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="mystic-card p-8 max-w-4xl w-full text-center">
          <h1 className="text-3xl font-bold mystic-text mb-6">
            Thank You for Your Request
          </h1>
          <p className="text-purple-200 mb-4">
            Your personal love reading request has been received.
          </p>
          <p className="text-purple-200 mb-8">
            Please check your email for payment instructions.
            Once completed, you will receive your reading within 24 hours.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/" className="mystic-button px-6 py-3">
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <div className="stardust w-32 h-32 -left-16 top-32" />
      <div className="stardust w-24 h-24 right-12 bottom-24" />
      
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="w-full mystic-card p-8 mb-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold mystic-text">
              Personal Love Reading
            </h1>
            <p className="text-2xl text-purple-200">
              Need deeper insights into your love life?
            </p>
            <p className="text-xl text-purple-200/80">
              Get a personalized reading for just ${CONSULTATION_PRICE}
            </p>
          </div>
        </div>

        <div className="w-full text-center mb-8">
          <p className="text-purple-200/70">
            Your personal reading will be delivered within 24 hours
          </p>
          <p className="text-purple-200/70 mt-2">
            Questions? Contact: support@mysticoracle.com
          </p>
        </div>

        <div className="flex justify-center space-x-4 w-full">
          <Link href="/test" className="mystic-button px-8 py-3">
            New Reading
          </Link>
          <Link href="/" className="mystic-button px-8 py-3">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
} 