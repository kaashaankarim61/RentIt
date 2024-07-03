import React, { useEffect, useState } from 'react'
import logo from  '../../Assets/logo.png'

import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUsername, selectPassword, selectIsAuthenticated } from '../../store/Slices/authSlice'; // Update with the correct path to your selectors file

function Navbar(props) {
  
  const username = useSelector(selectUsername);
  const navigate = useNavigate()

 

  const [data, setData] =useState()
  const [username_, setUsername_] =useState(username)
  useEffect(() => {
    // Function to make the GET API call
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${username_}`); 
        if (response.ok) {
          const result = await response.json();
          setData(result); 

         console.log("Errror tis there")
          console.log("wego",result)
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 

  }, [username_]); 

  var fullName = null;
  var nameParts = null;

  if(props.user) 
  {
    fullName = props.user.name;
    nameParts = fullName.split(' ');
    // lastName = nameParts[nameParts.length - 1];

  }



  return (
    <nav className='bg-white h-[60px] w-full shadow-md  px-7 py-2 flex items-center justify-between z-10 absolute'>
       
    {data ? (<Link to={`/home/${data.userId}`}><img src={logo} className='h-[45px]' alt="" /></Link>  ): (<Link to="/"><img src={logo} className='h-[45px]' alt="" /></Link> ) }
    
    <div className='flex flex-row gap-2'> 
    {data ? (<div className='w-[200px] h-[40px] border-[2.5px] hover:bg-[#0A1048] hover:text-white cursor-pointer  border-[#0A1048] flex items-center justify-center'>
        <Link to={`/home/${username_}/add`} className='text-center font-bold'>Add Items</Link>
    </div>) : (<div className='w-[200px] h-[40px] border-[2.5px] hover:bg-[#0A1048] hover:text-white cursor-pointer  border-[#0A1048] flex items-center justify-center'>
        <Link to="/howitworks" className='text-center font-bold'>How It Works</Link>
    </div>)}
    
    {
       props.loggedIn===1 || data ? (
        <div onClick={()=>{navigate(`/home/${data.userId}/profile`)}} className='w-auto px-3 h-[40px] border-[2.5px] hover:bg-[#0A1048] hover:text-white cursor-pointer  border-[#0A1048] flex items-center justify-center'>  
        { 
          <h1> Hello <span className='font-bold'> {data ? data.name : ''}</span> </h1>
        }   
         
      </div>
       ):( <Link to={'/login'} className='w-[200px] h-[40px] border-[2.5px] hover:bg-[#0A1048] hover:text-white cursor-pointer  border-[#0A1048] flex items-center justify-center'>  
       {
        <p className='text-center font-bold'>Login</p>
       }   
        
     </Link>)  
    }
   

    </div>
   
    </nav>
  )
}

export default Navbar





// const authId = useSelector(state => state.auth.id);
// const authBool = useSelector(state => state.auth.isAuthenticated);
// if(!authBool){
//   navigate("/")     
// }