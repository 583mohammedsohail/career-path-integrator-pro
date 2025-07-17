import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import { RealtimeApplicationProvider } from "./contexts/RealtimeApplicationContext";
import { UserSessionProvider } from "./contexts/UserSessionContext";
import App from "./App";
import "./index.css"; // Ensure Tailwind CSS is imported
import { Toaster } from "sonner";
import ParticlesBackground from '@/components/ui/ParticlesBackground';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserSessionProvider>
        <RealtimeApplicationProvider>
          <ParticlesBackground />
          <App />
          <Toaster position="top-right" richColors />
        </RealtimeApplicationProvider>
      </UserSessionProvider>
    </AuthProvider>
  </React.StrictMode>
);