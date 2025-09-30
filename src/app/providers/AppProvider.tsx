import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { Toaster } from "sonner";
import "../global.css";
import RoutesProvider from "./RoutesProvider";

const queryClient = new QueryClient();

export default function AppProvider() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RoutesProvider />
        <Toaster richColors />
      </QueryClientProvider>
    </StrictMode>
  );
}
