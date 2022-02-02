import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Routing
import PrivateRoute from "./routing/PrivateRoute";
// Screens
import HomeScreen from "./pages/Home/HomeScreen";
import LoginScreen from "./pages/Login/LoginScreen";
import RegisterScreen from "./pages/Register/RegisterScreen";
import ForgotPasswordScreen from "./pages/ForgotPassword/ForgotPasswordScreen";
import ResetPasswordScreen from "./pages/ResetPassword/ResetPasswordScreen";
import ProductScreen from "./pages/Product/ProductScreen";
import CartScreen from "./pages/Cart/CartScreen";

import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          {/* Public routes */}
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
          {/* Public routes */}

          {/* We want to protect these routes */}
          <>
            <Navbar />
            <PrivateRoute exact path="/" component={HomeScreen} />
            <PrivateRoute exact path="/product/:id" component={ProductScreen} />
            <PrivateRoute exact path="/cart" component={CartScreen} />
          </>
          {/* We want to protect these routes */}
        </Switch>
      </Router>
    </>
  );
};

export default App;
