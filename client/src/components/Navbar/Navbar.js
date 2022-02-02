import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Styles from "./Navbar.module.css";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const logout = async () => {
    localStorage.removeItem("authToken");
  };

  return (
    <>
      <nav className={Styles.navbar}>
        <Link style={{ textDecoration: "none" }} to="/">
          <div className={Styles.navbar__logo}>
            <h2>Old School Products</h2>
          </div>
        </Link>

        <ul className={Styles.navbar__links}>
          <li>
            <Link to="/cart" className={Styles.cart__link}>
              <i className="fas fa-shopping-cart"></i>
              <span>
                Cart{" "}
                <span className={Styles.cartlogo__badge}>{getCartCount()}</span>
              </span>
            </Link>
          </li>
          <li>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
