export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, 
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const dateMonthYearOptions: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    year: 'numeric',
   
  }

  const date = new Date(dateString);

  return {
    dateTime: date.toLocaleString("es-ES", dateTimeOptions),
    dateOnly: date.toLocaleDateString("es-ES", dateOptions),
    timeOnly: date.toLocaleTimeString("es-ES", timeOptions),
    dateMonthYear: date.toLocaleDateString("es-ES", dateMonthYearOptions),
  };
};