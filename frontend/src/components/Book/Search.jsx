import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import { TbTableExport } from "react-icons/tb";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

export default function SearchModule({ title, data }) {
  const exportToExcel = (data, fileName) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert data to a worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write the workbook to a file
    XLSX.writeFile(wb, fileName);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {title}
            <TbTableExport
              style={{ cursor: "pointer", fontSize: "25px" }}
              onClick={() => exportToExcel(data, title)}
            />
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
