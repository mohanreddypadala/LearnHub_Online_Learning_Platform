// import { useEffect, useState } from "react";
// import API from "../../common/AxiosInstance";
// import { useNavigate } from "react-router-dom";

// function EnrolledCourses() {
//   const [enrolled, setEnrolled] = useState([]);
//   const navigate = useNavigate();


//   useEffect(() => {
//     // Matches your backend router
//     API.get("/users/my-courses")
//       .then((res) => setEnrolled(res.data))
//       .catch((err) => console.error(err));
//   }, []);
//   console.log(enrolled);
//   return (
//     <div className="table-responsive">
//       <table className="table table-bordered align-middle">
//         <thead className="table-light">
//           <tr>
//             <th>Course ID</th>
//             <th>Course Name</th>
//             <th>Educator</th>
//             <th>Category</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {enrolled
//           .filter(item => item.courseID)
//           .length > 0 ? 
//           enrolled
//           .filter(item => item.courseID)
//           .map((item) => (
//             <tr key={item._id}>
//               {/* MongoDB _id used as course identity */}
//               <td>{item.courseID?._id}</td>
//               <td className="fw-bold">{item.courseID?.C_title}</td>
//               <td>{item.courseID?.C_educator}</td>
//               <td>{item.courseID?.C_categories}</td>
//               <td>
//                 <button
//                   className="btn btn-success btn-sm"
//                   onClick={() => navigate(`/student/course/${item.courseID?._id}`)}>
//                   GO TO
//                 </button>

//               </td>
//             </tr>
//           )) : (
//             <tr>
//               <td colSpan="5" className="text-center py-4 text-muted">
//                 yet to be enrolled courses
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default EnrolledCourses;
import { useEffect, useState } from "react";
import API from "../../common/AxiosInstance";
import { useNavigate } from "react-router-dom";

function EnrolledCourses() {
  const [enrolled, setEnrolled] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/my-courses")
      .then((res) => setEnrolled(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="glass-card overflow-hidden border-0 shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="ps-4">Course Name</th>
              <th>Educator</th>
              <th>Status</th>
              <th className="text-end pe-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {enrolled.filter(item => item.courseID).length > 0 ? (
              enrolled.filter(item => item.courseID).map((item) => {
                // If your backend doesn't send item.isCompleted, you can track it via video counts
                const isFinished = item.isCompleted || false; 

                return (
                  <tr key={item._id}>
                    <td className="ps-4 fw-bold text-dark">{item.courseID?.C_title}</td>
                    <td>{item.courseID?.C_educator}</td>
                    <td>
                      {isFinished ? (
                        <span className="badge-completed">✔ Completed</span>
                      ) : (
                        <span className="badge bg-light text-muted border fw-normal">In Progress</span>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      <button 
                        className={`btn btn-sm px-4 rounded-pill ${isFinished ? 'btn-outline-success' : 'btn-primary'}`}
                        onClick={() => navigate(`/student/course/${item.courseID?._id}`)}
                      >
                        {isFinished ? "Review" : "Continue"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="4" className="text-center py-5 text-muted">No enrollments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnrolledCourses;