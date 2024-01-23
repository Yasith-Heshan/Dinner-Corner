const Cart = ({itemList,handleRemoveFromCart})=>{


    const handleRemove = (index)=>{
        const copy = itemList;
        copy.splice(index,1);
        handleRemoveFromCart(itemList.splice(copy));
    }



    return (
        <div>
            <div className={'bg-green-500 rounded-lg w-[100%] min-h-20 my-5 p-1'}>
                <p className={'p-1'}>Cart:</p>
                {itemList.map((item, index) => {
                    return (<div
                        className={'bg-amber-200 text-black rounded-lg p-2 mb-1 flex justify-between items-center'}
                        key={index}
                    >
                        <p>
                            {item.type} - {item.size} - Rs.{item.price}
                        </p>
                        <button
                            type={'button'}
                            onClick={() => {
                                handleRemove(index);
                            }}
                            className={'bg-red-500 rounded-lg p-1 font-bold'}
                        >
                            Remove From Cart
                        </button>
                    </div>);
                })}
            </div>
        </div>
    );
}

export default Cart;