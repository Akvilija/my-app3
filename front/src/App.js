import egypt1 from "./images/egypt1.jpg";
import "./App.scss";
import Egypt from "./Egypt";

import "./index.css";
import egypt2 from "./images/egpyt2.jpg";

import UserList from "./UserList";

function App() {
  return (
    <div>
      <Egypt />
      <img src={egypt1} alt="Logo" />
      <img src={egypt2} alt="Logo" />
      <UserList />
    </div>
  );
}



export default App;
