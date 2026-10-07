import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogList from "../components/BlogList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { fetchBlogs } from "../redux/blogSlice";

const BLOGS_PER_PAGE = 6;

export default function Blogs() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.blogs);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  const categories = useMemo(() => {
    return [...new Set(items.map((blog) => blog.category))].sort();
  }, [items]);

  const filteredBlogs = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const result = items.filter((blog) => {
      const matchesSearch =
        !searchText ||
        `${blog.title} ${blog.author}`.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || blog.category === category;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "za") {
        return b.title.localeCompare(a.title);
      }

      if (sort === "oldest") {
        return new Date(a.publishDate) - new Date(b.publishDate);
      }

      return new Date(b.publishDate) - new Date(a.publishDate);
    });
  }, [items, search, category, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE)
  );

  const visibleBlogs = filteredBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE
  );

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h1>Blog List</h1>
        <p className="text-muted">
          Search, filter, sort and paginate blog records.
        </p>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />

      {error && <div className="alert alert-warning">{error}</div>}

      {status === "loading" ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <BlogList blogs={visibleBlogs} />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </section>
  );
}
