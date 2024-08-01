import './App.css'
import Home from "./components/Home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Student from "./components/LoginForm/student/student.jsx";
import Teacher from "./components/LoginForm/teacher/teacher.jsx";
import Registration from "./components/RegisterForm/registration.jsx";
import SideBar from "./components/SideBar/sidebar.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/student" element={<Student/>}/>
            <Route path="/teacher" element={<Teacher/>}/>
            <Route path="/register" element={<Registration/>}/>
            <Route path="/sidebar" element={<SideBar/>}/>
        </Routes>
    )
}

export default App
