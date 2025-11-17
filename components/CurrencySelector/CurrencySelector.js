'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/components/Context/CurrencyContext';

const CURRENCIES = [
  // Major currencies
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', flag: '🇨🇳', name: 'Chinese Yuan' },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', flag: '🇨🇦', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'CHF', flag: '🇨🇭', name: 'Swiss Franc' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳', name: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', flag: '🇧🇷', name: 'Brazilian Real' },
  
  // European currencies
  { code: 'SEK', symbol: 'kr', flag: '🇸🇪', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', flag: '🇳🇴', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', flag: '🇩🇰', name: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', flag: '🇵🇱', name: 'Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', flag: '🇨🇿', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', flag: '🇭🇺', name: 'Hungarian Forint' },
  { code: 'RON', symbol: 'lei', flag: '🇷🇴', name: 'Romanian Leu' },
  { code: 'BGN', symbol: 'лв', flag: '🇧🇬', name: 'Bulgarian Lev' },
  { code: 'HRK', symbol: 'kn', flag: '🇭🇷', name: 'Croatian Kuna' },
  { code: 'RSD', symbol: 'дин', flag: '🇷🇸', name: 'Serbian Dinar' },
  { code: 'ISK', symbol: 'kr', flag: '🇮🇸', name: 'Icelandic Krona' },
  
  // Asian currencies
  { code: 'KRW', symbol: '₩', flag: '🇰🇷', name: 'South Korean Won' },
  { code: 'SGD', symbol: 'S$', flag: '🇸🇬', name: 'Singapore Dollar' },
  { code: 'HKD', symbol: 'HK$', flag: '🇭🇰', name: 'Hong Kong Dollar' },
  { code: 'TWD', symbol: 'NT$', flag: '🇹🇼', name: 'Taiwan Dollar' },
  { code: 'THB', symbol: '฿', flag: '🇹🇭', name: 'Thai Baht' },
  { code: 'MYR', symbol: 'RM', flag: '🇲🇾', name: 'Malaysian Ringgit' },
  { code: 'IDR', symbol: 'Rp', flag: '🇮🇩', name: 'Indonesian Rupiah' },
  { code: 'PHP', symbol: '₱', flag: '🇵🇭', name: 'Philippine Peso' },
  { code: 'VND', symbol: '₫', flag: '🇻🇳', name: 'Vietnamese Dong' },
  { code: 'PKR', symbol: '₨', flag: '🇵🇰', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', flag: '🇧🇩', name: 'Bangladeshi Taka' },
  { code: 'LKR', symbol: 'Rs', flag: '🇱🇰', name: 'Sri Lankan Rupee' },
  { code: 'NPR', symbol: 'Rs', flag: '🇳🇵', name: 'Nepalese Rupee' },
  { code: 'MMK', symbol: 'K', flag: '🇲🇲', name: 'Myanmar Kyat' },
  { code: 'KHR', symbol: '៛', flag: '🇰🇭', name: 'Cambodian Riel' },
  { code: 'LAK', symbol: '₭', flag: '🇱🇦', name: 'Lao Kip' },
  
  // Middle Eastern currencies
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', flag: '🇸🇦', name: 'Saudi Riyal' },
  { code: 'ILS', symbol: '₪', flag: '🇮🇱', name: 'Israeli Shekel' },
  { code: 'EGP', symbol: 'E£', flag: '🇪🇬', name: 'Egyptian Pound' },
  { code: 'JOD', symbol: 'JD', flag: '🇯🇴', name: 'Jordanian Dinar' },
  { code: 'LBP', symbol: '£', flag: '🇱🇧', name: 'Lebanese Pound' },
  { code: 'QAR', symbol: '﷼', flag: '🇶🇦', name: 'Qatari Riyal' },
  { code: 'KWD', symbol: 'د.ك', flag: '🇰🇼', name: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: 'د.ب', flag: '🇧🇭', name: 'Bahraini Dinar' },
  { code: 'OMR', symbol: '﷼', flag: '🇴🇲', name: 'Omani Rial' },
  { code: 'IRR', symbol: '﷼', flag: '🇮🇷', name: 'Iranian Rial' },
  { code: 'IQD', symbol: 'ع.د', flag: '🇮🇶', name: 'Iraqi Dinar' },
  
  // African currencies
  { code: 'ZAR', symbol: 'R', flag: '🇿🇦', name: 'South African Rand' },
  { code: 'NGN', symbol: '₦', flag: '🇳🇬', name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', flag: '🇰🇪', name: 'Kenyan Shilling' },
  { code: 'ETB', symbol: 'Br', flag: '🇪🇹', name: 'Ethiopian Birr' },
  { code: 'GHS', symbol: '₵', flag: '🇬🇭', name: 'Ghanaian Cedi' },
  { code: 'UGX', symbol: 'USh', flag: '🇺🇬', name: 'Ugandan Shilling' },
  { code: 'TZS', symbol: 'TSh', flag: '🇹🇿', name: 'Tanzanian Shilling' },
  { code: 'MAD', symbol: 'د.م.', flag: '🇲🇦', name: 'Moroccan Dirham' },
  
  // Americas currencies
  { code: 'MXN', symbol: '$', flag: '🇲🇽', name: 'Mexican Peso' },
  { code: 'ARS', symbol: '$', flag: '🇦🇷', name: 'Argentine Peso' },
  { code: 'CLP', symbol: '$', flag: '🇨🇱', name: 'Chilean Peso' },
  { code: 'COP', symbol: '$', flag: '🇨🇴', name: 'Colombian Peso' },
  { code: 'PEN', symbol: 'S/', flag: '🇵🇪', name: 'Peruvian Sol' },
  { code: 'UYU', symbol: '$U', flag: '🇺🇾', name: 'Uruguayan Peso' },
  { code: 'VES', symbol: 'Bs', flag: '🇻🇪', name: 'Venezuelan Bolívar' },
  { code: 'BOB', symbol: 'Bs.', flag: '🇧🇴', name: 'Bolivian Boliviano' },
  { code: 'PYG', symbol: 'Gs', flag: '🇵🇾', name: 'Paraguayan Guaraní' },
  { code: 'GTQ', symbol: 'Q', flag: '🇬🇹', name: 'Guatemalan Quetzal' },
  { code: 'CRC', symbol: '₡', flag: '🇨🇷', name: 'Costa Rican Colón' },
  { code: 'PAB', symbol: 'B/.', flag: '🇵🇦', name: 'Panamanian Balboa' },
  { code: 'DOP', symbol: 'RD$', flag: '🇩🇴', name: 'Dominican Peso' },
  { code: 'JMD', symbol: 'J$', flag: '🇯🇲', name: 'Jamaican Dollar' },
  { code: 'TTD', symbol: 'TT$', flag: '🇹🇹', name: 'Trinidad Dollar' },
  
  // Oceania currencies
  { code: 'NZD', symbol: 'NZ$', flag: '🇳🇿', name: 'New Zealand Dollar' },
  { code: 'FJD', symbol: 'FJ$', flag: '🇫🇯', name: 'Fijian Dollar' },
  { code: 'PGK', symbol: 'K', flag: '🇵🇬', name: 'Papua New Guinean Kina' },
  
  // Other currencies
  { code: 'RUB', symbol: '₽', flag: '🇷🇺', name: 'Russian Ruble' },
  { code: 'TRY', symbol: '₺', flag: '🇹🇷', name: 'Turkish Lira' },
  { code: 'UAH', symbol: '₴', flag: '🇺🇦', name: 'Ukrainian Hryvnia' },
  { code: 'BYN', symbol: 'Br', flag: '🇧🇾', name: 'Belarusian Ruble' },
  { code: 'KZT', symbol: '₸', flag: '🇰🇿', name: 'Kazakhstani Tenge' },
  { code: 'UZS', symbol: 'so\'m', flag: '🇺🇿', name: 'Uzbekistani Som' },
  { code: 'GEL', symbol: '₾', flag: '🇬🇪', name: 'Georgian Lari' },
  { code: 'AMD', symbol: '֏', flag: '🇦🇲', name: 'Armenian Dram' },
  { code: 'AZN', symbol: '₼', flag: '🇦🇿', name: 'Azerbaijani Manat' },
  { code: 'KGS', symbol: 'с', flag: '🇰🇬', name: 'Kyrgystani Som' },
  { code: 'TJS', symbol: 'SM', flag: '🇹🇯', name: 'Tajikistani Somoni' },
  { code: 'TMT', symbol: 'm', flag: '🇹🇲', name: 'Turkmenistani Manat' },
  { code: 'MDL', symbol: 'lei', flag: '🇲🇩', name: 'Moldovan Leu' },
  { code: 'BAM', symbol: 'КМ', flag: '🇧🇦', name: 'Bosnia-Herzegovina Mark' },
  { code: 'MKD', symbol: 'ден', flag: '🇲🇰', name: 'Macedonian Denar' },
  { code: 'ALL', symbol: 'Lek', flag: '🇦🇱', name: 'Albanian Lek' },
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
        <div className="absolute right-0 mt-2 w-72 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-[500px] overflow-y-auto">
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
                <span className="text-xl flex-shrink-0">{curr.flag}</span>
                <span className="font-medium flex-shrink-0">{curr.symbol}</span>
                <span className="text-gray-500 text-xs flex-shrink-0">{curr.code}</span>
                {curr.name && <span className="text-gray-400 text-xs ml-auto truncate">{curr.name}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

