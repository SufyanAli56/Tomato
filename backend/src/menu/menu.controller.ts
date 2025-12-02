// src/menu/menu.controller.ts
import { Controller, Get, Param, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem } from './schemas/menu-item.schema';

@Controller('practice/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // SPECIFIC ROUTES FIRST (before :id)
  @Get('count')
  async count(): Promise<{ count: number }> {
    const count = await this.menuService.count();
    return { count };
  }

  @Get('categories')
  async getCategories(): Promise<{ categories: string[] }> {
    const categories = await this.menuService.getCategories();
    return { categories };
  }

  @Get('search/:name')
  async searchByName(@Param('name') name: string): Promise<MenuItem[]> {
    return this.menuService.searchByName(name);
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string): Promise<MenuItem[]> {
    return this.menuService.findByCategory(category);
  }

  // GENERAL ROUTES
  @Get()
  async findAll(): Promise<MenuItem[]> {
    return this.menuService.findAll();
  }

  // PARAMETER ROUTE LAST (to avoid conflicts)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MenuItem> {
    return this.menuService.findOne(id);
  }

  @Post('reset-seed')
  async resetAndSeed() {
    return this.menuService.resetAndSeed();
  }
}