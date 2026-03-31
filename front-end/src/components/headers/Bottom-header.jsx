import  React,{ useEffect} from "react";

import { Link,  useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

import { IoIosArrowDown } from "react-icons/io";
import "./header.css";

export default function Bottomheader() {
  let [isact, setIsact] = React.useState(false);
  let mainlinks= [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
   
    {
      name: "Blog",
      url: "/blog",
    },
    {
      name: "Contact",
      url: "/contact",
    }
  ];
  let location= useLocation();
  let [isactive, setIsactive] =React.useState(false);
useEffect(() => {

    setIsactive(false);

},[location.pathname]);

  const [categories, setCategories] =React.useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);


  return (
    <div className="bottom_header">
      <div className="container">
        <nav className="nav">
          <div className="category-nav">
            <div className="category-btn" onClick={()=>{
              setIsactive(!isactive)
            }}>
              <IoMenu />
              <h4>All Categories</h4>
              <IoIosArrowDown />
            </div>
            <div className="category-nav-list">
             
              <ul className={`allcategories ${isactive ? "active" : ""}`}>
                {categories.map((category) => {
                  return (
                    <Link to={`/products/category/${category.slug}`} key={category.url} >
                      {category.name}
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
        <div className="links">
           <span className="burger_menu">
                 <IoMenu  className="burger_menu"
                onClick={() => {
                  setIsact(!isact);
                }}
            />

           </span>
          <div className={`alllinks ${isact ? "active_list" : ""}`}>
              <span className="ico" onClick={()=>{
                setIsact(!isact)
              }}>X</span>
                {
                  mainlinks.map((link) => {
                    return (
                    
                      <li className={location.pathname===link.url ?"active":""} key={link.name} onClick={()=>{
                        setIsact(!isact)
                      }}><Link to={link.url}>{link.name}</Link></li>
                      
                    );
                  })
                }
          </div>
          <div className="login-sigup">
          <Link to={'/login'} >  <CiLogin  className="login"/> </Link>
           <Link to={'/signup'} > <CiUser  className="user"/> </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
