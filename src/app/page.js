import Link from 'next/link';
import { pricesList } from '@/utils/priceList';
import Image from 'next/image';
import { DEADLINE } from '@/utils/constants';
import './style.css';
import { ORDERNOW, ORDERS } from '@/utils/routes';

export default function Home() {
  return (
    <div>
      <Image className={'w-full'} src='/plate.jpg' alt='Dinner Meal' width={600} height={400} />
      <div>
        <div className={'flex-col w-[90vw] py-10 mx-auto'}>
          <div className={''}>
            <div className={'shadow-lg shadow-green-400 rounded-lg  p-10'}>
              <ul className={'list-disc'}>
                <li>අඩු මුදලට රසවත් ආහාර වේලක් හොයනවාද?.</li>
                <li>
                  අධික ඉල්ලුම නිසා විශ්ව විද්‍යාල පරිශ්‍රය අවටින් ආහාර සපයා ගැනීමේ අපහසුතා පවතිනවාද?
                </li>
                <li>අඩු මුදලට රසවත් ආහාර වේලක් ලබා දෙන්නට අපි සූදානම්.</li>
                <li>
                  <span className={'special'}>
                    දැනට මෙම සේවාව මොරටුව විශ්ව විද්‍යාලය අවට සිටින සිසුන්ට පමණක් ක්‍රියාත්මක වේ.
                  </span>
                </li>
                <li>
                  ඇනවුමක් භාර දීමට{' '}
                  <span className={'contentLink'}>
                    <Link href={ORDERNOW}>මෙතනින්</Link>
                  </span>{' '}
                  ඇනවුම් ලබා දෙන පිටුවට පිවිසෙන්න.
                </li>
                <li>
                  ඔබ ලබාදුන් සියලුම ඇනවුම් පිළීඹඳ විස්තර{' '}
                  <Link className={'contentLink'} href={ORDERS}>
                    Orders
                  </Link>{' '}
                  පිටුවෙන් බලා ගත හැක.
                </li>
                <li>
                  අප ආයතනය මගින් <span className={'special'}>රාත්‍රී ආහාර වේල් පමණක්</span> සපයන අතර
                  පස්වරු {DEADLINE}ට පෙර ඇනවුම් කිරීමට කාරුණික වන්න.
                </li>
                <li>
                  භාර ගන්නා ලද සියලුම ඇමතුම් රාත්‍රී 7.30 ත් 8.30ත් අතර කාලයේ දී විශ්ව විද්‍යාලීය
                  ප්‍රධාන ගේට්ටුව අසලටම රැගෙන එන අතර මේ සඳහා{' '}
                  <span>කිසිඳු ප්‍රවාහන වියදමක් අය නොකෙරේ.</span>
                </li>
                <li>
                  <span className={'special'}>
                    අවශ්‍ය නම් නවාතැන්පොළට වුවද ප්‍රවාහන ගාස්තුවකින් තොරව ප්‍රවාහනය කිරීමට හැක.
                  </span>
                </li>
                <li>
                  විමසීම් සඳහා:
                  <ul>
                    <li>0714748483 - යසිත් හේෂාන්</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className='priceTable pt-10'>
              <div className='relative overflow-x-auto shadow-lg sm:rounded-lg w-full shadow-green-400'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-40'>
                  <thead
                    className={
                      'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
                    }
                  >
                    <tr className={'px-6 py-3'}>
                      <th className='px-6 py-3'>ආහාර වර්ගය</th>
                      <th className='px-6 py-3'>ප්‍රමාණය</th>
                      <th className='px-6 py-3'>කී දෙනෙක්ටද?</th>
                      <th className='px-6 py-3'>මිල</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricesList.map((meal) => (
                      <tr
                        className={
                          'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                        }
                        key={meal.id}
                      >
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          {meal.type}
                        </td>
                        <td className='px-6 py-4'>{meal.size}</td>
                        <td className='px-6 py-4'>{meal.enoughFor}</td>
                        <td className='px-6 py-4'>{meal.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
