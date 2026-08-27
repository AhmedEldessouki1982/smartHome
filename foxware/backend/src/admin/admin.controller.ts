import { Controller, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get admin dashboard stats' })
  getStats() {
    return this.adminService.getStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'List all users' })
  getUsers() {
    return this.adminService.getUsers();
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Update user role' })
  updateUserRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.adminService.updateUserRole(id, body.role);
  }

  @Get('settings')
  @ApiOperation({ summary: 'Get admin settings (API key status)' })
  async getSettings(@Request() req: { user: { id: string } }) {
    const user = await this.adminService.getUser(req.user.id);
    return { hasApiKey: !!user?.openRouterApiKey };
  }

  @Patch('settings')
  @ApiOperation({ summary: 'Update admin settings (API key)' })
  async updateSettings(@Request() req: { user: { id: string } }, @Body() body: { openRouterApiKey: string }) {
    await this.adminService.updateSettings(req.user.id, body.openRouterApiKey);
    return { ok: true };
  }
}
