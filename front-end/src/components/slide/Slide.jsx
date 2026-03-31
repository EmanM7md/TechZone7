import React, { useEffect, useState } from "react";
import Products from "./Products";
import "./slide.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Skeleton from "../skeleton";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Slide({ title }) {
  let [products, setProducts] = React.useState([]);
  let [skeleton, setSkeleton] = React.useState(true);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${title}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products)
  ).then(() => setSkeleton(false));
    
    
  }, [title]);

  return (
    <>
      <div className="slide slide_products ">
        <div className="container">
        
          <div className="top_slide">
            <h2>{title}</h2>
            <p>
              We are ready to serve you any time for our brandes products under{" "}
              {title}
            </p>
          </div>
            {skeleton && <Skeleton />}
          <Swiper
            loop={products.length > 3 ? true : false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            
            freeMode={true}
            breakpoints={
              {
                768:{
                  slidesPerView:2,
                  spaceBetween:16,
                },
                1024:{
                  slidesPerView:3,
                  spaceBetween:16
                },
                1280:{
                  slidesPerView:4,
                  spaceBetween:16
                }
              }
            }
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
      </div>
    </>
  );
}
