import { NavLink } from "react-router-dom";

export default function Header() {
  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active fw-bold" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          <i className="bi bi-journal-richtext me-2" />
          BlogHub
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="mainNav" className="collapse navbar-collapse">
          <div className="navbar-nav ms-auto">
            <NavLink className={linkClass} to="/">
              Home
            </NavLink>
            <NavLink className={linkClass} to="/blogs">
              Blogs
            </NavLink>
            <NavLink className={linkClass} to="/admin">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/admin/add-blog">
              Add Blog
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
