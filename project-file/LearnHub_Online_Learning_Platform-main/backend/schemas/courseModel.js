const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

const courseSchema = new mongoose.Schema(
  {
    C_title: {
      type: String,
      required: true,
    },
    C_description: {
      type: String,
      required: true,
    },
    C_categories: {
      type: String,
      required: true,
    },
    C_educator: {
      type: String,
      required: true,
    },
    C_price: {
      type: Number,
      required: true,
    },
    sections: [sectionSchema],   // 👈 IMPORTANT
    enrolled: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
