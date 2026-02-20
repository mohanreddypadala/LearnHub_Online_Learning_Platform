import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid px-4">
        {/* LEFT */}
        <Link className="navbar-brand fw-bold" to="/">
          Study App
        </Link>
        
        {/* CENTER */}
        {/* CENTER -> Changed to RIGHT using ms-auto */}
        <div className="ms-auto">
        <Link className="me-3 text-decoration-none" to="/"> Hello {role} Home </Link>
        {!role && <Link className="me-3 text-decoration-none" to="/login">Login</Link>}
        {!role && <Link className="text-decoration-none" to="/register">Register</Link>}
        </div>

        
        {/* RIGHT */}
        
        {role && (
          <button onClick={logout} className="btn btn-outline-danger btn-sm">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
