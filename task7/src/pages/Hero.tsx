import React from "react";
import { useParams } from "react-router-dom";
import { getHeroById } from "../api/rickAndMorty";
import { Box, Typography, Avatar } from "@mui/material";
import { useRequest } from "ahooks";

interface Hero {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

const Hero = () => {
  const { id } = useParams<{ id: string }>();

  const { data: hero, loading } = useRequest(() => getHeroById(id!), {
    ready: !!id,
    refreshDeps: [id],
  });

  if (!hero) return null;

  return (
    <Box sx={{ width: 200 }}>
      <Avatar src={hero.image} sx={{ width: 200, height: 200 }} />
      <Typography variant="h6">{hero.name}</Typography>
      <Typography>Status: {hero.status}</Typography>
      <Typography>Species: {hero.species}</Typography>
    </Box>
  );
};

export default Hero;
