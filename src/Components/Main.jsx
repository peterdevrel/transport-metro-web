import React from 'react'
import Footer from './Footer'

const Main = ({children}) => {
  return (
    <div className="main-panel">
     
      {children}
     <Footer />
    </div>
  )
}

export default Main