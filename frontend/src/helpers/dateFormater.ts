export const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(parsedDate);
};
