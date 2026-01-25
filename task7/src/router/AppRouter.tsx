import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Heroes from "../pages/Heroes";
import About from "../pages/About";
import Layout from "../components/Layout/Layout";
import NoPageFound from "../pages/NoPageFound";

const AppRouter = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/heroes" element={<Heroes />} />
      <Route path="/heroes/:id" element={<Heroes />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NoPageFound />} />
    </Route>
  </Routes>
);

export default AppRouter;
