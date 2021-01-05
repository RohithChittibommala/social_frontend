import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login_Register/Login.jsx";
import Profile from "./components/Profile/Profile.jsx";
import CreatePost from "./components/createpost/CreatePost.jsx";
import Register from "./components/Login_Register/Register.jsx";
import Toast from "./components/Toasts/Toast";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./components/state/Store";
import { useEffect } from "react";
function App() {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) history.push("/login");
  }, [history]);
  return (
    <StoreProvider>
      <Navbar />
      <Toast />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </StoreProvider>
  );
}

export default App;
