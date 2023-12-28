import {
    addDoc,
    and,
    collection,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    onSnapshot,
    or,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';
import {db} from '@/app/firebase';
import {company_emails, STATUS} from '@/utils/constants';
import {format, parse} from 'date-fns';

export const saveOrder = async (orderDetails) => {
    const rank = (await getOrderCount(orderDetails.date)) + 1;
    await addDoc(collection(db, 'orders'), {
        name: orderDetails.name,
        email: orderDetails.email,
        phoneNumber: orderDetails.phoneNo,
        itemList: orderDetails.itemList,
        orderDate: orderDetails.date,
        createdAt: serverTimestamp(),
        status: STATUS.pending,
        mapUrl: '',
        location: orderDetails.location,
        rank,
        specialNotes: orderDetails.specialNotes,
        addGravy: orderDetails.addGravy,
    });
};

export const getOrderCount = async (date) => {
    const q = query(collection(db, 'orders'), where('orderDate', '==', date));
    const querySnapshot = await getCountFromServer(q);
    return querySnapshot.data().count;
};

export const getQuery = (user) => {
    const today = parse(format(new Date(), 'yyyy-MM-dd'), 'yyyy-MM-dd', new Date());
    let q = query(
        collection(db, 'orders'),
        where('orderDate', '==', today),
        where('email', '==', user.email),
    );
    if (company_emails.includes(user.email)) {
        q = query(collection(db, 'orders'), and(
            where('orderDate', '==', today),
            or(where('status', '==', STATUS.accepted), where('status', '==', STATUS.pending)))
        );
    }

    return q;
};

export const fetchOrders = async (user) => {
    const q = getQuery(user);
    const temp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        temp.push({...doc.data(), id: doc.id});
    });
    temp.sort((a, b) => a.createdAt - b.createdAt);
    return temp;
};

export const handleAccept = async (order) => {
    const docRef = doc(db, 'orders', order.id);
    await updateDoc(docRef, {
        status: STATUS.accepted,
    });
};

export const handleReject = async (order) => {
    const docRef = doc(db, 'orders', order.id);
    await updateDoc(docRef, {
        status: STATUS.rejected,
    });
};

export const handleCancel = async (order) => {
    const docRef = doc(db, 'orders', order.id);
    await updateDoc(docRef, {
        status: STATUS.canceled,
    });
};

export const handleDeliver = async (order) => {
    const docRef = doc(db, 'orders', order.id);
    await updateDoc(docRef, {
        status: STATUS.delivered,
    });
};

export const handleShopOpen = async (open) => {
    const docRef = doc(db, 'shopOpen', process.env.NEXT_PUBLIC_SHOP_OPEN_DOCUMENT_ID);
    await updateDoc(docRef, {
        shopOpen: open,
    });
};

export const fetchShopStatus = async () => {
    const docRef = doc(db, 'shopOpen', process.env.NEXT_PUBLIC_SHOP_OPEN_DOCUMENT_ID);
    const documentSnapshot = await getDoc(docRef);
    return documentSnapshot.data();
};

export const handleDeliveryOrder = async (rankList) => {
    const date = format(new Date(), 'yyyy-MM-dd');
    const q = query(collection(db, 'orderWithDate'), where('date', '==', date));
    const querySnapshot = await getDocs(q);
    let id = '';
    querySnapshot.forEach((doc) => {
        id = doc.id;
    });
    if (id !== '') {
        const docRef = await doc(db, 'orderWithDate', id);
        await setDoc(docRef, {date, order: rankList});
    } else {
        await addDoc(collection(db, 'orderWithDate'), {date, order: rankList});
    }
};

export const fetchDeliveryOrder = async () => {
    const date = format(new Date(), 'yyyy-MM-dd');
    const q = query(collection(db, 'orderWithDate'), where('date', '==', date));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
};

export const fetchRealTimeData = (q, callBackHandle) => {
    return onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(() => {
            callBackHandle();
        })
    });
}
