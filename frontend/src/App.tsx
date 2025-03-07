import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Signin from "./components/Signin";
import CreatePost from "./components/article/CreatePost";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/CreatePost" element={<CreatePost />} />
    </Routes>
  );
}

export default App;
