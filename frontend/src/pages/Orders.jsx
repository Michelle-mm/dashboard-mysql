import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { LuPencil, LuTrash2, LuSave  } from 'react-icons/lu';
import { MdOutlineCancel } from "react-icons/md";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {format, parseISO} from 'date-fns';
import {ProjectForm} from "../forms/ProjectForm";
import {CustomerForm} from "../forms/CustomerForm";
import {TeamForm} from "../forms/TeamForm";

export const Orders = () => {
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const { currentColor } = useStateContext();
  const [showForm, setShowForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [formData, setFormData] = useState(
    { customerid: "", projectname: "", projectid: "", teamid: "", budget: "", deposit: "", status: "Active", deadline: "", recentupdate: today, startdate: today});
  const [projectsData, setProjectsData] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [customerFormData, setCustomerFormData] = useState(
    { customerImg: "avatar.jpg", customername: "", customerid: "", email: "", phone: "" });
  const [teamFormData, setTeamFormData] = useState(
    { teamid: "", teamLeader: "", teamMemNum: 1});

  const isMounted = useRef(true);

  const fetchprojects = useCallback(async () => {
    if (!isMounted.current) return;
    try {
      const response = await axios.get('http://localhost:3001/project');
      const resData = response.data;
      console.log("fetch project data", resData);
      if (isMounted.current) {
        setProjectsData(resData);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }, []);

  useEffect(() => {
    fetchprojects();
    return () => {
      isMounted.current = false;
    };
  }, [fetchprojects]);
  const addProjectData = async (e) => {
    e.preventDefault();
    const datenow = new Date();
    const currentTime = `${datenow.getFullYear()}-${datenow.getMonth()+1}-${datenow.getDate()} ${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()}`;
    
    const projectData = {
      projectid: formData.projectid,
      projectname: formData.projectname,
      customerid: formData.customerid,
      teamid: formData.teamid,
      teamleader: formData.teamLead,
      teammembernum: formData.teamMemNum,
      deadline: formData.deadline,
      status: formData.status,
      recentupdate: currentTime,
      startdate: formData.startdate
    };
    // try {
    //   await axios.post("http://localhost:3001/project", projectData);
    //   fetchprojects();
    //   setShowForm(false);
    // } catch (error) {
    //   alert(`Error adding customer data: ${<p>{error.response?.data || error.message}</p>}`);
    //   console.error("Error adding customer data: ", error.response?.data || error.message);
    // }
    try {
      const projectResponse = await axios.post("http://localhost:3001/project", projectData);
      if(projectResponse.data.needCustomerData){
        setShowCustomerForm(true);
      } else if (projectResponse.data.needTeamData){
        setShowTeamForm(true);
      } else {
        console.log('Project Form submitted successfully');
        setProjectsData((prev)=>([...prev, projectData]));
        fetchprojects();
        setShowForm(false);
      }
    } catch (error) {
      alert(`Error adding data: ${error.response?.data || error.message}`);
      console.error("Error adding data: ", error.response?.data || error.message);
    }
  };
  const handleCustomerSubmit = async (e)=>{
    e.preventDefault();
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!customerFormData.email.match(validRegex)) {
      alert("Please enter a valid email");
      return;
    }
    const customerData = {
      customerimg: customerFormData.customerImg,
      customerid: formData.customerid,
      customername: customerFormData.customername,
      email: customerFormData.email,
      phone: customerFormData.phone
    };
    try{
      await axios.post("http://localhost:3001/customers", customerData);
      setShowCustomerForm(false);
      addProjectData(e)
    } catch(error){
      console.error("Error add cusomter data", error);
    }
  };

  const handleTeamSubmit= async (e)=>{
    e.preventDefault();
    const teamData = {
      teamid: formData.teamid,
      teamleader: teamFormData.teamLeader,
      teammembernum: teamFormData.teamMemNum
    };
    console.log("team", teamData);
    try{
      await axios.post("http://localhost:3001/team", teamData);
      setShowTeamForm(false);
      addProjectData(e)
    } catch(error){
      console.error("Error add team data", error);
    }
  }

  const handleEditClick = useCallback((id) => () => {
    setRowModesModel(prevModel => ({ ...prevModel, [id]: { mode: GridRowModes.Edit } }));
  }, []);
  const processRowUpdate = async (newRow) => {
    if (!isMounted.current) return;
  
    // Set loading state if needed
    // setIsLoading(true);
  
    const newDeadline = newRow['deadline'];
    const deadlineTime = format(newDeadline, "yyyy-MM-dd HH:mm:ss");
    const currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  
    const updatedRow = { 
      ...newRow,
      recentupdate: currentTime,
      deadline: deadlineTime
    };
  
    try {
      // Optimistically update UI
      setProjectsData(prevData => prevData.map((row) => row.projectid === newRow.projectid ? updatedRow : row));
      const response = await axios.put(`http://localhost:3001/projects/${updatedRow.projectid}`, updatedRow);
      if (response.status !== 200) {
        throw new Error('Failed to update project');
      }
      // Show success message
      // enqueueSnackbar('Project updated successfully', { variant: 'success' });
      console.log('Project updated successfully');
      return updatedRow;
    } catch (error) {
      console.error('Error updating data:', error);
      
      // Revert the optimistic update
      setProjectsData(prevData => prevData.map((row) => 
        row.projectid === newRow.projectid ? newRow : row
      ));
      
      // Show error message to user
      // enqueueSnackbar('Failed to update project', { variant: 'error' });
      console.log('Failed to update project');
      return newRow;
    } finally {
      // setIsLoading(false);
      console.log("finally");
    }
  };
  // const processRowUpdate = async (newRow) => {
  //   if (!isMounted.current) return;
  //   const newDeadline = newRow['deadline'];
  //   const deadlineTime = format(newDeadline, "yyyy-MM-dd HH:mm:ss");
  //   const datenow = new Date();
  //   const currentTime = `${datenow.getFullYear()}-${datenow.getMonth()+1}-${datenow.getDate()} ${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()}`;
  //   const updatedRow = { ...newRow};
  //   updatedRow.recentupdate = currentTime;
  //   updatedRow.deadline = deadlineTime;
  //   setProjectsData(projectsData.map((row) => (row.projectid === newRow.projectid ? updatedRow : row)));
  //   const id = updatedRow.projectid;
  //   console.log("id", id);
  //   try {
  //     const response = await axios.put(`http://localhost:3001/projects/${id}`, updatedRow);
  //     if (response.status === 200) {
  //       setProjectsData(projectsData.map((row) => (row.projectid === newRow.projectid ? updatedRow : row)));
  //     }
      
  //   } catch (error) {
  //     console.error('Error updating data:', error);
  //     // Handle error (e.g., show an error message to the user)
  //   }
  //   return updatedRow;
  // };
  const handleSaveClick = useCallback((id) => async () => {
    if (!isMounted.current) return;
    setRowModesModel((prevModel) => ({
          ...prevModel,
          [id]: { mode: GridRowModes.View },
        }));
  }, [projectsData, isMounted]);

  const handleCancelClick = useCallback((id) => () => {
    setRowModesModel(prevModel => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  }, []);

  const handleDeleteClick = useCallback((id) => async () => {
    console.log("delete projectid", id);
    try{
      await axios.delete(`http://localhost:3001/project/${id}`);
      setProjectsData((prevData) => prevData.filter((row) => row.id !== id));
    }
    catch(error){
      console.log("Error occur deleteing the data", error);
    }
  }, []);

  const generateColumnHeader = useCallback(() => {
    if (projectsData.length === 0) return [];
    const idCols = ["id", "projectid", "customerid", "teamid", "teammembernum"];
    const dynamicColumns = Object.keys(projectsData[0]).map((key) => {
      const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
          case 'active':
            return 'bg-green-100 text-green-800 border-green-200';
          case 'canceled':
            return 'bg-red-100 text-red-800 border-red-200';
          case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
          case 'completed':
            return 'bg-blue-100 text-blue-800 border-blue-200';
          default:
            return '';
        }
      };
      if(key === "status"){
        const statusColumn = {
          field: 'status',
          headerName: 'Status',
          width: 110,
          cellClassName: (params) => getStatusClass(params.value),
          renderCell: (params) => (
            <div className={`p-1 rounded-sm text-xs font-bold`}>
              <p className={`border-2 rounded-lg p-1 px-2  ${getStatusClass(params.value)}`}>{params.value}</p>
            </div>
          ),
        };
        return statusColumn;
      } else if (key==="deadline" || key==="recentupdate"){
        return {
          field: key,
          headerName: key==="recentupdate"?"Recent Update": "Deadline",
          width: 130,
          valueFormatter: (params) => {
            if (params) {
              try {
                if(parseISO(params)){
                  return format(parseISO(params), "yyyy-MM-dd");
                } else return format((params), "yyyy-MM-dd");
              } catch (error) {
                console.error('Error formatting date:', error);
                return (params); 
              }
            }
            return '';
          },
          type: key==="recentupdate"? 'text': 'date',
          editable: key==="recentupdate"? false:true,
        }
      }else return {
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: idCols.includes(key)? 80: 150,
        editable: key !== "id",
      };
    });
    dynamicColumns.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          console.log("getAction id", id);
          return [
            <GridActionsCellItem
              icon={<LuSave/>}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<MdOutlineCancel />}
              label="Cancel"
              className="textPrimary text-orange-400"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<LuPencil />}
            label="Edit"
            className="textPrimary text-slate-500"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<LuTrash2 />}
            label="Delete text-red-400"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    });

    return dynamicColumns;
  }, [projectsData, rowModesModel, handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick]);

  const columnsHeader = React.useMemo(() => generateColumnHeader(), [generateColumnHeader]);

  return (
    <div className="m-2 md:m-8 p-2 md:p-8 bg-white rounded-3xl relative">
      <Header category="Page" title="Projects" />
      <button
        type="button"
        className="mb-10 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        style={{backgroundColor: currentColor}}
        onClick={() => setShowForm(true)}
      >
        Add New Project
      </button>

      {showForm && (
        <ProjectForm
          formData={formData}
          setFormData={setFormData}
          setShowForm={setShowForm}
          addProjectData={addProjectData}
        />
      )}
      {showCustomerForm && (
        <CustomerForm 
          customerFormData={customerFormData} 
          setCustomerFormData={setCustomerFormData} 
          setShowCustomerForm={setShowCustomerForm}
          enteredCustomerid={formData.customerid}
          addCustomerData={handleCustomerSubmit}
        />
      )}
      {showTeamForm && (
        <TeamForm 
          setTeamFormData={setTeamFormData} 
          setShowTeamForm={setShowTeamForm}
          enteredTeamid={formData.teamid}
          handleTeamSubmit={handleTeamSubmit}
        />
      )}

      <div className="w-full h-[400px] md:h-[500px]">
        <DataGrid
          rows={projectsData}
          columns={columnsHeader}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          getRowId={(row)=>(row.projectid)}
          editMode="row"
          rowModesModel={rowModesModel}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          processRowUpdate={processRowUpdate}
          sx={{
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        />
      </div>
    </div>
  );
};