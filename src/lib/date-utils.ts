import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * Safely formats a date string to a readable format
 * Returns a fallback if the date is invalid
 */
export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) {
    return 'Дата не указана';
  }

  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Неверная дата';
    }

    return format(date, 'd MMMM yyyy', { locale: ru });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Неверная дата';
  }
}

/**
 * Formats date for ISO string (for metadata)
 */
export function formatDateISO(dateString: string | undefined | null): string {
  if (!dateString) {
    return new Date().toISOString();
  }

  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return new Date().toISOString();
    }

    return date.toISOString();
  } catch (error) {
    console.error('Error formatting date ISO:', error);
    return new Date().toISOString();
  }
}

