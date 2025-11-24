import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const Body = ({children}) => {
  return (
    <>
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="content-body">
           {children}
      </div>
    </div>
    </>
  )
}

export default Body