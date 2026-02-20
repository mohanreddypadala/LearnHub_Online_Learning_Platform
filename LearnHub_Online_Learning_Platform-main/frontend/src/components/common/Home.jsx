function Home() {
  return (
    <div className="container-fluid hero-section">
      <div className="row min-vh-100 align-items-center">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold">
            Welcome to <span className="text-primary">LearnHub</span> 🎓
          </h1>

          <p className="lead text-muted mt-3">
            Learn skills, enroll in courses, and grow your career.
          </p>

          <div className="mt-4">
            <a href="/login" className="btn btn-primary btn-lg me-3">
              Get Started
            </a>
            <a href="/register" className="btn btn-outline-secondary btn-lg">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
