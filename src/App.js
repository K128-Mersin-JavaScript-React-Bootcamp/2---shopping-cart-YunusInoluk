import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Stores from "./pages/Stores";
import About from "./pages/About";
import Login from "./pages/Login";
import "antd/dist/antd.css";
import Product from "./pages/Product";
import { useCart } from "./contexts/cartContext";
import Cart from "./pages/Cart";
function App() {
  const { items } = useCart();
  return (
    <Router>
      <div>
        <nav>
          <div className="left">
            <ul>
              <li>
                <Link className="logo" to="/">
                  Logo
                </Link>
              </li>
              <li>
                <Link className="menu-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="menu-link" to="/stores">
                  Stores
                </Link>
              </li>
              <li>
                <Link className="menu-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <div className="search">
              <input className="search-input" type="text" />
              <button className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="right">
            <div className="cart">
              <Link to="/cart">
                <i className="fas fa-shopping-bag"></i>
                <span className="cart-item-count">({items.length})</span>
              </Link>
            </div>
            <Link className="menu-link" to="/login">
              Login
            </Link>
          </div>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/stores">
            <Stores />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
