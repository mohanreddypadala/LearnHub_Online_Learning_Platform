import { useState } from "react";
import API from "./AxiosInstance";
import { Link, useNavigate } from "react-router-dom"; 
import "../common/auth.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",      // Matches backend 'name'
    email: "",     // Matches backend 'email'
    password: "",  // Matches backend 'password'
    type: "student", // Matches backend 'type' enum
  });

  const handleRegister = async (e) => {
    e.preventDefault(); 
    try {
      // Backend route: router.post("/register", registerUser)
      await API.post("/users/register", form);
      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card shadow-lg">
        <div className="auth-icon">
          <span>🎓</span> 
        </div>
        
        <h3 className="text-center fw-bold mb-4">Create Account</h3>
        
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Username</label>
            <input
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">Register as</label>
            <select
              className="form-select"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value.toLowerCase() })}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3">
            SIGN UP
          </button>
        </form>

        <p className="text-center mb-0 small">
          Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;