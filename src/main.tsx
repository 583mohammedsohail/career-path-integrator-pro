import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RealtimeApplicationProvider } from "./contexts/RealtimeApplicationContext";
import App from "./App";
import "./index.css"; // Ensure Tailwind CSS is imported
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RealtimeApplicationProvider>
          <App />
          <Toaster position="top-right" richColors />
        </RealtimeApplicationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);