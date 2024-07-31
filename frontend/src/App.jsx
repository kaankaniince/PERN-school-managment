import {useState} from 'react'
import './App.css'
import Home from "./components/Home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Student from "./components/LoginForm/student.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/student" element={<Student/>}/>
        </Routes>
    )
}

export default App
