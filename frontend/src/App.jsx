import React from "react";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/books/Books";
import CreateBook from "./pages/books/CreateBook";
import EditBook from "./pages/books/EditBook";
import DeleteBook from "./pages/books/DeleteBook";
import NavBar from "./components/NavBar";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";
import Users from "./components/User/User";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import Notes from "./components/Note/Note";
axios.defaults.baseURL = "http://localhost:5555/api";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <div>
      <NavBar />
      <Toaster position="bottom-left" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />

        {/* dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* books */}
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />

        {/* Notes */}
        <Route path="/notes" element={<Notes />}></Route>
      </Routes>
    </div>
  );
};

export default App;
