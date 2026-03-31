import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import "./header.css";
import Searchbox from "./searchbox";
import { useContext } from "react";
import { CartContext } from "../context/Contextcart";
export default function Topheader() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="top_header">
      <div className="container">
        <Searchbox className="srch" />

        <div className="header_icons">
          <div className="icon">
            <Link to={"/Cart"}>
              <IoCartOutline className="cart" />
              <span className="items_count">{cartItems.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
