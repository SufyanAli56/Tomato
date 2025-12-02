const API_BASE = "http://localhost:4T000/practice/payments";

export interface Payment {
  _id: string;
  orderId: string;
  amount: number;
  method: 'cod' | 'mock' | 'demo_upi';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  upiId?: string;
  qrCode?: string;
  completedAt?: string;
  createdAt: string;
}

export interface UPIResponse {
  upiId: string;
  qrCode: string;
}

// Cash on Delivery
export async function createCODPayment(
  orderId: string, 
  amount: number, 
  token?: string
): Promise<Payment> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/cod`, {
    method: "POST",
    headers,
    body: JSON.stringify({ orderId, amount }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create COD payment: ${response.status}`);
  }
  
  return response.json();
}

// Mock Payment (Always succeeds)
export async function createMockPayment(
  orderId: string, 
  amount: number, 
  token?: string
): Promise<Payment> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/mock`, {
    method: "POST",
    headers,
    body: JSON.stringify({ orderId, amount }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create mock payment: ${response.status}`);
  }
  
  return response.json();
}

// Demo UPI Payment
export async function createUPIPayment(
  orderId: string, 
  amount: number, 
  token?: string
): Promise<UPIResponse> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/upi`, {
    method: "POST",
    headers,
    body: JSON.stringify({ orderId, amount }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create UPI payment: ${response.status}`);
  }
  
  return response.json();
}

// Complete UPI Payment
export async function completeUPIPayment(
  orderId: string, 
  token?: string
): Promise<Payment> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/upi/complete/${orderId}`, {
    method: "PATCH",
    headers,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to complete UPI payment: ${response.status}`);
  }
  
  return response.json();
}

// Get payment by order
export async function getPaymentByOrderId(
  orderId: string, 
  token?: string
): Promise<Payment> {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/order/${orderId}`, {
    headers,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch payment: ${response.status}`);
  }
  
  return response.json();
}