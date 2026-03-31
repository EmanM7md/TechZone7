import React from 'react'
import './skeleton.css'
export default function Skeleton() {
  return (
    <div className="container big_skeleton">
         <div  className="card">
      <div className="skeleton image"></div>
      <div className="skeleton title"></div>
      <div className="skeleton text"></div>
    
   </div>
    <div  className="card">
      <div className="skeleton image"></div>
      <div className="skeleton title"></div>
      <div className="skeleton text"></div>
    
   </div>
    
    <div  className="card">
      <div className="skeleton image"></div>
    
    
        
         <div className="skeleton title"></div>
        <div className="skeleton text"></div>
</div>
    
  </div>
    
  );
}
