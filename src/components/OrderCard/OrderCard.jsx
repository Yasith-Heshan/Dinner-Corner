"use client"
import styles from './OrderCard.module.css';
import {pricesList} from "@/utils/priceList";
import {company_emails, PLACES, STATUS} from "@/utils/constants";
import {db} from '@/app/firebase'
import {doc, updateDoc} from "firebase/firestore";
import {useState} from "react";
import {usePathname} from "next/navigation";


const OrderCard = ({order, id, user}) => {

    const [mapUrl, setMapUrl] = useState('');

    const pathname = usePathname();

    const getTotal = (itemList) => {
        let total = 0;
        itemList.split(',').map(
            (id) => {
                const item = pricesList.find((item) => item.id === parseInt(id));
                total += item.price
            }
        );
        return total;
    }

    const handleAccept = async () => {
        const docRef = doc(db, 'orders', order.id);
        await updateDoc(docRef, {
            status: STATUS.accepted
        });
    }

    const handleReject = async () => {
        const docRef = doc(db, 'orders', order.id);
        await updateDoc(docRef, {
            status: STATUS.rejected
        });
    }

    const handleCancel = async () => {
        const docRef = doc(db, 'orders', order.id);
        await updateDoc(docRef, {
            status: STATUS.canceled
        });
    }

    const handleDeliver = async () => {
        const docRef = doc(db, 'orders', order.id);
        await updateDoc(docRef, {
            status: STATUS.delivered
        });
    }

    const handleUpdate = async () => {
        const docRef = doc(db, 'orders', order.id);
        await updateDoc(docRef, {
            mapUrl,
        })
        setMapUrl('');
    }
    const handleRank = async () => {
        const docRef = doc(db, 'orders', order.id);
        await updateDoc(docRef, {
            rank,
        })
    }


    return (
        <div className={styles.orderCard}>
            <h3 className={styles.orderName}>{id + 1}) {order.name} -&nbsp;
                {
                    order.status === STATUS.accepted && (
                        <div className={styles.orderStatusAccepted}>{order.status}</div>
                    )
                }
                {
                    order.status === STATUS.pending && (
                        <div className={styles.orderStatusPending}>{order.status}</div>
                    )
                }
                {
                    order.status === STATUS.rejected && (
                        <div className={styles.orderStatusRejected}>{order.status}</div>
                    )
                }
                {
                    order.status === STATUS.canceled && (
                        <div className={styles.orderStatusCanceled}>{order.status}</div>
                    )
                }
                {
                    order.status === STATUS.delivered && (
                        <div className={styles.orderStatusDelivered}>{order.status}</div>
                    )
                }
            </h3>
            <p className={styles.orderEmail}>{order.email}</p>
            <p className={styles.orderPhone}>{order.phoneNumber}</p>
            <p className={styles.orderDate}>{order.orderDate}</p>
            <p className={styles.orderSpecialNotes}>{order.specialNotes}</p>
            <ul className={styles.orderItems}>
                {order.orderItems.split(",").map(
                    (id, index) => {
                        const item = pricesList.find((item) => item.id === parseInt(id));
                        return <li key={index}>{item.type} - {item.size} - රු. {item.price}</li>
                    }
                )}
            </ul>

            <p className={styles.orderTotal}>මුළු මුදල: රු {getTotal(order.orderItems)}</p>
            <br/>

            {
                order.place === PLACES.frontGate &&
                (
                    <div className={`${styles.placeContainer} ${styles.frontGate}`}>
                        <p className={styles.orderPlace}>{order.place}</p>
                    </div>
                )
            }
            {
                order.place === PLACES.backGate && (
                    <div className={`${styles.placeContainer} ${styles.backGate}`}>
                        <p className={styles.orderPlace}>{order.place}</p>
                    </div>
                )
            }
            {
                order.place === PLACES.boysHostal01 && (
                    <div className={`${styles.placeContainer} ${styles.boysHostal01}`}>
                        <p className={styles.orderPlace}>{order.place}</p>
                    </div>
                )
            }

            {
                order.place === PLACES.boysHostal02 && (
                    <div className={`${styles.placeContainer} ${styles.boysHostal02}`}>
                        <p className={styles.orderPlace}>{order.place}</p>
                    </div>
                )
            }

            {
                order.place === PLACES.boardingPlace && order.mapUrl.length !== 0 && (
                    <div className={styles.showMapButtonContainer}>
                        <div className={styles.button}>
                            <a
                                className={`${styles.button} ${styles.mapButton}`}
                                href={order.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open Google Map
                            </a>
                        </div>
                    </div>
                )
            }
            <br/>


            {
                user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && order.place === PLACES.boardingPlace && pathname === '/orders' && (
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="mapUrl">Map Url:</label>
                        <div className={styles.inputContainer}>
                            <input className={styles.input} type="text" id="mapUrl" value={mapUrl}
                                   onChange={(e) => setMapUrl(e.target.value)} required/>
                            <button className={`${styles.button} ${styles.update}`} onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                )
            }
            {
                user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && order.status === STATUS.pending && pathname === '/orders' && (
                    <div className={styles.actionButtons}>
                        <button className={`${styles.button} ${styles.accept}`} onClick={handleAccept}>
                            ACCEPT
                        </button>
                        <button className={`${styles.button} ${styles.reject}`} onClick={handleReject}>
                            REJECT
                        </button>
                    </div>
                )
            }

            {
                company_emails.includes(user.email) && order.status !== STATUS.delivered && (
                    <div className={styles.actionButtons}>
                        <button className={`${styles.button} ${styles.deliver}`} onClick={handleDeliver}>
                            Complete Delivery
                        </button>
                    </div>
                )
            }

            {
                user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && order.status === STATUS.accepted && pathname === '/orders' &&(
                    <div className={styles.actionButtons}>
                        <button className={`${styles.button} ${styles.reject}`} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )
            }


        </div>
    );
}

export default OrderCard;