import React from 'react'
import { x } from '../Components/ContainerTitle'

const Unauthorized = () => {
  return (
    <>
    <ContainerTitle>
      
      <div className="vh-100 d-flex align-items-center justify-content-center" 
        style={{ background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)" }}>
      <div className="container text-center text-white">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="display-1 font-weight-bold">404</h1>
          </div>
          <div className="col-lg-6 text-left">
            <h2>SORRY!</h2>
            <h4 className="font-weight-light">
              The page you’re looking for was not found.
            </h4>x
            <p className="mt-3">
              Maybe check the URL or return to the homepage.
            </p>
            <a href="/" className="btn btn-light btn-lg mt-3">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>

     
    </ContainerTitle>

    
    </>
  )
}

export default Unauthorized