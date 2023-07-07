import { Box } from "@mui/material";
import LibrarianLogin from "./pages/auth/LibrarianLogin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Books from "./pages/book/Books";
import CreateBook from "./pages/book/CreateBook";
import Users from "./pages/user/Users";

function App() {
  return (
    <Box>
      <BrowserRouter>
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
      </BrowserRouter>

      <ToastContainer />
    </Box>
  );
}

export default App;
