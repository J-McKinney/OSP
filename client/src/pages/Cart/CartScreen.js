import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import Styles from "./CartScreen.module.css";

const Checkout = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login CartScreen.js");
      }
    };

    fetchPrivateDate();
  }, [privateData]);

  return error ? (
    <>
      <span className="error-message">{error}</span>
      <Link to="/login">
        <Button variant="primary">Login</Button>
      </Link>
    </>
  ) : (
    <>
      <div className={Styles.cartscreen}>
        <div className={Styles.cartscreen__left}>
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty{" "}
              <Link style={{ textDecoration: "none", width: "10%" }} to="/">
                <Button className={Styles.goBack}>Go Back</Button>
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className={Styles.cartscreen__right}>
          <div className={Styles.cartscreen__info}>
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button>Proceed To Checkout</button>
          </div>
          <div>
            <Link to="/">
              <button>Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
