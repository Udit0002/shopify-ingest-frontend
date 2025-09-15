// lib/api.ts
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
const api = axios.create({ baseURL: API_BASE, timeout: 15000 });

export type RegisterTenantPayload = {
  tenantName: string;
  shopDomain: string;
  accessToken: string;
};

export const registerTenant = (payload: RegisterTenantPayload) =>
  api.post('/tenants/register', payload).then(r => r.data);

export const getHealth = () => api.get('/health').then(r => r.data);

// Manual sync helpers
export const fetchProducts = (shopDomain: string, all = false) =>
  api.get(`/shopify/fetch-products/${encodeURIComponent(shopDomain)}${all ? '?all=true' : ''}`).then(r => r.data);
export const fetchCustomers = (shopDomain: string, all = false) =>
  api.get(`/shopify/fetch-customers/${encodeURIComponent(shopDomain)}${all ? '?all=true' : ''}`).then(r => r.data);
export const fetchOrders = (shopDomain: string, all = false) =>
  api.get(`/shopify/fetch-orders/${encodeURIComponent(shopDomain)}${all ? '?all=true' : ''}`).then(r => r.data);

export const getSummary = (tenantId: string) =>
  api.get(`/insights/summary/${tenantId}`).then(r => r.data);

// You might want to extend lib/api.ts with these if not already present
export const getOrdersByDate = (tenantId: string, from?: string, to?: string) =>
  api.get(`/insights/orders-by-date/${tenantId}`, { params: { from, to } }).then(r => r.data);

export const getTopCustomers = (tenantId: string, limit = 5) =>
  api.get(`/insights/top-customers/${tenantId}`, { params: { limit } }).then(r => r.data);

export const getRecentOrders = (storeId: string, limit = 10) =>
  api.get(`/insights/recent-orders/${storeId}?limit=${limit}`).then(r => r.data);


export default api;
