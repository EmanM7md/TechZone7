import { RiStarSFill } from "react-icons/ri";

import { MdStarHalf } from "react-icons/md";

import { IoCartOutline } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/Contextcart";
import { BsCartCheck } from "react-icons/bs";
import toast from "react-hot-toast";


export default function Products({ product }) {
  let { addToCart, cartItems , addToFavorite, favorites, removefavorite} = useContext(CartContext);
  let isInCart = cartItems.some((item) => item.id === product.id);
  let isfavorite = favorites.some((fav) => fav.id === product.id);

  let handelFavorite = () => {
  if(isfavorite){
    removefavorite(product.id);
    toast.error(`removed from favorites ${product.title}`,{ duration:3500});

  } 
    
  else{
    addToFavorite(product);
    toast.success(`added to favorites ${product.title}`,{ duration:3500});
    playSound();
  }
  }
const playSound = () => {
  const ctx = new AudioContext();

  // Oscillator = النغمة
  const osc = ctx.createOscillator();
  osc.type = "sine"; // أجمل نغمة لطيفة

  // Gain = التحكم في الصوت
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.05, ctx.currentTime); // حجم منخفض

  // ربط oscillator مع gain ثم إلى السماعات
  osc.connect(gain);
  gain.connect(ctx.destination);

  // إعداد النغمة
  osc.frequency.setValueAtTime(1200, ctx.currentTime); // بداية عالية
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15); // انخفاض سريع

  // تشغيل الصوت
  osc.start();
  osc.stop(ctx.currentTime + 0.15); // مدة قصيرة
};



  let fireAlert = ()=>{
    addToCart(product);
    playSound();
    toast.success(
      <div  className="toast">
        <img src={product.images ? product.images[0] : product.images[1]} alt="image" />
        <div className="content">
        <p>{product.title}</p>
          <p>$ {product.price}</p>

        </div>
        
          <Link to={'/cart'}>View Cart</Link>
          
      </div>  ,{duration:3500}
    )
    
  }
  return (
    <div className={`product ${isInCart ? "inCart" : ""} ${isfavorite ? "favorite" : ""}`}>
      <Link to={`/products/${product.id}`}>
        {isInCart && (
          <span className="inCartWord outside">
            Item in Cart <BsCartCheck />
          </span>
        )}
        <div className="img_product">
          <img
            src={product.images ? product.images[0] : product.images[1]}
            alt="photo"
          />
        </div>

        <p className="product_name">{product.title}</p>

        <div className="stars">
          <RiStarSFill />
          <RiStarSFill />
          <RiStarSFill />
          <RiStarSFill />

          <MdStarHalf />
        </div>
        <p className="price">price : ${product.price}</p>
        <p className="price">rating : {product.rating}</p>

        <div className="icons-cart">
          <span onClick={ function(){
            
            fireAlert();

          }
            }>
            <IoCartOutline />
          </span>
          <span>
            <FaShareAlt />
          </span>
        </div>
      </Link>
    </div>
  );
}
