import {BrowserRouter,Routes, Route} from "react-router-dom"
import HomePage  from "./components/HomePage"
import LoginPage from "./components/LoginPage"
import ProfilePage  from "./components/ProfilePage"

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginPage/>}/>
      </Routes>
      <Routes>
        <Route path="/home" element = {<HomePage/>}/>
      </Routes>
      <Routes>
        <Route path="/profile/:userid" element = {<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
