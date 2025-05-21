import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const apiKey = process.env.DEEPSEEK_API_KEY;
  console.log('Using DeepSeek API Key:', apiKey?.slice(0, 8) + '...' + apiKey?.slice(-4));
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  console.log('DeepSeek API response:', data); // 关键日志
  console.log('DeepSeek message:', JSON.stringify(data.choices?.[0]?.message)); // 新增日志

  // 错误处理
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    return NextResponse.json(
      { result: 'AI service error: ' + (data.error?.message || JSON.stringify(data)) },
      { status: 500 }
    );
  }

  // 防御性返回，避免 content 不存在导致卡住
  return NextResponse.json({ result: data.choices[0].message?.content || 'No content returned from AI.' });
}