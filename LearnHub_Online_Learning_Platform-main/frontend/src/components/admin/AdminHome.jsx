import { useEffect, useState } from "react";
import API from "../common/AxiosInstance";

function AdminHome() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = () => {
    API.get("/admin/courses")
      .then((res) => setCourses(res.data))
      .catch(() => alert("Unauthorized"));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/course/${id}`);
      alert("Course deleted successfully");
      fetchCourses(); // refresh list
    } catch (error) {
      alert("Delete failed");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard - Courses</h2>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Course Title</th>
              <th>Educator</th>
              <th>Category</th>
              <th>Price</th>
              <th>Enrolled</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.C_title}</td>
                  <td>{course.C_educator}</td>
                  <td>{course.C_categories}</td>
                  <td>₹{course.C_price}</td>
                  <td>{course.enrolled}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No courses available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
