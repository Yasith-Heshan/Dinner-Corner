"use client"
import {useState} from "react";
import styles from './page.module.css'
import {pricesList} from "@/utils/priceList";
import axios from 'axios'

const OrderNow = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mealId, setMealId] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [mealList, setMealList] = useState([]);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [disableOrder,setDisableOrder] = useState(false);


    const handleSubmit = async (e) => {
        setDisableOrder(true);
        e.preventDefault();
        const orderItemsArray = mealList.map((meal) => `${meal.id}`);
        const orderItems = orderItemsArray.join(',')
        try {
            const response = await axios.post(`/api/order`, {
                name, phoneNumber, orderItems
            });
            setDisplaySuccess(true);
            setDisableOrder(false);
            setName('');
            setPhoneNumber('');
            setQuantity(1);
            setMealId(0);
            setMealList([]);
            setTimeout(()=>{setDisplaySuccess(false)},5000);

        } catch (error) {
            setDisplayError(true);
            setDisableOrder(false);
            setTimeout(()=>{setDisplayError(false)},5000);
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>

            <h1 className={styles.heading}>ඇනවුම් කරන්න</h1>

            {
                displaySuccess && (
                    <div className={styles.successMsg}>
                        <span className={styles.successIcon}>&#10003;</span>
                        <p>Success! Your message has been sent.</p>
                    </div>)
            }
            {
                displayError && (
                    <div className={styles.errorMsg}>
                        <span className={styles.errorIcon}>&#10007;</span>
                        <p>Error! Something went wrong.</p>
                    </div>
                )
            }

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">පාරිභොගිකයාගේ නම:</label>
                    <input className={styles.input} type="text" id="name" value={name}
                           onChange={(e) => setName(e.target.value)} required/>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="phoneNumber">දුරකතන අංකය:</label>
                    <input className={styles.input} type="tel" id="phoneNumber" value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)} required/>
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.gridContainer}>
                        <div className={styles.column1}>
                            <label className={styles.label} htmlFor="mealType">ආහාර වර්ගය:</label>
                            <select
                                id="mealType"
                                value={mealId}
                                onChange={(e) => {
                                    setMealId(e.target.value);
                                    console.log(e.target.value);
                                }}
                                className={styles.input}
                            >
                                <option value={0}></option>
                                {pricesList.map((meal) => (
                                    <option key={meal.id} value={meal.id}>
                                        {meal.type} - {meal.size} - රු.{meal.price}/=
                                    </option>
                                ))}
                            </select>
                            <label className={styles.label} htmlFor="qty">ප්‍ර්‍රමාණය:</label>
                            <select onChange={(e) => {
                                setQuantity(e.target.value)
                            }} className={styles.input} id="quantity" value={quantity}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                                    (e) => (
                                        <option value={e} key={e}>{e}</option>
                                    )
                                )}
                            </select>
                        </div>
                        <div className={styles.column2}>
                            <div className={styles.buttonContainer}>
                                <button
                                    disabled={mealId == 0}
                                    className={styles.addButton}
                                    type="button"
                                    onClick={(e) => {
                                        let temp = [];
                                        for (let i = 0; i < quantity; i++) {
                                            temp.push(pricesList[mealId - 1]);
                                        }
                                        setMealList([...mealList, ...temp]);
                                    }}
                                >
                                    එකතු කරන්න
                                </button>
                            </div>
                        </div>
                    </div>


                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <tbody>
                        {
                            mealList.map(
                                (meal, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{meal.type} - {meal.size}</td>
                                            <td>රු {meal.price}</td>
                                            <td>
                                                <button type={'button'} className={styles.removeButton}
                                                        onClick={
                                                            (e) => {
                                                                const temp = mealList;
                                                                temp.splice(index, 1);
                                                                setMealList([...temp]);
                                                            }
                                                        }

                                                >ඉවත් කරන්න
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                        {mealList.length != 0 && (<tr className={styles.total}>
                            <td>මුළු මුදල</td>
                            <td>රු {mealList.map((item) => item.price).reduce((a, b) => a + b, 0)}</td>
                            <td></td>
                        </tr>)}
                        </tbody>
                    </table>
                </div>

                <br/>
                <button disabled={disableOrder} type="submit" className={styles.submitButton}>ඇනවුම් කරන්න</button>
            </form>
        </div>
    );
}

export default OrderNow;