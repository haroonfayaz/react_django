import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';
import Modal from './Modal';
import { useParams } from 'react-router-dom';

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
                <th scope="col">Serial</th>
                <th scope="col">Department Name</th>
                <th scope="col">Actions</th>

                </tr>
                </thead>
                    <tbody>
                    {department.map((value,i)=>{
                        return(
                    <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td>{value.DepartmentId}</td>
                      <td>{value.DepartmentName}</td>
                      <td>
                      <button className='btn btn-success me-3'>Edit</button>
                      <button className='btn btn-danger' onClick={()=>{deleteDepartment(value.DepartmentId)}}>Delete</button>
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

export default Department;
