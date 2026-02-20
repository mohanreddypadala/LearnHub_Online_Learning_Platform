const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Course = require("../schemas/courseModel");
const PDFDocument = require("pdfkit");
const { getAllCourses } = require("../controllers/userControllers");
const {
  registerUser,
  loginUser,
  enrollCourse,
  getMyCourses,
  payForCourse,
} = require("../controllers/userControllers");



// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// STUDENT FEATURES
router.post("/pay", protect, payForCourse);
router.post("/enroll", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);

// Add this route to your existing router

router.get("/all-courses", getAllCourses);

//Payment process
router.post("/pay", protect, payForCourse);


// Get single course content (for enrolled student)
router.get("/course/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("COURSE FETCH ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});



// Generate Certificate PDF
router.get("/certificate/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Get student name from logged-in user
    const studentName = req.user.name || "Student";

    const doc = new PDFDocument({ size: "A4" });

    // Set headers for download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate-${course.C_title}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Certificate Content
    doc.fontSize(26).text("CERTIFICATE OF COMPLETION", {
      align: "center",
    });

    doc.moveDown(2);

    doc.fontSize(18).text("This is to certify that", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(22).text(studentName, {
      align: "center",
      underline: true,
    });

    doc.moveDown();

    doc.fontSize(18).text(
      "has successfully completed the course",
      { align: "center" }
    );

    doc.moveDown();

    doc.fontSize(20).text(course.C_title, {
      align: "center",
    });

    doc.moveDown(2);

    doc.fontSize(16).text("Completion Status: 100%", {
      align: "center",
    });

    doc.moveDown(3);

    doc.fontSize(14).text(
      `Date: ${new Date().toLocaleDateString()}`,
      { align: "center" }
    );

    doc.end();

  } catch (error) {
    console.error("CERTIFICATE ERROR:", error);
    res.status(500).json({ message: "Certificate generation failed" });
  }
});


const EnrolledCourse = require("../schemas/enrolledCourseModel");
// Mark section complete
router.post("/complete-section", protect, async (req, res) => {
  try {
    const { courseID, sectionIndex } = req.body;

    const enrollment = await EnrolledCourse.findOne({
      userID: req.user.id,
      courseID,
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    if (!enrollment.completedSections.includes(sectionIndex)) {
      enrollment.completedSections.push(sectionIndex);
    }

    const course = await Course.findById(courseID);

    if (
      enrollment.completedSections.length ===
      course.sections.length
    ) {
      enrollment.isCompleted = true;
    }

    await enrollment.save();

    res.json({ message: "Section marked completed" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating progress" });
  }
});


router.get("/progress/:id", protect, async (req, res) => {
  const enrollment = await EnrolledCourse.findOne({
    userID: req.user.id,
    courseID: req.params.id,
  });

  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  res.json({
    completedSections: enrollment.completedSections,
    isCompleted: enrollment.isCompleted,
  });
});


module.exports = router;
