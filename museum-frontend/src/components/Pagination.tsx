import React from "react";
import { Box, Button } from "@mui/material";

interface PaginationProps {
  page: number;
  lastPage: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  lastPage,
  onChange,
}) => {
  if (lastPage <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" gap={2} mt={4}>
      <Button
        variant="outlined"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </Button>

      <Button variant="text" disabled>
        {page} / {lastPage}
      </Button>

      <Button
        variant="outlined"
        disabled={page === lastPage}
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
