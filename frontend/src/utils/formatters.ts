import { format, parseISO, isValid } from 'date-fns';

// Date formatters
export const dateFormatters = {
  // Format date as "January 15, 2024"
  long: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'MMMM d, yyyy') : 'Invalid date';
  },
  
  // Format date as "Jan 15, 2024"
  medium: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'MMM d, yyyy') : 'Invalid date';
  },
  
  // Format date as "01/15/2024"
  short: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'MM/dd/yyyy') : 'Invalid date';
  },
  
  // Format date as "January 15"
  monthDay: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'MMMM d') : 'Invalid date';
  },
  
  // Format date as "2024-01-15"
  iso: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'yyyy-MM-dd') : 'Invalid date';
  },
  
  // Format date as "15 Jan 2024"
  dayMonthYear: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'd MMM yyyy') : 'Invalid date';
  },
};

// Time formatters
export const timeFormatters = {
  // Format time as "2:30 PM"
  standard: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'h:mm a') : 'Invalid time';
  },
  
  // Format time as "14:30"
  military: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'HH:mm') : 'Invalid time';
  },
  
  // Format time as "2:30:45 PM"
  withSeconds: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'h:mm:ss a') : 'Invalid time';
  },
};

// DateTime formatters
export const dateTimeFormatters = {
  // Format as "January 15, 2024 at 2:30 PM"
  long: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'MMMM d, yyyy \'at\' h:mm a') : 'Invalid date';
  },
  
  // Format as "Jan 15, 2024 2:30 PM"
  medium: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'MMM d, yyyy h:mm a') : 'Invalid date';
  },
  
  // Format as "01/15/2024 2:30 PM"
  short: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, 'MM/dd/yyyy h:mm a') : 'Invalid date';
  },
  
  // Format as "2024-01-15T14:30:00"
  iso: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, "yyyy-MM-dd'T'HH:mm:ss") : 'Invalid date';
  },
};

// Number formatters
export const numberFormatters = {
  // Format currency
  currency: (amount: number, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  },
  
  // Format number with commas
  number: (num: number, locale = 'en-US') => {
    return new Intl.NumberFormat(locale).format(num);
  },
  
  // Format percentage
  percentage: (num: number, decimals = 0, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num / 100);
  },
  
  // Format decimal
  decimal: (num: number, decimals = 2, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  },
  
  // Format compact number (1K, 1M, etc.)
  compact: (num: number, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
  },
};

// Text formatters
export const textFormatters = {
  // Capitalize first letter of each word
  titleCase: (str: string) => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },
  
  // Capitalize first letter only
  sentenceCase: (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  
  // Convert to slug
  slug: (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
  
  // Truncate text
  truncate: (str: string, length: number, suffix = '...') => {
    if (str.length <= length) return str;
    return str.substring(0, length).trim() + suffix;
  },
  
  // Extract initials
  initials: (str: string) => {
    return str
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },
};

// File size formatters
export const fileSizeFormatters = {
  // Format bytes to human readable format
  bytes: (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
};

// Phone number formatters
export const phoneFormatters = {
  // Format US phone number
  us: (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },
  
  // Format international phone number
  international: (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+1 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    return phone;
  },
};
