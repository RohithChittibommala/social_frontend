import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login_Register/Login.jsx";
import Profile from "./components/Profile/Profile.jsx";
import CreatePost from "./components/createpost/CreatePost.jsx";
import Register from "./components/Login_Register/Register.jsx";
import Toast from "./components/Toasts/Toast";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import { useContext } from "react";
import { Store } from "./components/state/Store";
import OtherUserProfile from "./components/Profile/OtherUserProfile";
import NotFound from "./components/404/NotFound";
function App() {
  const [state] = useContext(Store);
  const { isAuthenicated } = state;
  return (
    <>
      {isAuthenicated && <Navbar />}
      <Toast />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/profile/:id" component={OtherUserProfile} />
        <Route exact path="/reset/:id" component={ResetPassword} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
