import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Heroes from "../pages/Heroes.jsx";
import About from "../pages/About.jsx";
import Layout from "../components/Layout/Layout.jsx";
import NoPageFound from "../pages/NoPageFound.jsx";

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
