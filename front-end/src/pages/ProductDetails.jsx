import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdStarHalf } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import Loading from "../components/loading";
import { CartContext } from "../components/context/Contextcart";
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import Slide from "../components/slide/Slide";
import { BsCartCheck } from "react-icons/bs";
import toast from "react-hot-toast";
import Pagetransition from "../components/pagetransition";

export default function ProductDetails() {
  const { addToCart, cartItems, addToFavorite, favorites, removefavorite } =
    React.useContext(CartContext);

  const { id } = useParams();
  let [item, setItem] = React.useState({});
  let [list, setList] = React.useState([]);
  let [isfound, setIsfound] = React.useState(true);
  let [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
    let fetchData = async () => {
      try {
        let res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product Not Found");
        let data = await res.json();
        setItem(data);
      } catch (err) {
        setIsfound(false);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    if (!item.category) return;
    fetch(`https://dummyjson.com/products/category/${item.category}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data.products);
        setLoading(false);
      });
  }, [item.category]);
  //  function sound
  let isfavorite = favorites.some((fav) => fav.id === item.id);

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
  //
  let fireAlert = () => {
    addToCart(item);
    playSound();
    toast.success(
      <div className="toast">
        <img src={item.images ? item.images[0] : item.images[1]} alt="image" />
        <div className="content">
          <p>{item.title}</p>
          <p>$ {item.price}</p>
        </div>

        <Link to={"/cart"}>View Cart</Link>
      </div>,
      { duration: 3500 },
    );
  };
let handelFavorite = () => {
  if(isfavorite){
    removefavorite(item.id);
    toast.error(`removed from favorites ${item.title}`,{ duration:3500});

  } 
    
  else{
    addToFavorite(item);
    toast.success(`added to favorites ${item.title}`,{ duration:3500});
    playSound();
  }
  }
  
  if (!isfound) {
    return (
      <div className="not_found">
        <div className="container">
          <h2>Product Not Found</h2>
          <Link to="/">
            <button className="btn">Go Home</button>
          </Link>
        </div>
      </div>
    );
  }
  let isInCart = cartItems.find((itemCart) => itemCart.id === item.id);

  return (
    <Pagetransition key={item.id}>
      <div className="item_details">
        <div className="container">
          <div className="imgs_items">
            <img className="big_img" src={item.images?.[0]} alt="photo" />

            <div className="sms_imgs">
              {item.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="photo"
                  onClick={() => {
                    document.querySelector(".big_img").src = img;
                  }}
                />
              ))}
            </div>
          </div>
          <div className="details">
            <h1 className="product_name">{item.title}</h1>
            <div className="stars">
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
              <MdStarHalf />
            </div>
            <p className="price">
              Price :<span>${item.price}</span>
            </p>
            <h4 className="availability">
              Availability:
              <span>
                {item.availabilityStatus
  }
              </span>
            </h4>
            <h4 className="brand">
              Brand :<span>{item.brand ? item.brand : item.category}</span>
            </h4>
            <h4 className="description">
              Description :<span>{item.description}</span>
            </h4>
            <h4 className="stock">
              
              {item.stock ? (
                <span>hurry up only {item.stock} in stock</span>
              ) : (
                <span>Out of stock</span>
              )}
            </h4>
            {/* {btn add-to-cart} */}
            {
              <button
                className={`btn add-to-cart ${isInCart ? "added" : ""}`}
              onClick={fireAlert}
              disabled={!item.stock}
              >
                {/* {isInCart ? "Added in Cart" : "Add To Cart"} */}
                {!item.stock ? "Out of stock":isInCart ? "Added in Cart": "Add To Cart"}
                {isInCart ? <BsCartCheck /> : <IoCartOutline />}
              </button>
            }
            <br />
          </div>
        </div>
      </div>
      <div className="container">
        {loading && <Loading />}
        <Slide title={item.category} />
      </div>
    </Pagetransition>
  );
}
