import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';


const Employee = () => {
  const [employees,setEmployees]=useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeDept, setNewEmployeeDept] = useState('');
  const [newEmployeeJoiningDate, setNewEmployeeJoiningDate] = useState('');


  const handleSaveForm = async () => {
    if (newEmployeeName && newEmployeeDept && newEmployeeJoiningDate) {
      try {
        const response = await axios.post('http://localhost:8000/employee', {
          name: newEmployeeName,
          dept: newEmployeeDept,
          joining_date: newEmployeeJoiningDate,
        });

        setEmployees([...employees, response.data]);

        // Clear input fields after saving
        setNewEmployeeName('');
        setNewEmployeeDept('');
        setNewEmployeeJoiningDate('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(()=>{
    async function getAllEmployees(){
      const employees = await axios.get("http://localhost:8000/employee")
      try {
        setEmployees(employees.data)

        
      } catch (error) {
        console.log(error)
        
      }
    }
    getAllEmployees();
  },[])

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
                 <input type="text" 
                    className="form-control" 
                    placeholder="Enter department name"
                    value={newEmployeeDept}
                    onChange={(e) => setNewEmployeeDept(e.target.value)} 

                />
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
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Joining Date</th>

                </tr>
                </thead>
                    <tbody>
                    {employees.map((employee,i)=>{
                        return(
                    <tr key={i}>
                      <th scope="row">{employee.EmployeeId}</th>
                      <td>{employee.EmployeeName}</td>
                      <td>{employee.DepartmentName}</td>
                      <td>{employee.DateOfJoining}</td>

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