import { Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";


function App() {
  return (
    <div>
      <Routes>
      <Route path="/post/:id" element={<Post />} />
      <Route path="/" element={<Analytics />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
