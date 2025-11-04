export const formatDateLocal = (dateString: string): string => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString('es-PE', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatDateTimeLocal = (dateString: string): string => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  if (dateString.includes('T')) {
    const timePart = dateString.split('T')[1];
    const [hours, minutes] = timePart.split(':');
    date.setHours(parseInt(hours), parseInt(minutes));
  }
  
  return date.toLocaleString('es-PE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};
