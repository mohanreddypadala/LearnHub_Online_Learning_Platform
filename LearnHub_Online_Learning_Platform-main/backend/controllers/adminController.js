const Course = require("../schemas/courseModel");

exports.addCourse = async (req, res) => {
  try {
    const {
      C_title,
      C_description,
      C_categories,
      C_price,
      sections,
    } = req.body;

    // req.user comes from JWT (protect middleware)
    const course = await Course.create({
      userID: req.user.id,
      C_educator: req.user.name,   // ✅ FIX HERE
      C_title,
      C_description,
      C_categories,
      C_price,
      sections,
    });

    res.status(201).json({
      message: "Course added successfully",
      course,
    });
  } catch (error) {
    console.error("Add course error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ALL COURSES (FOR TEACHER/ADMIN)
========================= */
exports.getAllCourses = async (req, res) => {
  try {
    // Fetches every course in the database
    const courses = await Course.find({}); 
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  DELETE COURSE

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 🔥 Delete all enrollments related to this course
    await EnrolledCourse.deleteMany({ courseID: courseId });

    res.json({ message: "Course and related enrollments deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.addCourseWithVideo = async (req, res) => {
  try {
    const {
      C_title,
      C_description,
      C_categories,
      C_educator,
      C_price,
      sectionTitles
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Videos required" });
    }

    const parsedTitles = JSON.parse(sectionTitles);

    if (parsedTitles.length !== req.files.length) {
      return res.status(400).json({ message: "Mismatch in sections and videos" });
    }

    const sections = req.files.map((file, index) => ({
      title: parsedTitles[index],
      videoUrl: `/videos/${file.filename}`,
    }));

    const course = await Course.create({
      C_title,
      C_description,
      C_categories,
      C_educator,
      C_price,
      sections,
    });

    res.status(201).json({
      message: "Course added successfully",
      course,
    });

  } catch (error) {
    console.error("ADD COURSE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};