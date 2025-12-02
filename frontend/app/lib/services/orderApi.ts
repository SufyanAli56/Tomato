const API_BASE = "http://localhost:4000/practice/orders";

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  deliveryAddress?: string;
  specialInstructions?: string;
  paymentMethod?: 'cod' | 'online';
  createdAt: string;
  updatedAt: string;
}

export async function createOrder(data: {
  items: OrderItem[];
  deliveryAddress?: string;
  specialInstructions?: string;
  paymentMethod?: 'cod' | 'online';
}, token?: string): Promise<Order> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(API_BASE, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.status}`);
  }
  
  return response.json();
}

export async function getAllOrders(token?: string): Promise<Order[]> {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(API_BASE, {
    headers,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status}`);
  }
  
  return response.json();
}

export async function getOrderById(id: string, token?: string): Promise<Order> {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/${id}`, {
    headers,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.status}`);
  }
  
  return response.json();
}

export async function updateOrderStatus(
  id: string, 
  status: string, 
  token?: string
): Promise<Order> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/${id}/status`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update order status: ${response.status}`);
  }
  
  return response.json();
}