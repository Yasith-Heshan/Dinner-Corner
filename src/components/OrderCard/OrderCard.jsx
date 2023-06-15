"use client"
import styles from './OrderCard.module.css';
import {pricesList} from "@/utils/priceList";
import {universityList} from "@/utils/universityList";
const OrderCard = ({order,id})=>{
    const getTotal=(itemList)=>{
        let total = 0;
        itemList.split(',').map(
            (id)=>{
                const item = pricesList.find((item) => item.id === parseInt(id));
                total+=item.price
            }
        )
        return total;
    }

    const getUniversity = (universityId)=>{
        const universityObj = universityList.filter(
            (obj)=>(obj.id==universityId)
        );
        return universityObj[0].university;
    }

    return(
        <div className={styles.orderCard}>
            <h3 className={styles.orderName}>{id+1}){order.name} - {getUniversity(order.university)}</h3>
            <p className={styles.orderPhone}>{order.phoneNumber}</p>
            <p className={styles.orderDate}>{(new Date(order.createdAt)).toString()}</p>
            <ul className={styles.orderItems}>
                {order.orderItems.split(",").map(
                    (id,index) => {
                        const item = pricesList.find((item) => item.id === parseInt(id));
                       return <li key={index}>{item.type} - {item.size} - රු. {item.price}</li>
                    }
                )}
            </ul>
            <p className={styles.orderTotal}>මුළු මුදල: රු {getTotal(order.orderItems)}</p>
        </div>
    );
}

export default OrderCard;