import { DEADLINE } from '@/utils/constants';

export const ORDER_LIMIT_EXCEEDED_ERROR = (date) => {
  return `Sorry, the maximum order capacity for date ${date} has been exceeded`;
};
export const LATE_ORDER_ERROR = `Sorry, orders received after ${DEADLINE} will not be accepted due to timely delivery.`;O

export const ORDER_FETCHING_ERROR = 'ඇනවුම් ලබා ගැනීම අසාර්තකයි. යම් වරදක් සිදුවී ඇත.'
