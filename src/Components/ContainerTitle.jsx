import React from 'react'

export const ContainerTitle = ({children, title}) => {
  return (
    <div className="container py-4 text-white">
      <h2 className="mb-4">{title}</h2>

      {children}
    </div>
  )
}
