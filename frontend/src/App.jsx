/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import LibrarianLogin from "./pages/auth/LibrarianLogin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Books from "./pages/book/Books";
import CreateBook from "./pages/book/CreateBook";
import Users from "./pages/user/Users";
import { getCache } from "./utils/cache";
import { useEffect } from "react";

function App() {
  const isAuthorize = !!getCache("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorize) {
      navigate("/login");
    }
  }, [isAuthorize]);

  return (
    <Box>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login-admin" element={<LibrarianLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Books />} />
          <Route path="/create" element={<CreateBook />} />
          <Route path="/lists" element={<Users />} />
        </Route>
      </Routes>

      <ToastContainer />
    </Box>
  );
}

export default App;
