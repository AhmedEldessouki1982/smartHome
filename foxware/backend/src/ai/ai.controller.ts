import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';

@ApiTags('ai')
@Controller('ai')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('score-quote')
  @ApiOperation({ summary: 'AI score a quote request' })
  scoreQuote(@Body('quoteId') quoteId: string, @Request() req: { user: { id: string } }) {
    return this.aiService.scoreQuote(quoteId, req.user.id);
  }

  @Post('generate-description')
  @ApiOperation({ summary: 'AI generate product description' })
  generateDescription(@Body() body: { name: string; categoryName: string }, @Request() req: { user: { id: string } }) {
    return this.aiService.generateDescription(body.name, body.categoryName, req.user.id);
  }

  @Get('token-usage')
  @ApiOperation({ summary: 'Get AI token usage stats for current admin' })
  getTokenUsage(@Request() req: { user: { id: string } }) {
    return this.aiService.getTokenUsage(req.user.id);
  }
}
