import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
  if (!blogs.length) {
    return <div className="alert alert-info">No blogs found.</div>;
  }

  return (
    <div className="row g-4">
      {blogs.map((blog) => (
        <div className="col-md-6 col-lg-4" key={blog.id}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
}
