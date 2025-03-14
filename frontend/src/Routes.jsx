import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import ClubEvents from "./pages/ClubEvents";
import ViewEvents from "./pages/ViewEvents.jsx";
const AppRoutes = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create_event" element={<CreateEvent />} />
      <Route path="/club_events" element={<ClubEvents />} />
      <Route path="/view_events" element={<ViewEvents />} />
    </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
