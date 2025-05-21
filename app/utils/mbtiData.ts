export interface BasicMBTIInfo {
  cognitive: {
    dominant: string;
    auxiliary: string;
  };
  traits: {
    relationship: string[];
    communication: string[];
  }
}

export const mbtiData: Record<string, BasicMBTIInfo> = {
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
  INTP: {
    cognitive: {
      dominant: 'Introverted Thinking',
      auxiliary: 'Extraverted Intuition'
    },
    traits: {
      relationship: ['analytical', 'independent', 'theoretical'],
      communication: ['logical', 'abstract', 'questioning']
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
  INFP: {
    cognitive: {
      dominant: 'Introverted Feeling',
      auxiliary: 'Extraverted Intuition'
    },
    traits: {
      relationship: ['authentic', 'romantic', 'devoted'],
      communication: ['gentle', 'creative', 'understanding']
    }
  },
  ISTJ: {
    cognitive: {
      dominant: 'Introverted Sensing',
      auxiliary: 'Extraverted Thinking'
    },
    traits: {
      relationship: ['committed', 'traditional', 'reliable'],
      communication: ['practical', 'clear', 'structured']
    }
  },
  ISFJ: {
    cognitive: {
      dominant: 'Introverted Sensing',
      auxiliary: 'Extraverted Feeling'
    },
    traits: {
      relationship: ['nurturing', 'dedicated', 'supportive'],
      communication: ['considerate', 'detail-oriented', 'helpful']
    }
  },
  ISTP: {
    cognitive: {
      dominant: 'Introverted Thinking',
      auxiliary: 'Extraverted Sensing'
    },
    traits: {
      relationship: ['adaptable', 'action-oriented', 'independent'],
      communication: ['concise', 'practical', 'straightforward']
    }
  },
  ISFP: {
    cognitive: {
      dominant: 'Introverted Feeling',
      auxiliary: 'Extraverted Sensing'
    },
    traits: {
      relationship: ['gentle', 'sensitive', 'spontaneous'],
      communication: ['artistic', 'harmonious', 'present-focused']
    }
  },
  ENTJ: {
    cognitive: {
      dominant: 'Extraverted Thinking',
      auxiliary: 'Introverted Intuition'
    },
    traits: {
      relationship: ['confident', 'decisive', 'goal-oriented'],
      communication: ['direct', 'efficient', 'strategic']
    }
  },
  ENTP: {
    cognitive: {
      dominant: 'Extraverted Intuition',
      auxiliary: 'Introverted Thinking'
    },
    traits: {
      relationship: ['enthusiastic', 'innovative', 'challenging'],
      communication: ['debating', 'witty', 'exploring']
    }
  },
  ENFJ: {
    cognitive: {
      dominant: 'Extraverted Feeling',
      auxiliary: 'Introverted Intuition'
    },
    traits: {
      relationship: ['charismatic', 'inspiring', 'supportive'],
      communication: ['warm', 'persuasive', 'encouraging']
    }
  },
  ENFP: {
    cognitive: {
      dominant: 'Extraverted Intuition',
      auxiliary: 'Introverted Feeling'
    },
    traits: {
      relationship: ['passionate', 'enthusiastic', 'inspiring'],
      communication: ['expressive', 'creative', 'encouraging']
    }
  },
  ESTJ: {
    cognitive: {
      dominant: 'Extraverted Thinking',
      auxiliary: 'Introverted Sensing'
    },
    traits: {
      relationship: ['organized', 'responsible', 'practical'],
      communication: ['direct', 'structured', 'efficient']
    }
  },
  ESFJ: {
    cognitive: {
      dominant: 'Extraverted Feeling',
      auxiliary: 'Introverted Sensing'
    },
    traits: {
      relationship: ['caring', 'social', 'harmonious'],
      communication: ['friendly', 'supportive', 'traditional']
    }
  },
  ESTP: {
    cognitive: {
      dominant: 'Extraverted Sensing',
      auxiliary: 'Introverted Thinking'
    },
    traits: {
      relationship: ['energetic', 'adventurous', 'spontaneous'],
      communication: ['direct', 'practical', 'playful']
    }
  },
  ESFP: {
    cognitive: {
      dominant: 'Extraverted Sensing',
      auxiliary: 'Introverted Feeling'
    },
    traits: {
      relationship: ['fun-loving', 'enthusiastic', 'spontaneous'],
      communication: ['expressive', 'friendly', 'entertaining']
    }
  }
}; 