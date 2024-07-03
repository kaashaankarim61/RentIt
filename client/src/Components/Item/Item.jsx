import React from 'react'
import '../../Assets/fonts.css'
import { Link } from 'react-router-dom';
function Item(props) {
  var Item = {
    "itemName" : "Sofa",
    "Location" : "lahore",
    "itemRent" : "500",
    "dateCreated" : "23-12-2023"
  };
  if(props.item_){
    Item = props.item_
  }
 
  console.log(".....",Item)
  return (
    <Link to={`/Category/Id/${Item.itemCategory}/Item/${Item.itemId}`} className='w-[250px] h-[300px] hover:scale-105 ease-in-out duration-200  flex flex-col cursor-pointer' >
       <div class=' rounded-2xl w-full h-[70%] overflow-hidden'>
            <img src={Item.image1}
                class='object-cover w-full h-full' 
                alt="" />
        </div>
        <div className='lh_ px-2 py-1 mt-2'>
            <div className='flex flex-row justify-between items-center'>
            <h1 className='font-medium line-clamp-4 text-xs'>{Item.itemName} </h1>
            <p className='font-bold text-xs'>4.9</p>
            </div>
            <p className='text-[8px] text-[#4b4b4b] mt-[3px]'>{Item.itemLocation}, Punjab</p>
            <p className='text-[8px] text-[#4b4b4b] mt-[1.5px]'>{Item.dateCreated}</p>
            <p className='font-bold text-xs text-[#295CD3] mt-1'> Rs. {Item.itemRent}/-  per day</p>
        </div>
    </Link>
  )
}

export default Item
