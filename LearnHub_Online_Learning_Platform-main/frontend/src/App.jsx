import { Routes, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";

import AdminHome from "./components/admin/AdminHome";
import TeacherHome from "./components/user/teacher/TeacherHome";
import StudentHome from "./components/user/student/StudentHome";
import CourseContent from "./components/user/student/CourseContent";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/teacher/*" element={<TeacherHome />} />
        <Route path="/student/*" element={<StudentHome />} />
        <Route path="/student/course/:id" element={<CourseContent />} />
      </Routes>
    </>
  );
}

export default App;
