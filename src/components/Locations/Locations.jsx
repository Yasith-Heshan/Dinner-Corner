import  styles from './Locations.module.css'
import {PLACES} from "@/utils/constants";
const Locations = ({orders})=>{
    const frontGateList = orders.filter(
        (order)=>{
            return order.place===PLACES.frontGate
        }
    )
    const backGateList = orders.filter(
        (order)=>{
            return order.place===PLACES.backGate
        }
    )

    const boardingList = orders.filter(
        (order)=>{
            return order.place===PLACES.boardingPlace
        }
    )

    return (
        <div className={styles.locationCard}>
            <h1>Front Gate: </h1>
            <ol className={styles.listContainer}>
                {
                    frontGateList.map(
                        (order)=>{
                            return <li key={order.id}>{order.name} - {order.phoneNumber}</li>
                        }
                    )
                }
            </ol>

            <h1>Back Gate: </h1>

            <ol className={styles.listContainer}>
                {
                    backGateList.map(
                        (order)=>{
                            return <li key={order.id}>{order.name} - {order.phoneNumber}</li>
                        }
                    )
                }
            </ol>

            <h1>Boardings: </h1>

            <ol className={styles.listContainer}>
                {
                    boardingList.map(
                        (order)=>{
                            return <li key={order.id}>{order.name} - {order.phoneNumber}</li>
                        }
                    )
                }
            </ol>
        </div>
    );
}

export default Locations;