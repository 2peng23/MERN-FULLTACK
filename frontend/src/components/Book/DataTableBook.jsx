import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'year', headerName: 'Year Published', width: 150 },
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Link to={`/books/show/${params.row.id}`}>
          <FaInfoCircle style={{ color: 'green', fontSize: '24px' }} />
        </Link>
        <Link to={`/books/edit/${params.row.id}`}>
          <CiEdit style={{ color: 'yellow', fontSize: '24px' }} />
        </Link>
        <Link to={`/books/delete/${params.row.id}`}>
          <MdDelete style={{ color: 'red', fontSize: '24px' }} />
        </Link>
      </div>
    ),
  },
];

const DataTable = ({ books }) => {
  const rows = books.map((book, index) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10} // Number of rows per page
        rowsPerPageOptions={[10, 20, 50]} // Options for rows per page
        pagination
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
