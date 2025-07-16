import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import { RealtimeApplicationProvider } from "./contexts/RealtimeApplicationContext";
import App from "./App";
import "./index.css"; // Ensure Tailwind CSS is imported
import { Toaster } from "sonner";
import ParticlesBackground from '@/components/ui/ParticlesBackground';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RealtimeApplicationProvider>
        <ParticlesBackground />
        <App />
        <Toaster position="top-right" richColors />
      </RealtimeApplicationProvider>
    </AuthProvider>
  </React.StrictMode>
);