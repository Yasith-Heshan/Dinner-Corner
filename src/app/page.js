import styles from './page.module.css'
import Link from "next/link";
import {pricesList} from "@/utils/priceList";
import Image from "next/image";

export default function Home() {
    return (
        <div className={styles.container}>
            <h1>Dinner Corner වෙත සාදරයෙන් පිළිගනිමු</h1>
            <div className={styles.gridcontainer}>
                <div className={styles.column}>
                    <Image src="/dinner_plate.jpg" alt="Dinner Meal" width={600} height={400} layout="responsive" className={styles.image} />
                </div>
                <div className={styles.column}>
                    <h2 className={styles.subtitle}>Dinner Corner යනු...</h2>
                    <ul className={styles.list}>
                        <li>අඩු මුදලට රසවත් ආහාර වේලක් හොයනවාද?.</li>
                        <li>අධික ඉල්ලුම නිසා විශ්ව විද්‍යාල පරිශ්‍රය අවටින් ආහාර සපයා ගැනීමේ අපහසුතා පවතිනවාද?</li>
                        <li>අඩු මුදලට රසවත් ආහාර වේලක් ලබා දෙන්නට අපි සූදානම්.</li>
                        <li><span className={styles.specialNote}>දැනට මෙම සේවාව මොරටුව විශ්ව විද්‍යාලය සහ ශ්‍රී ජයවර්ධනපුර විශ්ව විද්‍යාලය අවට සිටින සිසුන්ට පමණක් ක්‍රියාත්මක වේ.</span>
                        </li>
                        <li>එළවළු, බිත්තර, මාළු සහ මස් ආහර වේල් ඔබගේ රුචිය මත ලබා දීමට අපි සුදානම්.</li>
                        <li>ලබා දෙන මුදලට උපරිම සාධාරණයක් ඉටු කරමින් ප්‍රණීත ආහර වේලක් ලබා දීමෙ අරමුනින් අප දිනකට අඩු
                            ඇනවුම් ප්‍රමාණයක් භාර ගනු ලැබේ.
                        </li>
                        {/*<li><span className={styles.specialNote}>මෙම සේවාව 11/06/2023 දින සිට ක්‍රියාත්මක වේ.</span> </li>*/}
                        <li>ඇනවුමක් භාර දීමට <span className={styles.thisLink}><Link
                            href={'/ordernow'}>මෙතනින්</Link></span> ඇනවුම් ලබා දෙන පිටුවට පිවිසෙන්න.
                        </li>
                        <li>අප ආයතනය මගින් <span className={styles.specialNote}>රාත්‍රී ආහාර වේල් පමණක්</span> සපයන අතර
                            පස්වරු 4:30ට පෙර ඇනවුම් කිරීමට කාරුණික වන්න.
                        </li>
                        <li>ඇනවුමක් භාරගත් පසු අප ආයතනය ඔබට ඇනවුම තහවුරු කිරීමට දුරකතන ඇමතුමක් ලබා දෙනු ඇත.</li>
                        <li>භාර ගන්නා ලද සියලුම ඇමටතුම් රාත්‍රී 7 ත් 8ත් අතර කාලයේ දී විශ්ව විද්‍යාලීය ප්‍රධාන ගේට්ටුව
                            අසලටම රැගෙන එන අතර මේ සඳහා <span className={styles.specialNote}>කිසිඳු ප්‍රවාහන වියදමක් අය නොකෙරේ.</span>
                        </li>
                        <li><span className={styles.specialNote}>අවශ්‍ය නම් නවාතැන්පොළට වුවද ප්‍රවාහන ගාස්තුවකින් තොරව ප්‍රවාහනය කිරීමට හැකි අතර එසේ අවශ්‍ය නම් ඔබට ඒ බව අප ලබා දෙන දුරකතන ඇමතුමේ දී ඉල්ලුම් කල හැක.</span></li>
                    </ul>
                </div>
            </div>
            <h2 className={styles.subtitle}>මිල දර්ශණය</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ආහාර වර්ගය</th>
                    <th>ප්‍රමාණය</th>
                    <th>කී දෙනෙකුට ප්‍රමාණවත් ද?</th>
                    <th>ඒකකයක මිල</th>
                </tr>
                </thead>
                <tbody>
                {pricesList.map(
                    (meal) => (
                        <tr key={meal.id}>
                            <td>{meal.type}</td>
                            <td>{meal.size}</td>
                            <td>{meal.enoughFor}</td>
                            <td>{meal.price}</td>
                        </tr>
                    )
                )

                }


                </tbody>
            </table>
        </div>
    );
}
