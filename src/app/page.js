import Link from "next/link";
import {pricesList} from "@/utils/priceList";
import Image from "next/image";
import {DEADLINE} from "@/utils/constants";
import './style.css'
import {ORDERNOW, ORDERS} from "@/utils/routes";

export default function Home() {
    return (
        <div>
            <div>
                <Image className={'w-full'} src="/plate.jpg" alt="Dinner Meal" width={600} height={400}/>
            </div>
            <div className={'bg-[#1F2937] text-white'}>
                <div className={'flex-col w-[90vw] py-10 mx-auto'}>
                    <div className={''}>
                        <div className={'shadow-lg shadow-green-400 rounded-lg  p-10'}>
                            <ul className={'list-disc'}>
                                <li>අඩු මුදලට රසවත් ආහාර වේලක් හොයනවාද?.</li>
                                <li>අධික ඉල්ලුම නිසා විශ්ව විද්‍යාල පරිශ්‍රය අවටින් ආහාර සපයා ගැනීමේ අපහසුතා පවතිනවාද?
                                </li>
                                <li>අඩු මුදලට රසවත් ආහාර වේලක් ලබා දෙන්නට අපි සූදානම්.</li>
                                <li><span className={'special'}>දැනට මෙම සේවාව මොරටුව විශ්ව විද්‍යාලය අවට සිටින සිසුන්ට පමණක් ක්‍රියාත්මක වේ.</span>
                                </li>
                                <li>ඇනවුමක් භාර දීමට <span className={'contentLink'}><Link
                                    href={ORDERNOW}>මෙතනින්</Link></span> ඇනවුම් ලබා දෙන පිටුවට පිවිසෙන්න.
                                </li>
                                <li>ඔබ ලබාදුන් සියලුම ඇනවුම් පිළීඹඳ විස්තර <Link className={'contentLink'}
                                                                                 href={ORDERS}>Orders</Link> පිටුවෙන්
                                    බලා ගත
                                    හැක.
                                </li>
                                <li>අප ආයතනය මගින් <span className={'special'}>රාත්‍රී ආහාර වේල් පමණක්</span> සපයන අතර
                                    පස්වරු {DEADLINE}ට පෙර ඇනවුම් කිරීමට කාරුණික වන්න.
                                </li>
                                <li>භාර ගන්නා ලද සියලුම ඇමතුම් රාත්‍රී 7.30 ත් 8.30ත් අතර කාලයේ දී විශ්ව විද්‍යාලීය
                                    ප්‍රධාන
                                    ගේට්ටුව
                                    අසලටම රැගෙන එන අතර මේ සඳහා <span>කිසිඳු ප්‍රවාහන වියදමක් අය නොකෙරේ.</span>
                                </li>
                                <li><span className={'special'}>අවශ්‍ය නම් නවාතැන්පොළට වුවද ප්‍රවාහන ගාස්තුවකින් තොරව ප්‍රවාහනය කිරීමට හැකි අතර එසේ අවශ්‍ය නම් ඔබට ඒ බව අප ලබා දෙන දුරකතන ඇමතුමේ දී ඉල්ලුම් කල හැක.</span>
                                </li>
                                <li>විමසීම් සඳහා:
                                    <ul>
                                        <li>0714748483 - යසිත් හේෂාන්</li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                        <div className="priceTable pt-10"><div className="overflow-x-auto w-full">
                                <table className="min-w-full table-auto">
                                    <thead>
                                    <tr>
                                        <th className="p-4">ආහාර වර්ගය</th>
                                        <th className="p-4">ප්‍රමාණය</th>
                                        <th className="p-4">කී දෙනෙක්ටද?</th>
                                        <th className="p-4">මිල</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {pricesList.map((meal, index) => (
                                        <tr className={index % 2 === 0 ? 'bg-gray-300 text-black text-center' : 'bg-gray-700 text-center'}
                                            key={meal.id}>
                                            <td className="p-4">{meal.type}</td>
                                            <td className="p-4">{meal.size}</td>
                                            <td className="p-4">{meal.enoughFor}</td>
                                            <td className="p-4">{meal.price}</td>
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