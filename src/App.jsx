import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import CreateLink from "./pages/CreateLink";
import Redirect from "./pages/Redirect";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-link" element={<CreateLink />} />
          </Route>
          <Route element={<ProtectedRoute authOnly />}>
            <Route path="auth">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>
          <Route path="/:slug" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
