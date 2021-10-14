import React from "react";
import { useCart } from "../contexts/cartContext";

export default function Cart() {
  const { removeFromCart } = useCart();
  const items = useCart();
  const total = items.items.reduce((acc, obj) => acc + obj.price, 0);
  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "3rem", borderBottom: "4px solid #000" }}>
        Your Cart
      </h2>
      {console.log(items.items.length)}
      {items.items.length < 1 && <h2>You have not any items in your cart</h2>}
      {items.items.length > 0 && (
        <div style={{ display: "flex" }}>
          <ul
            style={{ width: "60%", display: "flex", flexDirection: "column" }}
          >
            {items.items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  margin: "1rem",
                  backgroundColor: "white",
                  padding: "1rem",
                  minWidth: "700px",
                  borderRadius: "1rem",
                }}
              >
                <div
                  className="cartImage"
                  style={{ minWidth: "300px", textAlign: "center" }}
                >
                  <img
                    src={item.image}
                    alt="cart image"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
                <div style={{ width: "400px", paddingLeft: "1rem" }}>
                  <h2 className="cart-title">{item.title}</h2>
                  <h2 className="cart-price">{item.price} TL</h2>
                  <button
                    className="remove-cart"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div
            style={{ width: "40%", fontSize: "1.5rem" }}
            className="order-summary"
          >
            <h1>Order Summary</h1>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td style={{ textAlign: "right" }}>{total}$</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td style={{ textAlign: "right" }}>
                  Calculated at the next step
                </td>
              </tr>
              <tr style={{ fontWeight: "700" }}>
                <td>Total</td>
                <td style={{ textAlign: "right" }}>{total}$</td>
              </tr>
            </tbody>
          </div>
        </div>
      )}
    </div>
  );
}
