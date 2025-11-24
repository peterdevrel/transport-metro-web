import React from 'react'
import GoBack from './GoBack'
import { useNavigate } from 'react-router-dom'

const HeaderTitle = ({page, title}) => {

  const navigate = useNavigate()
  return (
    <div className="row page-titles mx-0">
        <div className="col-sm-6 p-md-0">
        <div className="welcome-text d-flex align-items-center justify-content-start">
            <GoBack icon="fa fa-chevron-circle-left" onClickBack={() => navigate(-1)} />
            <h4 className="mb-0 ms-2">{page}</h4>
        </div>
        </div>
        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href={'/protected/dashboard'}>Home</a></li>
            <li className="breadcrumb-item active">{title}</li>
        </ol>
        </div>
    </div>
  )
}

export default HeaderTitle