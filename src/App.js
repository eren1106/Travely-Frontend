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
import { UserContext } from "./userContext";
import { useContext } from "react";
function App() {

  //context API to get userID
  const { user } = useContext(UserContext);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<GoogleLogout />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<Search/>}/>
      </Routes> 
    </div>
  );
}

export default App;
