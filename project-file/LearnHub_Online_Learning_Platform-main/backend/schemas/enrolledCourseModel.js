// const mongoose = require("mongoose");

// const enrolledCourseSchema = new mongoose.Schema(
//   {
//     userID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     courseID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//       required: true,
//     },

//     progress: {
//       type: Number,
//       default: 0, // percentage
//     },

//     completed: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("EnrolledCourse", enrolledCourseSchema);



const mongoose = require("mongoose");

const enrolledCourseSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  completedSections: [
    {
      type: Number,   // store section index
    },
  ],

  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(
  "EnrolledCourse",
  enrolledCourseSchema
);
