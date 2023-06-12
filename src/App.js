import { Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Analytics from "./pages/Analytics";
import ForgetPassword from "./pages/ForgetPassword"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
