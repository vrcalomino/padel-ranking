import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
        <Helmet>
          <title>LAUQUEN PADEL TOUR</title>
          <link rel="icon" href="../public/img/pelota-tenis.png" />
        </Helmet>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
