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


    const otherListItemIds = []
    // const otherListItemIds = [7,8,11,12]
    // const otherListItemIds = [11,12]
    const normalRiceIds = [1,3,5,7,9]
    // const normalRiceIds = [1,3,5,7,9,11]
    const fullRiceIds = [2,4,6,8,10]
    // const fullRiceIds = [2,4,6,8,10,12]

    const ourList = [];
    const otherList = [];
    let renukaNormal = 0;
    let renukaFull = 0;
    let thiliniNormal = 0;
    let thiliniFull = 0;


    fullRiceIds.forEach(
        (id)=>{
            if(otherListItemIds.includes(id)){
                thiliniFull += itemCount[id];
            }else{
                renukaFull += itemCount[id];
            }
        }
    );

    normalRiceIds.forEach(
        (id)=>{
            if(otherListItemIds.includes(id)){
                thiliniNormal += itemCount[id];
            }else{
                renukaNormal += itemCount[id];
            }
        }
    );

    Object.keys(itemCount).map(key => key).forEach(
        (id)=>{
            const selectedItem = pricesList.find((item) => item.id === parseInt(id));
            if(!otherListItemIds.includes(parseInt(id))){
                ourList.push(itemCount[id]*selectedItem.price);
            }else{
                otherList.push(itemCount[id]*selectedItem.price);
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

    // console.log(itemCount);
    // console.log(ourList);
    // console.log(otherList);



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
            <h3>&nbsp;Total for Renuka: රු. {getSum(ourList)}</h3>
            <h3>&nbsp;Total for Thilini: රු. {getSum(otherList)}</h3>
            <br/>
            <br/>
            <h3>&nbsp;Renuka: Normal Rice Count: {renukaNormal}</h3>
            <h3>&nbsp;Renuka: Full Rice Count: {renukaFull}</h3>
            <br/>
            <br/>
            <h3>&nbsp;Thilini: Normal Rice Count: {thiliniNormal}</h3>
            <h3>&nbsp;Thilini: Full Rice Count: {thiliniFull}</h3>
            <br/>
        </>
    )
}

export default Categorise;