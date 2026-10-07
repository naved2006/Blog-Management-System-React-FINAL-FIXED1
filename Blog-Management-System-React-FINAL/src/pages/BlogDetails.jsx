import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchBlogs } from "../redux/blogSlice";

export default function BlogDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const blog = items.find((item) => String(item.id) === String(id));

  if (status === "loading" && !blog) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  if (!blog) {
    return (
      <section className="container py-5">
        <div className="alert alert-danger">Blog not found.</div>
        <Link to="/blogs" className="btn btn-primary">
          Back to Blogs
        </Link>
      </section>
    );
  }

  return (
    <article className="container py-5">
      <Link to="/blogs" className="btn btn-outline-secondary mb-4">
        <i className="bi bi-arrow-left me-2" />
        Back to Blogs
      </Link>

      <div className="row g-4 align-items-start">
        <div className="col-lg-7">
          <img
            src={blog.image}
            alt={blog.title}
            className="detail-image rounded-4 shadow-sm"
          />
        </div>

        <div className="col-lg-5">
          <span className="badge text-bg-primary">{blog.category}</span>
          <span
            className={`badge ms-2 ${
              blog.status === "Published"
                ? "text-bg-success"
                : "text-bg-warning"
            }`}
          >
            {blog.status}
          </span>

          <h1 className="mt-3">{blog.title}</h1>
          <p className="text-muted">
            By {blog.author} • {blog.publishDate}
          </p>
          <p className="lead">{blog.description}</p>

          <div>
            {(blog.tags || []).map((tag) => (
              <span
                className="badge text-bg-light border me-1"
                key={tag}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="content-box mt-5">
        <h3>Content</h3>
        <p className="mb-0 blog-content">{blog.content}</p>
      </div>
    </article>
  );
}
