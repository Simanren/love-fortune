// 定义类型
interface ZodiacInfo {
  element: string;
  quality: string;
  ruler: string;
  traits: {
    love: string[];
    personality: string[];
  }
}

interface MBTIInfo {
  cognitive: {
    dominant: string;
    auxiliary: string;
  };
  traits: {
    relationship: string[];
    communication: string[];
  }
}

interface PlanetaryAspect {
  love: number;
  harmony: number;
  creativity: number;
}

// 星座基础数据
export const zodiacData: Record<string, ZodiacInfo> = {
  Aries: {
    element: 'Fire',
    quality: 'Cardinal',
    ruler: 'Mars',
    traits: {
      love: ['passionate', 'direct', 'enthusiastic'],
      personality: ['confident', 'courageous', 'impulsive']
    }
  },
  Taurus: {
    element: 'Earth',
    quality: 'Fixed',
    ruler: 'Venus',
    traits: {
      love: ['romantic', 'loyal', 'sensual'],
      personality: ['patient', 'reliable', 'stubborn']
    }
  },
  // ... 其他星座数据
};

// MBTI基础数据
export const mbtiData: Record<string, MBTIInfo> = {
  INTJ: {
    cognitive: {
      dominant: 'Introverted Intuition',
      auxiliary: 'Extraverted Thinking'
    },
    traits: {
      relationship: ['strategic', 'loyal', 'deep connection'],
      communication: ['direct', 'intellectual', 'reserved']
    }
  },
  INFJ: {
    cognitive: {
      dominant: 'Introverted Intuition',
      auxiliary: 'Extraverted Feeling'
    },
    traits: {
      relationship: ['empathetic', 'deep', 'idealistic'],
      communication: ['insightful', 'diplomatic', 'complex']
    }
  },
  // ... 其他MBTI数据
};

// 行星相位影响
export const planetaryAspects: Record<string, PlanetaryAspect> = {
  Venus: {
    love: 5,
    harmony: 4,
    creativity: 3
  },
  Mars: {
    love: 4,
    harmony: 3,
    creativity: 5
  }
};

// 计算爱情指数
export const calculateLoveIndex = (zodiac: string, mbti: string, date: string): number => {
  const dateObj = new Date(date);
  const seed = dateObj.getTime() + zodiac.length + mbti.length;
  
  // 基础分数 (1-5)
  const baseScore = (Math.sin(seed) + 1) * 2.5;
  
  // MBTI调节因子 (0.8-1.2)
  const mbtiMod = 0.8 + (mbti.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5) * 0.1;
  
  // 星座调节因子 (0.8-1.2)
  const zodiacMod = 0.8 + (zodiac.length % 5) * 0.1;
  
  // 日期影响 (0.9-1.1)
  const dateMod = 0.9 + (dateObj.getDate() % 3) * 0.1;
  
  return Math.round(baseScore * mbtiMod * zodiacMod * dateMod);
};

// 计算运势指数
export const calculateFortuneIndex = (zodiac: string, mbti: string, date: string): number => {
  const dateObj = new Date(date);
  const seed = dateObj.getTime() + zodiac.charCodeAt(0) + mbti.charCodeAt(0);
  
  // 基础分数 (1-5)
  const baseScore = (Math.cos(seed) + 1) * 2.5;
  
  // 星座调节因子 (0.8-1.2)
  const zodiacMod = 0.8 + (zodiac.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5) * 0.1;
  
  // 日期影响 (0.9-1.1)
  const dateMod = 0.9 + (dateObj.getDate() % 3) * 0.1;
  
  return Math.round(baseScore * zodiacMod * dateMod);
};

interface ReadingResult {
  loveIndex: number;
  fortuneIndex: number;
  keywords: string[];
  reading: {
    overview: string;
    strengths: string[];
    challenges: string[];
    advice: string[];
  };
}

// 生成个性化解读
export const generatePersonalizedReading = (
  name: string, 
  mbti: string, 
  zodiac: string, 
  date: string
): ReadingResult => {
  const loveIndex = calculateLoveIndex(zodiac, mbti, date);
  const fortuneIndex = calculateFortuneIndex(zodiac, mbti, date);
  
  const mbtiInfo = mbtiData[mbti];
  const zodiacInfo = zodiacData[zodiac];
  
  // 生成关键词
  const keywords = [
    ...(mbtiInfo?.traits.relationship || []),
    ...(zodiacInfo?.traits.love || [])
  ].slice(0, 3);
  
  // 生成运势解读
  const reading = {
    overview: `Dear ${name}, your ${mbtiInfo?.cognitive.dominant} combined with ${zodiac}'s ${zodiacInfo?.element} energy creates a unique love perspective.`,
    strengths: [
      `Your ${mbtiInfo?.cognitive.dominant} helps you understand relationships deeply`,
      `${zodiac}'s ${zodiacInfo?.quality} nature brings ${zodiacInfo?.traits.love[0]} to your love life`,
      `Your ${mbtiInfo?.traits.communication[0]} communication style attracts meaningful connections`
    ],
    challenges: [
      `Balance your ${mbtiInfo?.cognitive.auxiliary} with emotional needs`,
      `Be mindful of ${zodiacInfo?.traits.personality[2]} tendencies`,
      `Work on expressing feelings more ${mbtiInfo?.traits.communication[1]}ly`
    ],
    advice: [
      `Let your ${zodiacInfo?.element} element guide your heart`,
      `Trust your ${mbtiInfo?.cognitive.dominant} when making relationship decisions`,
      `Embrace your unique combination of ${mbti} and ${zodiac} traits`
    ]
  };
  
  return {
    loveIndex,
    fortuneIndex,
    keywords,
    reading
  };
}; 