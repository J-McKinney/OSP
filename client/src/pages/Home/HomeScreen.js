import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product/Product";
import { getProducts as listProducts } from "../../redux/actions/productActions";
import Styles from "./HomeScreen.module.css";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, err } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

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
        setError("You are not authorized please login HomeScreen.js");
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
      <div className={Styles.homescreen}>
        <h2 className={Styles.homescreen__title}>Latest Products</h2>
        <div className={Styles.homescreen__products}>
          {loading ? (
            <h2>Loading...</h2>
          ) : err ? (
            <h2>{err}</h2>
          ) : (
            products.map((product) => (
              <Product
                key={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                productId={product._id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PrivateScreen;
