import { Link } from "react-router-dom";
import Styles from "./Product.module.css";

const Product = ({ imageUrl, description, price, name, productId }) => {
  return (
    <div className={Styles.product}>
      <img src={imageUrl} alt={name} />

      <div className={Styles.product__info}>
        <p className={Styles.info__name}>{name}</p>

        <p className={Styles.info__description}>
          {description.substring(0, 100)}...
        </p>

        <p className={Styles.info__price}>${price}</p>

        <Link to={`/product/${productId}`} className={Styles.info__button}>
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
