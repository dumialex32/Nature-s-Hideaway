import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// React toaster comp
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import ElementNotFound from "./ui/ElementNotFound";
import Account from "./pages/Account";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Users from "./pages/Users";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<ElementNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        glutter={8}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          duration: 3000,
          style: {
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "var(-color-brand-600)",
            },
          },

          error: {
            duration: 5000,
            theme: {
              primary: "var(--color-red-700)",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
