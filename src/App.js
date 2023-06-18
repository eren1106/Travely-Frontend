import { Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Analytics from "./pages/Analytics";
import ForgetPassword from "./pages/ForgetPassword"
import GoogleLogout from "./pages/GoogleLogout";
import Search from "./pages/Search"
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import { UserContext, UserProvider } from "./userContext";
import { useContext } from "react";
function App() {

  //context API to get userID
  const { user } = useContext(UserContext);

  return (
      <div>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/logout" element={<GoogleLogout />} /> */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
  );
}

export default App;
