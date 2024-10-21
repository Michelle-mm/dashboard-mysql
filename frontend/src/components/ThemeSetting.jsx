import React from 'react'
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { Tooltip } from "@mui/material";

import { themeColors } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

export const ThemeSetting = () => {
    const {setColor, setMode, currentMode, currentColor, currentSndColor, setThemeSettings} = useStateContext();
    return (
        <div className="backdrop-blur-sm bg-white/50 nav-item h-full w-3/5 fixed top-0 right-0 rounded-r-lg z-40">
            <div className="float-right dark:text-gray-200 dark:bg-[#484B52]">
                <div className="flex justify-between items-center p-4 ml-4">
                    <p className="font-bold text-4xl" style={{color: currentColor}}>Settings</p>
                    <button type="button" onClick={()=>setThemeSettings(false)}
                            style={{color:'rgb(153, 171, 180)', borderRadius: '50%'}}>
                        <MdOutlineCancel style={{color: 'red'}} className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-blue"/>
                    </button>
                </div>
                <div className="flex-col border-t-1 border-color p-4 ml-4">
                    <p className="font-bold text-xl" style={{color: currentColor}}>Theme Options</p>
                    <div className="mt-4">
                        <input type="radio" name="theme" id="light" value="Light"
                                className="cursor-pointer" onChange={(e)=>setMode(e)} checked={currentMode === "Light"}/>
                            <label htmlFor="light" className="ml-2 text-md cursor-pointer">Light</label>
                        <input type="radio" name="theme" id="dark" value="Dark"
                                className="cursor-pointer ml-2" onChange={(e)=>setMode(e)} checked={currentMode === "Dark"}/>
                            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">Dark</label>
                    </div>
                </div>
                <div className="flex-col border-t-1 border-color p-4 ml-4">
                    <p className="font-bold text-xl" style={{color: currentColor}}>Theme Primary Colors</p>
                    <p className="font-bold text-lg" style={{color: currentSndColor}}>Secondary Color:</p>
                    <div className="flex flex-wrap gap-3">
                        {themeColors.map((item, index)=>(
                            <Tooltip key={index} title={item.color}
                                            placement="bottom">
                                <div className="relative mt-2 cursor-pointer flex gap-5 items-center">
                                    <button type="button" className="h-10 w-10 rounded-full cursor-pointer" value={item.color} style={{backgroundColor: item.color}}
                                            onClick={(e)=>setColor(e)}>
                                        <BsCheck className={`ml-2 text-2xl text-white ${item.color === currentColor ? 'block': 'hidden'}`}/>
                                    </button>
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
}
