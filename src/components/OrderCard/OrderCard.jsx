'use client';
import './style.css';
import { useEffect, useState } from 'react';
import { company_emails, GRAVYNOTE, STATUS } from '@/utils/constants';
import { handleAccept, handleCancel, handleDeliver, handleReject } from '@/utils/firebaseFunctions';
import {calculateTotal, getLocationColor} from '@/utils/supportFuncitons';
import { usePathname } from 'next/navigation';
import { DELIVERYORDER } from '@/utils/routes';

const OrderCard = ({ order, user }) => {
  const [orderStateClass, setOrderStateClass] = useState('pending');
  const pathname = usePathname();
  useEffect(() => {
    switch (order.status) {
      case STATUS.pending:
        setOrderStateClass('pending');
        break;
      case STATUS.accepted:
        setOrderStateClass('accepted');
        break;
      case STATUS.rejected:
        setOrderStateClass('rejected');
        break;
      case STATUS.canceled:
        setOrderStateClass('cancelled');
        break;
      case STATUS.delivered:
        setOrderStateClass('delivered');
        break;
    }
  }, [order]);



  return (
    <div
      className={
        'w-full min-h-40 bg-gray-300 text-black shadow-xl shadow-green-400 rounded-lg mb-5 p-5'
      }
    >
      <h1 className={'text-2xl font-bold'}>
        {order.name} - <span className={orderStateClass}>{order.status}</span>
      </h1>
      <div
        className={`w-full ${getLocationColor(
          order,
        )} p-2 rounded-lg font-bold text-center text-xl mt-2`}
      >
        {order.location}
      </div>

      <div className={'my-4'}>
        <p className={'text-gray-700 font-semibold text-xl'}>{order.phoneNumber}</p>
        {company_emails.includes(user.email) && (
          <div className={'flex justify-start items-center gap-1'}>
            <a
              target={'_blank'}
              href={`tel:${order.phoneNumber}`}
              className={'bg-gray-700 text-white rounded-lg p-2'}
            >
              Normal Call
            </a>
            <a
              target={'_blank'}
              href={`https://wa.me/${order.phoneNumber}`}
              className={'bg-green-500 text-white rounded-lg p-2'}
            >
              WhatsApp Call
            </a>
          </div>
        )}
      </div>

      <div>
        {order.itemList.map((item, index) => {
          return (
            <div key={index} className={'flex justify-start gap-5 items-start'}>
              <div>
                {index + 1}) {item.type} - {item.size}
              </div>
              <div>Rs.{item.price}</div>
            </div>
          );
        })}
      </div>
      <div className={'text-xl font-bold flex justify-end items-start mt-3'}>
        මුළු මුදල = Rs.{calculateTotal(order.itemList)}
      </div>
      {(order.specialNotes !== '' || !order.addGravy) && (
        <div className={'bg-pink-400 p-2 text-xl font-bold rounded-lg'}>
          {order.specialNotes}
          <br />
          {!order.addGravy && <p>{GRAVYNOTE}</p>}
        </div>
      )}

      {pathname !== DELIVERYORDER && (
        <>
          {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
            order.status === STATUS.pending && (
              <div className={'flex justify-end items-start gap-1 mt-5'}>
                <button
                  onClick={async () => {
                    await handleAccept(order);
                  }}
                  className={'w-36 p-2 bg-green-500 text-white rounded-lg text-md'}
                >
                  Accept
                </button>
                <button
                  onClick={async () => {
                    await handleReject(order);
                  }}
                  className={'w-36 p-2 bg-red-500 text-white rounded-lg text-md'}
                >
                  Reject
                </button>
              </div>
            )}
        </>
      )}

      {order.status === STATUS.accepted && (
        <>
          {company_emails.includes(user.email) && (
            <div className={'flex justify-end items-start gap-1 mt-5'}>
              <button
                onClick={async () => {
                  await handleDeliver(order);
                }}
                className={'w-40 p-2 bg-gray-700 text-yellow-400 rounded-lg text-md'}
              >
                Complete Delivery
              </button>
            </div>
          )}
          {pathname !== DELIVERYORDER && (
            <>
              {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                <>
                  <div className={'flex justify-end items-start gap-1 mt-3'}>
                    <button
                      onClick={async () => {
                        await handleCancel(order);
                      }}
                      className={'w-40 p-2 bg-red-500 text-white rounded-lg text-md'}
                    >
                      Cancel
                    </button>
                  </div>
                  {/*<div className={'flex justify-end items-start gap-1 mt-3'}>*/}
                  {/*    <button type="button" data-modal-target="orderFormModal" data-modal-toggle="orderFormModal" className={'p-2 bg-blue-700 rounded-lg text-white w-40'}>Edit</button>*/}
                  {/*</div>*/}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrderCard;
