import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth/AuthProvider.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
