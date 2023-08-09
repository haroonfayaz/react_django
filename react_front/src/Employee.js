import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';  


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
    // console.log(id)
    await axios.delete(`http://localhost:8000/employee/${id}`)
    getAllEmployees();
    
  }

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
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            
            
    
      <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Serial</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Joining Date</th>
                <th scope="col">Actions</th>


                </tr>
                </thead>
                    <tbody>
                    {employees.map((employee,i)=>{
                        return(
                    <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td>{employee.EmployeeId}</td>
                      <td>{employee.EmployeeName}</td>
                      <td>{employee.DepartmentName}</td>
                      <td>{employee.DateOfJoining}</td>
                      <td>
                      <button className='btn btn-success me-3'>Edit</button>
                      <button className='btn btn-danger' onClick={()=>{deleteEmployee(employee.EmployeeId)}}>Delete</button>
                      </td>
                    </tr>)
                    })}
            </tbody>
        </table>
        </div>
        </div>
        </div>
    </>
  )
};

export default Employee;
