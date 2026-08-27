import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface TokenUsage {
  totalTokens: number;
  totalCost: number;
  totalCalls: number;
}

@Injectable()
export class AiService {
  private tokenUsage = new Map<string, TokenUsage>();
  private readonly model = 'google/gemini-2.0-flash-lite-001';
  private readonly OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

  constructor(private prisma: PrismaService) {}

  private async getApiKey(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.openRouterApiKey) {
      throw new UnauthorizedException('OpenRouter API key not configured. Go to Admin → Settings.');
    }
    return user.openRouterApiKey;
  }

  private getUsage(userId: string): TokenUsage {
    if (!this.tokenUsage.has(userId)) {
      this.tokenUsage.set(userId, { totalTokens: 0, totalCost: 0, totalCalls: 0 });
    }
    return this.tokenUsage.get(userId)!;
  }

  private async callOpenRouter(apiKey: string, systemPrompt: string, userPrompt: string) {
    const res = await fetch(this.OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://almashareq.com',
        'X-Title': 'AL-Mashareq Admin',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      if (res.status === 401) throw new UnauthorizedException('Invalid OpenRouter API key. Update in Settings.');
      if (res.status === 429) throw new Error('OpenRouter rate limited. Try again in 60 seconds.');
      throw new Error(`OpenRouter error: ${err}`);
    }

    const data = await res.json();
    const usage = data.usage;
    return {
      content: data.choices[0].message.content,
      tokens: {
        prompt: usage.prompt_tokens,
        completion: usage.completion_tokens,
        total: usage.total_tokens,
      },
      cost: (usage.prompt_tokens * 0.075 + usage.completion_tokens * 0.3) / 1_000_000,
    };
  }

  async scoreQuote(quoteId: string, userId: string) {
    const quote = await this.prisma.quote.findUnique({ where: { id: quoteId } });
    if (!quote) throw new NotFoundException('Quote not found');

    const apiKey = await this.getApiKey(userId);
    const itemsText = (quote.items as Array<{ name: string; quantity?: number }>)
      .map(i => `${i.name} x${i.quantity ?? 1}`).join(', ');

    const systemPrompt = 'You are a lead scoring assistant for a home automation company in Egypt. Analyze the quote request and return ONLY valid JSON with these fields: score (1-10 integer), priority ("high"|"medium"|"low"), reason (short explanation).';
    const userPrompt = `Customer: ${quote.name}\nEmail: ${quote.email}\nPhone: ${quote.phone}\nMessage: ${quote.message || 'None'}\nItems: ${itemsText}`;

    const result = await this.callOpenRouter(apiKey, systemPrompt, userPrompt);

    const usage = this.getUsage(userId);
    usage.totalTokens += result.tokens.total;
    usage.totalCost += result.cost;
    usage.totalCalls++;

    return JSON.parse(result.content);
  }

  async generateDescription(name: string, categoryName: string, userId: string) {
    const apiKey = await this.getApiKey(userId);

    const systemPrompt = 'You are a product copywriter for a home automation e-commerce site. Generate a compelling product description in English. Return ONLY valid JSON: {"description": "2-3 paragraph description"}';
    const userPrompt = `Product Name: ${name}\nCategory: ${categoryName}`;

    const result = await this.callOpenRouter(apiKey, systemPrompt, userPrompt);

    const usage = this.getUsage(userId);
    usage.totalTokens += result.tokens.total;
    usage.totalCost += result.cost;
    usage.totalCalls++;

    return JSON.parse(result.content);
  }

  getTokenUsage(userId: string) {
    const usage = this.getUsage(userId);
    return { ...usage, model: this.model };
  }
}
