
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import { motion } from 'framer-motion/client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Products from "../components/slide/Products";
import "../components/slide/slide.css";


import React, {  useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Pagetransition from "../components/pagetransition";


export default function Showproducts() {
    let {category} = useParams();
    let [products, setProducts] = React.useState([]);
    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
    },[category])
  
  return (
    <Pagetransition>

      <div className="container" style={{minHeight:"60vh"}}>
      <h1  style={{textTransform:"capitalize", padding:"20px 0px",textAlign:"center", color:"var(--main_color)"}}>{category} : {products.length}</h1>
      <h4 style={{textTransform:"capitalize", fontStyle:"italic",padding:"20px 0",textAlign:"center"}}>We are here to help you find the product you are looking for</h4>
    <Swiper
            loop={products.length > 3 ? true : false}
              
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            slidesPerView={4}
            spaceBetween={16}
            
            breakpoints={{
              320:{
                
                slidesPerView: "auto",
                spaceBetween: 8,
                
              }
              ,
              540: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween:32,
              },
            }}
            
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            {products.map((product) => (
              
              <SwiperSlide key={product.id}>
                <Products product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
    
    </div>
    </Pagetransition>
  )
}
