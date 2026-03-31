import React from 'react'
import Pagetransition from './pagetransition'
import "./footer.css"

import { FaPhone } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";


export default function Footer() {
    let goUp = () =>{window.scrollTo(
        {top:0,
        behavior:"smooth"
        })
    }
  return (
    <div className='bg-footer'>

        <p className='up' onClick={()=>{
            goUp()
        }}> < FaArrowAltCircleUp/></p>
    
    <Pagetransition>

    <div className='container'>
      <Pagetransition>
        <div className="footer-container">
                <div className="big_row">
                    <p>we are here to help you and contact us if you have any question</p>
                    <div className="icons_footer">
                        <a href="#"> <FaPhone /></a>
                        <a href="#"> <FaFacebookF /></a>
                        <a href="#">< FaInstagram/></a>
                        <a href="#">< FaTwitter/></a>
                    </div>
                </div>
                <div className="row">
                    <h4>find it fast</h4>
                    <div className="links">
                        <a href="#">laptop & computers</a>
                        <a href="#"> smart phones & tablets</a>
                        <a href="#"> Tv's & Audio</a>
                        <a href="#"> Appliances</a>
                        <a href="#"> jewellery & watches</a>
                    </div>
                </div>
                <div className="row">
                    <h4>quick links</h4>
                    <div className="links">
                        <a href="#"> Your account</a>
                        <a href="#">return & refund & exchanges</a>
                        <a href="#"> shipping & delivery</a>
                        <a href="#">estimed delivery time</a>
                        <a href="#">purshasing</a>
                    </div>
                </div>
                <div className="row">
                    <h4>services & contact Us</h4>
                    <div className="links">
                        <a href="#"> support center</a>
                        <a href="#">terms & conditions</a>
                        <a href="#">privcy & policy</a>
                        <a href="#"> helps</a>
                        <a href="#"> FAQS</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="copyright">
                    <p> &copy;{new Date().getFullYear()} <span>eman Online Store. </span> all Copyright reserved .</p>
                    <div className="payment">
                        <img src="https://media.discordapp.net/attachments/1450605485957976167/1488298882030112778/image.png?ex=69cc45d8&is=69caf458&hm=4953874903791d5a50059eed2772a52da80b09101c8d956ab6d85526cef50371&=&format=webp&quality=lossless&width=286&height=46" alt="photo" /> 
                    </div>
                </div>
            </div>
            <div className="designed">
                <p>all designed by <span className='heart-footer'>&hearts;</span> <span>eman</span> <span className='heart-footer'>&hearts;</span></p>
            </div>

      </Pagetransition>
    </div>

    </Pagetransition>
    </div>
  )
}
