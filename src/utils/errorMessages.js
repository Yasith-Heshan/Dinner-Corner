import { DEADLINE } from '@/utils/constants';

export const OREDERLIMITEXCEEDEDERROR = (date) => {
  return `Sorry, the maximum order capacity for date ${date} has been exceeded`;
};
export const LATEORDERERROR = `Sorry, orders received after ${DEADLINE} will not be accepted due to timely delivery.`;
