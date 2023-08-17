import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';  
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';



const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeDept, setNewEmployeeDept] = useState('');
  const [newEmployeeJoiningDate, setNewEmployeeJoiningDate] = useState('');
  const [departments, setDepartments] = useState([]);

  const {id}=useParams();


  const handleSaveForm = async () => {
    try {
      const selectedDepartment = departments.find(dep => dep.DepartmentName === newEmployeeDept);
      if (!selectedDepartment) {
        console.error('Selected department not found');
        return;
      }
 
        const response = await axios.post("http://localhost:8000/employee", {
          EmployeeName: newEmployeeName,
          Department: selectedDepartment.DepartmentId,
          DateOfJoining: newEmployeeJoiningDate,
        });
        console.log(response.data)

        setEmployees([...employees, response.data]);
        setNewEmployeeName('');
        setNewEmployeeDept('');
        setNewEmployeeJoiningDate('');
      } catch (error) {
        console.error(error);
      }
    }
 
 const  getAllEmployees= async()=> {
    try {
      const employeesResponse = await axios.get("http://localhost:8000/employee");
      const departmentsResponse = await axios.get("http://localhost:8000/department");
      setEmployees(employeesResponse.data);
      setDepartments(departmentsResponse.data);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(()=>{
      getAllEmployees();
  }, []);
  
  const deleteEmployee =  async(id)=>{
    console.log(id)
    await axios.delete(`http://localhost:8000/employee/${id}`)
    getAllEmployees();
    
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 25 },
    {
      field: 'serial',
      headerName: 'Serial',
      width: 25,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'dept',
      headerName: 'Department',
      type: 'number',
      width: 160,
      editable: false,
    },
    {
      field: 'joining_date',
      headerName: 'Date of Joining',
      width: 150,
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
          onClick={() => deleteEmployee(params.row.serial)} // Handle button click
        >
          Delete
        </Button>
        </div>
       
      ),
    },
  ];

  const rows= employees.map((employee,i)=>({
        id:i+1,
        serial :employee.EmployeeId,
        name:employee.EmployeeName,
        dept:employee.DepartmentName,
        joining_date:employee.DateOfJoining,
        

  }));

  return (
    <>
    <div className="container ">
    <div className="row">
    <div className="col-6">
    <h2 className='heading_table'>Employees</h2>
    
    <div className="mod">
        {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary mod" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Employee
            </button>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Enter Employee Name </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter Employee name"
                    value={newEmployeeName}
                    onChange={(e) => setNewEmployeeName(e.target.value)} 

                />
               <select
                      className="form-control"
                      value={newEmployeeDept}
                      onChange={(e) => setNewEmployeeDept(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dep) => (
                        <option key={dep.DepartmentId} value={dep.DepartmentName}>
                          {dep.DepartmentName}
                        </option>
                      ))}
                </select>

                 <input type="date" 
                    className="form-control" 
                    placeholder="Enter joining date"
                    value={newEmployeeJoiningDate}
                    onChange={(e) => setNewEmployeeJoiningDate(e.target.value)} 

                />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveForm} data-bs-dismiss="modal">Save </button>
                </div>
                </div>
            </div>
            </div>
            
            
    
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

export default Employee;
