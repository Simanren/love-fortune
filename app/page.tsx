"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // 模拟页面加载
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load the page. Please try again.');
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="text-purple-300 hover:text-purple-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="max-w-4xl w-full space-y-12 text-center">
        <div>
          <h1 className="text-5xl font-bold mystic-text mb-6">
            Love Fortune Oracle
          </h1>
          <p className="text-xl text-purple-200">
            Discover your destiny through MBTI and Astrology
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="mystic-card p-6">
            <h2 className="text-xl font-medium mystic-text mb-4">
              MBTI Analysis
            </h2>
            <p className="text-purple-100/70">
              Understand how your personality shapes your relationships
            </p>
          </div>

          <div className="mystic-card p-6">
            <h2 className="text-xl font-medium mystic-text mb-4">
              Zodiac Insights
            </h2>
            <p className="text-purple-100/70">
              Learn what the stars reveal about your love life
            </p>
          </div>

          <div className="mystic-card p-6">
            <h2 className="text-xl font-medium mystic-text mb-4">
              Love Path
            </h2>
            <p className="text-purple-100/70">
              Get personalized guidance for your romantic journey
            </p>
          </div>
        </div>

        <div className="mystic-card p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-medium mystic-text mb-6">
            Begin Your Reading
          </h2>
          <p className="text-purple-100/70 mb-8">
            Let the cosmic energies guide you to your true love
          </p>
          <Link 
            href="/test" 
            className="mystic-button px-8 py-4 text-lg inline-block"
          >
            Start Reading
          </Link>
        </div>

        <div className="text-purple-100/50 text-sm">
          <p>Ancient wisdom meets modern psychology</p>
          <p>Updated daily with celestial movements</p>
        </div>
      </div>
    </main>
  );
} 