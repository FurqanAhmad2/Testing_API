import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ScrollToTop from "./components/scrollToTop";
import { ProSidebarProvider } from "react-pro-sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthContextProvider>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
