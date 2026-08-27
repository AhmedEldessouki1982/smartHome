import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [totalProducts, totalCategories, totalOrders, totalUsers, revenue] =
      await Promise.all([
        this.prisma.product.count(),
        this.prisma.category.count(),
        this.prisma.order.count(),
        this.prisma.user.count(),
        this.prisma.order.aggregate({ _sum: { total: true } }),
      ]);

    const recentOrders = await this.prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    });

    return {
      totalProducts,
      totalCategories,
      totalOrders,
      totalUsers,
      revenue: revenue._sum.total ?? 0,
      recentOrders,
    };
  }

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateUserRole(userId: string, role: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: role as 'USER' | 'ADMIN' },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { openRouterApiKey: true },
    });
  }

  async updateSettings(userId: string, openRouterApiKey: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { openRouterApiKey },
    });
  }
}
