export interface BasicZodiacInfo {
  element: string;
  quality: string;
  ruler: string;
  traits: {
    love: string[];
    personality: string[];
  }
}

export const zodiacData: Record<string, BasicZodiacInfo> = {
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
  Gemini: {
    element: 'Air',
    quality: 'Mutable',
    ruler: 'Mercury',
    traits: {
      love: ['playful', 'communicative', 'adaptable'],
      personality: ['curious', 'versatile', 'indecisive']
    }
  },
  Cancer: {
    element: 'Water',
    quality: 'Cardinal',
    ruler: 'Moon',
    traits: {
      love: ['nurturing', 'protective', 'emotional'],
      personality: ['intuitive', 'caring', 'moody']
    }
  },
  Leo: {
    element: 'Fire',
    quality: 'Fixed',
    ruler: 'Sun',
    traits: {
      love: ['generous', 'dramatic', 'affectionate'],
      personality: ['charismatic', 'proud', 'attention-seeking']
    }
  },
  Virgo: {
    element: 'Earth',
    quality: 'Mutable',
    ruler: 'Mercury',
    traits: {
      love: ['attentive', 'analytical', 'helpful'],
      personality: ['practical', 'diligent', 'perfectionist']
    }
  },
  Libra: {
    element: 'Air',
    quality: 'Cardinal',
    ruler: 'Venus',
    traits: {
      love: ['harmonious', 'charming', 'diplomatic'],
      personality: ['balanced', 'social', 'indecisive']
    }
  },
  Scorpio: {
    element: 'Water',
    quality: 'Fixed',
    ruler: 'Pluto',
    traits: {
      love: ['intense', 'passionate', 'mysterious'],
      personality: ['deep', 'magnetic', 'secretive']
    }
  },
  Sagittarius: {
    element: 'Fire',
    quality: 'Mutable',
    ruler: 'Jupiter',
    traits: {
      love: ['adventurous', 'optimistic', 'honest'],
      personality: ['philosophical', 'freedom-loving', 'restless']
    }
  },
  Capricorn: {
    element: 'Earth',
    quality: 'Cardinal',
    ruler: 'Saturn',
    traits: {
      love: ['committed', 'traditional', 'responsible'],
      personality: ['ambitious', 'disciplined', 'reserved']
    }
  },
  Aquarius: {
    element: 'Air',
    quality: 'Fixed',
    ruler: 'Uranus',
    traits: {
      love: ['unique', 'intellectual', 'independent'],
      personality: ['innovative', 'humanitarian', 'detached']
    }
  },
  Pisces: {
    element: 'Water',
    quality: 'Mutable',
    ruler: 'Neptune',
    traits: {
      love: ['romantic', 'empathetic', 'dreamy'],
      personality: ['compassionate', 'artistic', 'escapist']
    }
  }
}; 