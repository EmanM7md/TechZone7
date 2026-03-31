import React from "react";
import HeroSlider from "../../components/headers/HeroSlider";
import { Link } from "react-router-dom";
import "./Home.css";
import Slide from "../../components/slide/Slide";
import Pagetransition from "../../components/pagetransition";
export default function Home() {
  
  let categories=[
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
]
  return (
    <Pagetransition>
    <div>
      <HeroSlider />
       <div className="big_title">
      <div className="container">
          <h2>All Categories</h2>
        <div className="all_sections">
          {
            categories.map((category)=>
            <span key={category}><Link to={`/products/category/${category}`}> {category}</Link></span>)}
        </div>
      </div>
    </div>
      {
        categories.map((category)=><Slide key={category} title={category} />)
      }
  
    </div>
    </Pagetransition>
  );
}
