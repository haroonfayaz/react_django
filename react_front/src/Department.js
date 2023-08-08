import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';
import Modal from './Modal';

const Department = () => {
  const[department,setDepartment]=useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  
  const handleSaveChanges = async () => {
    if (newDepartmentName) {
      const response = await axios.post('http://localhost:8000/department', {
        DepartmentName: newDepartmentName
      });

      setDepartment([...department, response.data]);
      setNewDepartmentName('');
    }
  };


  useEffect(()=>{
    async function getAllDepartments(){
      const department = await axios.get("http://localhost:8000/department")
      try {
        setDepartment(department.data)
      } catch (error) {
        console.log(error)
        
      }
    }
    getAllDepartments();
  },[])
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
      <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Department Name</th>
                </tr>
                </thead>
                    <tbody>
                    {department.map((value,i)=>{
                        return(
                    <tr key={i}>
                      <th scope="row">{value.DepartmentId}</th>
                      <td>{value.DepartmentName}</td>
                     

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

export default Department;
