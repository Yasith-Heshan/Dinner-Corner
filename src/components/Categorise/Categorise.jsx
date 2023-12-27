import { pricesList } from '@/utils/priceList';
import { KOTTULIST, PARTNERLIST } from '@/utils/constants';

const Categorise = ({ orders }) => {
  const partner1 = {
    small: 0,
    full: 0,
  };
  const partner2 = {
    small: 0,
    full: 0,
  };
  const foodCounts = {};
  pricesList.forEach((item) => {
    foodCounts[item.id] = 0;
  });
  orders.forEach((order) => {
    order.itemList.forEach((item) => {
      //increment respective food item count
      foodCounts[item.id] += 1;

      //increment rice count
      if (!KOTTULIST.includes(item.id)) {
        if (PARTNERLIST.includes(item.id)) {
          if (item.id % 2 === 0) {
            partner2.full += 1;
          } else {
            partner2.small += 1;
          }
        } else {
          if (item.id % 2 === 0) {
            partner1.full += 1;
          } else {
            partner1.small += 1;
          }
        }
      }
    });
  });

  return (
    <div className={'relative overflow-x-auto shadow-md sm:rounded-lg my-5'}>
      <table className={'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'}>
        <thead
          className={
            'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
          }
        >
          <tr>
            <th className={'px-6 py-3'}>ආහාර වර්ගය</th>
            <th className={'px-6 py-3'}>ප්‍රමාණය</th>
            <th className={'px-6 py-3'}>එකක මිල</th>
            <th className={'px-6 py-3'}>ඇනවුම් ගණන</th>
          </tr>
        </thead>
        <tbody>
          {pricesList.map((food, index) => {
            return (
              <tr
                className={
                  'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                }
                key={index}
              >
                <td
                  className={
                    'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  }
                >
                  {food.type}
                </td>
                <td className={'px-6 py-4'}>{food.size}</td>
                <td className={'px-6 py-4'}>{food.price}</td>
                <td className={'px-6 py-4'}>{foodCounts[food.id]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={'sm:grid sm:grid-cols-2 gap-10'}>
        <div className={'bg-amber-700 rounded-lg p-5 mt-5'}>
          <p className={'text-center text-xl font-bold'}>Renuka</p>
          <div className={'relative overflow-x-auto shadow-md sm:rounded-lg'}>
            <table
              className={'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'}
            >
              <tbody>
                <tr
                  className={
                    'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                  }
                >
                  <td className={'px-6 py-3'}>Small Rice</td>
                  <td className={'px-6 py-3'}>{partner1.small}</td>
                </tr>
                <tr
                  className={
                    'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                  }
                >
                  <td className={'px-6 py-3'}>Full Rice</td>
                  <td className={'px-6 py-3'}>{partner1.full}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={'bg-green-700 rounded-lg p-5 mt-5'}>
          <p className={'text-center text-xl font-bold'}>Thilini</p>
          <div className={'relative overflow-x-auto shadow-md sm:rounded-lg'}>
            <table
              className={'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'}
            >
              <tbody>
                <tr
                  className={
                    'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                  }
                >
                  <td className={'px-6 py-3'}>Small Rice</td>
                  <td className={'px-6 py-3'}>{partner2.small}</td>
                </tr>
                <tr
                  className={
                    'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                  }
                >
                  <td className={'px-6 py-3'}>Full Rice</td>
                  <td className={'px-6 py-3'}>{partner2.full}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorise;
