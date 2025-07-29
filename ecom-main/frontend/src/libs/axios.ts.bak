import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { authOptions, refreshToken as refreshTokenApi } from './auth';
import { getServerSession } from 'next-auth';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get session from NextAuth
    const session = await getSession();
    // If session exists and has access token, add it to headers
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

if (typeof window !== 'undefined') {
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        // Token hết hạn hoặc không hợp lệ => Logout
        console.log('Token expired or invalid')
        signOut({ callbackUrl: '/login' }) // Đưa user về trang login
      }

      return Promise.reject(error)
    }
  )
}
else {
  axiosInstance.interceptors.request.use(async (config) => {
    const session = await getServerSession(authOptions)
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`
    }
    return config
  })
}

export default axiosInstance; 