import { getLocationColor } from '@/utils/supportFuncitons';

const DeliveryOrderCard = ({ order, handle, delivery }) => {
  return (
    <div className={'bg-gray-300 w-full  text-black p-3 rounded-lg m-1'}>
      <div className={'w-full flex justify-between items-center '}>
        <div className={'w-full mr-2 text-center'}>
          <div className={'text-2xl font-bold'}>
            <p>{order.name}</p>
          </div>
          <div className={`${getLocationColor(order)} text-center rounded-lg text-xl p-1`}>
            <p>{order.location}</p>
          </div>
        </div>
        {delivery ? (
          <button
            onClick={() => handle(order)}
            className={'w-32 h-10 p-2 bg-red-900 text-white rounded-lg text-xl'}
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => handle(order)}
            className={'w-32 h-10 p-2 bg-emerald-900 text-white rounded-lg text-xl'}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default DeliveryOrderCard;
