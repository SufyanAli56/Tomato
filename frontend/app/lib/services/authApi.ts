const API_BASE = "http://localhost:4000/auth";

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: `HTTP error! status: ${response.status}`
    }));
    
    throw new Error(
      errorData.message || `Request failed with status ${response.status}`
    );
  }
  
  return response.json();
}

// Helper function to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

export async function setupDemoUsers() {
  const response = await fetch(`${API_BASE}/setup-demo-users`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  
  return handleResponse(response);
}

export async function signUp(data: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  return handleResponse(response);
}

export async function signIn(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE}/signin`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  const result = await handleResponse(response);
  
  // Store token and user data in localStorage upon successful login
  if (result.access_token) {
    localStorage.setItem('token', result.access_token);
    localStorage.setItem('user', JSON.stringify(result.user));
  }
  
  return result;
}

export async function getProfile() {
  const response = await fetch(`${API_BASE}/profile`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  
  return handleResponse(response);
}

export async function validateToken() {
  try {
    const user = await getProfile();
    return { isValid: true, user };
  } catch (error) {
    // Token is invalid or expired
    logout();
    return { isValid: false, user: null };
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Optional: Redirect to login page
  window.location.href = '/auth/signin';
}

export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function isAuthenticated() {
  return !!getToken();
}