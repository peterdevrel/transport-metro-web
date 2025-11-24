import React from 'react'
import PageAccessManager from './PageAccessManager'
import Body from '../Components/Body'
import HeaderTitle from '../Components/HeaderTitle'

const PageAccess = () => {
  return (
    

    <Body>
      <HeaderTitle page={'Page settings'} title={'Settings'} />
       <div style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
        <PageAccessManager pageViewId={1} />
      </div>
    </Body>
  )
}

export default PageAccess