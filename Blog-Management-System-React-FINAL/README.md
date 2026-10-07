# Blog Management System - React

A beginner-friendly React project for practicing components, JSX, props, state, events, forms, validation, routing, CRUD, Axios, JSON Server, Redux Toolkit, LocalStorage, search, filtering, sorting, pagination and Bootstrap.

## Requirements

- Node.js
- VS Code

## Run the project

Open the folder that contains `package.json` in VS Code.

Install packages:

```bash
npm install
```

Start both Vite and JSON Server:

```bash
npm start
```

Open:

http://localhost:5173

JSON Server runs at:

http://localhost:5000/blogs

## Routes

- `/` - Home
- `/blogs` - Blog List
- `/blogs/:id` - Blog Details
- `/admin` - Dashboard
- `/admin/add-blog` - Add Blog
- `/admin/edit/:id` - Edit Blog

## CRUD

- Add: Dashboard -> Add Blog
- Read: Blogs page and Blog Details
- Update: Dashboard -> Edit
- Delete: Dashboard -> Delete

## Concepts covered

Components & JSX, Props & State, Events, Forms & Validation, Hooks, Routing, CRUD, Axios/Fetch concept, JSON Server, Redux Toolkit, LocalStorage, Search, Sort, Filtering, Pagination, Bootstrap, Spread and Rest operators.

## Project structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── BlogCard.jsx
│   ├── BlogForm.jsx
│   ├── BlogList.jsx
│   ├── SearchBar.jsx
│   └── Pagination.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Blogs.jsx
│   ├── BlogDetails.jsx
│   └── admin/
│       ├── Dashboard.jsx
│       ├── AddBlog.jsx
│       └── EditBlog.jsx
│
├── redux/
│   ├── store.js
│   └── blogSlice.js
│
├── App.jsx
├── main.jsx
└── styles.css

db.json
package.json
README.md
```
