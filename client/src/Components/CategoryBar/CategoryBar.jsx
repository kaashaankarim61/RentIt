import React, { useState } from 'react'
import '../../Assets/fonts.css'
import '../../Assets/scrollbar.css'

import Categories from './Categories'; // Update the path as needed
import { Link, useParams } from 'react-router-dom';


function CategoryBar(props) {
  let {mainCategory,subCategory, type } = useParams();
  console.log("M = ", mainCategory," S =  ", subCategory, " T = ", type)
  const [clickedCategory, setClickedCategory] = useState(null);


 var Cat= "Electronics & Home Appliances";

 if(mainCategory==="eha" ){
  Cat= "Electronics & Home Appliances";
 }
 else if(mainCategory==="bhs" ){
  Cat= "Books, Hobbies & Sports";
 } 
 else if(mainCategory==="fb" ){
  Cat= "Fashion & Beauty";}

 else if(mainCategory==="fhd" ){
  Cat= "Furniture & Home Decor";
 }
 else if(mainCategory==="k" ){
  Cat= "Kids";
 }
 
 const Category = Categories[Cat];


 const handleCategoryClick = (index) => {
  setClickedCategory(index);
};

 
  
  return (
    <div className=' w-full h-[95px]  border-b-[#eeeeee] border-b-2 flex flex-row items-center justify-center shadow-sm gap-7 px-6  mt-[80px]'>

      {
        mainCategory==='a'  ? (<div className='w-full scroll-container overflow-y-hidden h-full py-5 flex justify-center items-center flex-row gap-5'>
    
    <Link to='/Category/Id/eha/a/a' className='hover:text-[#295cd3] mt-2'>
       <div className='flex flex-row gap-3 items-center'>
       <span class="material-symbols-outlined">
       Kitchen
       </span>
         <p>Electronics & Home Appliances</p>
       </div>
       </Link>
 
 
       <Link to='/Category/Id/bhs/a/a' className='hover:text-[#295cd3]'>
       <div className='flex flex-row gap-3 items-center'>
       <span class="material-symbols-outlined">
      sports_basketball
       </span>
         <p>Books, Hobbies & Sports</p>
       </div>
       </Link>
 
 
       <Link to='/Category/Id/fb/a/a' className='hover:text-[#295cd3]'>
       <div className='flex flex-row gap-3 items-center'>
       <span class="material-symbols-outlined">
      apparel
       </span>
         <p>Fashion & Beauty</p>
       </div>
       </Link>
 
 
 
       <Link to='/Category/Id/fhd/a/a' className='hover:text-[#295cd3]'>
       <div className='flex flex-row gap-3 items-center'>
       <span class="material-symbols-outlined">
      chair
       </span>
         <p>Furniture & Home Decor</p>
       </div>
       </Link>
 
 
       <Link to='/Category/Id/k/a/a' className='hover:text-[#295cd3]'>
       <div className='flex flex-row gap-3 items-center'>
       <span class="material-symbols-outlined">
       stroller
       </span>
         <p>Kids</p>
       </div>
       </Link>
      
      
     </div>) : (<div className='w-full scroll-container overflow-y-hidden h-full py-5 flex justify-center items-center flex-row gap-5'>
     {Category.map((subCategory, index) => (
                <div
                    key={index}
                    className={`flex justify-center items-center text-[#295CD3]  hover:text-[#295CD3] cursor-pointer ${
                        clickedCategory === index ? 'text-[#295CD3]' : 'text-[#4b4b4b]' // Change text color when clicked
                    }`}
                    onClick={() => handleCategoryClick(index)}
                >
                    <Link to={subCategory.link} className='flex justify-center items-center flex-col'>
                        <span className="material-symbols-outlined">{subCategory.gIcon}</span>
                        <p className='text-xs text-center mt-1 lh_'>{subCategory.name}</p>
                    </Link>
                </div>
            ))}
      </div>) 
      }   
    </div>
  )
}

export default CategoryBar
