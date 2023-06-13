import { Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login"
import Register from "./pages/Register"
import CountryCard from "./pages/SelectCountry";
import PostModal from './components/PostModal'
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/country" element={<CountryCard />} />
      </Routes> 
    </div>
  );
}

export default App;
