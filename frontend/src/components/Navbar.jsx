import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
// import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {Tooltip} from "@mui/material";
import avatar from '../data/avatar0.png';
import { Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';


const NavButton = ({title, customFunc, color, icon, dotColor})=>{
    return (
        <Tooltip title={title} placement="bottom">
            <button type="button" onClick={customFunc} className="relative text-xl rounded-full p-3 text-2xl hover:bg-light-gray" style={{ color }}>
                <span style={{background: dotColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2">
                </span>
                {icon}
            </button>
        </Tooltip>
    );
}
export const Navbar = ({setMenuActive, currentColor, currentSndColor}) => {
    // const {activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, currentColor} = useStateContext();
    const { isClicked, handleClick} = useStateContext();
    // useEffect(()=>{
    //     const handleResize = () => setScreenSize(window.innerWidth);
    //     window.addEventListener('resize', handleResize);
    //     handleResize();

    //     return ()=> window.removeEventListener('resize', handleResize);
    // },[]);

    // useEffect(() => {
    //     if(screenSize <= 900){
    //         setActiveMenu(false);
    //     } else{
    //         setActiveMenu(true);
    //     }
    // }, [screenSize])
    return (
        <div className="navbar flex relative justify-between p-3 md:mx-6 z-30">
            <NavButton title="Menu" customFunc={()=>setMenuActive((prevActiveMenu)=>!prevActiveMenu)}
                color={currentColor} icon={<AiOutlineMenu/>}/>
            <div className="flex">
                {/* <NavButton title="Cart" customFunc={()=>handleClick("cart")}
                    color={currentColor} icon={<FiShoppingCart/>}/> */}
                <NavButton title="Chat" customFunc={()=>handleClick("chat")}
                    color={currentColor} dotColor={currentSndColor} icon={<BsChatLeft/>}/>
                <NavButton title="Notification" customFunc={()=>handleClick("notification")}
                    color={currentColor} icon={<RiNotification3Line/>}/>
                <Tooltip title="Profile" placement="bottom">
                    <div
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                        onClick={() => handleClick('userProfile')}>
                        <img className="rounded-full w-8 h-8"
                            src={avatar}
                            alt="user-profile"/>
                        <p>
                            <span className="text-gray-400 text-14">Hi,</span>{' '}
                            <span className="text-gray-400 font-bold ml-1 text-14">
                                Michelle
                            </span>
                        </p>
                        <MdKeyboardArrowDown className="text-gray-400 text-14" />
                    </div>
                </Tooltip>
                {/* {isClicked.cart && <Cart/>} */}
                {isClicked.chat && <Chat />}
                {isClicked.notification && <Notification/>}
                {isClicked.userProfile && <UserProfile/>}
            </div>
        </div>
    );
}

// export default Navbar;
