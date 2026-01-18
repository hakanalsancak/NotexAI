import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { auth } from '@/auth';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompts = {
  improve: `You are a professional editor. Improve the following text by:
- Fixing any grammar and spelling errors
- Enhancing clarity and readability
- Improving the flow and structure
- Keeping the original meaning and tone intact

Return the improved text in HTML format using appropriate tags (p, strong, em, ul, li, h2, h3, blockquote, etc.) for formatting.`,

  summarize: `You are a professional summarizer. Create a concise summary of the following content:
- Capture all key points
- Keep it brief but comprehensive
- Use bullet points where appropriate
- Maintain the essence of the original content

Return the summary in HTML format using appropriate tags (p, ul, li, strong, etc.) for formatting.`,

  expand: `You are a professional writer. Expand on the following content by:
- Elaborating on key points with more detail and examples
- Adding relevant context and explanations
- Maintaining the original tone and style
- Making the content more comprehensive and informative

Return the expanded text in HTML format using appropriate tags (p, strong, em, ul, li, h2, h3, blockquote, etc.) for formatting.`,

  professional: `You are a professional business writer. Transform the following content into a professional, formal tone:
- Use professional language and terminology
- Maintain a formal but accessible tone
- Structure the content clearly
- Keep the core message intact

Return the professional version in HTML format using appropriate tags (p, strong, em, ul, li, h2, h3, etc.) for formatting.`,
};

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured. Please add your OpenAI API key.' },
        { status: 503 }
      );
    }

    const { content, type } = await req.json();

    if (!content || !type) {
      return NextResponse.json(
        { error: 'Content and type are required' },
        { status: 400 }
      );
    }

    // Strip HTML for processing
    const plainText = content.replace(/<[^>]*>/g, '');

    if (plainText.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please add more content before enhancing' },
        { status: 400 }
      );
    }

    const systemPrompt = prompts[type as keyof typeof prompts];
    if (!systemPrompt) {
      return NextResponse.json(
        { error: 'Invalid enhancement type' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: plainText,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const enhanced = completion.choices[0]?.message?.content;

    if (!enhanced) {
      return NextResponse.json(
        { error: 'Failed to generate enhanced content' },
        { status: 500 }
      );
    }

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error('AI enhance error:', error);
    
    if (error instanceof OpenAI.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      if (error.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your configuration.' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to enhance content. Please try again.' },
      { status: 500 }
    );
  }
}
