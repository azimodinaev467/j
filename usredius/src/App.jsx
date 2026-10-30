import { useReducer, useState } from "react";
import "./App.css";

const initialState = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothes" },
  { id: 3, name: "Phones" },
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "EDIT":
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

    case "DELETE":
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
}

export default function App() {
  const [data, dispatch] = useReducer(reducer, initialState);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");

  function openAdd() {
    setEditId(null);
    setName("");
    setOpen(true);
  }

  function openEdit(item) {
    setEditId(item.id);
    setName(item.name);
    setOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    if (editId !== null) {
      dispatch({
        type: "EDIT",
        payload: {
          id: editId,
          name: name.trim(),
        },
      });
    } else {
      dispatch({
        type: "ADD",
        payload: {
          id: Date.now(),
          name: name.trim(),
        },
      });
    }

    setName("");
    setEditId(null);
    setOpen(false);
  }

  function deleteCategory(id) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/60 to-indigo-50/30 text-slate-800 antialiased py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    Categories
                  </h1>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {data.length}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Manage and organize all your product categories
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-sm shadow-indigo-200 hover:shadow-indigo-300 transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/70 text-indigo-600 flex items-center justify-center font-bold text-base border border-indigo-100">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </h2>
                    <span className="text-xs text-slate-400">
                      ID: #{item.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>

                <button
                  onClick={() => deleteCategory(item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-rose-600 bg-rose-50/50 hover:bg-rose-50 hover:text-rose-700 border border-rose-100 transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No categories found
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              Get started by adding your very first category!
            </p>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer shadow-sm shadow-indigo-200"
            >
              + Add Category
            </button>
          </div>
        )}
        {open && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
            onClick={() => setOpen(false)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md p-6 sm:p-7 relative transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  {editId !== null ? "Edit Category" : "Add Category"}
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Electronics, Books..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white text-sm"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-sm shadow-indigo-200 rounded-xl transition-all cursor-pointer"
                  >
                    {editId !== null ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
