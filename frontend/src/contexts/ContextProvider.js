import React ,{useState, useEffect, createContext, useContext} from "react";

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false, 
    notification: false,
    addEventWindow: false,
    showReminder: false
}

export const ContextProvider = ({children})=>{
    // const lgIsTrue = window.innerWidth > 900? true: false
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentSndColor, setCurrentSndColor] = useState('#c7d2fe');
    let selectedColor = [];
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    useEffect(() => {
        function handleResize() {
          setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleResize);
        
        handleResize();
        
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
    const setMode = (event)=>{
        // console.log(event.target.value);
        setCurrentMode(event.target.value);
        localStorage.setItem('themeMode', event.target.value);

        setThemeSettings(false);
    }
    const setColor = (e)=>{
        // console.log(event.target.value);
        const color = e.target.value;
        console.log(color);
        if(selectedColor.includes(color)){
            selectedColor = (selectedColor.filter(c => c !== color));
        } else if(selectedColor.length>2){
            const newColorArr = (selectedColor.shift()).push(color);
            selectedColor = newColorArr;
        } else {
            selectedColor = ([...selectedColor, color]);
        }
        if(selectedColor.length===2){
            setCurrentColor(selectedColor[0]);
            setCurrentSndColor(selectedColor[1]);
            setThemeSettings(false);
        }
    }

    const handleClick=(clicked)=>{
        setIsClicked((prevIsClicked)=>({...initialState, [clicked]:!prevIsClicked[clicked]}));
        // get everything inside the initialState, set only the clicked one to true
    }
    
    return(
        <StateContext.Provider value={
            {activeMenu,
            setActiveMenu,
            isClicked, setIsClicked, 
            handleClick,
            // screenSize, setScreenSize,
            currentColor, currentMode,
            setMode, setColor,
            currentSndColor,
            themeSettings, setThemeSettings,
            windowWidth}
        }>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = ()=> useContext(StateContext);
// tell the code to give the data from the context that is useing the context. and specify the context we're using is the "StateContext"

//create context prodiver -> render its children and pass the value data -> wrap the code with it. (index.js)