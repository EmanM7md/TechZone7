import React from "react";
import { useEffect}  from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './search.css'

export default function Searchbox() {
let [searchterm, setsearchterm] = React.useState("");
let [suggestions, setsuggestions] = React.useState([]);

let navigate =useNavigate()

let handlesubmit = (e)=>{
    e.preventDefault();
    if(!searchterm) return
    navigate(`/search?query=${encodeURIComponent(searchterm.trim())}`);
    setsuggestions([]);
    
}

let handleserach = (e)=>{
  
    setsearchterm(e.target.value);
    setsuggestions([]);
    
}

useEffect(() => {
  const fetchSuggestions = async () => {
    if(!searchterm){
      setsuggestions([])
      return
    }
  
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchterm}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      const data = await response.json();
      setsuggestions(data.products.slice(0, 6) || []);
    } catch (error) {
      console.error(error);
      setsuggestions([]);
    }
  }
  let debounce = setTimeout(() => {
    fetchSuggestions();
  },300)

  return () => clearTimeout(debounce);
}, [searchterm]);


  return (
    <>
    
      <form className="searh_box" onSubmit={handlesubmit}>
        <input onChange={handleserach}
          type="text"
          placeholder="Search Here ..."
          id="search"
          name="search"
          autoComplete="off"
        />
        <button type="submit" >
          {" "}
          <FaSearch />
        </button>
        {
      suggestions.length > 0 &&  (
        <div className="search_suggestions">
          {suggestions.map((item) => (
            <Link key={item.id} to={`/products/${item.id}`} onClick={()=>{
              setsuggestions([]);
              document.getElementById("search").value = item.title; 
              
            }}> 
                <p><img src={item.images[0]} alt="photo" /> <span>{item.title}</span></p>

            </Link>
          ))}
        </div>
      ) 
    }
      </form>
      
    
    
    
  </>
  )
}
