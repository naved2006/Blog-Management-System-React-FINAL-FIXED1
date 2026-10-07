import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import BlogCard from "../components/BlogCard";
import { fetchBlogs } from "../redux/blogSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const latestBlogs = items
    .filter((blog) => blog.status === "Published")
    .slice(0, 3);

  return (
    <>
      <section className="hero text-white">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge text-bg-light">React Project</span>
              <h1 className="display-4 fw-bold mt-3">
                Blog Management System
              </h1>
              <p className="lead">
                Components, forms, CRUD, routing, Redux, API, search, sorting,
                filtering and pagination.
              </p>
              <Link to="/blogs" className="btn btn-light me-2">
                Explore Blogs
              </Link>
              <Link to="/admin" className="btn btn-outline-light">
                Dashboard
              </Link>
            </div>

            <div className="col-lg-5">
              <div className="hero-card">
                <i className="bi bi-journal-richtext display-1" />
                <h3>Learn by Building</h3>
                <p className="mb-0">React + JSON Server + Redux Toolkit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Latest Published Blogs</h2>
            <p className="text-muted mb-0">Read the latest articles.</p>
          </div>
          <Link to="/blogs" className="btn btn-outline-primary">
            View All
          </Link>
        </div>

        {status === "loading" ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
          </div>
        ) : latestBlogs.length ? (
          <div className="row g-4">
            {latestBlogs.map((blog) => (
              <div className="col-md-6 col-lg-4" key={blog.id}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">
            No published blogs yet. Add a blog from the Dashboard.
          </div>
        )}
      </section>
    </>
  );
}
