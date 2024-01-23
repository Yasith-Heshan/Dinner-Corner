import {pricesList} from "@/utils/priceList";
import {useState} from "react";
import {getItem} from "@/utils/supportFuncitons";

const MobileItemSelector = ({cart,setCart,error})=>{
    const [item, setItem] = useState(null);
    const [size, setSize] = useState(0);

    const handleChangeItem=(e)=>{
        setItem(getItem(parseInt(e.target.value)));
    }

    const handleChangeSize=(e)=>{
        setSize(parseInt(e.target.value));
    }

    const handleAddToCart = ()=>{
        const temp = [];
        for (let i = 0; i < size; i++) {
            temp.push(item);
        }
        setCart([...cart,...temp])
    }

    return (
            <div className={'sm:hidden grid grid-cols-2 gap-1'}>
                <select
                    onChange={handleChangeItem}
                    className={error ? 'failedInput' : 'successInput'}
                >
                    <option></option>
                    {pricesList.map((item) => {
                        return (<option value={item.id} key={item.id}>
                            {item.type} - {item.size} - Rs.{item.price}
                        </option>);
                    })}
                </select>
                <button
                    onClick={handleAddToCart}
                    type={'button'}
                    className={'bg-green-500 rounded-lg p-1 row-span-2'}
                >
                    Add To Cart
                </button>
                <select
                    onChange={handleChangeSize}
                    className={error ? 'failedInput' : 'successInput'}
                >
                    {[...Array(20).keys()]
                        .map((i) => i)
                        .map((i) => {
                            return (<option value={i} key={i}>
                                {i}
                            </option>);
                        })}
                </select>
            </div>
    );
}

export default MobileItemSelector;