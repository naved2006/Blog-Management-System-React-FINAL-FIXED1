export default function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Search Title / Author</label>
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search blog..."
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Sort</label>
            <select
              className="form-select"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("latest");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
