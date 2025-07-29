'use client';

import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Track Core Web Vitals
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }

    // Track custom performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.startTime}ms`);
      }
    });

    observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });

    // Track image loading performance
    const imageObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.initiatorType === 'img') {
          console.log(`Image loaded: ${entry.name} in ${entry.duration}ms`);
        }
      }
    });

    imageObserver.observe({ entryTypes: ['resource'] });

    return () => {
      observer.disconnect();
      imageObserver.disconnect();
    };
  }, []);

  return null;
};

export default PerformanceMonitor; 