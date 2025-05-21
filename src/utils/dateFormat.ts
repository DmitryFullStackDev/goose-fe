/**
 * Formats a UTC date string to the user's local timezone
 * @param utcDateString - UTC date string from the server
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string in user's timezone
 */
export const formatLocalDateTime = (
  utcDateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }
): string => {
  try {
    const date = new Date(utcDateString);
    return new Intl.DateTimeFormat('default', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return utcDateString;
  }
};
