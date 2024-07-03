import React, { useEffect, useState } from 'react'
import Login from '../User/Login'
import logo from  '../../Assets/logo.png'
import clouds from '../../Assets/clouds.png'
import Navbar from '../NavBar/Navbar'
import ItemList from '../CategoryLayout/CategoryLayout'
import Footer from '../Footer/Footer'
import Home from '../Home/Home'
import { Outlet } from 'react-router-dom'
// import cloud1 from '../../Assets/cloud1.png'
// import cloud2 from '../../Assets/cloud2.png'
// bg-[#0A1048] 
import { useParams } from 'react-router-dom'





function Layout(props) {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [param, setParam] =useState(id)
 
  useEffect(() => {
    // Function to make the GET API call
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${param}`); // Replace 'API_ENDPOINT' with your actual API URL
        if (response.ok) {
          const result = await response.json();
          setData(result); 
          console.log(result)
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts

  }, [param]); // Empty dependency array to run this effect only once when the component mounts


  
 

    return (

      <div className='overflow-x-hidden'>
        <Navbar loggedIn={props.loggedIn} user={data} />   
        <Outlet/>
        <Footer/>
      </div>
       
      )
}

export default Layout



//    <div className='bg-[#fffff] w-screen h-screen flex items-center flex-col relative object-cover'>  
    
//         {/* <img src={clouds} className='absolute -z-0 bottom-0 w-full' alt="" /> */}
//         {/* <img src={cloud1} className='absolute -z-0 w-[140px] top-[180px] left-[250px]' alt="" />
//         <img src={cloud2} className='absolute -z-0 top-[180px] right-[250px]' alt="" /> */}
//         <Navbar/>
//         <ItemHome/>
//         </div>
