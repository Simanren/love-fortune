import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmail } from '@/lib/email';
import { generateAIResponse } from '@/lib/ai';
import { marked } from 'marked';

// 检查环境变量
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY 环境变量未设置');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil', // 使用官方稳定版本
});

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      const metadata = session.metadata;
      const customerEmail = session.customer_email;
      if (!metadata || !customerEmail) {
        return NextResponse.json(
          { error: 'Session metadata or customer email missing' },
          { status: 400 }
        );
      }
      const { question, userData } = metadata;
      const parsedUserData = JSON.parse(userData);

      const aiResponse = await generateAIResponse(question, parsedUserData);
      const htmlContent = await marked.parse(aiResponse);

      await sendEmail({
        to: customerEmail,
        subject: 'Your Love Reading Answer',
        html: generateEmailTemplate(question, htmlContent),
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Payment success handling error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment success' },
      { status: 500 }
    );
  }
}

function generateEmailTemplate(question: string, answerHtml: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; 
      background: linear-gradient(135deg, #6B21A8 0%, #111827 100%);
      color: #f3e8ff; border-radius: 16px; box-shadow: 0 4px 24px #0004; padding: 32px;">
      <h2 style="color: #c4b5fd; text-align:center; margin-bottom: 24px;">Your Love Reading Answer</h2>
      <div style="background: rgba(30, 27, 75, 0.7); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h3 style="color: #a78bfa;">Your Question:</h3>
        <p style="color: #f3e8ff;">${question}</p>
      </div>
      <div style="background: rgba(30, 27, 75, 0.7); border-radius: 12px; padding: 20px;">
        <h3 style="color: #a78bfa;">Your Answer:</h3>
        <div style="color: #f3e8ff;">${answerHtml}</div>
      </div>
      <div style="margin-top: 32px; text-align: center; color: #a78bfa;">
        Thank you for using our service!<br>
        <span style="font-size: 1.1em;">Love Fortune Team</span>
      </div>
    </div>
  `;
}