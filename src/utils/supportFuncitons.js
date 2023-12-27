import { pricesList } from '@/utils/priceList';
import { PLACES } from '@/utils/constants';

export const getLocationColor = (order) => {
  switch (order.location) {
    case PLACES.frontGate:
      return 'bg-green-500';
    case PLACES.backGate:
      return 'bg-red-500';
    case PLACES.boysHostel01:
      return 'bg-teal-400';
    case PLACES.boysHostel02:
      return 'bg-purple-500';
    case PLACES.boardingPlace:
      return 'bg-orange-400';
  }
};
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const getItem = (id) => {
  let temp = null;
  pricesList.forEach((item) => {
    if (item.id === id) {
      temp = item;
    }
  });
  return temp;
};
