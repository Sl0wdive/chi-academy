import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getHeroes } from "../api/rickAndMorty";
import HeroesTable from "../components/HeroesTable.jsx";
import Hero from "./Hero.jsx";

const Heroes = () => {
  const [heroes, setHeroes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getHeroes().then(setHeroes);
  }, []);

  const handleClosePanel = () => {
    navigate("/heroes");
  };

  return (
    <Box sx={{ display: "flex", gap: 2, height: "100%", overflow: "hidden" }}>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <HeroesTable heroes={heroes} />
      </Box>
      {id && (
        <Box sx={{ width: 350, flexShrink: 0 }}>
          <Paper sx={{ p: 2, position: "sticky", top: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <IconButton
                size="small"
                onClick={handleClosePanel}
                sx={{ color: "text.secondary" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Hero />
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Heroes;