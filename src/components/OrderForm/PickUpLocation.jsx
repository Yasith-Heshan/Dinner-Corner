import {PLACES} from "@/utils/constants";
import {useEffect, useState} from "react";

const PickUpLocation = ({setLocation, defaultValue,error})=>{
    const [boarding, setBoarding] = useState(false);
    const [localLocation, setLocalLocation] = useState(defaultValue);
    useEffect(() => {
        setLocalLocation(defaultValue);
    }, [defaultValue]);

    return (
        <>
            <div className='mb-5'>
                <label htmlFor='location' className={error ? 'failedLabel' : 'successLabel'}>
                    Pickup Location
                </label>
                <select
                    value={localLocation}
                    onChange={async (e) => {
                        if(e.target.value===PLACES.boardingPlace) {
                            setBoarding(true);
                        }else {
                            setBoarding(false);
                        }
                        setLocalLocation(e.target.value);
                        await setLocation( e.target.value);
                    }}
                    className={error ? 'failedInput' : 'successInput'}
                >
                    <option></option>
                    {Object.keys(PLACES).map((id, index) => {
                        return (
                            <option value={PLACES[id]} key={index}>
                                {PLACES[id]}
                            </option>
                        );
                    })}
                </select>

                {error && (
                    <p className='failedNote'>
                        <span className='font-medium'>Oops!</span> Please Select the pickup location!
                    </p>
                )}

                {boarding && (
                    <p className={'p-1 rounded-lg bg-green-300 text-center text-black font-bold mt-5'}>
                        Please Send location of your boarding place to 0714748483 through whatsapp
                    </p>
                )}
            </div>

        </>
    )
}
export default PickUpLocation