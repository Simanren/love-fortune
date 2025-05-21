'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 星座计算函数
function getZodiac(month: number, day: number) {
  const zodiacArr: [string, number, number][] = [
    ['Capricorn', 1, 19], ['Aquarius', 2, 18], ['Pisces', 3, 20], ['Aries', 4, 19],
    ['Taurus', 5, 20], ['Gemini', 6, 20], ['Cancer', 7, 22], ['Leo', 8, 22],
    ['Virgo', 9, 22], ['Libra', 10, 23], ['Scorpio', 11, 22], ['Sagittarius', 12, 21], ['Capricorn', 12, 31]
  ];
  for (let i = 0; i < zodiacArr.length; i++) {
    const [name, m, d] = zodiacArr[i];
    if ((month === m && day <= d) || (month === m - 1 && day > (zodiacArr[i - 1]?.[2] ?? 0))) {
      return name;
    }
  }
  return '';
}

export default function Test() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    mbti: '',
    zodiac: '',
    gender: ''
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.birthdate ||
        !formData.mbti ||
        !formData.zodiac ||
        !formData.gender
      ) {
        alert('Please complete all fields');
        return;
      }
      const params = new URLSearchParams(formData);
      router.push(`/result?${params.toString()}`);
    } catch (err) {
      setError('An error occurred while submitting the form. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // 生日变化时自动联动星座
    if (name === 'birthdate') {
      let zodiac = '';
      if (value) {
        const [year, month, day] = value.split('-').map(Number);
        zodiac = getZodiac(month, day);
      }
      setFormData(prev => ({
        ...prev,
        birthdate: value,
        zodiac: zodiac || prev.zodiac // 若未能识别则保留原值
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="mystic-text text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="mystic-card p-6 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mystic-button px-6 py-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Stardust effects */}
      <div className="stardust w-32 h-32 absolute -left-16 top-32" />
      <div className="stardust w-24 h-24 absolute right-12 bottom-24" />
      <div className="stardust w-16 h-16 absolute right-32 top-48" />

      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mystic-text mb-4">
            Love Reading Form
          </h1>
          <p className="text-lg text-purple-200">
            Share your details for a personalized love reading
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mystic-card p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-purple-100 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 text-white"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-purple-100 mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="block w-full bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 text-white"
              required
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="birthdate" className="block text-purple-100 mb-2">
              Birth Date
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="block w-full bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="mbti" className="block text-purple-100 mb-2">
              MBTI Type
            </label>
            <select
              id="mbti"
              name="mbti"
              value={formData.mbti}
              onChange={handleChange}
              className="block w-full bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 text-white"
              required
            >
              <option value="">Select your MBTI type</option>
              <option value="INTJ">INTJ - The Architect</option>
              <option value="INTP">INTP - The Logician</option>
              <option value="ENTJ">ENTJ - The Commander</option>
              <option value="ENTP">ENTP - The Debater</option>
              <option value="INFJ">INFJ - The Advocate</option>
              <option value="INFP">INFP - The Mediator</option>
              <option value="ENFJ">ENFJ - The Protagonist</option>
              <option value="ENFP">ENFP - The Campaigner</option>
              <option value="ISTJ">ISTJ - The Logistician</option>
              <option value="ISFJ">ISFJ - The Defender</option>
              <option value="ESTJ">ESTJ - The Executive</option>
              <option value="ESFJ">ESFJ - The Consul</option>
              <option value="ISTP">ISTP - The Virtuoso</option>
              <option value="ISFP">ISFP - The Adventurer</option>
              <option value="ESTP">ESTP - The Entrepreneur</option>
              <option value="ESFP">ESFP - The Entertainer</option>
            </select>
            <div className="mt-2">
              <a
                href="https://www.16personalities.com/free-personality-test"
                target="_blank"
                rel="noopener"
                className="text-blue-400 underline hover:text-blue-300 text-sm"
              >
                Don't know your MBTI? Take the test here
              </a>
            </div>
          </div>

          <div>
            <label htmlFor="zodiac" className="block text-purple-100 mb-2">
              Zodiac Sign
            </label>
            <select
              id="zodiac"
              name="zodiac"
              value={formData.zodiac}
              onChange={handleChange}
              className="block w-full bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 text-white"
              required
            >
              <option value="">Select your zodiac sign</option>
              <option value="Aries">Aries (Mar 21 - Apr 19)</option>
              <option value="Taurus">Taurus (Apr 20 - May 20)</option>
              <option value="Gemini">Gemini (May 21 - Jun 20)</option>
              <option value="Cancer">Cancer (Jun 21 - Jul 22)</option>
              <option value="Leo">Leo (Jul 23 - Aug 22)</option>
              <option value="Virgo">Virgo (Aug 23 - Sep 22)</option>
              <option value="Libra">Libra (Sep 23 - Oct 22)</option>
              <option value="Scorpio">Scorpio (Oct 23 - Nov 21)</option>
              <option value="Sagittarius">Sagittarius (Nov 22 - Dec 21)</option>
              <option value="Capricorn">Capricorn (Dec 22 - Jan 19)</option>
              <option value="Aquarius">Aquarius (Jan 20 - Feb 18)</option>
              <option value="Pisces">Pisces (Feb 19 - Mar 20)</option>
            </select>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link href="/" className="text-purple-300 hover:text-purple-200 transition">
              Back to Home
            </Link>
            <button type="submit" className="mystic-button px-8 py-3">
              Get Reading
            </button>
          </div>
        </form>

        <div className="text-center text-purple-100/50 text-sm">
          <p>Your personal information is used only for reading purposes</p>
          <p>All readings are based on cosmic energies and personality insights</p>
        </div>
      </div>
    </main>
  );
}