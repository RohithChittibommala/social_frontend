import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login_Register/Login";
import Profile from "./components/Profile/Profile";
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </>
  );
}

export default App;
