import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import UserDetails from "./components/UserDetails/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:userId" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;