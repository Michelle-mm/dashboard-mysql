import React, {useState, useEffect, useMemo} from 'react';
// import { BsCurrencyDollar } from 'react-icons/bs';
import {GoDotFill } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import axios from 'axios';
import {format} from 'date-fns';
import { Stacked, Button, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import {TodayReminder} from './Calendars';
import dayjs from 'dayjs';

export const Ecommerce = () => {
  // const currentMonth = new Date().getMonth + 1;
  const { currentColor, currentMode, windowWidth } = useStateContext();
  // const [fetchedData, setFetchedData] = useState([]);
  const [fetchedTeamData, setFetchedTeamData] = useState([]);
  const [fetchedCustomerData, setFetchedCustomerData] = useState([]);
  const [activeProjectData, setActiveProjectData] = useState([]);
  const [reminders, setReminders] = useState(() => JSON.parse(localStorage.getItem("reminders")) || []);
  const filterTodayReminder = useMemo(() => 
    reminders.filter((reminder) => reminder.selectedDate === dayjs().format('YYYY/MM/DD')),
    [reminders]
  );
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const [projectRes, customerRes, teamRes] = await Promise.all([
          axios.get("http://localhost:3001/project"),
          axios.get("http://localhost:3001/customers"),
          axios.get("http://localhost:3001/team")
        ]);
        // const projectresponse = await axios.get("http://localhost:3001/project");
        // const customerResponse = await axios.get("http://localhost:3001/customers");
        // setFetch(projectRes.data);
        setFetchedCustomerData(customerRes.data);
        setFetchedTeamData(teamRes.data);
        
        filterProjectData(projectRes.data);
        // filterProjectData();
      } catch(error){
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  function filterProjectData(projectdata){
    console.log("filter:", projectdata);
    const activeProjects = projectdata
        .filter((data) => data.status === "Active" || data.project_status === "Active")
        .map((data) => ({
          projectID: data.projectid,
          customerID: data.customerid,
          teamID: data.teamid,
          deadline: data.deadline
    }));
    setActiveProjectData(activeProjects);
  }
  return (
    <div className="mt-8 flex flex-col gap-4 overflow-auto">
      <div className={`m-3 flex  flex-col md_sm:flex-row justify-center items-center md:h-96`}>
        <div className="basis-7/12 w-11/12 p-4 md:p-8 md:pt-9 mx-3 bg-white shadow-md dark:text-gray-200 dark:bg-secondary-dark-bg md:h-9/10 rounded-xl">
          <div className="overflow-auto">
            <p className="text-2xl md:text-3xl font-bold mb-3" style={{color: currentColor}}>Active Projects:</p>
            <table className="table-fixed border-spacing-3 w-full min-w-80 min-h-48 text-sm lg:text-base overflow-auto">
              <thead className="border-b-1 border-slate-400">
                <tr className="mt-1">
                  <th scope="col"><strong>ProjectID</strong></th>
                  <th scope="col"><strong>CustomerID</strong></th>
                  <th scope="col"><strong>TeamID</strong></th>
                  <th scope="col"><strong>Deadline</strong></th>
                </tr>
              </thead>
              <tbody>
                {activeProjectData.length>0 && activeProjectData.map((eachData, index)=>(
                  <tr key={index} className="border-b-1 border-slate-300">
                    <td className="text-center p-2">{eachData.projectID}</td>
                    <td className="text-center p-2">{eachData.customerID}</td>
                    <td className="text-center p-2">{eachData.teamID}</td>
                    <td className="text-center p-2">{format(eachData.deadline, "yyyy-MM-dd")}</td>
                  </tr>
                  ))
                }
              </tbody>
              {activeProjectData.length===0 && <p className="m-4 whitespace-nowrap text-slate-400 font-bold">No Active Project...</p> }
            </table>
          </div>
        </div>
        {/* four blocks */}
        <div className={`basis-5/12 w-11/12 m-3 grid grid-cols-4 gap-3 md_sm:grid-cols-2 md_sm:gap-2.5`}>
          {earningData.map((item) => (
            <div key={item.title} className="relative p-5 pt-6 md_sm:p-4 md_sm:pt-9 min-w-10 md_sm:min-w-20 bg-white shadow-md dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-lg md_sm:text-2xl opacity-0.9 rounded-full p-2 md:p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="md:mt-3 absolute right-2 top-[40%] xs:static min-w-7">
                <span className="text-base md:text-lg font-semibold">
                  {item.title==="Customers"? fetchedCustomerData.length: item.title==="Sales"? fetchedTeamData.length: item.percentage}
                </span>
                {/* <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.title==="Customers"? '': item.percentage}
                </span> */}
              </p>
              <p className="text-xs md:text-sm text-gray-400 mt-2 -ml-2 xs:ml-0">{item.title==="Sales"? "Projects": item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-3 p-2 lg:ml-6">
        <p className="font-bold text-md lg:text-lg my-2" style={{color: currentColor}}>Today Arranments:</p>
        {filterTodayReminder.length > 0 ? (
                <TodayReminder todayReminders={filterTodayReminder} currentColor={currentColor}/>
              ) : (
                <p className="m-3 text-xl text-slate-400 font-semibold">No arrangements today</p>
              )}  
      </div>
       {/* 表格 */}
      <div className="flex gap-3 lg:gap-5 flex-wrap justify-center m-2">
        <div className="bg-slate-100 dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-6 rounded-2xl w-full shadow-md">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span><GoDotFill/></span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span><GoDotFill/></span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className={`mt-8 p-4 flex gap-4 justify-center items-center flex-col lg:flex-row lg:flex-nowrap rounded-2xl md:shadow-cus2`}>
            <div className="w-full grow basis-1/2 p-5 lg:p-3 my-4 shadow-cus2 md:shadow-none rounded-md md:border-r-1 border-color">
              <div>
                <p>
                  <span className="text-2xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-5">
                <p className="text-2xl font-semibold">$48,487</p>
                <p className="text-gray-500 mt-1">Expense</p>
              </div>

              <div className="mt-4 -ml-5">
                <SparkLine currentColor={currentColor} id="line-sparkLine" height={200} width={windowWidth>1028? 310: windowWidth>576? 400: 380} color={currentColor} />
              </div>
              <div className="mt-4">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div className="w-full grow basis-1/2 p-3 my-4 shadow-cus2 md:shadow-none rounded-md lg:-mr-3 ">
              <Stacked currentMode={currentMode} currentColor={currentColor} width={windowWidth>1028? 310: windowWidth>576? 400: 380} height={350} />
            </div>
          </div>
        </div> 
        {/* 表格end */}
      </div>
          {/* Earning */}
      <div className={`flex justify-center items-center md:h-80`}> 
        <div className="rounded-2xl w-11/12 md:w-400 p-4 m-5 md:m-3 shadow-cus min-h-fit md:h-full"style={{ backgroundColor: currentColor }}>
          <div className="flex justify-between items-center ">
            <p className="font-semibold text-white text-2xl">Earnings</p>
            <div>
              <p className="text-2xl text-white font-semibold mt-5">$63,448.78</p>
              <p className="text-gray-200">Monthly revenue</p>
            </div>
          </div>
          <div className="mt-2">
            <SparkLine currentColor={currentColor} id="column-sparkLine" height={200} type="Column" width={350} color="rgb(242, 252, 253)" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 place-content-center my-5 mx-3">
          {/* After yearly sale */}
          <div className="flex gap-10 m-3 flex-wrap justify-center overflow-hidden shadow-md rounded-2xl">
            <div className="bg-white w-full dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
              <div className="mt-8 ">
                {recentTransactions.map((item) => (
                  <div key={item.title} className="flex justify-between mt-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        style={{
                          color: item.iconColor,
                          backgroundColor: item.iconBg,
                        }}
                        className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                      >
                        {item.icon}
                      </button>
                      <div>
                        <p className="text-md font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                    <p className={`text-${item.pcColor}`}>{item.amount}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                <div className="mt-3">
                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Add"
                        borderRadius="10px"
                    />
                    </div>
                <p className="text-gray-400 text-sm">36 Recent Transactions</p>
              </div>
            </div>
          </div>
          {/* Weekly stats */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 shadow-md">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Weekly Stats</p>
              <button type="button" className="text-xl font-semibold text-gray-500">
                <IoIosMore />
              </button>
            </div>

            <div className="mt-10 ">
              {weeklyStats.map((item) => (
                <div key={item.title} className="flex justify-between mt-4 w-full">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      style={{ background: item.iconBg }}
                      className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                    >
                      {item.icon}
                    </button>
                    <div>
                      <p className="text-md font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>

                  <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
              ))}
              <div className="mt-4">
                <SparkLine currentColor={currentColor} id="area-sparkLine" height={160} width={320} color="rgb(242, 252, 253)" />
              </div>
            </div>

          </div>
          {/* medicalPro */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 shadow-md">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">MedicalPro Branding</p>
              <button type="button" className="text-xl font-semibold text-gray-400">
                <IoIosMore />
              </button>
            </div>
            <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
              16 APR, 2021
            </p>

            <div className="flex gap-4 border-b-1 border-color mt-6">
              {medicalproBranding.data.map((item) => (
                <div key={item.title} className="border-r-1 border-color pr-4 pb-2">
                  <p className="text-xs text-gray-400">{item.title}</p>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="border-b-1 border-color pb-4 mt-2">
              <p className="text-md font-semibold mb-2">Teams</p>

              <div className="flex gap-4">
                {medicalproBranding.teams.map((item) => (
                  <p
                    key={item.name}
                    style={{ background: item.color }}
                    className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-md font-semibold mb-2">Leaders</p>
              <div className="flex gap-4">
                {medicalproBranding.leaders.map((item, index) => (
                  <img key={index} className="rounded-full w-8 h-8" loading="lazy" src={item.image} alt="" />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Add"
                  borderRadius="10px"
                />
              </div>

              <p className="text-gray-400 text-sm">36 Recent Transactions</p>
            </div>
          </div>
          {/* Daily activity */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 shadow-md">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Daily Activities</p>
              <button type="button" className="text-xl font-semibold text-gray-500">
                <IoIosMore />
              </button>
            </div>
            <div className="mt-10">
              <img className="md:w-96 h-50 "
                src={product9} alt="" loading="lazy"/>
              <div className="mt-8">
                <p className="font-semibold text-lg">React 18 coming soon!</p>
                <p className="text-gray-400 ">By Johnathan Doe</p>
                <p className="mt-8 text-sm text-gray-400">
                  This will be the small description for the news you have shown
                  here. There could be some great info.
                </p>
                <div className="mt-3">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Read More"
                    borderRadius="10px"
                  />
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Ecommerce;

