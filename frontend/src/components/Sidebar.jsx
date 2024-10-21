import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import {links} from "../data/dummy.js";
import {useStateContext} from "../contexts/ContextProvider";


export const Sidebar = ({menuActive, setMenuActive, currentColor, currentSndColor})=>{
    const {windowWidth} = useStateContext();

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 shadow-md';
    const normalLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 bg-white/50 backdrop-blur-md 
                        dark:text-gray-200 dark:hover:text-black hover:bg-light-gray hover:shadow-md m-2`;
    const handleCloseSideBar=()=>{
        if(menuActive !== undefined && windowWidth <= 900){
            console.log("setActive menu false");
            // setActiveMenu(false);
            setMenuActive(false);
        }
        // setActiveMenu(false);
        console.log("setActive menu false failed");
    }
    return (
        <>
            <div className="ml-3 h-screen pb-10">
                {menuActive && (
                    <>
                        <div className="flex justify-between items-center">
                            <Link to="/" onClick={handleCloseSideBar}
                                style={{color: 'white'}}
                                className="items-center gap-3 ml-3 mt-4 flex text-2xl font-extrabold tracking-tight dark:text-white text-slate-900">
                                <SiShopware /> <span>MY Dashboard</span>
                            </Link>
                            <Tooltip title="Menu" placement="bottom">
                                <button
                                    type="button"
                                    onClick={handleCloseSideBar}
                                    style={{ color: currentColor }}
                                    className="text-base rounded-full p-2 hover:bg-white/40 mt-4 mr-2 block cursor-pointer lg:hidden">
                                <MdOutlineCancel/>
                                </button>
                            </Tooltip>
                        </div>
                        
                        <div className="sideBarItem mt-10">
                            {links.map((item)=>(
                                <div key={item.title}>
                                    <p className={`font-bold m-3 p-2 mt-4 uppercase`}
                                        style={{color: 'white'}}
                                    >
                                        {item.title}
                                    </p>
                                    {item.links.map((link)=>(
                                        <NavLink to={`/${link.name}`}
                                                key={link.name}
                                                onClick={handleCloseSideBar}
                                                style={({ isActive }) => ({
                                                    backgroundColor: isActive ? currentColor : '',
                                                    opacity: isActive? "0.8": "1",
                                                })}
                                                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                            >{link.icon}<span>{link.name}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            ))}
                        </div>
                
                        
                    </>
                )}
            </div>
        </>
    );
}

// export default Sidebar;

/* item.links.map: 
    style={({ isActive }) => ({
        backgroundColor: isActive ? backgroundColor: currentColor : '',
    })}*/