import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "status", headerName: "Status", width: 120 },
];

const HeroesTable = ({ heroes }) => {
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`/heroes/${params.id}`);
  };

  return (
    <DataGrid
      rows={heroes}
      columns={columns}
      pageSize={10}
      initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      onRowClick={handleRowClick}
      sx={{
        "& .MuiDataGrid-row": {
          cursor: "pointer",
          transition: "all 0.2s",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "action.hover",
          transform: "scale(1.01)",
        },
      }}
    />
  );
};

export default HeroesTable;