'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/sidebar';
import { CurrencyProvider } from '@/components/Context/CurrencyContext';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authResponse = await fetch('/api/header_route', {
        credentials: 'include',
      });

      if (!authResponse.ok) {
        router.push('/signin');
        return;
      }

      const authData = await authResponse.json();
      
      if (!authData.isAuthenticated) {
        router.push('/signin');
        return;
      }

      if (authData.user.role !== 1) {
        toast.error('Admin access required');
        router.push('/');
        return;
      }

      setIsAuthenticated(true);
      setIsAdmin(true);
      setUser(authData.user);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/signin');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <CurrencyProvider>
      <Header />
      <div className="flex">
        <div className="w-64 pt-28 fixed h-full bg-gray-900 text-white">
          <Sidebar />
        </div>
        <main className="ml-64 p-6 w-full pt-24">
          {children}
        </main>
      </div>
    </CurrencyProvider>
  );
} 