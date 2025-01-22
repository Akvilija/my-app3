import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage"; 
import UserPage from "./pages/UserPage"; 
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
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