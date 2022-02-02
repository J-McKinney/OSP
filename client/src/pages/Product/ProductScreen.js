import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import Styles from "./ProductScreen.module.css";

const ShoppingScreen = ({ match, history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, err, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match, product]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push(`/cart`);
  };

  const continueShopping = () => {
    history.push(`/`);
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
        setError("You are not authorized please login ProductScreen.js");
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
      <div className={Styles.productscreen}>
        {loading ? (
          <h2>Loading...</h2>
        ) : err ? (
          <h2>{err}</h2>
        ) : (
          <>
            <div className={Styles.productscreen__left}>
              <div className={Styles.left__image}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className={Styles.left__info}>
                <p className={Styles.left__name}>{product.name}</p>
                <p>Price: ${product.price}</p>
                <p>Description: {product.description}</p>
              </div>
            </div>
            <div className={Styles.productscreen__right}>
              <div className={Styles.right__info}>
                <p>
                  Price:
                  <span>${product.price}</span>
                </p>
                <p>
                  Status:
                  <span>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
                <p>
                  Qty
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <button type="button" onClick={addToCartHandler}>
                    Add To Cart
                  </button>
                </p>
                <p>
                  <button type="button" onClick={continueShopping}>
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingScreen;
