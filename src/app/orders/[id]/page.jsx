'use client';
import {useEffect, useState} from 'react';
import {editOrder, fetchOrder} from '@/utils/firebaseFunctions';
import {UserAuth} from '@/app/context/AuthContext';
import './style.css';
import OrderForm2 from '@/components/OrderForm/OrderForm2';
import {ORDERS} from '@/utils/routes';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

const OrderEdit = ({params}) => {
    const {user} = UserAuth();
    const router = useRouter();
    const [order, setOrder] = useState(null);

    const handleSubmit = async (data) => {
        try {
            const orderDetails = {
                name: data.name,
                email: user.email,
                date: data.date,
                phoneNo: data.phoneNo,
                itemList: data.itemList,
                specialNotes: data.specialNotes,
                location: data.location,
                addGravy: data.addGravy,
                mapUrl: data.mapUrl,
            };
            await editOrder(params.id, orderDetails);
            router.push(ORDERS);
        } catch (e) {
            toast.error('Editing Failed');
            console.error(e);
        }
    };

    useEffect(() => {
        if (typeof window !== undefined) {
            if (localStorage.getItem('user')) {
                if (
                    JSON.parse(localStorage.getItem('user')).email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
                ) {
                    router.push('/');
                }
            }
        }
    }, [router, user]);

    useEffect(() => {

        fetchOrder(params.id)
            .then((res) => {
                setOrder(res);
            })
            .catch((error) => {
                toast.error('Order Fetching error')
                console.error(error);
            });

    }, [params.id]);

    return (
        <div>
            <OrderForm2 order={order} submitHandler={handleSubmit}/>
        </div>
    );
};

export default OrderEdit;
