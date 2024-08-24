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

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        {/* users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />


        {/* books */}
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    </div>
  );
};

export default App;
