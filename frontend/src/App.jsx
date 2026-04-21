// import Landing from "./Pages/Landing";

// function App() {
//   return <Landing />;
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Goals from "./pages/Goals";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
