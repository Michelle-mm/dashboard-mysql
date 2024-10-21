import React, {useState, useEffect, useCallback, useMemo} from 'react'

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Tooltip, styled } from '@mui/material';

import { Header, AddEvent } from '../components';
import {useStateContext} from "../contexts/ContextProvider";

import { MdDeleteSweep, MdOutlineDeleteForever } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";


export const Calendars = () => {
  const [reminders, setReminders] = useState(() => JSON.parse(localStorage.getItem("reminders")) || []);
  const [textArea, setTextArea] = useState('');
  const [value, setValue] = useState(dayjs());
  const { currentColor, isClicked, handleClick, windowWidth } = useStateContext();
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const updateReminder = useCallback(() => {
    const textTitle = textArea.split("\n")[0];
    const dateFormat = dayjs(value).format();
    const newReminder = {
      id: dateFormat,
      selectedDate: dayjs(value).format('YYYY/MM/DD'),
      title: textTitle,
      body: textArea,
      expand: false
    };
    setReminders(prevReminder => [...prevReminder, newReminder]);
    setTextArea('');
    setValue(dayjs());
    handleClick("addEventWindow");
  }, [textArea, value, handleClick]);

  const deleteReminder = useCallback((event, id) => {
    event.stopPropagation();
    setReminders(oldReminders => oldReminders.filter(oldReminder => oldReminder.id !== id));
  }, []);

  const cleanupLocalStorage = useCallback(() => {
    localStorage.clear();
    setReminders([]);
  }, []);

  const filterTodayReminder = useMemo(() => 
    reminders.filter((reminder) => reminder.selectedDate === dayjs(value).format('YYYY/MM/DD')),
    [reminders, value]
  );
  return (
    <div className="relative m-4 md:m-5 lg:m-8 p-2 md:p-5 lg:p-8 min-w-fit ">
      <div className="flex flex-col items-center border-2 rounded-xl md:flex-row" 
           style={{borderColor: currentColor}}>
        <div className="p-2 lg:pr-4 m-2 lg:mr-4 min-h-80 flex flex-col items-center md:border-r-1" style={{borderColor: currentColor}}>
          <Header category="Page" title="Calendar" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
              <DemoItem>
                <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} 
                  sx={{
                      width: `${windowWidth>900 || windowWidth<620? `300px`: '400px'}`,
                      height: `auto`,
                      }} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        {/* reminders */}
        <div className="m-3 w-11/12 grow flex flex-col gap-4 min-h-72 md:self-start">
          <div className="border-b-1 border-slate-300">
            <h2 className="m-2 text-2xl font-bold" style={{color: currentColor}}>
              {dayjs(value).format('LL')}
            </h2>
            <h2 className="m-2 text-xl font-bold" style={{color: currentColor}}>
              Todo: 
            </h2>
            {filterTodayReminder.length > 0 ? (
              <TodayReminder todayReminders={filterTodayReminder} currentColor={currentColor}/>
            ) : (
              <p className="m-3 text-xl text-slate-400 font-semibold">No arrangements today</p>
            )}            
          </div>
          <div className="flex flex-col p-3 w-full">
            <div className="flex items-center">
                <h3 className="text-xl font-semibold mr-3">Reminders:</h3>
                <Tooltip title='Add Reminder'>
                  <button className="w-10 h-10 pl-2 text-2xl font-bold rounded-xl hover:drop-shadow-xl" 
                          style={{backgroundColor: currentColor, color: 'white', opacity: 0.7}}
                          onClick={() => handleClick('addEventWindow')}>
                    <IoIosAdd/>
                  </button>
                </Tooltip>
                <Tooltip title="CleanUp all Reminders" arrow>
                  <button className="h-10 w-10 ml-2 text-white text-2xl pl-2 bg-gray-100 rounded-xl 
                                    hover:drop-shadow-xl hover:bg-gray-200" 
                          onClick={cleanupLocalStorage}>
                    <MdDeleteSweep style={{color: currentColor}}/>
                  </button>
                </Tooltip>
              </div>
              <div className="flex flex-wrap gap-2">
                {reminders.length>0 && reminders.map((reminder, index) => (
                  <div key={reminder.id} 
                        className={`grow-0 w-14 h-14 md:w-16 md:h-16 hover:grow hover:w-24 hover:h-auto overflow-hidden cursor-pointer
                        transition-all duration-300 ease-in-out border border-solid rounded-xl
                        flex gap-2 items-center text-center m-1 mt-4 px-2 py-3 font-semibold text-base md:text-lg`}
                      style={{
                        backgroundColor: index % 2 === 0 ? currentColor : 'white',
                        color: index % 2 === 0 ? 'white' : currentColor,
                        borderColor: index % 2 === 0 ? "transparent" : currentColor,
                      }}>
                        <CustomTooltip
                          title={
                            <div>
                              <p style={{ whiteSpace: 'pre-wrap', marginBottom: '8px' }}>{reminder.body}</p>
                              <p style={{ fontSize: '12px', color: 'gray' }}>
                                Created: {dayjs(reminder.id).format("YYYY-MM-DD")}
                              </p>
                            </div>
                          }
                          currentColor={currentColor}
                          margintop={10}
                          placement="bottom"
                          arrow
                        >
                    <button>
                      <>
                        <p className="whitespace-nowrap overflow-hidden">{dayjs(reminder.selectedDate).format('MM/DD YYYY')} <strong>{reminder.title}: </strong> </p>
                      </>
                    </button>
                    </CustomTooltip>
                    <Tooltip title="Delete this Reminder " arrow>
                      <button className="h-7 flex justify-center items-center p-1 rounded bg-red-300 hover:bg-red-400 text-white font-bold"
                              onClick={(event) => deleteReminder(event, reminder.id)}>
                        <MdOutlineDeleteForever/>
                      </button>
                    </Tooltip>
                  </div>
                ))}
              </div>
              {isClicked.addEventWindow && <AddEvent setTextArea={setTextArea} updateReminder={updateReminder}/>}
            </div>  
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = styled(({ className, currentColor, margintop, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} slotProps={{
    popper: {
      modifiers: [{name: 'offset', options: {offset: [0, margintop],},},],
    },
  }} />
  ))(({ theme, currentColor }) => ({
    '& .MuiTooltip-tooltip': {
      backgroundColor: '#f2f4fd',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 14,
      border: `1px solid ${currentColor}`,
      maxWidth: 420,
      padding: '12px',
    },
    '& .MuiTooltip-arrow': {
      color: `${currentColor}`,
    },
}));
export const TodayReminder = ({todayReminders, handleReminderBtnClick, currentColor}) => {
  return (
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-3 mb-1">
          { todayReminders.map((eachReminder, index)=>(
            <CustomTooltip
              key={index}
              title={
                <div>
                  <p style={{ whiteSpace: 'pre-wrap', marginBottom: '8px' }}>{eachReminder.body}</p>
                  <p style={{ fontSize: '12px', color: 'gray' }}>
                    Created: {dayjs(eachReminder.id).format("YYYY-MM-DD")}
                  </p>
                </div>
              }
              currentColor={currentColor}
              margintop={-2}
              placement="bottom"
              arrow
            >
              <div className="flex justify-between m-1 p-3 font-semibold border-1 rounded-xl"
                  style={{backgroundColor: index%2===0? currentColor :'white',
                  color: index%2===0? 'white' : currentColor,
                  borderColor: index%2===0? "transparent": currentColor}}>
                  <button className="w-full"
                          onClick={()=>handleReminderBtnClick(eachReminder.id)}>
                      <strong>{eachReminder.title} </strong>
                  </button>
              </div>
            </CustomTooltip>
              ))
          }
      </div>
  )
}
