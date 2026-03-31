
import Products from '../components/slide/Products'
import React, { useContext } from 'react'
import { CartContext } from '../components/context/Contextcart'
import './favoritepage.css'
import Pagetransition from '../components/pagetransition';
export default function Favoritepage() {
   let {favorites}=useContext(CartContext);

  return (
    <Pagetransition>
      <div className='favoritePage container'>
        {favorites.length === 0  ? <h2>your favorite list is empty</h2> :(
            <>
                <h1>Favorite Page</h1>
      <h2>your favorites products: {favorites.length}</h2>
        <div className="big-container" >
          {favorites.map((fav) => {
               
              return <Products product={fav}  key={fav.id} />;
            })}
        </div>
        </>
        )}
      
    </div>
  </Pagetransition>
  )
}
