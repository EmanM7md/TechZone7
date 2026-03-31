import React from "react";
import { useContext } from "react";
import { CartContext } from "../components/context/Contextcart";
import { IoTrashBinOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import './cart.css'
import Pagetransition from "../components/pagetransition";
export default function Cart() {
  const { cartItems,plusQuantity,minusQuantity,removeFromCart } = useContext(CartContext);

  
let totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <Pagetransition>
    <div className="checkout">
      <div className="orderSummary">
        <h1>Order Summary</h1>
        <div className="items">
          {cartItems.length === 0 ? (
            <p style={{textAlign:"center", fontWeight:"bold",margin:"20px auto",textTransform:"capitalize"}}>No items in cart</p>
          ) : (
            cartItems.map((item, index) => {
              return (
                <div className="itemCart" key={index}>
                  <div className="item_img">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                    />
                  </div>
                  <div className="content">
                    <h4 className="item_name">{item.title}</h4>
                    <p className="item_price">$ {item.price}</p>
                    <div className="item_quantity">
                        <button className="minus" onClick={()=>{
                          minusQuantity(item.id);
                          
                          
                        }}>-</button>
                        <span>{item.quantity}</span>
                        <button className="plus" onClick={()=>{
                          plusQuantity(item.id);
                          
                        }}>+</button>
                    </div>
                  </div>
                  <button className="remove" onClick={()=>{
                    Swal.fire({
                      icon: 'warning',
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        removeFromCart(item.id)
                        Swal.fire(
                          'Deleted!',
                          `Your ${item.title} has been deleted from cart.`,
                          'success'
                        )
                      }
                    
                    })
                  }}>
                    <IoTrashBinOutline />
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div className="btn_summary">
            <div className="shop_table">
                <p>Total : </p>
                <p className="total_checkout">$ {(totalPrice).toFixed(2)}</p>
            </div>
            <div className="submit_table">
              <button type="submit">Place Order</button>
            </div>
        </div>
      </div>
    </div>
    </Pagetransition>
  );
}
