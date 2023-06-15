"use client"
import OrderCard from "@/components/OrderCard/OrderCard";
import axios from "axios";
import styles from './page.module.css'
import {universityList} from "@/utils/universityList";
import {useState} from "react";


const AcceptedOrders = () => {
    const [university, setUniversity] = useState(0);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <>
            <div className={styles.dropdownContainer}>
                <label className={styles.dropdownLabel} htmlFor="university">විශ්ව විද්‍යාලය:</label>
                <select
                    id="university"
                    className={styles.dropdown}
                    value={university}
                    onChange={
                        async (e) => {
                            try {
                                setIsLoading(true);
                                setUniversity(e.target.value);
                                const response = await axios.get(`/api/order/${e.target.value}`);
                                setOrders(response.data);
                                setIsLoading(false);
                            }catch (e){
                                setIsLoading(false);
                                setError('යම් වරදක් සිදු වී ඇත.')
                            }

                        }
                    }
                >
                    <option value={0}></option>
                    {universityList.map((university,index) => (
                        <option key={index} value={university.id} className={styles.option}>
                            {university.university}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {
                    isLoading && <div className={styles.loadingMsg}>Loading...</div>
                }
                {
                    error && <div className={styles.errorMsg}>{error}</div>
                }

            </div>

            <div>
                {(new Date()).toString()}
            </div>

            <div>
                {
                    orders && orders.map(
                        (order,index)=>{
                            const orderJson = JSON.parse(JSON.stringify(order));
                            return <OrderCard key={index} id={index} order={orderJson}/>
                        }
                    )
                }
            </div>

        </>
    );
}

export default AcceptedOrders;