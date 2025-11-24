import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Colors from '../../Utils/Colors'




const UsersList = ({onClickProfile, item, onClickRole}) => {


    
useEffect(() => {
  const handleContextmenu = e => {
      e.preventDefault()
  }
  document.addEventListener('contextmenu', handleContextmenu)
  return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
  }
}, [ ])






  return (
                        
      <tr key={item.id}>                               
        <td>{item?.id}</td>
        <td>{item?.email}</td>
        <td>{item?.first_name}</td>
        <td>{item?.last_name}</td>
        <td>{item?.dob}</td>
        <td>{item?.mobile}</td>
        <td>{item?.user_option}</td>  
        <td>
          <i
            className="fa fa-user me-3"  // Bootstrap 5 uses me-* for margin-end
            onClick={onClickProfile}
            style={{ fontSize: '20px', color: Colors.GREEN }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropProfile"
          ></i>

          <i
            className="fa fa-user ms-3"  // margin-start for spacing from previous icon
            onClick={onClickRole}
            style={{ fontSize: '20px', color: Colors.GREEN }}
          ></i>
        </td>                               
      </tr>
                                            
                            
    
  )
}

export default UsersList