const mongoose = require("mongoose");

const coursePaymentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    // 🔹 PAYMENT SIMULATION DETAILS
    cardDetails: {
      cardholdername: {
        type: String,
        required: true,
      },
      cardnumber: {
        type: String, // string to avoid precision loss
        required: true,
      },
      cvv: {
        type: String,
        required: true,
      },
      expmonthyear: {
        type: String,
        required: true,
      },
    },

    paymentStatus: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS",
    },

    paymentType: {
      type: String,
      default: "SIMULATION",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoursePayment", coursePaymentSchema);
