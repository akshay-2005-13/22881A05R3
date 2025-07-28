import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import URLShortenerForm from "../components/URLShortenerForm";
import URLStats from "../components/URLStats";
import RedirectHandler from "../components/RedirectHandler";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<URLShortenerForm />} />
        <Route path="/stats" element={<URLStats />} />
        <Route path="/*" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
