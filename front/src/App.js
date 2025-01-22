import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage"; // Page for listing all users
import UserPage from "./pages/UserPage"; // Page for viewing a single user and their cities

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/users" element={<UsersPage />} /> 
          <Route path="/users/:userId" element={<UserPage />} /> 
          <Route path="/" element={<h1>Welcome! Select Users to Begin</h1>} /> {/* Default Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;