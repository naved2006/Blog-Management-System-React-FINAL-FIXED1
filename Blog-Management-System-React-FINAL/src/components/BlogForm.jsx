import { useEffect, useState } from "react";

const emptyBlog = {
  title: "",
  author: "",
  email: "",
  category: "React",
  image: "",
  description: "",
  content: "",
  tags: "",
  publishDate: "",
  status: "Draft",
};

export default function BlogForm({ initialData, onSubmit, buttonText }) {
  const [form, setForm] = useState(emptyBlog);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setForm(emptyBlog);
      return;
    }

    setForm({
      ...emptyBlog,
      ...initialData,
      tags: Array.isArray(initialData.tags)
        ? initialData.tags.join(", ")
        : initialData.tags || "",
    });
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const validate = () => {
    const nextErrors = {};
    const requiredFields = [
      "title",
      "author",
      "email",
      "description",
      "content",
      "publishDate",
    ];

    requiredFields.forEach((field) => {
      if (!String(form[field] || "").trim()) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  const inputClass = (field) =>
    `form-control ${errors[field] ? "is-invalid" : ""}`;

  return (
    <form onSubmit={handleSubmit} className="card shadow-sm p-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Blog Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={inputClass("title")}
            placeholder="Enter blog title"
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Author *</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className={inputClass("author")}
            placeholder="Enter author name"
          />
          {errors.author && (
            <div className="invalid-feedback">{errors.author}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass("email")}
            placeholder="author@example.com"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Redux">Redux</option>
            <option value="API">API</option>
            <option value="CSS">CSS</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Image URL</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="form-control"
            placeholder="https://..."
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Publish Date *</label>
          <input
            type="date"
            name="publishDate"
            value={form.publishDate}
            onChange={handleChange}
            className={inputClass("publishDate")}
          />
          {errors.publishDate && (
            <div className="invalid-feedback">{errors.publishDate}</div>
          )}
        </div>

        <div className="col-md-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={inputClass("description")}
            rows="3"
            placeholder="Short description"
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">Content *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className={inputClass("content")}
            rows="7"
            placeholder="Full blog content"
          />
          {errors.content && (
            <div className="invalid-feedback">{errors.content}</div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">Tags</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="form-control"
            placeholder="react, frontend, javascript"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-save me-2" />
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  );
}
