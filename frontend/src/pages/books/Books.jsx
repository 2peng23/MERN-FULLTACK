import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox, MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { DataGrid } from "@mui/x-data-grid";
import Spinner from "../../components/Spinner";
import BookInfo from "../../components/Book/BookInfo";
import SearchModule from "../../components/Book/Search";
import { IconButton, Tooltip } from "@mui/material";
import Message from "../../components/Message";
import { token } from "../../helpers/auth";
import { toast } from "react-hot-toast";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [deleteTrigger, setDeleteTrigger] = useState(0); // State to trigger useEffect
  const [color, setColor] = useState("gray");
  const nav = useNavigate();
  useEffect(() => {
    // This useEffect will run only on the initial load
    setLoading(true);
    axios
      .get("/books/")
      .then((res) => {
        setBooks(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        nav("/login");
        toast.error(err.response.data.message);
        setLoading(false);
      });
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // This useEffect will run whenever deleteTrigger changes
    axios
      .get("/books/")
      .then((res) => {
        setBooks(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteTrigger]);

  const handleOpen = (bookId) => {
    const book = books.find((b) => b._id === bookId);
    setSelectedBook(book);
    setOpen(true);
    // await axios
    //   .get(`/books/${bookId}`)
    //   .then((book) => {
    //     setSelectedBook(book.data.message);
    //     setOpen(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setOpen(false);
    //     setSelectedBook(null);
    //   });
  };
  const handleDelete = async (bookId) => {
    await axios
      .delete(`/books/${bookId}`)
      .then((book) => {
        if (book.data.success == 1) {
          setOpenMessage(true);
          setMessage("Book Deleted!");
          setDeleteTrigger((prev) => prev + 1); // Update deleteTrigger to re-run useEffect
          setColor("red");
        }
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };
  const closeMessage = () => {
    setOpenMessage(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, sortable: false },
    { field: "unique_id", headerName: "Book Id", flex: 1 },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "author", headerName: "Author", flex: 2 },
    { field: "year", headerName: "Year Published", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <Tooltip title="Book Info">
            <IconButton onClick={() => handleOpen(params.row.unique_id)}>
              <FaInfoCircle style={{ color: "green", fontSize: "24px" }} />
            </IconButton>
          </Tooltip>

          <Link to={`/books/edit/${params.row.id}`}>
            <CiEdit style={{ color: "yellow", fontSize: "24px" }} />
          </Link>
          <Tooltip
            title="Delete Book"
            onClick={() => handleDelete(params.row.unique_id)}
          >
            <IconButton onClick={() => handleDelete(params.row.unique_id)}>
              <MdDelete style={{ color: "red", fontSize: "24px" }} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = books.map((book, index) => ({
    id: index + 1,
    unique_id: book._id,
    title: book.title,
    author: book.author,
    year: book.year,
  }));

  return (
    <div className="p-4">
      <div className="flex justify-end items-center py-5">
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <SearchModule
        title={
          books.length > 1
            ? `Books (${books.length})`
            : `Book (${books.length})`
        }
        data={books}
      />

      {loading ? (
        <Spinner />
      ) : (
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            pagination
            // disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
      <Message
        message={message}
        openMessage={openMessage}
        closeMessage={closeMessage}
        color={color}
      />
      <BookInfo open={open} onClose={handleClose} book={selectedBook} />
    </div>
  );
};

export default Books;
