import React from "react";
import { useForm } from "react-hook-form";

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

 const onSubmit = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Success!");
      reset();
    } else {
      console.error("Laravel validation failed");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Feedback Form</h2>

      {isSubmitSuccessful && (
        <div className="alert alert-success">Thank you for your feedback!</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded bg-light shadow-sm">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Feedback</label>
          <textarea
            className={`form-control ${errors.feedback ? "is-invalid" : ""}`}
            rows="4"
            {...register("feedback", {
              required: "Feedback is required",
              minLength: {
                value: 10,
                message: "Feedback must be at least 10 characters",
              },
            })}
          ></textarea>
          <div className="invalid-feedback">{errors.feedback?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className={`form-select ${errors.status ? "is-invalid" : ""}`}
            {...register("status", { required: "Status is required" })}
          >
            <option value="">Select status</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Bad">Bad</option>
          </select>
          <div className="invalid-feedback">{errors.status?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
