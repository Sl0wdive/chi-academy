import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHeroById } from "../api/rickAndMorty";
import { Box, Typography, Avatar } from "@mui/material";

const Hero = () => {
  const { id } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    getHeroById(id).then(setHero);
  }, [id]);

  if (!hero) return null;

  return (
    <Box sx={{ width: 300 }}>
      <Avatar src={hero.image} sx={{ width: 200, height: 200 }} />
      <Typography variant="h6">{hero.name}</Typography>
      <Typography>Status: {hero.status}</Typography>
      <Typography>Species: {hero.species}</Typography>
    </Box>
  );
};

export default Hero;
