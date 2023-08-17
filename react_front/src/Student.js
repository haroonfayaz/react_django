import axios from 'axios';
import {useState,useEffect} from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';


function Student() {
  const [students,setStudents]=useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const {id}=useParams();
  const [editingStudentId, setEditingStudentId] = useState(null); 

  const handleSaveChanges = async () => {
    if (newStudentName && newStudentEmail) {
      console.log(newStudentName,newStudentEmail)
      try {
        const response = await axios.post('http://localhost:8000/students/', {
          name: newStudentName,
          email: newStudentEmail
        });
  
        setStudents([...students, response.data]);
  
        setNewStudentName('');
        setNewStudentEmail('');
      } catch (error) {
        console.error(error);
      }
    }
  };
 const getAllStudents = async ()=>{
    try {
      const students = await axios.get("http://localhost:8000/students/")
      setStudents(students.data)
              
    } catch (error) {
      console.log(error)
    }
  }

  const deleteStudent = async (id)=>{
    await axios.delete(`http://localhost:8000/students/${id}`)
    getAllStudents();
  }

  useEffect(()=>{
    getAllStudents()
  },[])

  const editStudent =async(id)=>{
    console.log(id);
    setEditingStudentId(id); 
    console.log(setEditingStudentId);
    try {
      const response = await axios.put(`http://localhost:8000/students/${id}`, {
        name: newStudentName,
        email: newStudentEmail,
      });
      console.log(response.data)
      const updatedStudents = students.map(student => {
        if (student.id === id) {
          return {
            ...student,
            name: newStudentName,
            email: newStudentEmail,
          };
        }
        return student;
      });
  
      setStudents(updatedStudents);
      setNewStudentName('');
      setNewStudentEmail('');
      setEditingStudentId(null); 
    }
    catch (error) {
      console.error(error);
    }
  };

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
      field: 'email',
      headerName: 'Email',
      width: 160,
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
          onClick={() => editStudent(params.row.serial)} 
        >
          Edit
        </Button>
       
        <Button
          variant="outlined"
          color="primary"
          onClick={() => deleteStudent(params.row.serial)} 
        >
          Delete
        </Button>
        </div>
       
      ),
    },
  ];

  const rows= students.map((student,i)=>({
    id:i+1,
    serial :student.id,
    name:student.name,
    email:student.email,
    

}));


  return (
    <>
    <div className="container ">
    <div className="row">
    <div className="col-6">
    <h2 className='heading_table'>Students</h2>
    <div className="mod">
        {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary mod" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setEditingStudentId(null)}}>
            Add Student
            </button>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      {editingStudentId ? 'Edit Student' : 'Add Student'}
                    </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter student name"
                      value={editingStudentId ? students.find(student => student.id === editingStudentId).name : newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                    />
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter student email"
                      value={editingStudentId ? students.find(student => student.id === editingStudentId).email : newStudentEmail}
                      onChange={(e) => setNewStudentEmail(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setEditingStudentId(null)}}>
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (editingStudentId) {
                          editStudent(editingStudentId); // Edit mode
                        } else {
                          handleSaveChanges(); // Add mode
                        }
                      }}
                      data-bs-dismiss="modal"
                    >
                      {editingStudentId ? 'Save Changes' : 'Save'}
                    </button>
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
     );
}

export default Student;
