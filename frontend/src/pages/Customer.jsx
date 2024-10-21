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
import {CustomerForm} from "../forms/CustomerForm";

export const Customer = () => {
  const { currentColor } = useStateContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ customerid: "", customerImg: "avatar.jpg", customername: "", phone: "", email: "" });
  const [customers, setCustomers] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const isMounted = useRef(true);

  const fetchCustomers = useCallback(async () => {
    if (!isMounted.current) return;
    try {
      const response = await axios.get('http://localhost:3001/customers');
      const resData = response.data;
      if (isMounted.current) {
        setCustomers(resData);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
    return () => {
      isMounted.current = false;
    };
  }, [fetchCustomers]);

  const addCustomerData = async (e) => {
    e.preventDefault();
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!formData.email.match(validRegex)) {
      alert("Please enter a valid email");
      return;
    }
    const customerData = {
      customerid: formData.customerid,
      customerimg: formData.customerImg,
      customername: formData.customername,
      email: formData.email,
      phone: formData.phone
    };
    try {
      await axios.post("http://localhost:3001/customers", customerData);
      fetchCustomers();
      setShowForm(false);
    } catch (error) {
      alert(`Error adding customer data: ${<p>{error.response?.data || error.message}</p>}`);
      console.error("Error adding customer data: ", error.response?.data || error.message);
    }
  };

  const handleEditClick = useCallback((id) => () => {
    console.log("id", id);
    setRowModesModel(prevModel => ({ ...prevModel, [id]: { mode: GridRowModes.Edit } }));
  }, []);

  const processRowUpdate = async (newRow) => {
    if (!isMounted.current) return;
    const updatedRow = { ...newRow};
    console.log("update row", updatedRow);
    const id = updatedRow.id;
    try {
      setCustomers(customers.map((row) => (row.customerid === newRow.customerid ? updatedRow : row)));
      // setCustomers((prevCustomers) =>
      //   prevCustomers.map((row) => (row.id === id ? { ...row, ...updatedCustomer } : row))// );
      const response = await axios.put(`http://localhost:3001/customers/${id}`, updatedRow);
      if (response.status !== 200) {
        throw new Error('Failed to update project'); 
      }
      console.log('customer updated successfully');
      return updatedRow;
    } catch (error) {
      setCustomers(prevData => prevData.map((row) => 
        row.customerid === newRow.customerid ? newRow : row
      ));
      console.log('Failed to update customer');
      return newRow;
    } finally{
      console.log("finally");
    }
  };

  const handleSaveClick = useCallback((id) => async () => {
    console.log("saved id", id);
    if (!isMounted.current) return;
    setRowModesModel((prevModel) => ({...prevModel, [id]: { mode: GridRowModes.View },}));
  }, [customers, isMounted]);

  const handleCancelClick = useCallback((id) => () => {
    setRowModesModel(prevModel => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  }, []);

  const handleDeleteClick = useCallback((id) => async () => {
    console.log("delete", id);
    try {
      const deleteResponse = await axios.delete(`http://localhost:3001/customers/${id}`);
      console.log("delete response", deleteResponse.data);
      if (isMounted.current) {
        // Remove the deleted customer from the state
        setCustomers((prevCustomers) => prevCustomers.filter(customer => customer.id !== id));
        setRowModesModel((prevModel) => ({
          ...prevModel,
          [id]: { mode: GridRowModes.View },
        }));
      }
    } catch (error) {
      console.log("Error occurred deleting the data", error);
      // Handle the error (e.g., show an error message to the user)
    }
  }, []);

  const generateDynamicColumns = useCallback(() => {
    if (customers.length === 0) return [];

    const dynamicColumns = Object.keys(customers[0]).map((key) => {
      if (key === "customerimg") {
        return {
          field: key,
          headerName: 'Image',
          width: 80,
          renderCell: (params) => (
            <img
              src={`${process.env.PUBLIC_URL}/imgs/${params.value}`}
              alt={`Customer ${params.row.id}`}
              style={{ width: '37px', height: '37px', borderRadius: '50%'}}
            />
          ),
          editable: false,
        };
      } else return {
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: key === "id"? 50: key==="weeks" || key==="budget"? 80 : key==="email"? 180: 150,
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
  }, [customers, rowModesModel, handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick]);

  const columnsHeader = React.useMemo(() => generateDynamicColumns(), [generateDynamicColumns]);


  return (
    <div className="m-2 md:m-8 p-2 md:p-8 bg-white rounded-3xl relative">
      <Header category="Page" title="Customers" />
      <button
        type="button"
        className="mb-10 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        style={{backgroundColor: currentColor}}
        onClick={() => setShowForm(true)}
      >
        Add New Customer
      </button>
      {showForm && (
        <CustomerForm
          customerFormData={formData}
          setCustomerFormData={setFormData}
          setShowCustomerForm={setShowForm}
          currentColor={currentColor}
          addCustomerData={addCustomerData}
        />
      )}
      <div className="w-full h-[400px] md:h-[500px]">
        <DataGrid
          rows={customers}
          columns={columnsHeader}
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          getRowId={(row)=>(row.id)}
          editMode="row"
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
