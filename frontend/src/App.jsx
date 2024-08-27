import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
import { UserContext } from "../context/userContext";

// axios.defaults.baseURL = "http://localhost:5555/api";
axios.defaults.baseURL = "http://localhost:5555/api";
axios.defaults.withCredentials = true;

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <NavBar />
      <Toaster position="bottom-left" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* Redirect logged-in users from login/register pages to dashboard */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate to="/login" />}
        />

        {/* Books routes */}
        <Route
          path="/books"
          element={user ? <Books /> : <Navigate to="/login" />}
        />
        <Route
          path="/books/create"
          element={user ? <CreateBook /> : <Navigate to="/login" />}
        />
        <Route
          path="/books/edit/:id"
          element={user ? <EditBook /> : <Navigate to="/login" />}
        />
        <Route
          path="/books/delete/:id"
          element={user ? <DeleteBook /> : <Navigate to="/login" />}
        />

        {/* Notes */}
        <Route
          path="/notes"
          element={user ? <Notes /> : <Navigate to="/login" />}
        />

        {/* Redirect from root to dashboard if user is logged in, otherwise to login */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
