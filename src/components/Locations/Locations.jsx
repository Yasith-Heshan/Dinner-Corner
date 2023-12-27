import { PLACES, STATUS } from '@/utils/constants';

const Locations = ({ orders }) => {
  const frontGateList = orders.filter((order) => {
    return (
      order.location === PLACES.frontGate &&
      !(order.status === STATUS.rejected || order.status === STATUS.canceled)
    );
  });
  const backGateList = orders.filter((order) => {
    return (
      order.location === PLACES.backGate &&
      !(order.status === STATUS.rejected || order.status === STATUS.canceled)
    );
  });

  const boardingList = orders.filter((order) => {
    return (
      order.location === PLACES.boardingPlace &&
      !(order.status === STATUS.rejected || order.status === STATUS.canceled)
    );
  });

  const boysHostal01 = orders.filter((order) => {
    return (
      order.location === PLACES.boysHostel01 &&
      !(order.status === STATUS.rejected || order.status === STATUS.canceled)
    );
  });

  const boysHostal02 = orders.filter((order) => {
    return (
      order.location === PLACES.boysHostel02 &&
      !(order.status === STATUS.rejected || order.status === STATUS.canceled)
    );
  });

  return (
    <div className={'p-5 bg-gray-300 text-black'}>
      <div className={'m-3'}>
        <h1 className={'text-black text-xl font-bold'}>{PLACES.frontGate}: </h1>
        <ol>
          {frontGateList.map((order) => {
            return (
              <p key={order.id}>
                {order.rank}. {order.name} - {order.phoneNumber} - {order.status}
              </p>
            );
          })}
        </ol>
      </div>

      <div className={'m-3'}>
        <h1 className={'text-xl text-black font-bold'}>{PLACES.backGate}: </h1>
        <ol>
          {backGateList.map((order) => {
            return (
              <p key={order.id}>
                {order.rank}. {order.name} - {order.phoneNumber} - {order.status}
              </p>
            );
          })}
        </ol>
      </div>

      <div className={'m-3'}>
        <h1 className={'text-xl text-black font-bold'}>{PLACES.boysHostel01}: </h1>
        <ol>
          {boysHostal01.map((order) => {
            return (
              <p key={order.id}>
                {order.rank}. {order.name} - {order.phoneNumber} - {order.status}
              </p>
            );
          })}
        </ol>
      </div>

      <div className={'m-3'}>
        <h1 className={'text-xl text-black font-bold'}>{PLACES.boysHostel02}: </h1>
        <ol>
          {boysHostal02.map((order) => {
            return (
              <p key={order.id}>
                {order.rank}. {order.name} - {order.phoneNumber} - {order.status}
              </p>
            );
          })}
        </ol>
      </div>

      <div className={'m-3'}>
        <h1 className={'text-xl text-black font-bold'}>{PLACES.boardingPlace}s: </h1>
        <ol>
          {boardingList.map((order) => {
            return (
              <p key={order.id}>
                {order.rank}. {order.name} - {order.phoneNumber} - {order.status}
              </p>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Locations;
