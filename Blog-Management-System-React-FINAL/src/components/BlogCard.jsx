import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <article className="card h-100 shadow-sm blog-card">
      <img
        src={blog.image}
        className="card-img-top blog-image"
        alt={blog.title}
        onError={(event) => {
          event.currentTarget.src =
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80";
        }}
      />

      <div className="card-body d-flex flex-column">
        <div>
          <span className="badge text-bg-primary me-2">{blog.category}</span>
          <span
            className={`badge ${
              blog.status === "Published"
                ? "text-bg-success"
                : "text-bg-warning"
            }`}
          >
            {blog.status}
          </span>
        </div>

        <h5 className="card-title mt-3">{blog.title}</h5>

        <p className="small text-muted mb-2">
          By {blog.author} • {blog.publishDate}
        </p>

        <p className="card-text flex-grow-1">{blog.description}</p>

        <Link className="btn btn-outline-dark" to={`/blogs/${blog.id}`}>
          Read Details
        </Link>
      </div>
    </article>
  );
}
