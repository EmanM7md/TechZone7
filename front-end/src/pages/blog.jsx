import React from "react";
import { useEffect, useState } from "react";
import { SlLike , SlDislike} from "react-icons/sl";
import "./blog.css";
import Loading from "../components/loading";
import Pagetransition from "../components/pagetransition";
export default function Blog() {
  let [posts, setPosts] = React.useState([]);
  let [loading, setLoading] = React.useState(true);
 
 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/posts");
     
   
          const data = await res.json();
          setPosts(data.posts);
     
    
      
    } catch (err) {
      return console.log(err.message);
      
    }finally{
      setLoading(false);
    }
  };

  fetchPosts();
}, []);

  return (
    <Pagetransition>
    <div className="container">
      <h2 className="header-title">Blog Page</h2>
        {
            loading ? <Loading /> : (
                <>
                      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <h4 className="title">{post.title}</h4>
              <p className="body">{post.body}</p>
              <p className="views">Views : {post.views}</p>
              <div className="likes-dislikes">
                <p> <SlLike />:  <span>{post.reactions?.likes || 0}</span></p>
                <p> <SlDislike />: <span>{post.reactions?.dislikes}</span></p>
              </div>
            </div>
          );
        })}
      </div>
                
                </>
            )
        }
    </div>
    </Pagetransition>
  );
}
