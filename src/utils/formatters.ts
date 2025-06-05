import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'd MMMM yyyy', { locale: fr });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const sanitizeHtml = (html: string): string => {
  // This is a simple version for demo purposes
  // In a real application, use a proper sanitizer library
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};