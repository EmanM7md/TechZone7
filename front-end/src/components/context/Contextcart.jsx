import React, { use, useEffect } from 'react'
import { useState } from 'react'
export const CartContext = React.createContext();
export default function CartProvider({children}) {

// this function to add favorite item
let [favorites, setFavorites] = React.useState(function () {
  const favorites=localStorage.getItem("favorites");
  if(favorites){
    return JSON.parse(favorites); 
  }
  return [];
});
  // this function add the item
  let [cartItems, setCartItems] = React.useState(function (){
    const cartItems=localStorage.getItem("cartItems");
    if(cartItems){
      return JSON.parse(cartItems);
    }
    return [];

  });
  
// when to add to cart you can push quantity attribute
  const addToCart =(item)=>{
      setCartItems([...cartItems, {...item, quantity:1}]);
  }
  let addToFavorite = (item) => {
    setFavorites((prev)=>{
      if(prev.some((fav) => fav.id === item.id)){
        return prev;
      }
      return [...prev, item];
    })
    setFavorites([...favorites, item]);
  }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  },[favorites]);
  // this function make a plus one for each item
  const plusQuantity = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity:item.quantity + 1 } ;
        }
        return item;
      })
    );
  }
// this function make a minus one for each item
  const minusQuantity = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1? item.quantity - 1 : 1 };
        }
        return item;
      })
    );
  }
  // this function remove the item
  const removeFromCart = (id) => {
  
  setCartItems((prev) => prev.filter((item) => item.id !== id));
    
  };  
  const removefavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  }
  return (
    <div>
      <CartContext.Provider value={{cartItems, addToCart, favorites,addToFavorite,removefavorite, plusQuantity, minusQuantity,removeFromCart}}>
        {children}
      </CartContext.Provider>
    </div>
  )
}


// context folder inside it 
// cartcontext
// cartprovider

// notes for me  