import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login_Register/Login";
import Profile from "./components/Profile/Profile";
import CreatePost from "./components/create-post/CreatePost";
import Register from "./components/Login_Register/Register";
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </>
  );
}

export default App;
