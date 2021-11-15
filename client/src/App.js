import Home from "./pages/home/Home";
import "./App.css";
import Profile from "./pages/profiel/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import decode from "jwt-decode";
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
import { HideRoute } from "./routing/PrivateRoute";
import { getUser } from "./apiCalls";
import { register } from "./context/AuthActions";
import Messanger from "./components/messanger/Messanger";
function App() {
  const token = localStorage.getItem("token");
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    console.log("asd");
    getUser(dispatch);
  }, []);

  const chekcToken = () => {
    if (!token) {
      return false;
    }
    const { exp } = decode(token);
    console.log(exp);
    console.log(new Date().getTime());
    try {
      const { exp } = decode(token);
      console.log(exp);
      console.log(new Date().getTime());

      if (exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("token");
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route path="/messanger">
          <Messanger />
        </Route>

        <HideRoute path="/login" component={Login} />
        <HideRoute path="/register" component={Register} />

        {/* <Route path="/register">{<Register />}</Route> */}

        <PrivateRoute path="/profile/:username" component={Profile} />
        <PrivateRoute path="/post/:id" component={Home} />

        <PrivateRoute path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
