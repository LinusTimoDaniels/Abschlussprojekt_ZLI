import React from 'react'
import NavBar from '../components/navigationbar'

function MainLayout({children}) {
  return (
    <>
      <div>
        <NavBar />
        <div>{children}</div>
      </div>
    </>
  )
}

export default MainLayout
