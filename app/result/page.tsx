'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

// Consultation price
const CONSULTATION_PRICE = 9.9;

function getUserKey(params: { name: string; mbti: string; zodiac: string; gender: string; birthdate: string; date: string }) {
  return `${params.name}_${params.mbti}_${params.zodiac}_${params.gender}_${params.birthdate}_${params.date}`;
}

function ResultContent() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [merit, setMerit] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string }[]>([]);
  const [showDeepQuestion, setShowDeepQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const nextId = useRef(0);

  const deepQuestions = [
    "What is my true love destiny?",
    "How can I improve my current relationship?",
    "When will I meet my soulmate?",
    "What are the challenges in my love life?",
    "How can I attract true love?"
  ];

  // Get user key
  const name = searchParams.get('name') || '';
  const mbti = searchParams.get('mbti') || '';
  const zodiac = searchParams.get('zodiac') || '';
  const gender = searchParams.get('gender') || '';
  const birthdate = searchParams.get('birthdate') || '';
  const readingDate = new Date().toISOString().split('T')[0];
  const userKey = getUserKey({ name, mbti, zodiac, gender, birthdate, date: readingDate });
  const wishKey = `wishCount_${userKey}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const cachedResult = localStorage.getItem(`loveReading_${userKey}`);
    if (cachedResult) {
      setAiResult(cachedResult);
      setLoading(false);
    } else {
      const prompt = `
As a professional psychological and astrological analyst, please provide a structured love reading for the user, divided into two main sections: [Today's Love Fortune] and [Personalized Analysis].

[Today's Love Fortune]
- Score (0-100, number only)
- Summary (3-5 sentences, rich content, including today's overall atmosphere, opportunities, and cautions. Do NOT use any asterisks or markdown bold.)
- Today's Suggestions (up to 3, practical and helpful for improving today's love fortune, each starting with -, no asterisks, if less than 3, just return actual count)
- All content must be based on the user's zodiac, MBTI, gender, birthday, and the analysis date, and must change daily.

[Personalized Analysis]
- Personality Analysis (2-3 paragraphs, based on zodiac, MBTI, gender)
- Love Attitude Analysis (2-3 paragraphs, based on zodiac, MBTI, gender)
- Detailed Advice (3 items, actionable, based on user's core traits, content should be stable/fixed, do NOT use any asterisks or markdown bold or extra symbols, just plain text)

User info:
- Name: ${name}
- Zodiac: ${zodiac}
- MBTI: ${mbti}
- Gender: ${gender}
- Birthday: ${birthdate}
- Analysis Date: ${readingDate}

Please strictly output in the following Markdown format, with clear sections for easy frontend parsing:

### Today's Love Fortune
Score: [0-100]
Summary:
[3-5 sentences]
Suggestions:
- [Suggestion 1]
- [Suggestion 2]
- [Suggestion 3]

### Personalized Analysis
#### Personality Analysis
[2-3 paragraphs]
#### Love Attitude Analysis
[2-3 paragraphs]
#### Detailed Advice
1. [Advice 1]
2. [Advice 2]
3. [Advice 3]
`;

      setLoading(true);
      setError(null);

      fetch('/api/ai-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
        .then(res => res.json())
        .then(data => {
          setAiResult(data.result);
          localStorage.setItem(`loveReading_${userKey}`, data.result);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to get your reading. Please try again.');
          setLoading(false);
        });
    }

    const cachedWish = localStorage.getItem(wishKey);
    setMerit(cachedWish ? parseInt(cachedWish, 10) : 0);
  }, [isClient, userKey, wishKey]);

  const handleWishClick = () => {
    // 先从 localStorage 取最新值，保证同步
    const current = parseInt(localStorage.getItem(wishKey) || '0', 10);
    const newMerit = current + 1;
    setMerit(newMerit);
    localStorage.setItem(wishKey, String(newMerit));
    
    // 动效
    const newText = {
      id: Date.now() + Math.random(),
      text: '✨ Wish Granted! ✨'
    };
    setFloatingTexts(prev => [...prev, newText]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== newText.id));
    }, 1000);
  };

  const handleDeepQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentStatus('processing');
    
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          question: selectedQuestion === 'custom' ? customQuestion : selectedQuestion,
          amount: CONSULTATION_PRICE,
          userData: {
            name: searchParams.get('name'),
            birthday: searchParams.get('birthdate'),
            gender: searchParams.get('gender'),
            mbti: searchParams.get('mbti'),
            zodiac: searchParams.get('zodiac')
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const { sessionId } = await response.json();
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe?.redirectToCheckout({ sessionId });
      
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) return null;

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black">
        <div className="mystic-card p-8 text-center">
          <div className="animate-spin text-6xl mb-4">🔮</div>
          <p className="text-xl text-purple-200">Analyzing your love fortune...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black">
        <div className="mystic-card p-8 text-center">
          <h1 className="text-2xl text-red-400 mb-4">Error</h1>
          <p className="text-purple-200 mb-4">{error}</p>
          <Link href="/test" className="mystic-button px-6 py-2">
            Back to Form
          </Link>
        </div>
      </main>
    );
  }

  // Parse AI result
  let todayScore = '';
  let todaySummary = '';
  let todayAdvices: string[] = [];
  let personality = '';
  let loveAttitude = '';
  let detailAdvices: string[] = [];

  if (aiResult) {
    const todayMatch = aiResult.match(/### Today's Love Fortune([\s\S]*?)### Personalized Analysis/);
    if (todayMatch) {
      const todayBlock = todayMatch[1];
      const scoreMatch = todayBlock.match(/Score:\s*(\d+)/);
      todayScore = scoreMatch ? scoreMatch[1] : '';
      const summaryMatch = todayBlock.match(/Summary:\s*([\s\S]*?)Suggestions:/);
      todaySummary = summaryMatch ? summaryMatch[1].replace(/\n/g, ' ').trim() : '';
      const advicesMatch = todayBlock.match(/Suggestions:([\s\S]*)/);
      if (advicesMatch) {
        todayAdvices = advicesMatch[1]
          .split('\n')
          .map(line => line.replace(/^- /, '').trim())
          .filter(Boolean)
          .slice(0, 3);
      }
    }
    const personalMatch = aiResult.match(/### Personalized Analysis([\s\S]*)/);
    if (personalMatch) {
      const personalBlock = personalMatch[1];
      const personalityMatch = personalBlock.match(/#### Personality Analysis([\s\S]*?)(####|$)/);
      personality = personalityMatch ? personalityMatch[1].trim() : '';
      const loveAttitudeMatch = personalBlock.match(/#### Love Attitude Analysis([\s\S]*?)(####|$)/);
      loveAttitude = loveAttitudeMatch ? loveAttitudeMatch[1].trim() : '';
      const detailAdvicesMatch = personalBlock.match(/#### Detailed Advice([\s\S]*)/);
      if (detailAdvicesMatch) {
        detailAdvices = detailAdvicesMatch[1]
          .split('\n')
          .map(line => line.replace(/^\d+\.\s*/, '').trim())
          .filter(Boolean);
      }
    }
  }
  return (
    <main className="min-h-[200vh] flex flex-col items-center p-4 md:p-8 bg-gradient-to-b from-purple-900/40 to-black">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mystic-text mb-4">
            Love Reading
          </h1>
          <p className="text-3xl font-bold text-white drop-shadow-md">
            {name} · {searchParams.get('mbti') || 'Unknown MBTI'} · {searchParams.get('zodiac') || 'Unknown Zodiac'}
          </p>
        </div>

        {/* Top two columns 7:3 */}
        <div className="grid gap-8 md:grid-cols-10 mb-12 items-stretch">
          {/* 左侧：今日爱情运势 */}
          <div className="mystic-card p-6 flex flex-col items-start md:col-span-7 col-span-12 h-full">
            {/* 日期标题 */}
            <div className="w-full text-center mb-4">
              <span className="text-2xl font-bold mystic-text">
            {new Date().toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} Celestial Insights
              </span>
        </div>
            <div className="flex items-center mb-2">
              <span className="text-5xl font-extrabold mystic-text mr-4">{todayScore}</span>
              <span className="text-purple-300 font-semibold">Today's Love Score</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-purple-300 block mb-1">Summary</span>
              <span className="text-purple-200">{todaySummary}</span>
            </div>
            <div>
              <span className="font-semibold text-purple-300 block mb-1">Suggestions</span>
              <ul className="text-purple-100/90 list-disc pl-5 mt-1">
                {todayAdvices.map((advice, i) => (
                  <li key={i}>{advice}</li>
                ))}
              </ul>
                </div>
              </div>
          {/* 右侧：水晶球许愿 */}
          <div className="mystic-card p-6 flex flex-col items-center md:col-span-3 col-span-12 h-full justify-start">
            <h3 className="text-2xl font-bold mystic-text mb-4">Crystal Ball Wish</h3>
            <div className="relative flex flex-col items-center mt-2 w-full">
              {/* 动效弹窗，必须在按钮外部，且父容器 relative */}
              {floatingTexts.map(text => (
                <span
                  key={text.id}
                  className="absolute left-1/2 animate-float-up"
                  style={{
                    top: '2.5rem',
                    transform: 'translateX(-50%)',
                    color: '#c4b5fd',
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    textShadow: '0 2px 8px #0008',
                    zIndex: 20
                  }}
                >
                  {'✨ Wish Granted! ✨'}
                    </span>
                  ))}
              <button
                onClick={handleWishClick}
                className="text-6xl hover:scale-110 transition-transform cursor-pointer relative z-10 mt-20"
                aria-label="Wish"
                style={{ background: 'none', border: 'none' }}
                id="crystal-ball-btn"
              >
                🔮
              </button>
              <div className="w-full flex flex-col items-center">
                <p className="text-purple-200 mb-2 mt-8">Total Wishes: {merit}</p>
                <p className="text-purple-100/70 text-sm text-center mt-12">
                  Click the crystal ball to make a love wish for today
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 详细解读部分 */}
        <div className="mystic-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 mystic-text">Your Personalized Reading</h2>
          {aiResult && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-200">Personality Analysis</h3>
                <p className="text-gray-300 leading-relaxed">{personality}</p>
            </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-200">Love Attitude Analysis</h3>
                <p className="text-gray-300 leading-relaxed">{loveAttitude}</p>
          </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-200">Detailed Advice</h3>
                <ul className="text-gray-300 leading-relaxed list-decimal pl-5">
                  {detailAdvices.map((advice, index) => (
                    <li key={index} className="mb-2">{advice}</li>
                ))}
              </ul>
            </div>
          </div>
          )}
        </div>

        {/* 深度问题咨询部分 */}
        <div className="mystic-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 mystic-text">Ask a Deep Question</h2>
          {!showDeepQuestion ? (
            <div className="text-center">
              <p className="mb-6 text-gray-300">
                Want to know more about your love life? Get a detailed answer to your specific question.
              </p>
              <button
                onClick={() => setShowDeepQuestion(true)}
                className="mystic-button px-8 py-3 text-lg"
              >
                Ask Now (${CONSULTATION_PRICE})
              </button>
            </div>
          ) : (
            <form onSubmit={handleDeepQuestionSubmit} className="space-y-6">
              <div>
                <label className="block text-purple-200 mb-2">Choose a question or write your own:</label>
                <select
                  value={selectedQuestion}
                  onChange={(e) => {
                    setSelectedQuestion(e.target.value);
                    if (e.target.value === 'custom') {
                      setCustomQuestion('');
                    }
                  }}
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white mb-4"
                >
                  <option value="">Select a question</option>
                  {deepQuestions.map((q, index) => (
                    <option key={index} value={q}>{q}</option>
                  ))}
                  <option value="custom">Write my own question</option>
                </select>
                
                {selectedQuestion === 'custom' && (
                  <textarea
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white h-32"
                  />
                )}
              </div>

              <div>
                <label className="block text-purple-200 mb-2">Your Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to receive the answer"
                  required
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white"
                />
                <p className="text-sm text-purple-300 mt-2">
                  We'll send the detailed answer to this email address
                </p>
              </div>

              {paymentStatus === 'idle' && (
                <button
                  type="submit"
                  disabled={isSubmitting || !email || (!selectedQuestion && !customQuestion)}
                  className={`mystic-button px-8 py-3 text-lg w-full ${
                    (isSubmitting || !email || (!selectedQuestion && !customQuestion)) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : `Pay ${CONSULTATION_PRICE} to Get Answer`}
                </button>
              )}

              {paymentStatus === 'processing' && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-purple-300">Processing payment...</p>
            </div>
              )}

              {paymentStatus === 'success' && (
                <div className="text-center text-green-400">
                  <p className="mb-4">Payment successful! We'll send the detailed answer to your email within 24 hours.</p>
                  <button
                    onClick={() => {
                      setShowDeepQuestion(false);
                      setPaymentStatus('idle');
                      setEmail('');
                      setSelectedQuestion('');
                      setCustomQuestion('');
                    }}
                    className="mystic-button px-6 py-2"
                  >
                    Ask Another Question
                  </button>
          </div>
              )}

              {paymentStatus === 'failed' && (
                <div className="text-center text-red-400">
                  <p className="mb-4">Payment failed. Please try again.</p>
                  <button
                    onClick={() => setPaymentStatus('idle')}
                    className="mystic-button px-6 py-2"
                  >
                    Try Again
                  </button>
          </div>
              )}
            </form>
          )}
        </div>

        {/* Bottom navigation */}
        <div className="flex justify-center space-x-4 my-8">
          <Link href="/test" className="mystic-button px-6 py-2">
            New Reading
          </Link>
          <Link href="/" className="mystic-button px-6 py-2">
            Home
          </Link>
        </div>
      </div>

      {/* 用户评价区，三列卡片式 */}
      <div className="max-w-4xl mx-auto w-full my-12">
        <h2 className="text-2xl md:text-3xl font-bold mystic-text text-center mb-8">User Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 评价1 */}
          <div className="mystic-card p-8 flex flex-col items-center shadow-lg">
            <div className="text-xl text-purple-100/90 mb-6 font-serif text-center">“I love checking my daily love fortune based on my MBTI and zodiac! The analysis is always spot on and helps me understand myself better.”</div>
            <div className="text-white text-lg mt-2">Emily, ENFP · Leo</div>
            <div className="text-purple-200 text-base font-semibold">Marketing Specialist</div>
          </div>
          {/* 评价2 */}
          <div className="mystic-card p-8 flex flex-col items-center shadow-lg">
            <div className="text-xl text-purple-100/90 mb-6 font-serif text-center">“The personalized advice and deep question reading gave me real guidance for my relationship. Highly recommended!”</div>
            <div className="text-white text-lg mt-2">Alex, ISTJ · Capricorn</div>
            <div className="text-purple-200 text-base font-semibold">Software Engineer</div>
          </div>
          {/* 评价3 */}
          <div className="mystic-card p-8 flex flex-col items-center shadow-lg">
            <div className="text-xl text-purple-100/90 mb-6 font-serif text-center">“Every day I get new insights about my love life. The MBTI and zodiac combo is so unique and the suggestions are practical!”</div>
            <div className="text-white text-lg mt-2">Sophia, INFP · Pisces</div>
            <div className="text-purple-200 text-base font-semibold">Freelancer</div>
          </div>
        </div>
      </div>

      {/* 页脚四列布局 */}
      <footer className="w-full bg-gradient-to-b from-transparent to-black border-t-0 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 drop-shadow-lg">
          {/* About Us */}
          <div>
            <div className="text-2xl font-extrabold mb-4 text-purple-200/80 drop-shadow-lg">About Us</div>
            <div className="text-lg text-purple-200/80 leading-relaxed drop-shadow-lg">
              We provide daily love fortune readings and personality insights based on your zodiac sign and MBTI type. Our mission is to help you understand yourself and your relationships better, every single day.
            </div>
          </div>
          {/* Contact */}
          <div>
            <div className="text-2xl font-extrabold mb-4 text-purple-200/80 drop-shadow-lg">Contact</div>
            <div className="text-lg text-purple-200/80 mb-2 drop-shadow-lg">Email:</div>
            <a href="mailto:simanren2022@gmail.com" className="underline hover:text-purple-300 text-lg text-purple-200/80 drop-shadow-lg normal-case font-mono" style={{ textTransform: 'lowercase' }}>simanren2022@gmail.com</a>
          </div>
          {/* Services */}
          <div>
            <div className="text-2xl font-extrabold mb-4 text-purple-200/80 drop-shadow-lg">Services</div>
            <ul className="text-lg text-purple-200/80 space-y-2 drop-shadow-lg">
              <li>Daily Love Fortune (Zodiac + MBTI)</li>
              <li>Personalized Personality Analysis</li>
              <li>Actionable Love Advice</li>
              <li>Deep Question Consultation</li>
            </ul>
          </div>
          {/* Specialties */}
          <div>
            <div className="text-2xl font-extrabold mb-4 text-purple-200/80 drop-shadow-lg">Specialties</div>
            <ul className="text-lg text-purple-200/80 space-y-2 drop-shadow-lg">
              <li>Astrology & MBTI Integration</li>
              <li>Relationship Guidance</li>
              <li>Emotional Growth Support</li>
              <li>In-depth Q&A Readings</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
} 