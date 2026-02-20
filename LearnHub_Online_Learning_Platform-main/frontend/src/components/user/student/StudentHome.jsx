// import { NavLink, Routes, Route } from "react-router-dom";
// import EnrolledCourses from "./EnrolledCourses";
// import AllCourses from "./AllCourses";

// function StudentHome() {
//   return (
//     <div className="container mt-4">
//       <h3>🎓 Student Dashboard</h3>

//       <ul className="nav nav-tabs mb-4">
//         <li className="nav-item">
//           {/* Use absolute path to prevent URL appending */}
//           <NavLink end to="/student" className="nav-link">
//             All Courses
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           {/* Use absolute path to prevent URL appending */}
//           <NavLink to="/student/enrolled" className="nav-link">
//             My Enrolled Courses
//           </NavLink>
//         </li>
//       </ul>

//       <Routes>
//         {/* Render AllCourses at the base student route */}
//         <Route index element={<AllCourses />} />
//         <Route path="enrolled" element={<EnrolledCourses />} />
//       </Routes>
//     </div>
//   );
// }

// export default StudentHome;


import { NavLink, Routes, Route } from "react-router-dom";
import EnrolledCourses from "./EnrolledCourses";
import AllCourses from "./AllCourses";

function StudentHome() {
  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
          <span className="fs-3">🎓</span>
        </div>
        <div>
          <h2 className="fw-bold mb-0 text-dark">Student Dashboard</h2>
          <p className="text-muted mb-0">Explore and manage your learning journey</p>
        </div>
      </div>

      <ul className="nav nav-pills mb-4 bg-white p-2 rounded-3 border d-inline-flex shadow-sm">
        <li className="nav-item">
          <NavLink end to="/student" className="nav-link">All Courses</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/student/enrolled" className="nav-link">My Learning</NavLink>
        </li>
      </ul>

      <div className="mt-2">
        <Routes>
          <Route index element={<AllCourses />} />
          <Route path="enrolled" element={<EnrolledCourses />} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentHome;