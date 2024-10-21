import React from 'react';
import {useStateContext} from '../contexts/ContextProvider';
export const Header = ({ category, title }) => {
  const {currentColor} = useStateContext();
  return (
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white "
        style={{color: currentColor}}>
      {title}
    </p>
  </div>
);}