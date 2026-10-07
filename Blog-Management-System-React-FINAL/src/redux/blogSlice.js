import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/blogs";
const STORAGE_KEY = "blog-management-cache";

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function writeCache(blogs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  try {
    const response = await axios.get(API_URL);
    writeCache(response.data);
    return response.data;
  } catch (error) {
    const cachedBlogs = readCache();

    if (cachedBlogs.length > 0) {
      return cachedBlogs;
    }

    throw error;
  }
});

export const addBlog = createAsyncThunk("blogs/addBlog", async (blog) => {
  const response = await axios.post(API_URL, blog);
  return response.data;
});

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blog }) => {
    const response = await axios.put(`${API_URL}/${id}`, blog);
    return response.data;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    items: readCache(),
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        writeCache(state.items);
      })
      .addCase(fetchBlogs.rejected, (state) => {
        state.status = "failed";
        state.error =
          "JSON Server is not running. Start the project with npm start.";
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        writeCache(state.items);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (blog) => String(blog.id) === String(action.payload.id)
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }

        writeCache(state.items);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (blog) => String(blog.id) !== String(action.payload)
        );

        writeCache(state.items);
      });
  },
});

export default blogSlice.reducer;
