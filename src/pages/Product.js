import { useState } from "react";
import { useLocation } from "react-router";
import { useCart } from "../contexts/cartContext";
export default function Product(props) {
  const location = useLocation();
  const product = location.state.item;
  const [amount, setAmount] = useState(1);
  const { addToCart, items } = useCart();
  const findCartItem = items.find((item) => item.id === product.id);
  const handleAmount = (e) => {
    if (e === "incr") {
      setAmount(amount + 1);
    } else if (e === "decr") {
      amount > 1 && setAmount(amount - 1);
    }
  };
  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image">
          <img src={product.image} alt="" />
        </div>
        <div className="product-property">
          <h1 className="product-name">{product.title}</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="product-price">
              <h3>{product.price} $</h3>
            </span>
            <span className="product-rate">Rate: {product.rating.rate}</span>
          </div>

          <h4 className="product-reviews">Reviews: {product.rating.count}</h4>
          <button
            className="product-btn"
            onClick={() => addToCart(product, findCartItem)}
          >
            {findCartItem ? "Remove from Cart" : "Add to Cart"}
          </button>
          <div className="product-amount">
            <button onClick={() => handleAmount("decr")}>-</button>
            <span>{amount}</span>
            <button onClick={() => handleAmount("incr")}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
