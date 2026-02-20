// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../../common/AxiosInstance";

// function CourseContent() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [completedVideos, setCompletedVideos] = useState([]);
//   const [isCourseCompleted, setIsCourseCompleted] = useState(false);
//   console.log(isCourseCompleted);


//   useEffect(() => {
//     API.get(`/users/course/${id}`)
//       .then((res) => setCourse(res.data))
//       .catch((err) => console.error(err));
//     API.get(`/users/progress/${id}`)
//   .then(res => {
//     setCompletedVideos(res.data.completedSections);
//     setIsCourseCompleted(res.data.isCompleted);
//   });

//   }, [id]);

//   if (!course) return <p className="text-center mt-5">Loading...</p>;

//   const handleVideoEnd = async () => {
//   if (!completedVideos.includes(currentIndex)) {

//     await API.post("/users/complete-section", {
//       courseID: id,
//       sectionIndex: currentIndex,
//     });

//     setCompletedVideos([...completedVideos, currentIndex]);
//   }
// };


//   const allCompleted =
//     course.sections.length === completedVideos.length;

//   return (
//     <div className="container-fluid mt-4">
//       <div className="row">

//         {/* Sidebar */}
//         <div className="col-md-3 border-end">
//           <h5 className="mb-3">Course Sections</h5>
//           <ul className="list-group">
//             {course.sections.map((section, index) => (
//               <li
//                 key={index}
//                 className={`list-group-item ${
//                   index === currentIndex ? "active" : ""
//                 }`}
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setCurrentIndex(index)}
//               >
//                 {section.title}
//                 {completedVideos.includes(index) && (
//                   <span className="ms-2 text-success">✔</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Video Area */}
//         <div className="col-md-9">
//           <h3 className="mb-3">
//             {course.sections[currentIndex].title}
//           </h3>

//           <video
//             key={currentIndex}
//             width="100%"
//             height="450"
//             controls
//             onEnded={handleVideoEnd}
//             className="rounded shadow"
//           >
//             <source
//               src={`http://localhost:5000${course.sections[currentIndex].videoUrl}`}
//               type="video/mp4"
//             />
//           </video>

//           <div className="mt-4">
//             <button
//   className="btn btn-success"
//   disabled={!allCompleted}
//   onClick={async () => {
//     try {
//       const response = await API.get(
//         `/users/certificate/${id}`,
//         { responseType: "blob" }   // VERY IMPORTANT
//       );

//       const url = window.URL.createObjectURL(
//         new Blob([response.data])
//       );

//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `certificate-${course.C_title}.pdf`
//       );

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//     } catch (error) {
//       console.error("Certificate Download Error:", error);
//     }
//   }}
// >
//   Download Certificate
// </button>



//             {!allCompleted && (
//               <p className="text-muted mt-2">
//                 Complete all sections to unlock certificate.
//               </p>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default CourseContent;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../common/AxiosInstance";

function CourseContent() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState([]);

  useEffect(() => {
    API.get(`/users/course/${id}`).then((res) => setCourse(res.data)).catch(console.error);
    API.get(`/users/progress/${id}`).then(res => setCompletedVideos(res.data.completedSections));
  }, [id]);

  if (!course) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  const handleVideoEnd = async () => {
    if (!completedVideos.includes(currentIndex)) {
      await API.post("/users/complete-section", { courseID: id, sectionIndex: currentIndex });
      setCompletedVideos([...completedVideos, currentIndex]);
    }
  };

  const allCompleted = course.sections.length === completedVideos.length;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="video-sidebar shadow-sm">
            <div className="p-3 border-bottom bg-white"><h6 className="fw-bold mb-0">Lessons</h6></div>
            <div className="list-group list-group-flush">
              {course.sections.map((section, index) => (
                <button key={index} className={`list-group-item list-group-item-action ${index === currentIndex ? "active" : ""}`} onClick={() => setCurrentIndex(index)}>
                  <div className="d-flex justify-content-between">
                    <span className="small">{section.title}</span>
                    {completedVideos.includes(index) && <span className="text-success small">✔</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="glass-card p-4 shadow-sm">
            <h4 className="fw-bold mb-3">{course.sections[currentIndex].title}</h4>
            <div className="ratio ratio-16x9 bg-black rounded-3 overflow-hidden">
              <video key={currentIndex} controls onEnded={handleVideoEnd}>
                <source src={`http://localhost:5000${course.sections[currentIndex].videoUrl}`} type="video/mp4" />
              </video>
            </div>
            <div className="mt-4 d-flex justify-content-between align-items-center">
              <button
  className={`btn btn-lg ${
    allCompleted ? "btn-success shadow" : "btn-outline-secondary"
  }`}
  disabled={!allCompleted}
  onClick={async () => {
    try {
      const response = await API.get(
        `/users/certificate/${id}`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate-${course.C_title}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Certificate Download Error:", error);
      alert("Certificate generation failed");
    }
  }}
>
  Download Certificate
</button>
              {!allCompleted && <small className="text-muted">Finish all videos to claim certificate</small>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;