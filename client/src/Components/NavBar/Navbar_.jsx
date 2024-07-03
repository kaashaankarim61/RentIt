import React, { useEffect, useState } from 'react'
import logo from  '../../Assets/logo.png'
import { Link,useNavigate } from 'react-router-dom'
import '../../Assets/button.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectUsername, selectPassword, selectIsAuthenticated, logout } from '../../store/Slices/authSlice'; // Update with the correct path to your selectors file



function Navbar_() {
  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  const authId = useSelector(state => state.auth.id);
  const authBool = useSelector(state => state.auth.isAuthenticated);
  const [menu, setMenu] =useState('hidden')
  const [userMenu, setUserMenu] =useState('absolute')
  const [isOpen, setIsOpen] =useState(false)
  const [isOpenUM, setIsOpenUM] =useState(false)
  const [data, setData] =useState()
  const [username_, setUsername_] =useState(username)
  const [redirectAdd, setRedirectAdd] =useState('/login')
 const dispatch = useDispatch()
 useEffect(()=>{
  if(authBool)
    setRedirectAdd('/add')
  else{
    setRedirectAdd('/login')
  }
 },[])


  useEffect(() => {
    // Function to make the GET API call
  
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${authId}`); 
        if (response.ok) {
          const result = await response.json();
          setData(result); 

         console.log("Errror tis there")
          console.log(result)
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if(username_){
      fetchData(); 
      
    }
   

  }, [username_]); 


  async function handleoffline(){
    if(data){
      try {
        const response = await fetch(`http://localhost:8080/update/isonline/${data.userId}/0`, {
          method: 'PUT'
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        console.log('Online status updated successfully');
      } catch (error) {
        console.error('Error updating online status:', error);
      }
    }
   
  }



  function isCliked(){
    setIsOpen(!isOpen)
    if(menu==='absolute'){
      setMenu('hidden')
    }else if(menu==='hidden'){
      setMenu('absolute')
    }
  }


  function isClikedUM(){
    setIsOpenUM(!isOpen)
    if(userMenu==='absolute'){
      setUserMenu('hidden')
    }else if(userMenu==='hidden'){
      setUserMenu('absolute')
    }
  }

  const [query, setQuery] =useState('')
  const navigate = useNavigate()

  function handleSearch() {
    const Q_= query.replace(/-/g, 'fff');
    const Q= Q_.replace(/ /g, '-');

    try {
      fetch(`http://localhost:8080/beh/q/${authId}/${Q}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json' // Assuming you are sending JSON data
          },
          body: JSON.stringify({
              // Include any data you want to send in the request body
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Handle response data
          console.log('Response:', data);
      })
      .catch(error => {
          // Handle errors
          console.error('Error:', error);
      });
  } catch (error) {
      console.error('Error:', error);
  }



    navigate(`/Category/Id/a/a/a/q/${Q}`)
  }



  return (
    <>
    <div className={`w-[320px] z-[10] text-sm h-[370px] bg-white border-2 text-[#414141] border-[#f5f5f5] gap-2 shadow-md rounded-md flex flex-col py-6 px-6 ${menu} transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 invisible'} ease-in-out duration-300 top-[70px] left-[35px]`}>
      
      {data ? (  <Link to={`/home/${data.userId}`} className='hover:text-[#295cd3]'>
      <div className='flex flex-row gap-3 items-center'>
        <span class="material-symbols-outlined">
        home
        </span>
        <p>Home</p>
      </div>
      </Link>): (<Link to='/' className='hover:text-[#295cd3]'>
      <div className='flex flex-row gap-3 items-center'>
        <span class="material-symbols-outlined">
        home
        </span>
        <p>Home</p>
      </div>
      </Link>) }
    

     


      <Link to='/about' className='hover:text-[#295cd3]'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
      info
      </span>
        <p>About</p>
      </div>
      </Link>


      {/* <Link to='/howitworks' className='hover:text-[#295cd3]'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
        question_mark
        </span>
        <p>How It Works</p>
      </div>
      </Link> */}


      <Link to='/Category/Id/a/a/a' className='hover:text-[#295cd3]'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
      apps
      </span>
        <p>All categories</p>
      </div>
      </Link>


      <div className='w-full h-[2px] bg-[#78777726] mt-2'>

      </div>




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
     

     


    </div>








    <div className={`w-[290px] z-[10] text-sm ${data ? 'h-[280px]' : 'h-[135px]'}  bg-white border-2 text-[#414141] border-[#f5f5f5] gap-2 shadow-md rounded-md flex flex-col py-6 px-6 ${userMenu} transition-opacity ${isOpenUM ? 'opacity-100' : 'opacity-0 invisible'} ease-in-out duration-300 top-[70px] right-[35px]`}>
       {data ? (<>  <Link to={`/home/${authId}/profile`} className='hover:text-[#295cd3]'>
      <div className='flex flex-row gap-3 items-center'>
        <div className='overflow-hidden w-[50px] h-[50px] rounded-full bg-pr1 flex items-center justify-center'>
        <img className='object-cover scale-125 translate-y-1' src={data.profilePic} alt="" />
        </div>
        <div>
        <p>Profile </p>
        <p className='font-bold'>{data.name}</p>
        </div>
      </div>
      </Link>

     


      <Link to={`/home/${authId}/profile`} className='hover:text-[#295cd3] mt-3'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
      info
      </span>
        <p>Visit Profile</p>
      </div>
      </Link>


      {/* <Link to='/' className='hover:text-[#295cd3]'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
        question_mark
        </span>
        <p>View History</p>
      </div>
      </Link> */}


      <Link to={`/home/${authId}/chat`} className='hover:text-[#295cd3]'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
        message
        </span>
        <p>View Message</p>
      </div>
      </Link>


      <Link to='/' className='hover:text-[#295cd3]'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
        Settings
        </span>
        <p>Settings</p>
      </div>
      </Link>


      <div className='w-full h-[2px] bg-[#78777726] mt-2'>

      </div>


      <button onClick={()=>{dispatch(logout()); navigate('/');handleoffline()}} className='hover:text-[#295cd3] mt-2'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
      apps
      </span>
        <p>LogOut</p>
      </div>
      </button>
      </>): (<>
      <Link to='/login' className='hover:text-[#295cd3] mt-2'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
        login
        </span>
        <p>login</p>
      </div>
      </Link>

      <Link to='/register' className='hover:text-[#295cd3] mt-2'>
      <div className='flex flex-row gap-3 items-center'>
      <span class="material-symbols-outlined">
        ballot
        </span>
        <p>Register</p>
      </div>
      </Link>

      </>)}
    
  

      





     


    </div>
   
    <nav className='bg-white h-[80px] w-full absolute z-[1] px-[40px] py-2 flex items-center justify-between  top-0 border-b-2 border-b-[#eeeee]'>
   
    <div className='w-[20%] flex flex-row gap-4 items-center '>
    <button onClick={()=>{isCliked()}}> <span class="material-symbols-outlined">
        menu
        </span></button>
    <Link to='/' ><img src={logo}  className='h-[45px] ' alt="" /></Link> 
    </div>
    
    <div className='w-[32%] h-[52px] relative'>
    <input value={query} onChange={(e)=>{setQuery(e.target.value)}} type="text" className='text-black border-[2px] border-[#eeeeee] shadow-sm rounded-full w-full px-6 py-3 ml-7 bg-white' />
    <button onClick={()=>{handleSearch()}} className='absolute z-10 right-0 top-3 translate-x-2 scale-105'><span class="material-symbols-outlined rounded-full  p-1  text-[#295CD3]">search</span></button>
    </div>
  
   <div className='w-[20%]  flex items-center justify-end gap-4'>


        <Link to={`/home/${username_}/add`} className="button-cover" role="button"><span className="text">Add</span><span>Items!</span></Link>
        <button onClick={()=>{isClikedUM()}} className='text-[#4b4b4b] scale-125 hover:text-[#295cd3]  '>
        <span class="material-symbols-outlined">
        account_circle
        </span>
        </button>
  
   </div>


   
    </nav>
   

    </>
  )
}

export default Navbar_
