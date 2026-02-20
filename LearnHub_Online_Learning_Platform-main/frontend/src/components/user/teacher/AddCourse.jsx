import { useState } from "react";
import API from "../../common/AxiosInstance";

function AddCourse() {
  const [course, setCourse] = useState({
    C_title: "",
    C_price: "",
    C_description: "",
    C_categories: "",
    C_educator: "",
  });

  const [sections, setSections] = useState([
    { title: "", video: null },
  ]);

  // Add new section
  const addSection = () => {
    setSections([...sections, { title: "", video: null }]);
  };

  // Handle section change
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("C_title", course.C_title);
    formData.append("C_price", course.C_price);
    formData.append("C_description", course.C_description);
    formData.append("C_categories", course.C_categories);
    formData.append("C_educator", course.C_educator);

    // Send section titles as JSON
    const sectionTitles = sections.map(sec => sec.title);
    formData.append("sectionTitles", JSON.stringify(sectionTitles));

    // Append all videos
    sections.forEach(section => {
      formData.append("videos", section.video);
    });

    await API.post("/admin/add-course", formData);

    alert("Course Added Successfully");

  } catch (error) {
    console.log(error);
    alert("Error adding course");
  }
};


  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card shadow-lg p-md-5 p-4">
          <h3 className="fw-bold mb-4">Course Details</h3>
          
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label fw-semibold">Course Title</label>
              <input 
                className="form-control form-control-lg border-2" 
                placeholder="e.g. Master React in 30 Days"
                value={course.C_title} 
                onChange={(e) => setCourse({ ...course, C_title: e.target.value })} 
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Price (INR)</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text border-2 bg-white">₹</span>
                <input 
                  type="number" className="form-control border-2" 
                  value={course.C_price}
                  onChange={(e) => setCourse({ ...course, C_price: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Category</label>
              <input className="form-control border-2" value={course.C_categories} onChange={(e) => setCourse({ ...course, C_categories: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Educator Name</label>
              <input className="form-control border-2" value={course.C_educator} onChange={(e) => setCourse({ ...course, C_educator: e.target.value })} />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Course Description</label>
              <textarea rows="4" className="form-control border-2" value={course.C_description} onChange={(e) => setCourse({ ...course, C_description: e.target.value })} />
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
               <h4 className="fw-bold text-secondary mb-0">Curriculum Content</h4>
               <button type="button" className="btn btn-sm btn-outline-primary" onClick={addSection}>
                 <i className="bi bi-plus-lg"></i> Add Section
               </button>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="card section-card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="row align-items-end g-3">
                    <div className="col-md-7">
                      <label className="small text-uppercase fw-bold text-muted mb-1">Section {index + 1} Title</label>
                      <input className="form-control bg-white" placeholder="What will they learn?" value={section.title} onChange={(e) => handleSectionChange(index, "title", e.target.value)} />
                    </div>
                    <div className="col-md-5">
                      <label className="small text-uppercase fw-bold text-muted mb-1">Video Lesson</label>
                      <input type="file" className="form-control bg-white" accept="video/*" onChange={(e) => handleSectionChange(index, "video", e.target.files[0])} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-grid mt-5">
            <button className="btn btn-primary btn-lg shadow-sm" onClick={handleSubmit}>
              Launch Course 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
