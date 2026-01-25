import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

interface Hero {
  id: number | string;
  name: string;
  status: string;
}

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "status", headerName: "Status", width: 120 },
];

interface HeroesTableProps {
  heroes: Hero[];
}

const HeroesTable: React.FC<HeroesTableProps> = ({ heroes }) => {
  const navigate = useNavigate();

  const handleRowClick = (params: any) => {
    navigate(`/heroes/${params.id}`);
  };

  return (
    <DataGrid
      rows={heroes}
      columns={columns}
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