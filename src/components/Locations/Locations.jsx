import  styles from './Locations.module.css'
import {PLACES, STATUS} from "@/utils/constants";
const Locations = ({orders})=>{
    const frontGateList = orders.filter(
        (order)=>{
            return order.place===PLACES.frontGate && !(order.status===STATUS.rejected || order.status===STATUS.canceled)
        }
    )
    const backGateList = orders.filter(
        (order)=>{
            return order.place===PLACES.backGate && !(order.status===STATUS.rejected || order.status===STATUS.canceled)
        }
    )

    const boardingList = orders.filter(
        (order)=>{
            return order.place===PLACES.boardingPlace && !(order.status===STATUS.rejected || order.status===STATUS.canceled)
        }
    )

    const boysHostal01 = orders.filter(
        (order)=>{
            return order.place===PLACES.boysHostal01 && !(order.status===STATUS.rejected || order.status===STATUS.canceled)
        }
    )

    const boysHostal02 = orders.filter(
        (order)=>{
            return order.place===PLACES.boysHostal02 && !(order.status===STATUS.rejected || order.status===STATUS.canceled)
        }
    )

    return (
        <div className={styles.locationCard}>
            <h1>Front Gate: </h1>
            <ol className={styles.listContainer}>
                {
                    frontGateList.map(
                        (order)=>{
                            return <p key={order.id}>{order.rank}. {order.name} - {order.phoneNumber} - {order.status}</p>
                        }
                    )
                }
            </ol>

            <h1>Back Gate: </h1>

            <ol className={styles.listContainer}>
                {
                    backGateList.map(
                        (order)=>{
                            return <p key={order.id}>{order.rank}. {order.name} - {order.phoneNumber} - {order.status}</p>
                        }
                    )
                }
            </ol>

            <h1>Patuwaththa Hostal:</h1>

            <ol className={styles.listContainer}>
                {
                    boysHostal01.map(
                        (order)=>{
                            return <p key={order.id}>{order.rank}. {order.name} - {order.phoneNumber} - {order.status}</p>
                        }
                    )
                }
            </ol>

            <h1>New Hostal:</h1>

            <ol className={styles.listContainer}>
                {
                    boysHostal02.map(
                        (order)=>{
                            return <p key={order.id}>{order.rank}. {order.name} - {order.phoneNumber} - {order.status}</p>
                        }
                    )
                }
            </ol>

            <h1>Boardings: </h1>

            <ol className={styles.listContainer}>
                {
                    boardingList.map(
                        (order)=>{
                            return <p key={order.id}>{order.rank}. {order.name} - {order.phoneNumber} - {order.status}</p>
                        }
                    )
                }
            </ol>

        </div>
    );
}

export default Locations;