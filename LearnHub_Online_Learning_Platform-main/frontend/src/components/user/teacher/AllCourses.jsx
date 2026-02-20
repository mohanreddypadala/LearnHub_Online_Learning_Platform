import { useEffect, useState } from "react";
import API from "../../common/AxiosInstance";

function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/admin/courses")
      .then((res) => setCourses(res.data))
      .catch(() => alert("Failed to load courses"));
  }, []);

  return (
    <div className="row g-4">
      {courses.map((course) => (
        <div className="col-md-6 col-lg-4" key={course._id}>
          <div className="card shadow-sm h-100 course-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="badge bg-soft-primary text-primary px-3 py-2" style={{backgroundColor: '#eef2ff'}}>
                  {course.C_categories}
                </span>
                <h4 className="fw-bold text-dark mb-0">₹{course.C_price}</h4>
              </div>
              <h5 className="card-title fw-bold">{course.C_title}</h5>
              <p className="card-text text-muted small mb-4">
                {course.C_description.substring(0, 100)}...
              </p>
            </div>
            <div className="card-footer bg-transparent border-top-0 p-4 pt-0">
               <button className="btn btn-outline-secondary btn-sm w-100">Edit Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}

export default AllCourses;
