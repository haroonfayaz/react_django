import './App.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import Table from './Table';


function App() {
  const [students,setStudents]=useState([]);
  useEffect(()=>{
    async function getAllStudents(){
      try {
        const students = await axios.get("http://localhost:8000/student")
        console.log(students.data)
        setStudents(students.data)
                
      } catch (error) {
        console.log(error)
      }
    }
    getAllStudents()
  },[])
  return (
    <div className="App">
    <h1>connect django and react</h1>
    {students.map((student,i)=>{
      return(
        <Table
          key={i}
          id ={student.id}
          name= {student.name}
          email ={student.email}
        />
      )
    })}
  
    </div>
  );
}

export default App;
