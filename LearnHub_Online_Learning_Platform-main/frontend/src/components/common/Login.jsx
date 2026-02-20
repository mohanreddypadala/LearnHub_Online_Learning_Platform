import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./AxiosInstance"; // Added API import
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // Backend route: router.post("/login", loginUser)
      const response = await API.post("/users/login", { email, password });
      
      // Save the token and user info from the response
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.type);
      localStorage.setItem("userId", response.data.user.id);

      // Navigate based on the 'type' returned by backend
      const userType = response.data.user.type;
      if (userType === "teacher") {
        navigate("/teacher");
      } else if (userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/student"); // Default for students
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card shadow-lg">
        <div className="text-center mb-3">
          <div className="auth-icon">👤</div>
          <h4 className="fw-bold">Sign In</h4>
        </div>

        <form onSubmit={submit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100 fw-bold">SIGN IN</button>
        </form>

        <p className="text-center mt-3 mb-0">
          Have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;