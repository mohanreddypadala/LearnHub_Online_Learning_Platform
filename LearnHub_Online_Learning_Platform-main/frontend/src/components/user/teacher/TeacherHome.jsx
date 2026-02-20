import { NavLink, Routes, Route } from "react-router-dom";
import AddCourse from "./AddCourse";
import AllCourses from "./AllCourses";

function TeacherHome() {
  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="container pt-5">
        <div className="d-flex align-items-center mb-4">
          <div className="bg-primary text-white p-3 rounded-3 me-3">
             <i className="bi bi-person-workspace fs-3"></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0">Instructor Dashboard</h2>
            <p className="text-muted">Manage your curriculum and student reach</p>
          </div>
        </div>

        <ul className="nav nav-tabs mb-5">
          <li className="nav-item">
            <NavLink end to="/teacher" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <i className="bi bi-grid-3x3-gap me-2"></i> All Courses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teacher/add-course" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <i className="bi bi-plus-circle me-2"></i> Create New Course
            </NavLink>
          </li>
        </ul>

        <div className="animate__animated animate__fadeIn">
          <Routes>
            <Route path="/" element={<AllCourses />} />
            <Route path="/add-course" element={<AddCourse />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;

