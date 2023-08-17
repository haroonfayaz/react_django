import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';
import Modal from './Modal';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';


const Department = () => {
  const[department,setDepartment]=useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const {id} = useParams();
  
  const handleSaveChanges = async () => {
    if (newDepartmentName) {
      const response = await axios.post('http://localhost:8000/department', {
        DepartmentName: newDepartmentName
      });

      setDepartment([...department, response.data]);
      setNewDepartmentName('');
    }
  };
  
 const getAllDepartments = async()=>{
  try {
    const department = await axios.get("http://localhost:8000/department")
  
      setDepartment(department.data)
    } catch (error) {
      console.log(error)
      
    }
  }
  const deleteDepartment = async (id)=>{
    await axios.delete(`http://localhost:8000/department/${id}`)
    getAllDepartments();
  };


  useEffect(()=>{ 
    getAllDepartments();
  },[])

  const columns = [
    { field: 'id', headerName: 'ID', width: 95 },
    {
      field: 'serial',
      headerName: 'Serial',
      width: 125,
      editable: false,
    },
 
    {
      field: 'dept',
      headerName: 'Department Name',
      width: 190,
      editable: false,
    },
 
    {
      field: 'actions', // Field name for the button column
      headerName: 'Actions', // Column header text
      width: 190,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          variant="outlined"
          color="primary"
          // onClick={() => handleButtonClick(params.row.id)} // Handle button click
        >
          Edit
        </Button>
       
        <Button
          variant="outlined"
          color="primary"
          onClick={() => deleteDepartment(params.row.serial)} 
        >
          Delete
        </Button>
        </div>
       
      ),
    },
  ];

  const rows= department.map((value,i)=>({
    id:i+1,
    serial :value.DepartmentId,
    dept:value.DepartmentName,
   
    

}));
  return(
  <>
    <div className="container ">
    <div className="row">
    <div className="col-6">
    <h2 className='heading_table'>Departments</h2>
    <Modal
        newDepartmentName={newDepartmentName}
        setNewDepartmentName={setNewDepartmentName}
        onSave={handleSaveChanges}
      />
       <Box sx={{ height: 400, width: '60vw' }}>
          <DataGrid
           rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
              />
        </Box> 
        </div>
        </div>
        </div>
    </>
  )
};

export default Department;
