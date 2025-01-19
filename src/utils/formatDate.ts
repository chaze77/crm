import dayjs from 'dayjs';

export const formatDate = (isoString: string): string => {
  return dayjs(isoString).format('DD.MM.YYYY');
};
