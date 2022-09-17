import React, { Component } from "react";

import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import { MdOutlineLocationOn } from 'react-icons/md'

class Footer extends Component {
 goToTwitter() {
  window.open("https://twitter.com/Easyprop1", "_blank")
 }

 goToInstagram() {
  window.open("https://www.instagram.com/easyprop.364050/", "_blank")
 }

 
 goToFacebook() {
  window.open("https://www.facebook.com/", "_blank")
 }

 
 goToYoutube() {
  window.open("https://www.youtube.com/channel/UCK0taN11xgx84Tin5t7Ff8A", "_blank")
 }

 goToLocation() {
  window.open("https://www.google.com/maps/place/Andhra+Loyola+Institute+of+Engineering+and+Technology/@16.5085814,80.6564357,17z/data=!4m12!1m6!3m5!1s0x3a35fcc97636aaa9:0xa173d94ed4a34bc9!2sAndhra+Loyola+Institute+of+Engineering+and+Technology!8m2!3d16.5085814!4d80.6586244!3m4!1s0x3a35fcc97636aaa9:0xa173d94ed4a34bc9!8m2!3d16.5085814!4d80.6586244", "_blank")
 }
 render() {
  return(
   <div className="footer">
    <div className="wrapper">
     <div className="footer-container">
      <h1>
      </h1>
      <h1>
       <FaTwitter className="footer-icon" onClick={this.goToTwitter}/>
       <FaInstagram className="footer-icon" onClick={this.goToInstagram}/>
       <FaFacebookF className="footer-icon" onClick={this.goToFacebook}/>
       <FaYoutube className="footer-icon" onClick={this.goToYoutube}/>
       <MdOutlineLocationOn className="footer-icon" onClick={this.goToLocation}/>
      </h1>
     </div>
    </div>
   </div>
  )
 }
}

export default Footer