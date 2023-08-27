"use client"
import {useEffect, useState} from "react";
import styles from './page.module.css'
import {pricesList} from "@/utils/priceList";
import {collection, addDoc, serverTimestamp,query,where,getCountFromServer} from 'firebase/firestore'
import {db} from '../firebase'
import {customerNameError, customerPhoneNumberError, emptyCartError} from "@/utils/errorMessages";
import Spinner from "@/components/Spinner/Spinner";
import {UserAuth} from "@/app/context/AuthContext";
import {format} from "date-fns";


const OrderNow = () => {
    const {user,googleSignIn} = UserAuth();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user?user.displayName:'');
    const [nameError, setNameError] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneNumberPattern = /^(0|\+94)(11|71|70|77|76|75|78)-?\d{7}$/;
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const [date, setDate] = useState(format(new Date(),'yyyy-MM-dd'));
    const [dateError, setDateError] = useState('');

    const [mealId, setMealId] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [mealList, setMealList] = useState([]);
    const [mealListError, setMealListError] = useState('');

    const [requestingOrder, setRequestingOrder] = useState(false);

    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [displayLate, setDisplayLate] = useState(false);
    const [disableOrder, setDisableOrder] = useState(false);
    const [orderLimitError, setOrderLimitError] = useState('');
    const maximumOrderLimit = 20;

    useEffect(() => {
        if (phoneNumber !== "" && !phoneNumberPattern.test(phoneNumber)) {
            setPhoneNumberError(customerPhoneNumberError);
        } else {
            setPhoneNumberError('');
        }

        if (name.length !== 0) {
            setNameError('');
        }

        if (mealList.length !== 0) {
            setMealListError('');
        }


    }, [phoneNumber, name, mealList]);
    useEffect(() => {

        if(user){
            setLoading(false);
            setName(user.displayName)
        }
    }, [user]);

    const handleSignIn = async ()=>{
        try{
            setLoading(true);
            await googleSignIn();
            setLoading(false);
        }catch (error){
            console.log(error);
        }
    }

    if(loading){
        return (
            <div className={styles.container}>
                <Spinner/>
            </div>
        );
    }

    if (!user && !loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <h1>Please sign in to place an order</h1>
                    <button className={styles.loginButton} onClick={handleSignIn}>Login</button>
                </div>
            </div>

        );
    }


    const handleSubmit = async (e) => {

        if (name.length === 0) {
            setNameError(customerNameError);
            return;
        }

        if (phoneNumber.length === 0) {
            setPhoneNumberError(customerPhoneNumberError);
            return;
        }

        if (mealList.length === 0) {
            setMealListError(emptyCartError);
            return;
        }

        if(date === ''){
            setDateError('වැරදි දිනයකි!')
            return
        }

        setDisableOrder(true);

        try {
            setRequestingOrder(true);
            const q = query(collection(db, "orders"), where("orderDate", "==", date));
            const querySnapshot = await getCountFromServer(q);
            console.log(querySnapshot.data().count);
            if(querySnapshot.data().count>=maximumOrderLimit){
                setDisableOrder(false);
                setRequestingOrder(false);
                setOrderLimitError(`කණගාටුයි, ${date} දිනය සඳහා උපරිම ඇනවුම් ධාරිතාව ඉක්මවා ඇත.`)
                return
            }
            const idList = mealList.map((meal) => meal.id);
            const docRef = await addDoc(collection(db, 'orders'),
                {
                    name,
                    phoneNumber,
                    email:user.email,
                    orderItems: idList.join(','),
                    orderDate: date,
                    createdAt: serverTimestamp(),
                }
                );
            postSuccessFunctions();



        } catch (error) {
            setDisplayError(true);
            setTimeout(() => {
                setDisplayError(false)
            }, 5000)
            setDisableOrder(false);
            setRequestingOrder(false)
            console.error(error);
        }

    };

    // return (
    //   <div className={styles.container}>
    //       <h1 className={styles.heading}>අද(02/07/2023) සහ හෙට(03/07/2023) දින මෙම සේවාව ක්‍රියාත්මක නොවේ.</h1>
    //   </div>
    // );
    const postErrorFunctions = () => {

    }
    const postSuccessFunctions = () => {
        setRequestingOrder(false);
        setDisplaySuccess(true);
        setTimeout(() => setDisplaySuccess(false), 5000)
        setName('');
        setPhoneNumber('');
        setPhoneNumberError(false);
        setMealList([]);
        setMealId(0);
        setQuantity(1);
        setDisplayError(false);
        setDisplayLate(false);
        setDisableOrder(false);
        setOrderLimitError('');
        setDisableOrder(false);
        setDate(format(new Date(),'yyyy-MM-dd'));
        setDateError('');
    }

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
                    displayLate && (
                        <div className={styles.errorMsg}>
                            <span className={styles.errorIcon}>&#10007;</span>
                            <p>කණගාටුයි, නියමිත වේලාවට ප්‍රවාහනය කිරීමට අවශ්‍ය බැවින් 04:30 න් පසු ලැබෙන ඇනවුම් භාර ගනු
                                නොලැබේ.</p>
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
                    orderLimitError !== '' && (
                        <div className={styles.errorMsg}>
                            <span className={styles.errorIcon}>&#10007;</span>
                            {orderLimitError}
                        </div>
                    )
                }

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">පාරිභොගිකයාගේ නම:</label>
                        <input className={styles.input} type="text" id="name" value={name}
                               onChange={(e) => setName(e.target.value)} required/>
                        {nameError.length !== 0 && <p className={styles.errorMessage}>{nameError}</p>}
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
                        {phoneNumberError.length!==0 && <p className={styles.errorMessage}>{phoneNumberError}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="phoneNumber">ඇනයුම් කරන දිනය:</label>
                        <input
                            className={styles.input}
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)
                            }
                            required
                        />
                        {dateError.length!==0 && <p className={styles.errorMessage}>{dateError}</p>}
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
                                {mealListError.length !== 0 && <p className={styles.errorMessage}>{mealListError}</p>}
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
                            className={styles.submitButton}>
                        {requestingOrder?<Spinner/>:'ඇනවුම් කරන්න'}
                    </button>
                </form>
            </div>
            )
        </>

    );
}

export default OrderNow;