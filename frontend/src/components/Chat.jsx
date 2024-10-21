import React from 'react'
import {chatData} from '../data/dummy';
import {useStateContext} from '../contexts/ContextProvider';
import { TiDelete } from "react-icons/ti";
import Tooltip from '@mui/material/Tooltip';
// backdrop-blur-sm 
export const Chat = () => {
    const {currentColor, isClicked, setIsClicked} = useStateContext();
    return (
        <div className="nav-item border-1 absolute right-5 md:right-52 top-16 bg-white/30 backdrop-blur-md dark:bg-[#42464D] p-8 rounded-lg w-96"
            style={{borderColor: currentColor, opcaity:1}}>
            <div className="flex justify-between">
                <p className="text-2xl font-semibold" style={{color: currentColor}}>Messages</p>
                <Tooltip title="Close" arrow>
                    <button className="flex justify-center items-center px-2 hover:bg-red-200 hover:rounded-full text-white font-bold"
                            onClick={()=>setIsClicked(false)}>
                            <TiDelete/>
                    </button>
                </Tooltip>
                {/* <button className={`w-6 h-6 font-semibold border-2 cursor-pointer bg-white rounded-full hover:bg-gray-200`} style={{ color: currentColor, borderColor: currentColor}} onClick={()=>setIsClicked(false)}>x</button> */}
            </div>
            {chatData?.map((item, index)=>(
                <div className="flex m-3 p-3">
                    <div className="flex-col border-b-1 border-color pb-1">
                        <p className="text-xl font-semibold">{item.message}</p>
                        <p className="text-slate-400">{item.desc}</p>
                        <p className="text-slate-300">{item.time}</p>
                    </div>
                </div>
            ))}
            
        </div>
    )
}


{/* <svg className="cursor-pointer bg-red-200 rounded-full hover:bg-light-gray" stroke={currentColor} onClick={()=>setIsClicked(false)}fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg">X</svg> */}