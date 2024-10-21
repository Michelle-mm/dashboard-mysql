import React from 'react'
import {useStateContext} from "../contexts/ContextProvider";
export const AddEvent = ({updateReminder, setTextArea}) => {
    const {currentColor, handleClick} = useStateContext();
    return (
        <div className="z-30 flex flex-col md:flex-row gap-4">
            <textarea
                onChange={(e) => setTextArea(e.target.value)}
                className="border-2 rounded-xl p-3"
                style={{borderColor: currentColor}}
                placeholder="Write your reminder here..."
                rows={5}
                cols={23}/>
            <div className="flex md:flex-col gap-4">
                <button className="p-2 font-semibold rounded-xl" 
                        style={{backgroundColor: currentColor, color: 'white'}}
                        onClick={updateReminder}>
                            Save
                </button>
                <button className="p-2 font-semibold bg-red-300 rounded-xl" 
                        style={{color: 'white'}}
                        onClick={()=>handleClick("addEventWindow")}>
                            Cancel
                </button>
            </div>
        </div>
    )
}
