import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Sleep from "./Pages/Sleep";
import Todo from "./Pages/Todo";
import User from "./Pages/User";
import AvatarPick from "./Pages/AvatarPick";
import Splash from "./Pages/Splash";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/splash" element={<Splash />} />
      <Route path="/avatar" element={<AvatarPick />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/user" element={<User />} />
      </Route>

    </Routes>
  );
}

export default App;