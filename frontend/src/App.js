import React, {Suspense, lazy, useEffect} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import Tooltip from '@mui/material/Tooltip';
import {Sidebar, Navbar, ThemeSetting} from "./components"
// import Ecommerce, {Employees, ColorPicker, Calendars, Editor, Orders, Customer, ConnectedDataGrid} from './pages';
import {useStateContext} from "./contexts/ContextProvider";

// Lazy load components
const Ecommerce = lazy(() => import('./pages').then(module => ({ default: module.default })));

// For named exports (all other components)
const Employees = lazy(() => import('./pages').then(module => ({ default: module.Employees })));
const Orders = lazy(() => import('./pages').then(module => ({ default: module.Orders })));
const Editor = lazy(() => import('./pages').then(module => ({ default: module.Editor })));
const Customer = lazy(() => import('./pages').then(module => ({ default: module.Customer })));
// const ColorPicker = lazy(() => import('./pages').then(module => ({ default: module.ColorPicker })));
const Calendars = lazy(() => import('./pages').then(module => ({ default: module.Calendars })));
const ConnectedDataGrid = lazy(() => import('./pages').then(module => ({ default: module.ConnectedDataGrid })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const App = () => {
    const {activeMenu, setActiveMenu, themeSettings, setThemeSettings, currentColor, currentSndColor, currentMode, windowWidth} = useStateContext();
    const appContainerStyle = {
        gridTemplateColumns: activeMenu && windowWidth>920 ? 'auto 1fr 1fr' : '1fr 1fr 1fr',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateAreas: activeMenu && windowWidth>920
            ? `'side nav nav'
               'side content content'
               'side foot foot'`
            : `'nav nav nav'
               'content content content'
               'foot foot foot'`,
    };
    console.log("color", currentColor, "2nd", currentSndColor);
    useEffect(()=>{
        windowWidth>950? setActiveMenu(true): setActiveMenu(false);
    }, [windowWidth])
    return (
        <div className={`${currentMode === 'Dark' ? 'dark' : 'light'} min-h-screen `}>
            <div className='fixed right-4 bottom-4 z-50'>
                <Tooltip title="Settings" placement="top">
                    <button 
                        type='button' 
                        className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white rounded-full opacity-80 hover:opacity-100'
                        style={{background: currentColor}}
                        onClick={() => setThemeSettings(prevThemeSetting => !prevThemeSetting)}
                    >
                        <FiSettings/>
                    </button>
                </Tooltip>
            </div>   
            <BrowserRouter>
                <div className={`max-w-screen-xl p-4`}
                    style={{
                        backgroundImage: `linear-gradient(to right, ${currentColor}, ${currentSndColor})`
                      }}> 
                    <div className={`appContainer grid dark:bg-main-dark-bg backdrop-blur-sm bg-white/40 rounded-xl
                                    h-full max-w-[${windowWidth}px]`}
                        style={appContainerStyle}>
                        <aside className={`sidebar 
                            ${activeMenu ? 'w-56 md:w-64' : 'w-0'}
                            ${activeMenu ? 'translate-x-0 border-r border-slate-200' : '-translate-x-[400px]'} 
                            transition-all duration-500 ease-in-out
                            mr-1 lg:bg-none h-full
                            ${windowWidth < 920 ? 'absolute top-0 left-0 z-50' : ''}
                            `}
                            style={{
                                backgroundImage: `linear-gradient(to right, ${currentColor}, ${currentSndColor})`,
                                filter: `brightness(110%)`
                              }}>
                            <Sidebar menuActive={activeMenu} setMenuActive={setActiveMenu} currentColor={currentColor}/>
                        </aside>
                        <main 
                        // style={{ 
                        //     maxWidth: activeMenu
                        //         ? `${window.innerWidth - parseFloat(getComputedStyle(document.documentElement).fontSize) * 18}px`
                        //         : `${window.innerWidth}px`
                        // }}
                        >
                            <div className="bg-transparent dark:bg-main-dark-bg">
                                <Navbar className='z-30' currentColor={currentColor} currentSndColor={currentSndColor} setMenuActive={setActiveMenu}/>
                            </div>
                            <div className={`bg-main-bg dark:bg-main-dark-bg rounded-2xl m-2 overflow-auto`}>
                                {themeSettings && <ThemeSetting />}
                                <Suspense fallback={<LoadingFallback />}>
                                    <Routes>
                                        {/* dashboard  */}
                                        <Route path="/" element={<Ecommerce />} />
                                        <Route path="/ecommerce" element={<Ecommerce />} />
                                        {/*pages */}
                                        <Route path="/teams" element={<Employees />} />
                                        <Route path="/overview" element={<ConnectedDataGrid />} />
                                        <Route path="/projects" element={<Orders />} />
                                        <Route path="/customers" element={<Customer />} />
                                        <Route path="/editor" element={<Editor />} />
                                        {/*apps*/}
                                        <Route path="/calendar" element={<Calendars />} />
                                        {/* <Route path="/color-picker" element={<ColorPicker />} /> */}
                                    </Routes>
                                </Suspense>
                            </div>
                        </main>
                        <footer className="h-10 flex items-center justify-center font-bold text-slate-400">
                            &lt;&lt;<span>&copy;MichelleYeh</span>&gt;&gt;
                        </footer>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
