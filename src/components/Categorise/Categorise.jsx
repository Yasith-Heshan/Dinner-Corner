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
    );


    // const ourList = Object.keys(itemCount).map(key => key).filter(
    //     (id)=>{
    //        return ![7,8,11,12].includes(parseInt(id));
    //     }
    // );
    //
    // const otherList = Object.keys(itemCount).map(key => key).filter(
    //     (id)=>{
    //         return [7,8,11,12].includes(parseInt(id));
    //     }
    // );

    const otherListItemIds = [7,8,11,12]

    const ourList = [];
    const otherList = [];

    Object.keys(itemCount).map(key => key).forEach(
        (id)=>{
            const item = pricesList.find((item) => item.id === parseInt(id));
            if(![7,8,11,12].includes(parseInt(id))){
                ourList.push(itemCount[id]*item.price);
            }else{
                otherList.push(itemCount[id]*item.price)
            }
        }
    );

    function getSum(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    console.log(itemCount);
    console.log(ourList);
    console.log(otherList);



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
                                    <td>එකක් රු. {item.price}/=</td>
                                    <td>{itemCount[id]}</td>
                                </tr>
                                );
                        }
                    )
                }
                </tbody>
            </table>
            <h3>Total for Renuka: රු. {getSum(ourList)}</h3>
            <h3>Total for Thilini: රු. {getSum(otherList)}</h3>
            <br/>
        </>
    )
}

export default Categorise;