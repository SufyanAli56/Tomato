// src/menu/menu.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem } from './schemas/menu-item.schema';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);

  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
  ) {
    this.initializeMenu();
  }

  private async initializeMenu() {
    try {
      const count = await this.menuItemModel.countDocuments();
      
      if (count === 0) {
        this.logger.log('Seeding menu data with 32 dishes...');
        
        const menuItems = [

          {
            name: 'Greek Salad',
            price: 12,
            category: 'Salad',
            description: 'Fresh veggies with olives, feta & herbs.',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
            ingredients: ['Lettuce', 'Tomatoes', 'Olives', 'Feta Cheese', 'Cucumber', 'Olive Oil'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 15,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Veggie Garden Salad',
            price: 10,
            category: 'Salad',
            description: 'Colorful greens with lemon dressing.',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
            ingredients: ['Mixed Greens', 'Carrots', 'Bell Peppers', 'Lemon Dressing'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 10,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Caesar Crunch Salad',
            price: 14,
            category: 'Salad',
            description: 'Classic Caesar with crunchy toppings.',
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
            ingredients: ['Romaine Lettuce', 'Croutons', 'Parmesan', 'Caesar Dressing'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 12,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Avocado Fresh Salad',
            price: 13,
            category: 'Salad',
            description: 'Creamy avocado mixed with veggies.',
            image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=400&h=300&fit=crop',
            ingredients: ['Avocado', 'Spinach', 'Cherry Tomatoes', 'Lemon Vinaigrette'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 15,
            rating: 5.0,
            available: true,
          },

          // ROLLS
          {
            name: 'Veg Spring Roll',
            price: 8,
            category: 'Rolls',
            description: 'Crispy fried rolls with veggies.',
            image: 'https://images.unsplash.com/photo-1589606665149-2c8f6d1d6f0c?w=400&h=300&fit=crop',
            ingredients: ['Cabbage', 'Carrots', 'Spring Roll Wrappers', 'Vermicelli'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 20,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Paneer Tikka Roll',
            price: 11,
            category: 'Rolls',
            description: 'Paneer tikka wrapped in soft roti.',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
            ingredients: ['Paneer', 'Bell Peppers', 'Onions', 'Tikka Masala'],
            isVegetarian: true,
            isSpicy: true,
            preparationTime: 25,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Chicken Shawarma Roll',
            price: 12,
            category: 'Rolls',
            description: 'Middle-eastern style juicy chicken roll.',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
            ingredients: ['Chicken', 'Garlic Sauce', 'Pickles', 'Pita Bread'],
            isVegetarian: false,
            isSpicy: true,
            preparationTime: 20,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Egg Masala Roll',
            price: 10,
            category: 'Rolls',
            description: 'Egg masala wrapped in rumali roti.',
            image: 'https://images.unsplash.com/photo-1586197136192-4d5dfe5f4f8e?w=400&h=300&fit=crop',
            ingredients: ['Eggs', 'Onions', 'Tomatoes', 'Spices'],
            isVegetarian: true,
            isSpicy: true,
            preparationTime: 15,
            rating: 4.0,
            available: true,
          },

          // DESERTS (Note: Fixed spelling from "Deserts" to "Desserts")
          {
            name: 'Chocolate Lava Cake',
            price: 9,
            category: 'Desserts',
            description: 'Hot lava cake with melting core.',
            image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
            ingredients: ['Chocolate', 'Flour', 'Eggs', 'Sugar', 'Vanilla'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 15,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Strawberry Cheesecake',
            price: 11,
            category: 'Desserts',
            description: 'Creamy cheesecake with strawberry syrup.',
            image: 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400&h=300&fit=crop',
            ingredients: ['Cream Cheese', 'Graham Cracker', 'Strawberries', 'Sugar'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 30,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Blueberry Mousse',
            price: 10,
            category: 'Desserts',
            description: 'Soft mousse with blueberry flavor.',
            image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop',
            ingredients: ['Blueberries', 'Cream', 'Gelatin', 'Sugar'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 20,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Vanilla Pudding Delight',
            price: 7,
            category: 'Desserts',
            description: 'Classic vanilla pudding served chilled.',
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
            ingredients: ['Milk', 'Vanilla', 'Sugar', 'Cornstarch'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 10,
            rating: 4.0,
            available: true,
          },

          // SANDWICH
          {
            name: 'Grilled Cheese Sandwich',
            price: 8,
            category: 'Sandwich',
            description: 'Melty cheese between toasted bread.',
            image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
            ingredients: ['Bread', 'Cheddar Cheese', 'Butter'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 10,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Chicken Mayo Sandwich',
            price: 12,
            category: 'Sandwich',
            description: 'Chicken chunks mixed with mayo.',
            image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop',
            ingredients: ['Chicken', 'Mayonnaise', 'Lettuce', 'Bread'],
            isVegetarian: false,
            isSpicy: false,
            preparationTime: 12,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Veggie Club Sandwich',
            price: 10,
            category: 'Sandwich',
            description: 'Triple-layered sandwich loaded with veggies.',
            image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop',
            ingredients: ['Bread', 'Lettuce', 'Tomato', 'Cucumber', 'Mayo'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 15,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Paneer Cheese Grill Sandwich',
            price: 11,
            category: 'Sandwich',
            description: 'Paneer with cheese grilled to perfection.',
            image: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=400&h=300&fit=crop',
            ingredients: ['Paneer', 'Cheese', 'Bread', 'Butter'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 15,
            rating: 5.0,
            available: true,
          },

          // CAKE
          {
            name: 'Chocolate Fudge Cake',
            price: 14,
            category: 'Cake',
            description: 'Rich chocolate fudge layered cake.',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
            ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 45,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Red Velvet Cake',
            price: 15,
            category: 'Cake',
            description: 'Soft red velvet topped with cream cheese.',
            image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop',
            ingredients: ['Cocoa', 'Buttermilk', 'Cream Cheese', 'Food Color'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 50,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Black Forest Cake',
            price: 16,
            category: 'Cake',
            description: 'Chocolate cake with cherries.',
            image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400&h=300&fit=crop',
            ingredients: ['Chocolate', 'Cherries', 'Cream', 'Kirsch'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 55,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Pineapple Cream Cake',
            price: 13,
            category: 'Cake',
            description: 'Light pineapple cake with fresh cream.',
            image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=300&fit=crop',
            ingredients: ['Pineapple', 'Cream', 'Sponge Cake', 'Sugar'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 40,
            rating: 4.0,
            available: true,
          },

          // PURE VEG
          {
            name: 'Paneer Butter Masala',
            price: 18,
            category: 'Pure Veg',
            description: 'Classic Indian curry with paneer.',
            image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
            ingredients: ['Paneer', 'Tomatoes', 'Cream', 'Butter', 'Spices'],
            isVegetarian: true,
            isSpicy: true,
            preparationTime: 30,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Mix Veg Curry',
            price: 14,
            category: 'Pure Veg',
            description: 'Healthy mixed vegetable curry.',
            image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
            ingredients: ['Potatoes', 'Carrots', 'Peas', 'Cauliflower', 'Spices'],
            isVegetarian: true,
            isSpicy: true,
            preparationTime: 25,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Dal Tadka Special',
            price: 12,
            category: 'Pure Veg',
            description: 'Authentic Indian lentil tadka.',
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
            ingredients: ['Lentils', 'Garlic', 'Onions', 'Ghee', 'Spices'],
            isVegetarian: true,
            isSpicy: true,
            preparationTime: 35,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Veg Kofta Curry',
            price: 16,
            category: 'Pure Veg',
            description: 'Soft veg koftas in rich gravy.',
            image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop',
            ingredients: ['Mixed Vegetables', 'Paneer', 'Cream', 'Cashews', 'Spices'],
            isVegetarian: true,
            isSpicy: true,
            preparationTime: 40,
            rating: 5.0,
            available: true,
          },

          // PASTA
          {
            name: 'White Sauce Pasta',
            price: 13,
            category: 'Pasta',
            description: 'Creamy white sauce pasta.',
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
            ingredients: ['Pasta', 'Cream', 'Cheese', 'Garlic', 'Butter'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 20,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Red Sauce Pasta',
            price: 12,
            category: 'Pasta',
            description: 'Tomato-rich tangy red sauce pasta.',
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
            ingredients: ['Pasta', 'Tomatoes', 'Garlic', 'Basil', 'Olive Oil'],
            isVegetarian: true,
            isSpicy: true,
            preparationTime: 18,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Pesto Basil Pasta',
            price: 15,
            category: 'Pasta',
            description: 'Italian pesto with basil & olive oil.',
            image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop',
            ingredients: ['Pasta', 'Basil', 'Pine Nuts', 'Parmesan', 'Olive Oil'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 22,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Creamy Mushroom Pasta',
            price: 16,
            category: 'Pasta',
            description: 'Mushrooms cooked in creamy sauce.',
            image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&h=300&fit=crop',
            ingredients: ['Pasta', 'Mushrooms', 'Cream', 'Garlic', 'Parsley'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 25,
            rating: 5.0,
            available: true,
          },

          // NOODLES
          {
            name: 'Veg Hakka Noodles',
            price: 10,
            category: 'Noodles',
            description: 'Chinese-style stir-fried noodles.',
            image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
            ingredients: ['Noodles', 'Bell Peppers', 'Carrots', 'Cabbage', 'Soy Sauce'],
            isVegetarian: true,
            isSpicy: true,
            preparationTime: 15,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Chicken Chow Mein',
            price: 12,
            category: 'Noodles',
            description: 'Stir-fried noodles with chicken.',
            image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop',
            ingredients: ['Noodles', 'Chicken', 'Bean Sprouts', 'Spring Onions', 'Oyster Sauce'],
            isVegetarian: false,
            isSpicy: true,
            preparationTime: 20,
            rating: 5.0,
            available: true,
          },
          {
            name: 'Schezwan Spicy Noodles',
            price: 11,
            category: 'Noodles',
            description: 'Hot & spicy Indo-Chinese noodles.',
            image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
            ingredients: ['Noodles', 'Schezwan Sauce', 'Vegetables', 'Garlic', 'Ginger'],
            isVegetarian: true,
            isSpicy: true,
            preparationTime: 18,
            rating: 4.0,
            available: true,
          },
          {
            name: 'Garlic Butter Noodles',
            price: 13,
            category: 'Noodles',
            description: 'Garlic flavored buttery noodles.',
            image: 'https://images.unsplash.com/photo-1634034395072-7c8f1627c01c?w=400&h=300&fit=crop',
            ingredients: ['Noodles', 'Garlic', 'Butter', 'Parsley', 'Parmesan'],
            isVegetarian: true,
            isSpicy: false,
            preparationTime: 15,
            rating: 5.0,
            available: true,
          },
        ];

        await this.menuItemModel.insertMany(menuItems);
        this.logger.log(` Added ${menuItems.length} menu items to database`);
      } else {
        this.logger.log(` Database already has ${count} menu items`);
      }
    } catch (error) {
      this.logger.error(' Error seeding menu data:', error);
    }
  }

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemModel.find().exec();
  }

  async findOne(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemModel.findById(id).exec();
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return menuItem;
  }

  async findByCategory(category: string): Promise<MenuItem[]> {
    return this.menuItemModel.find({ category }).exec();
  }

  async searchByName(name: string): Promise<MenuItem[]> {
    return this.menuItemModel.find({
      name: { $regex: name, $options: 'i' }
    }).exec();
  }

  async count(): Promise<number> {
    return this.menuItemModel.countDocuments();
  }

  async resetAndSeed(): Promise<{ message: string; count: number }> {
    try {
      // Delete all existing menu items
      await this.menuItemModel.deleteMany({});
      this.logger.log('🗑️ Cleared all menu items');
      
      // Reinitialize
      await this.initializeMenu();
      
      const count = await this.menuItemModel.countDocuments();
      return {
        message: ' Menu reset and seeded successfully',
        count
      };
    } catch (error) {
      this.logger.error(' Error resetting menu:', error);
      throw error;
    }
  }

  async getCategories(): Promise<string[]> {
    const categories = await this.menuItemModel.distinct('category').exec();
    return categories.sort();
  }
}