import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BlogForm from "../../components/BlogForm";
import { fetchBlogs, updateBlog } from "../../redux/blogSlice";

export default function EditBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector((state) => state.blogs);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const blog = items.find((item) => String(item.id) === String(id));

  const handleSubmit = async (updatedBlog) => {
    setSaving(true);

    try {
      await dispatch(
        updateBlog({
          id,
          blog: {
            ...updatedBlog,
            id,
          },
        })
      ).unwrap();

      navigate("/admin");
    } catch (error) {
      console.error(error);
      window.alert("Blog could not be updated. Make sure JSON Server is running.");
    } finally {
      setSaving(false);
    }
  };

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
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h1>Edit Blog</h1>
        <p className="text-muted">Update the selected blog record.</p>
      </div>

      <BlogForm
        initialData={blog}
        onSubmit={handleSubmit}
        buttonText={saving ? "Updating..." : "Update Blog"}
      />
    </section>
  );
}
