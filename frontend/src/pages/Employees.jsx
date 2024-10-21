// import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Search, Inject } from '@syncfusion/ej2-react-grids';
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
import {ProjectForm} from "../forms/ProjectForm";
import {TeamForm} from "../forms/TeamForm";
import {format} from 'date-fns';

export const Employees = () => {
  // const date = new Date();
  // const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const { currentColor } = useStateContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(
    { teamid: "", teamLead: "", teamMemNum: 1});
  const [teamData, setTeamData] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectFormData, setProjectFormData] = useState(
    { customerid: "", projectname: "", projectid: "", teamid: "", status: "Active", deadline: "", budget: 0, recentupdate: ""});

  const isMounted = useRef(true);

  const fetchTeamData = useCallback(async () => {
    if (!isMounted.current) return;
    try {
      // console.log("fetch team data");
      const response = await axios.get('http://localhost:3001/team');
      const resData = response.data;
      if (isMounted.current) {
        setTeamData(resData);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }, []);

  useEffect(() => {
    fetchTeamData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchTeamData]);

  const addTeamData = async (e) => {
    e.preventDefault();

    const teamData = {
      teamid: formData.teamid,
      teamleader: formData.teamLead,
      teammembernum: formData.teamMemNum,
    };
    try {
      await axios.post("http://localhost:3001/team", teamData);
      fetchTeamData();
      setShowForm(false);
    } catch (error) {
      alert(`Error adding customer data: ${<p>{error.response?.data || error.message}</p>}`);
      console.error("Error adding customer data: ", error.response?.data || error.message);
    }
  };
  const addProjectData = async(e)=>{
    e.preventDefault();
    const datenow = new Date();
    const currentTime = `${datenow.getFullYear()}-${datenow.getMonth()+1}-${datenow.getDate()} ${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()}`;
    const projectData = {
      projectid: projectFormData.projectid,
      projectname: projectFormData.projectname,
      customerid: projectFormData.customerid,
      teamid: projectFormData.teamid,
      deadline: projectFormData.deadline,
      status: projectFormData.status,
      budget: projectFormData.budget,
      recentupdate: currentTime,
      startdate: format(datenow, 'yyyy-MM-dd')
    };
    try {
      await axios.post("http://localhost:3001/project", projectData);
      setShowProjectForm(false);
      addTeamData(e);
    } catch (error) {
      alert(`Error adding project data: ${<p>{error.response?.data || error.message}</p>}`);
      console.error("Error adding project data: ", error.response?.data || error.message);
    }
  }

  const handleEditClick = useCallback((id) => () => {
    setRowModesModel(prevModel => ({ ...prevModel, [id]: { mode: GridRowModes.Edit } }));
  }, []);

  const processRowUpdate = async (newRow) => {
    if (!isMounted.current) return;
    const updatedRow = { ...newRow};
    
    const id = updatedRow.teamid;
    console.log("id", id);
    console.log("update team:", updatedRow);
    try {
      setTeamData(teamData.map((row) => (row.teamid === newRow.teamid ? updatedRow : row)));
      const response = await axios.put(`http://localhost:3001/team/${id}`, updatedRow);
      if(response.data.needProjectData){
        if(window.confirm("Create project data now?")){
          setShowProjectForm(true);
        } 
      }
      else if (response.status !== 200) {
        throw new Error("Fail to update team data");
      }
      
    } catch (error) {
      console.error('Error updating data:', error);
    }
    return updatedRow;
  };

  const handleSaveClick = useCallback((id) => async () => {
    if (!isMounted.current) return;
  
    // const updatedRow = teamData.find((data) => data.id === id);
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View },
    }));
  }, [teamData, isMounted]);

  const handleCancelClick = useCallback((id) => () => {
    setRowModesModel(prevModel => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  }, []);

  const handleDeleteClick = useCallback((id) => async () => {
    try {
      const deleteResponse = await axios.delete(`http://localhost:3001/team/${id}`);
      // console.log("delete response", deleteResponse.data);
      if (isMounted.current) {
        setTeamData((prevTeamData) => prevTeamData.filter(team => team.id !== id));
        setRowModesModel((prevModel) => ({
          ...prevModel,
          [id]: { mode: GridRowModes.View },
        }));
      }
    } catch (error) {
      console.log("Error occurred deleting the data", error);
    }
  }, []);

  const generateColumnHeader = useCallback(() => {
    if (teamData.length === 0) return [];

    const dynamicColumns = Object.keys(teamData[0]).map((key) => {
      return {
        field: key,
        headerName: key==="teammembernum"? "Team MemberNum": key.charAt(0).toUpperCase() + key.slice(1),
        width: key === "id"? 50: 150,
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
  }, [teamData, rowModesModel, handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick]);

  const columnsHeader = React.useMemo(() => generateColumnHeader(), [generateColumnHeader]);

  return (
    <div className="m-2 md:m-8 p-2 md:p-8 bg-white rounded-3xl relative">
      <Header category="Page" title="Work Team" />
      <button
        type="button"
        className="mb-10 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        style={{backgroundColor: currentColor}}
        onClick={() => setShowForm(true)}
      >
        Add New Team
      </button>

      {showForm && (
        <TeamForm
          setTeamFormData={setFormData}
          setShowTeamForm={setShowForm}
          handleTeamSubmit={addTeamData}
          formData={formData}
        />
      )}
      {showProjectForm && (
        <ProjectForm
          setProjectFormData={setProjectFormData}
          setShowForm={setShowProjectForm}
          addProjectData={addProjectData}
          formData={projectFormData}
        />
      )}

      <div className="w-full h-[400px] md:h-[500px]">
        <DataGrid
          rows={teamData}
          columns={columnsHeader}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          getRowId={(row) => row.teamid}
          processRowUpdate={processRowUpdate}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
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
// const AddTeamForm = React.memo(({ addTeamData, setFormData, setShowForm}) => {
//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   }, [setFormData]);

//   const scrollY =  window.scrollY;
//   return (
//     <form onSubmit={addTeamData} className={`customerForm max-w-md mx-auto p-6 pt-2 rounded-sm shadow-md absolute top-[${scrollY}px] z-20 bg-white`}>
//       <label htmlFor="teamid">Team ID:</label>
//       <input type="text" id="teamid" name="teamid" className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
//       <label htmlFor="teamLead">Team Leader:</label>
//       <input type="text" id="teamLead" name="teamLead" className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
//       <label htmlFor="teamMemNum">Team Member Number:</label>
//       <input type="number" id="teamMemNum" name="teamMemNum" className="block text-gray-700 text-sm font-bold mb-2" onChange={handleChange} />
//       <div className="flex items-center justify-between">
//         <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//           Submit
//         </button>
//         <button type="button" onClick={() => setShowForm(false)} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// });
