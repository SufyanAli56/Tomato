// src/order/order.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from './schemas/order.schema';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private menuService: MenuService,
  ) {}

  async create(orderData: any): Promise<Order> {
    // Validate required fields
    if (!orderData.customerName || !orderData.customerPhone || !orderData.deliveryAddress) {
      throw new BadRequestException(
        'customerName, customerPhone, and deliveryAddress are required fields'
      );
    }

    // Validate items array
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      throw new BadRequestException('Items array is required and must contain at least one item');
    }

    let totalAmount = 0;
    const itemsWithDetails: any[] = [];

    for (const item of orderData.items) {
      // Validate each item
      if (!item.menuItemId || !item.quantity || item.quantity < 1) {
        throw new BadRequestException('Each item must have menuItemId and quantity (minimum 1)');
      }

      const menuItem = await this.menuService.findOne(item.menuItemId);
      if (!menuItem) {
        throw new NotFoundException(`Menu item ${item.menuItemId} not found`);
      }

      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;

      itemsWithDetails.push({
        menuItemId: new Types.ObjectId(item.menuItemId),
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

    // Add delivery fee if order is small
    if (totalAmount < 15) {
      totalAmount += 3;
    }

    // Create the order with all required fields
    const order = new this.orderModel({
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      deliveryAddress: orderData.deliveryAddress,
      items: itemsWithDetails,
      totalAmount,
      status: orderData.status || 'pending',
      userId: orderData.userId ? new Types.ObjectId(orderData.userId) : null,
      specialInstructions: orderData.specialInstructions || '',
      orderTime: new Date(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    });

    return order.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find()
      .populate('userId', 'name email') // Only get name and email from user
      .populate('items.menuItemId', 'name category price') // Get menu item details
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id)
      .populate('userId', 'name email')
      .populate('items.menuItemId', 'name category price')
      .exec();
      
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    // Validate status
    const validStatuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const updateData: any = { status };
    
    if (status === 'delivered') {
      updateData.deliveredAt = new Date();
    }

    const order = await this.orderModel.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    )
    .populate('userId', 'name email')
    .populate('items.menuItemId', 'name category price')
    .exec();
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    return order;
  }
}