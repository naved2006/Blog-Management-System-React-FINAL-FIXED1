import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteBlog, fetchBlogs } from "../../redux/blogSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.blogs);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const publishedCount = items.filter(
    (blog) => blog.status === "Published"
  ).length;

  const draftCount = items.filter(
    (blog) => blog.status === "Draft"
  ).length;

  const filteredItems = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return items;
    }

    return items.filter((blog) =>
      `${blog.title} ${blog.author}`.toLowerCase().includes(value)
    );
  }, [items, search]);

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(
      `Delete "${blog.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteBlog(blog.id)).unwrap();
    } catch (deleteError) {
      window.alert("Delete failed. Make sure JSON Server is running.");
    }
  };

  return (
    <section className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="mb-1">Admin Dashboard</h1>
          <p className="text-muted mb-0">Add, edit, delete and manage blogs.</p>
        </div>

        <Link to="/admin/add-blog" className="btn btn-primary">
          <i className="bi bi-plus-lg me-2" />
          Add Blog
        </Link>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="row g-3 mb-4">
        <StatCard title="Total Blogs" value={items.length} icon="bi-journal-text" />
        <StatCard title="Published" value={publishedCount} icon="bi-check-circle" />
        <StatCard title="Drafts" value={draftCount} icon="bi-file-earmark" />
      </div>

      <div className="card shadow-sm">
        <div className="card-body border-bottom">
          <div className="row g-2 align-items-center">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search" />
                </span>
                <input
                  type="search"
                  className="form-control"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              <span className="text-muted">
                Showing {filteredItems.length} of {items.length} blogs
              </span>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Blog</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {status === "loading" ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border" role="status" />
                  </td>
                </tr>
              ) : filteredItems.length ? (
                filteredItems.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <strong>{blog.title}</strong>
                      <div className="small text-muted">{blog.publishDate}</div>
                    </td>
                    <td>{blog.author}</td>
                    <td>{blog.category}</td>
                    <td>
                      <span
                        className={`badge ${
                          blog.status === "Published"
                            ? "text-bg-success"
                            : "text-bg-warning"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="text-end text-nowrap">
                      <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={`/admin/edit/${blog.id}`}
                      >
                        <i className="bi bi-pencil me-1" />
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(blog)}
                      >
                        <i className="bi bi-trash me-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm stat h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <div className="stat-icon">
            <i className={`bi ${icon}`} />
          </div>
          <div>
            <div className="small text-muted">{title}</div>
            <h2 className="mb-0">{value}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
