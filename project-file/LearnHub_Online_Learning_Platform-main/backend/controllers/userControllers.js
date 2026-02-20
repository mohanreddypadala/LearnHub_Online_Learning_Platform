const User = require("../schemas/userModel");
const Course = require("../schemas/courseModel");
const EnrolledCourse = require("../schemas/enrolledCourseModel");
const CoursePayment = require("../schemas/coursePaymentModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   REGISTER USER
========================= */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      type,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   LOGIN USER (JWT)
========================= */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   ENROLL COURSE (STUDENT)
========================= */
exports.enrollCourse = async (req, res) => {
  try {
    const { courseID } = req.body;

    if (!courseID) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 🔐 CHECK PAYMENT FIRST
    const payment = await CoursePayment.findOne({
      userID: req.user.id,
      courseID,
      paymentStatus: "SUCCESS",
    });

    if (!payment) {
      return res
        .status(403)
        .json({ message: "Please purchase the course before enrolling" });
    }

    //  check already enrolled
    const alreadyEnrolled = await EnrolledCourse.findOne({
      userID: req.user.id,
      courseID,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    //  enroll student
    const enrollment = await EnrolledCourse.create({
      userID: req.user.id,
      courseID,
    });

    // increase enrolled count
    course.enrolled += 1;
    await course.save();

    res.status(201).json({
      message: "Course enrolled successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   GET MY ENROLLED COURSES
========================= */
exports.getMyCourses = async (req, res) => {
  try {
    // This will now work because 'Course' is registered in courseModel.js
    const courses = await EnrolledCourse.find({ userID: req.user.id })
      .populate("courseID");

    res.json(courses);
  } catch (error) {
    console.error("Populate Error:", error);
    res.status(500).json({ error: error.message });
  }
};







/* =========================
   COURSE PAYMENT (SIMULATION)
========================= */

exports.payForCourse = async (req, res) => {
  try {
    const { courseID, amount, cardholdername, cardnumber, cvv, expmonthyear } = req.body;

    const payment = await CoursePayment.create({
      userID: req.user.id,
      courseID,
      amount,
      cardDetails: {
        cardholdername,
        cardnumber,
        cvv,
        expmonthyear,
      },
      paymentStatus: "SUCCESS",
    });

    res.json({ message: "Payment Successful", payment });

  } catch (error) {
    res.status(500).json({ message: "Payment Failed" });
  }
};




/* =========================
   GET ALL AVAILABLE COURSES
========================= */
exports.getAllCourses = async (req, res) => {
  try {
    // We don't need to 'require' Course here because it is 
    // already imported at the top of this file
    const courses = await Course.find({}); 
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};