import {useState} from 'react'
import './App.css'
import Home from "./components/Home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Student from "./components/LoginForm/student.jsx";
import Teacher from "./components/LoginForm/teacher.jsx";
import Registration from "./components/RegisterForm/registration.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/student" element={<Student/>}/>
            <Route path="/teacher" element={<Teacher/>}/>
            <Route path="/register" element={<Registration/>}/>
        </Routes>
    )
}

export default App
