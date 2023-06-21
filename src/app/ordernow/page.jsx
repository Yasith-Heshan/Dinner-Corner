"use client"
import {useEffect, useState} from "react";
import styles from './page.module.css'
import {pricesList} from "@/utils/priceList";
import axios from 'axios'
import {universityList} from "@/utils/universityList";
import {format} from "date-fns";

const OrderNow = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [university, setUniversity] = useState(0);
    const [universityError, setUniversityError] = useState(false);
    const phoneNumberPattern = /^(0|\+94)(11|71|70|77|76|75|78)-?\d{7}$/;
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [mealId, setMealId] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [mealList, setMealList] = useState([]);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [disableOrder, setDisableOrder] = useState(false);
    const [orderLimitError , setOrderLimitError] = useState('');
    const maximumOrderLimit = 15;


    useEffect(() => {
        if (phoneNumber !== "" && !phoneNumberPattern.test(phoneNumber)) {
            setPhoneNumberError(true);
        } else {
            setPhoneNumberError(false);
        }
    }, [phoneNumber]);


    const getUniversity = (universityId)=>{
        const universityObj = universityList.filter(
            (obj)=>(obj.id==universityId)
        );
        return universityObj[0].university;
    }


    const handleSubmit = async (e) => {

        let text = "ඇනවුම ලබා දීම තහවුරු කරන්න.";
        if (confirm(text) == true) {

            e.preventDefault();
            const orderItemsArray = mealList.map((meal) => `${meal.id}`);
            const orderItems = orderItemsArray.join(',')
            try {
                setOrderLimitError(``)
                const response = await axios.get(`/api/order/${university}`);
                const selectedOrders = response.data.filter(
                    (order) => {
                        return order.orderDate === format(new Date(), 'dd-MM-yyyy')
                    }
                )
                console.log(selectedOrders);
                if (selectedOrders.length < maximumOrderLimit) {
                    if (!phoneNumberError) {
                        if (university === 0 || phoneNumber === '') {
                            if (university === 0) {
                                setUniversityError(true);
                            }
                            if (phoneNumber === '') {
                                setPhoneNumberError(true);
                            }
                        } else {
                            setDisableOrder(true);
                            const orderDate = format(new Date(), 'dd-MM-yyyy')
                            const response = await axios.post(`/api/order`, {
                                name, phoneNumber, university, orderItems, orderDate
                            });

                            if (response.data === 'Order has been created') {
                                setDisplaySuccess(true);
                                setDisableOrder(false);
                                setName('');
                                setPhoneNumber('');
                                setUniversityError(false);
                                setUniversity(0);
                                setQuantity(1);
                                setMealId(0);
                                setMealList([]);
                                setTimeout(() => {
                                    setDisplaySuccess(false);
                                }, 3000);
                            } else {
                                setDisplayError(true);
                                setDisableOrder(false);
                                setTimeout(() => {
                                    setDisplayError(false)
                                }, 3000);
                            }
                        }
                    }
                } else {
                    setOrderLimitError(`${getUniversity(university)} සඳහා උපරිම ඇනවුම් සීමාව ඉක්මවා ඇත.`)
                    setDisplaySuccess(false);
                    setDisableOrder(false);
                    setName('');
                    setPhoneNumber('');
                    setQuantity(1);
                    setMealId(0);
                    setMealList([]);
                }


            } catch (error) {
                setDisplayError(true);
                setDisableOrder(false);
                setTimeout(() => {
                    setDisplayError(false)
                }, 3000);
                console.error(error);
            }
        }

    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>ඇනවුම් කරන්න</h1>

                {
                    displaySuccess && (
                        <div className={styles.successMsg}>
                            <span className={styles.successIcon}>&#10003;</span>
                            <p>ඇනවුම සාර්තකව ලැබුනි.</p>
                        </div>
                    )
                }
                {
                    displayError && (
                        <div className={styles.errorMsg}>
                            <span className={styles.errorIcon}>&#10007;</span>
                            <p>යම් වරදක් සිදුවී ඇත.</p>
                        </div>
                    )
                }
                {
                    disableOrder && (
                        <div className={styles.requested}>
                            <p>order requesting...</p>
                        </div>
                    )
                }

                {
                    orderLimitError!=='' && (
                        <div className={styles.errorMsg}>
                            {orderLimitError}
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
                        <input
                            className={styles.input}
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)
                            }
                            required
                        />
                        {phoneNumberError && <p className={styles.errorMessage}>නිවැරදි දුරකතන අංකයක් ඇතුලත් කරන්න.</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="university">විශ්ව විද්‍යාලය:</label>
                        <select onChange={(e) => {
                            if(e.target.value!==0){
                                setUniversityError(false);
                            }else{
                                setUniversityError(true);
                            }
                            setUniversity(e.target.value)
                        }} className={styles.input} id="university" value={university}>
                            <option value={0}></option>
                            {universityList.map(
                                (e, index) => (
                                    <option value={e.id} key={index}>{e.university}</option>
                                )
                            )}
                        </select>
                        {universityError && <p className={styles.errorMessage}>විශ්ව විද්‍යාලය තෝරන්න.</p>}
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
                                        disabled={mealId === 0}
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
                    <button disabled={disableOrder} onClick={handleSubmit} type="button"
                            className={styles.submitButton}>ඇනවුම් කරන්න
                    </button>
                </form>
            </div>)
        </>

    );
}

export default OrderNow;