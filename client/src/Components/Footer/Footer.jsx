import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
   

    <div className='w-full h-[340px] bg-[#f5f5f5] flex flex-col justify-between px-[200px] py-[60px]'>

    <div className='w-full flex flex-row items-baseline justify-between'>
        
    <div className='flex flex-col justify-center'>
        <p className='font-bold'>RentIt</p>
        <Link to='/' className='text-sm mt-2 hover:text-[#095Ab3] cursor-pointer' >Home</Link>
        <Link to='/about' className='text-sm hover:text-[#095Ab3] cursor-pointer'  >About</Link>
        <Link to='/contact' className='text-sm hover:text-[#095Ab3] cursor-pointer' >Contact</Link>
        <Link to='/termsandcondition' className='text-sm hover:text-[#095Ab3] cursor-pointer' >Terms & Condition</Link>
        <Link to='/privacy' className='text-sm hover:text-[#095Ab3] cursor-pointer' >Privacy</Link>
       
    </div>
    <div className='flex flex-col justify-center'>
        <p className='font-bold'>Locations</p>
        <Link to='/Category/Id/a/a/a/lahore'  className='text-sm mt-2 hover:text-[#095Ab3] cursor-pointer' >Lahore</Link>
        <Link to='/Category/Id/a/a/a/karachi'  className='text-sm hover:text-[#095Ab3] cursor-pointer' >Karachi</Link>
        <Link to='/Category/Id/a/a/a/islamabaad'  className='text-sm hover:text-[#095Ab3] cursor-pointer' >Islamabad</Link>
        <Link to='/Category/Id/a/a/a/Multan' className='text-sm hover:text-[#095Ab3] cursor-pointer' >Multan</Link>
        <Link to='/Category/Id/a/a/a/Peshawar' className='text-sm hover:text-[#095Ab3] cursor-pointer' >Peshawar</Link>
    </div>
   
    <div className='flex flex-col justify-center'>

        <p className='font-bold'>Categories</p>
        <Link to='/Category/Id/eha/a/a' className='text-sm mt-2 hover:text-[#095Ab3] cursor-pointer' >Electronic & Home Apliances</Link>
        <Link to='/Category/Id/bhs/a/a'  className='text-sm hover:text-[#095Ab3] cursor-pointer' >Books, Hobbies & Sports</Link>
        <Link to='/Category/Id/fb/a/a'  className='text-sm hover:text-[#095Ab3] cursor-pointer' >Fashion & Beauty</Link>
        <Link to='/Category/Id/fhd/a/a'  className='text-sm hover:text-[#095Ab3] cursor-pointer' >Furniture & Home Decor</Link>
        <Link to='/Category/Id/k/a/a'   className='text-sm hover:text-[#095Ab3] cursor-pointer' >Kids </Link>
       
    </div>
    <div className='flex flex-col justify-center'>
        <p className='font-bold'>Explore</p>
        <a className='text-sm mt-2'  >Camera Equipment</a>
        <a className='text-sm' >Sports Equipment</a>
        <a className='text-sm'  >Baby Gear</a>
        <a className='text-sm'   >Books & Magazines</a>
        <a  className='text-sm' >Clothes</a>
       
    </div>

    <div className='flex flex-col justify-center'>
        <p className='font-bold'>FYP Details</p>
        <a className='text-sm mt-2'  > Muhammad Anique</a>
        <a className='text-sm'  >Kaashaan Ali Karim</a>
        <a className='text-sm'  >Hammad Zahoor</a>
        <a className='text-sm' >FYP-1 Prototype</a>

    </div>

    </div>


    <div className='w-[full] h-[2px] mt-10 bg-gray-200'>
      

      </div>

      <p className='text-center text-sm mt-1'>
         &#169;2023 RentIt. All copyrights reserved by team RentIt
      </p>

    


</div>

  )
}

export default Footer
