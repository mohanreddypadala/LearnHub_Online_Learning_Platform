// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../common/AxiosInstance";

// function AllCourses() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [showPayment, setShowPayment] = useState(false);

//   const [cardData, setCardData] = useState({
//     cardholdername: "",
//     cardnumber: "",
//     cvv: "",
//     expmonthyear: "",
//   });

//   const navigate = useNavigate();

//   // 🔹 Fetch all courses
//   useEffect(() => {
//     API.get("/users/all-courses")
//       .then((res) => setCourses(res.data))
//       .catch((err) =>
//         console.error("Error fetching available courses:", err)
//       );
//   }, []);

//   // 🔹 Handle Start Course
//   const handleEnroll = async (course) => {
//     try {
//       const enrolledRes = await API.get("/users/my-courses");

//       const isEnrolled = enrolledRes.data.some(
//         (enrollment) => enrollment.courseID?._id === course._id
//       );

//       if (isEnrolled) {
//         navigate(`/student/course/${course._id}`);
//         return;
//       }

//       // 🔥 If not enrolled → open payment modal
//       setSelectedCourse(course);
//       setShowPayment(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔹 Handle Payment
//   const handlePayment = async () => {
//     try {
//       await API.post("/users/pay", {
//         courseID: selectedCourse._id,
//         amount: selectedCourse.C_price,
//         cardholdername: cardData.cardholdername,
//         cardnumber: cardData.cardnumber,
//         cvv: cardData.cvv,
//         expmonthyear: cardData.expmonthyear,
//       });

//       await API.post("/users/enroll", {
//         courseID: selectedCourse._id,
//       });

//       alert("Payment Successful & Enrolled!");

//       setShowPayment(false);
//       setCardData({
//         cardholdername: "",
//         cardnumber: "",
//         cvv: "",
//         expmonthyear: "",
//       });

//       navigate(`/student/course/${selectedCourse._id}`);
//     } catch (err) {
//       console.error(err);
//       alert("Payment Failed");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         {courses.length > 0 ? (
//           courses.map((c) => (
//             <div className="col-md-4 mb-4" key={c._id}>
//               <div className="card shadow-sm border-0 h-100">
//                 <div className="card-body">
//                   <h5 className="fw-bold">{c.C_title}</h5>
//                   <p className="text-muted mb-1">
//                     Educator: {c.C_educator}
//                   </p>
//                   <p className="text-muted">
//                     Category: {c.C_categories}
//                   </p>
//                   <h6 className="text-primary fw-bold">
//                     ₹{c.C_price}
//                   </h6>

//                   <button
//                     className="btn btn-primary w-100 mt-2"
//                     onClick={() => handleEnroll(c)}
//                   >
//                     Start Course
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center py-5">
//             No courses found in database.
//           </p>
//         )}
//       </div>

//       {/* 🔥 PAYMENT MODAL */}
//       {showPayment && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content p-4">
//               <h4 className="mb-3">
//                 Payment for {selectedCourse?.C_title}
//               </h4>

//               <p>
//                 <strong>Price:</strong> ₹{selectedCourse?.C_price}
//               </p>

//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Card Holder Name"
//                 value={cardData.cardholdername}
//                 onChange={(e) =>
//                   setCardData({
//                     ...cardData,
//                     cardholdername: e.target.value,
//                   })
//                 }
//               />

//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Card Number"
//                 value={cardData.cardnumber}
//                 onChange={(e) =>
//                   setCardData({
//                     ...cardData,
//                     cardnumber: e.target.value,
//                   })
//                 }
//               />

