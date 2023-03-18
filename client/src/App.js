import Topbar from "./components/Topbar.js";
import Home from "./pages/Home.js";
import Singlepost from "./pages/Single/Singlepost.js";
import Write from "./pages/Write/Write.js";
import Updateuser from "./pages/UpdateUserDetails/Updateuser.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Registration/Register.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context.js";

function App() {
  const {user} = useContext(Context) ;
  return (
    <div className="App">
      
      <Router>
      <Topbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route
            path="/update"
            element={user ? <Updateuser /> : <Register />}
          />
          <Route path="/post/:postId" element={<Singlepost />} />
        </Routes>
      </Router>
      {/* <Home/> */}
      {/* <Singlepost/> */}
      {/* <Write/> */}
      {/* <Updateuser/> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </div>
  );
}

export default App;
