import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import BlogForm from "../../components/BlogForm";
import { addBlog } from "../../redux/blogSlice";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80";

export default function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (blog) => {
    setSaving(true);

    try {
      await dispatch(
        addBlog({
          ...blog,
          image: blog.image || DEFAULT_IMAGE,
        })
      ).unwrap();

      navigate("/admin");
    } catch (error) {
      console.error(error);
      window.alert("Blog could not be added. Make sure JSON Server is running.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h1>Add Blog</h1>
        <p className="text-muted">Create a new blog record.</p>
      </div>

      <BlogForm
        onSubmit={handleSubmit}
        buttonText={saving ? "Saving..." : "Add Blog"}
      />
    </section>
  );
}