//               <div className="row">
//                 <div className="col">
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="MM/YYYY"
//                     value={cardData.expmonthyear}
//                     onChange={(e) =>
//                       setCardData({
//                         ...cardData,
//                         expmonthyear: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="col">
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="CVV"
//                     value={cardData.cvv}
//                     onChange={(e) =>
//                       setCardData({
//                         ...cardData,
//                         cvv: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="text-end mt-3">
//                 <button
//                   className="btn btn-secondary me-2"
//                   onClick={() => setShowPayment(false)}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   className="btn btn-success"
//                   onClick={handlePayment}
//                 >
//                   Pay Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AllCourses;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../common/AxiosInstance";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [cardData, setCardData] = useState({ cardholdername: "", cardnumber: "", cvv: "", expmonthyear: "" });

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/all-courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching available courses:", err));
  }, []);

  const handleEnroll = async (course) => {
    try {
      const enrolledRes = await API.get("/users/my-courses");
      const isEnrolled = enrolledRes.data.some((enrollment) => enrollment.courseID?._id === course._id);
      if (isEnrolled) {
        navigate(`/student/course/${course._id}`);
        return;
      }
      setSelectedCourse(course);
      setShowPayment(true);
    } catch (err) { console.error(err); }
  };

  const handlePayment = async () => {
    try {
      await API.post("/users/pay", { courseID: selectedCourse._id, amount: selectedCourse.C_price, ...cardData });
      await API.post("/users/enroll", { courseID: selectedCourse._id });
      alert("Payment Successful & Enrolled!");
      setShowPayment(false);
      navigate(`/student/course/${selectedCourse._id}`);
    } catch (err) {
       alert("Payment Failed");
      console.error(err);
     }
  };

  return (
    <div className="container-fluid px-4 py-3" style={{ background: "var(--bg-soft)" }}>
      <div className="row g-4">
        {courses.length > 0 ? (
          courses.map((c, index) => (
            <div 
              className="col-md-6 col-lg-4 animate-card" 
              key={c._id} 
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="course-card-vibrant h-100 p-4 pt-5 d-flex flex-column shadow-sm">
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <span className="badge px-3 py-2 rounded-pill" style={{ background: "rgba(99, 102, 241, 0.1)", color: "#6366f1" }}>
                    {c.C_categories}
                  </span>
                  <div className="text-muted small">
                    <i className="bi bi-person-circle me-1"></i> {c.C_educator}
                  </div>
                </div>

                <h4 className="fw-bold mb-3" style={{ color: "var(--brand-dark)" }}>{c.C_title}</h4>
                
                <div className="mt-auto pt-4 border-top d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted d-block">Investment</small>
                    <h3 className="fw-bold mb-0" style={{ color: "#1e1b4b" }}>₹{c.C_price}</h3>
                  </div>
                  <button className="btn btn-vibrant shadow-sm" onClick={() => handleEnroll(c)}>
                    Get Started <i className="bi bi-arrow-right-short ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
             <div className="spinner-border text-primary" role="status"></div>
             <p className="mt-3 text-muted">Discovering available courses...</p>
          </div>
        )}
      </div>

      {/* Modern Payment Modal */}
      {showPayment && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(8px)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="position-absolute top-0 start-0 w-100" style={{ height: '5px', background: 'var(--accent-gradient)' }}></div>
              <h3 className="fw-bold mb-2 text-center">Finalize Enrollment</h3>
              <p className="text-center text-muted mb-4 small">Securely process your payment for {selectedCourse?.C_title}</p>
              
              <div className="mb-3">
                <label className="form-label small fw-bold">Cardholder Name</label>
                <input type="text" className="form-control" placeholder="Full Name" value={cardData.cardholdername} onChange={(e) => setCardData({...cardData, cardholdername: e.target.value})} />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Card Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0"><i className="bi bi-credit-card"></i></span>
                  <input type="text" className="form-control border-start-0" placeholder="0000 0000 0000 0000" value={cardData.cardnumber} onChange={(e) => setCardData({...cardData, cardnumber: e.target.value})} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-7">
                  <label className="form-label small fw-bold">Expiry Date</label>
                  <input type="text" className="form-control" placeholder="MM/YYYY" value={cardData.expmonthyear} onChange={(e) => setCardData({...cardData, expmonthyear: e.target.value})} />
                </div>
                <div className="col-5">
                  <label className="form-label small fw-bold">CVV</label>
                  <input type="text" className="form-control" placeholder="***" value={cardData.cvv} onChange={(e) => setCardData({...cardData, cvv: e.target.value})} />
                </div>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-vibrant btn-lg shadow" onClick={handlePayment}>Pay ₹{selectedCourse?.C_price}</button>
                <button className="btn btn-link text-muted text-decoration-none btn-sm" onClick={() => setShowPayment(false)}>Go Back</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllCourses;