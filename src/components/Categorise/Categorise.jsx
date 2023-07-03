import {pricesList} from "@/utils/priceList";
import styles from './Categorise.module.css'

const Categorise = ({orders})=>{

    const itemCount = pricesList.reduce((result, item) => {
        result[item.id] = 0;
        return result;
    }, {});
    orders.forEach(
        (order)=>{
            order.orderItems.split(',').forEach(
                (item)=>{
                    itemCount[item]+=1
                }
            )
        }
    )


    return (
        <>
            <h1>අද දින සඳහා සාරාංශය:</h1>
            <table className={styles.table}>
                <tbody>
                {
                    Object.keys(itemCount).map(
                        (id,index)=>{
                            const item = pricesList.find((item) => item.id === parseInt(id));
                            return(
                                <tr key={index}>
                                    <td>{item.type}</td>
                                    <td>{item.size}</td>
                                    <td>{itemCount[id]}</td>
                                </tr>
                                );
                        }
                    )
                }
                </tbody>
            </table>
        </>
    )
}

export default Categorise;