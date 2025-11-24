import React from 'react'
import Colors from '../Utils/Colors'

const Footer = () => {
  return (
    
  <footer className="footer" style={{backgroundColor: Colors.WHITE}}>
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021. <a href="https://www.dolearn.online/" target="_blank">Product of RDI</a> </span>
          {/* <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted &amp; made with <i className="ti-heart text-danger ml-1" /></span> */}
        </div>
  </footer> 
  )
}

export default Footer