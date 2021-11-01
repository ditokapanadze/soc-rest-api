import Home from "./pages/home/Home";
import "./App.css";
import Profile from "./pages/profiel/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./routing/PrivateRoute";
import { getUser } from "./apiCalls";

function App() {
  const token = localStorage.getItem("token");
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    console.log("asd");
    getUser(dispatch);
  }, []);
  console.log(user);
  user === null ? console.log("aris") : console.log("Ara");

  return (
    // <Router>
    //   <Switch>
    //     {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route> */}
    //     <Route path="/login">
    //       <Login />
    //     </Route>
    //     <Route path="/register">
    //       <Register />
    //     </Route>
    //     <Route path="/profile/:username">
    //       <Profile />
    //     </Route>
    //     <PrivateRoute path="/" component={Home} />
    //   </Switch>
    // </Router>
    <Router>
      <Switch>
        {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route> */}

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">{token ? <Redirect to="/" /> : <Login />}</Route>

        {/* <Route path="/login">{token ? <Login /> : <Redirect to="/" />}</Route> */}

        <PrivateRoute path="/profile/:username" component={Profile} />
        {/* <Route path="/profile/:username">
          <Profile />
        </Route> */}
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
