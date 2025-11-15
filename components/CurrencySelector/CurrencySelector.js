'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/components/Context/CurrencyContext';

const CURRENCIES = [
  { code: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'CAD', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵' },
  { code: 'CNY', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳' },
  { code: 'BRL', symbol: 'R$', flag: '🇧🇷' },
  { code: 'MXN', symbol: '$', flag: '🇲🇽' },
  { code: 'KRW', symbol: '₩', flag: '🇰🇷' },
  { code: 'SGD', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'NZD', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'CHF', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'SEK', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NOK', symbol: 'kr', flag: '🇳🇴' },
  { code: 'DKK', symbol: 'kr', flag: '🇩🇰' },
  { code: 'PLN', symbol: 'zł', flag: '🇵🇱' },
  { code: 'RUB', symbol: '₽', flag: '🇷🇺' },
  { code: 'TRY', symbol: '₺', flag: '🇹🇷' },
  { code: 'ZAR', symbol: 'R', flag: '🇿🇦' },
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', symbol: '﷼', flag: '🇸🇦' },
];

export default function CurrencySelector({ className = '', textColor = 'text-slate-50' }) {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedCurrency = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCurrencyChange = (currencyCode) => {
    setCurrency(currencyCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${textColor}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{selectedCurrency.flag}</span>
        <span className="text-sm font-medium">{selectedCurrency.symbol}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-96 overflow-y-auto">
          <div className="py-1">
            {CURRENCIES.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleCurrencyChange(curr.code)}
                className={`flex items-center gap-3 w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                  currency === curr.code
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-xl">{curr.flag}</span>
                <span className="font-medium">{curr.symbol}</span>
                <span className="text-gray-500 text-xs">{curr.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

