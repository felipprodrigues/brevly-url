import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '../env';
import type { PostBody } from '../interfaces';

export const queryClient = new QueryClient();

const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async () => {
  const response = await api.get('/links');
  return response.data;
};

export const getShortUrl = async (shortUrl: string) => {
  const response = await api.get(`/${shortUrl}`);
  console.log('Response:', response);
  if (response.status !== 200) {
    throw new Error(`Error fetching short URL: ${response.status}`);
  }
  return response.data;
};

export const post = async (data: PostBody) => {
  const response = await api.post('/links', data);
  return response.data;
};

export const postHitShortUrl = async (shortUrl: string) => {
  const response = await api.post(`/links/${shortUrl}/hit`);
  return response.data;
};

export const deleteShortUrl = async (shortUrl: string) => {
  const response = await api.delete(`/links/${shortUrl}`);
  return response.data;
};

export const postExport = async () => {
  const response = await api.post('/links/export');
  return response.data;
};
