export async function generateAIResponse(question: string, userData: any) {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a professional love and relationship consultant. 
            The user's information: 
            Name: ${userData.name}
            Birthday: ${userData.birthday}
            Gender: ${userData.gender}
            MBTI: ${userData.mbti}
            Zodiac: ${userData.zodiac}
            
            Please first briefly analyze the user's past emotional experiences and influencing factors (if any), then provide a detailed, logical, and well-reasoned answer to their question. All predictions and advice must be based on the current date (${new Date().toISOString().split('T')[0]}) and the future. For every conclusion, explain the reasoning and influencing factors, incorporating the user's zodiac, MBTI, and birthday information. Focus on the user's specific question, provide time periods and key events to watch for, and avoid generic personality analysis. Do not mention AI in the answer.`
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI response generation failed:', error);
    throw error;
  }
} 