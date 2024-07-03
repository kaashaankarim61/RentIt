import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar_ from '../NavBar/Navbar_'
import Footer from '../Footer/Footer';


function CategoryLayout() {
  return (
    <>
      <Navbar_/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default CategoryLayout



{/* <div className='w-full h-[80px]'></div>
<CategoryBar/>

<div style={{ overflowY: 'scroll', height: 'calc(100vh - 160px)' }} className='flex flex-wrap flex-row justify-center items-center w-full  gap-5 p-7  '>
  <Item clickEvent={handleClick} />
  <Item/>
  <Item/>
  <Item/>
  <Item/>
  <Item/>
  <Item/>
  <Item/>
  <Item/>
  <Item/>
  <Item/>
  <Item/>
 
</div> */}

