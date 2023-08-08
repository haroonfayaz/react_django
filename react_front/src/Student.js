import axios from 'axios';
import {useState,useEffect} from 'react';
import React from 'react';


function Student() {
  const [students,setStudents]=useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');

  const handleSaveChanges = async () => {
    if (newStudentName && newStudentEmail) {
      try {
        const response = await axios.post('http://localhost:8000/students', {
          name: newStudentName,
          email: newStudentEmail
        });
  
        // Update the local state with the newly added student
        setStudents([...students, response.data]);
  
        // Clear the input fields after saving
        setNewStudentName('');
        setNewStudentEmail('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(()=>{
    async function getAllStudents(){
      try {
        const students = await axios.get("http://localhost:8000/students")
        setStudents(students.data)
                
      } catch (error) {
        console.log(error)
      }
    }
    getAllStudents()
  },[])
  return (
    <>
    <div className="container ">
    <div className="row">
    <div className="col-6">
    <h2 className='heading_table'>Students</h2>
    <div className="mod">
        {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary mod" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Student
            </button>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Enter Student Name </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter student name"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}

                />
                    <input type="email" 
                    className="form-control" 
                    placeholder="Enter student email"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                  

                />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveChanges} data-bs-dismiss="modal">Save </button>
                </div>
                </div>
            </div>
            </div>
                  <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                </tr>
                </thead>
                    <tbody>
                    {students.map((student,i)=>{
                        return(
                    <tr key={i}>
                      <th scope="row">{student.id}</th>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                    </tr>)
                    })}
            </tbody>
        </table>
        </div>
        </div>
        </div>
    </>
     );
}

export default Student;