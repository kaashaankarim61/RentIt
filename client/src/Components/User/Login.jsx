import React, { useEffect, useState } from 'react'
import logo from  '../../Assets/logo.png'
import clouds from '../../Assets/clouds.png'

import cloud1 from '../../Assets/cloud1.png'
import cloud2 from '../../Assets/cloud2.png'

import google from '../../Assets/google_l.png'
import Navbar from '../NavBar/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/Slices/authSlice'; // Replace with the correct path to your authSlice

import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login(props) {
  const bit  = props.bit
  const { em } = useParams()
  const navigate = useNavigate()
  const notifyF = (msg) => {
    toast.error(msg, {
      position : toast.POSITION.TOP_RIGHT,  // Change position to BOTTOM_RIGHT
      autoClose: 3000,
    });
  };
  const notifyS = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT, // Set the position of the toast
      autoClose: 3000, // Set auto-close time in milliseconds
    });
  };



  const dispatch = useDispatch();

  const [loginByEmail, setLoginByEmail] =useState(1)
  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('')


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation (you can add more validation logic)
    if (!email || !password) {
      notifyF("Email and Password Required")
      console.error('Email and password are required');
      return;
    }

    try {

      console.log(email)
      console.log(password)
      const response = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email":email, "password":password })

      });

      if (!response.ok) {
        throw new Error('Network response was not ok');

      }

      const data = await response.json();
      try {
        const response = await fetch(`http://localhost:8080/update/isonline/${data.userId}/1`, {
          method: 'PUT'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        console.log('Online status updated successfully');
      } catch (error) {
        console.error('Error updating online status:', error);
      }
      console.log(data);
      dispatch(login({"username": data.userId, "id" : data.userId}));
    
      
     
      navigate(`/home/${data.userId}`)
    } catch (error) {
      notifyF("Incorrect Credentials or Account Not Verified.")
      
      console.error('There was a problem with the fetch operation:', error);
    }
  };


 
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  function OTP() {
    const [otp, setOTP] = useState(['', '', '', '', '', '']);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Concatenate OTP
        const concatenatedOTP = otp.join('');
        
        // Send concatenated OTP to API
        const response = await fetch(`http://localhost:8080/update/status/${em}/${concatenatedOTP}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                otp: concatenatedOTP
            })
        });
        
        // Handle response
        if (response.ok) {
           notifyS("Account Verified")
           setTimeout(() => {
            navigate("/login")
           }, 500);
           
        } else {
           notifyF("Wrong OTP")
        }
    };
  
    const handleOTPPartChange = (index, value) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);
    };
  
    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-1 w-[70%]'>
            <p className='text-xs text-gray-600'>Kindly input your OTP to get verified and log in to the website's secured area.</p>
  
            <div className="flex gap-3 mt-5">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        className=" w-[47px] h-[47px] rounded-xl border-2 border-pr1 font-bold flex items-center justify-center text-3xl text-center "
                        value={value}
                        onChange={(e) => handleOTPPartChange(index, e.target.value)}
                        maxLength={1}
                    />
                ))}
            </div>
  
            <button type="submit" className='text-white px-10 py-2 mt-7 w-full bg-[#041048]'>verify</button>
        </form>
    );
  }


  return (




    <div className=' bg-[#0A1048] w-screen h-screen flex flex-center justify-center'>  
    <img src={clouds} className='absolute -z-0 bottom-0 w-full' alt="" />
    <img src={cloud1} className='absolute -z-0 w-[140px] top-[180px] left-[250px]' alt="" />
    <img src={cloud2} className='absolute -z-0 top-[180px] right-[250px]' alt="" />
    <Navbar/>
    <div className='bg-white rounded-3xl w-[430px] h-[550px] my-auto flex flex-col justify-between items-center py-20 z-10'>
    <ToastContainer position="top-right" autoClose={3000} />
        <h1 className='text-center font-bold text-[#0A1048] text-4xl '>Welcome to <br /> RentIt</h1>

        { loginByEmail ===1 ? (
        bit ? (<OTP/>) :(<>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-1 w-[70%]'>
          <p className='text-xs text-gray-600 '>Kindly input your credentials to access and log in to the website's secured area.</p>
  
          <div class="field field_v1 w-full mt-5">
          <label for="name" class="ha-screen-reader">Email</label>
          <input id="name" class="field__input" placeholder="e.g. Muhammad Anique" onChange={(e)=>{setEmail(e.target.value)}} />
          <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label font-medium"><span className='text-red-500 '>*</span>Email</span>
          </span>
          </div>
  
          <div class="field field_v1 w-full">
          <label for="first-name" class="ha-screen-reader">Password</label>
          <input id="first-name" type={passwordVisible ? "text" : "password"}class="field__input" placeholder=" " onChange={(e)=>{setPassword(e.target.value)}}/>
          <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label font-medium"><span className='text-red-500 '>*</span>Password</span>
          </span>
          <span className="toggle-password absolute right-1 top-3" onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
      </span>
          </div>
          <button type="submit" className=' text-white  px-10 py-2 mt-7 w-full bg-[#041048]'>Login</button>  
          </form></>)
        
        
        
        ) : (<div className='w-[70%] flex flex-col justify-center items-center gap-2'>
        <div className='border-2 font-normal w-full h-[45px] flex flex-row justify-center items-center hover:bg-[#e6e6e9] '>
            <img src={google} className="h-[23px]" alt="" />
            <p className='text-[#4b4b4b] ml-2'>Continue with Google</p>
        </div>
        <div onClick={()=>{setLoginByEmail(1)}} className='border-2 font-normal w-full h-[45px] flex flex-row justify-center items-center hover:bg-[#e6e6e9]'>
            <span class="material-symbols-outlined text-[#4b4b4b]">
                mail
            </span>
            <p className='text-[#4b4b4b] ml-2'>Continue with email</p>
        </div>
        </div>)}
        
        <Link to="/register" className='text-xs'>Do not have an account? <a className='text-[#0A1048] font-bold text-xs' href="">Register</a> </Link>
    </div>     
    </div>
 

   
    
  )
}

export default Login


