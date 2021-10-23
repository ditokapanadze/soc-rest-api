import { Redirect, Route } from "react-router-dom";
import decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    try {
      const { exp } = decode(token);
      console.log(exp);
      console.log(new Date().getTime());

      if (exp * 1000 < new Date().getTime()) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default PrivateRoute;
