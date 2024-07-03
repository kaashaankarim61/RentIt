import React, { useEffect, useState } from 'react'
import logo from  '../../Assets/logo.png'
import clouds from '../../Assets/clouds.png'

import cloud1 from '../../Assets/cloud1.png'
import cloud2 from '../../Assets/cloud2.png'
import '../../Assets/input.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import google from '../../Assets/google_l.png'
import Navbar from '../NavBar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './cb.css'
import { imageDB } from '../Item/config'
import { getDownloadURL, getStorage, ref,uploadBytes } from 'firebase/storage'
import {v4} from 'uuid'

import './cb.css'


function Register() {

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

  const [isRegistering, setIsRegistering] = useState(0)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    cnic: '',
    password: '',
    confirmPassword: '',
  });
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);

  const handleImageOneChange = (e) => {
    const file = e.target.files[0];
    setImageOne(file);
  };

  const handleImageTwoChange = (e) => {
    const file = e.target.files[0];
    setImageTwo(file);
  };


  
// Function to upload Blob to Firebase Storage
const uploadImageToFirebase = async (img) => {
  if(img){
    try {
      const fileName = v4();
      
      // Create a reference to a storage location and specify the file name
      const storageRef = ref(imageDB, `files/${fileName}`);
  
      await uploadBytes(storageRef, img);
  
      // Return the file name
      console.log("File Name: ", fileName);
      return `https://firebasestorage.googleapis.com/v0/b/rentit-e521b.appspot.com/o/files%2F${fileName}?alt=media&token=8d1e39a4-8dfe-40fb-9695-343d32ee59c4`;
    
    } catch (error) {
      console.error('Error uploading image:', error);
      
    }
  }else {
    return 'https://firebasestorage.googleapis.com/v0/b/rentit-e521b.appspot.com/o/nnnm.PNG?alt=media&token=f7b3708f-3dd9-4a8a-9c72-8c94022cc4de'
  }
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  useEffect(()=>{

    console.log(formData)

  },[formData])
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  function validateInputs(name, email, dob, cnic, password, confirmPassword,imageOne, imageTwo) {
    const emailRegex = /^[^\s@]+@[^@\s]+\.(?:com|org|net|edu|gov|co|io|info|...)$/i;

  
    // Check if any field is empty
    if (!name || !email || !dob || !cnic || !password || !confirmPassword || !imageOne || !imageTwo ) {
      return "All fields are required.";
    }
  
    // Validate email format
    if (!emailRegex.test(email)) {
      return "Invalid email format. Email must end with @example.com.";
    }
  
    // Validate password and confirmPassword match
    if (password !== confirmPassword) {
      return "Password and Confirm Password do not match.";
    }

    const regexSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // At least one special character
    const regexAlphabet = /[a-zA-Z]/; // At least one alphabet
    const regexNumeric = /[0-9]/; // At least one numeric character

    if (
      !regexSpecial.test(password) ||
      !regexAlphabet.test(password) ||
      !regexNumeric.test(password) ||
      password.length <= 8
    ) {
      return "Password should contain at least one special character, one alphabet, one numeric character, and be greater than 10 characters.";
    }
    
    // Validate date of birth (dob not below 2010)
    const dobYear = new Date(dob).getFullYear();
    if (dobYear > 2006) {
      return "Age should be above 18";
    }
  
    // Validate CNIC (must contain 15 digits only)
    const cnicRegex = /^\d{13}$/;
    if (!cnicRegex.test(cnic)) {
      return "CNIC must contain 15 digits only.";
    }
  
    // All validations passed
    return true;
  }
  
  
  const handleSubmit = async (e) => {
    setIsRegistering(1)
   
    if(validateInputs(formData.name, formData.email,formData.dob,formData.cnic,formData.password, formData.confirmPassword, imageOne, imageTwo)===true){
      
      const im1 = await uploadImageToFirebase(imageOne)
      const im2 = await uploadImageToFirebase(imageTwo)
      const Postbody = {
        name: formData.name,
        email: formData.email,
        dob: formData.dob,
        cnic: formData.cnic,
        password:formData.password,
        confirmPassword:formData.confirmPassword,
        cnicImg : im1,
        profileImg: im2
      }

      console.log("New : ", Postbody)
      try {
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Postbody),
        });
  
        if (response.ok) {
          // Handle successful API call
          console.log('Data submitted successfully!');
          notifyS('Registeration Successful')
          setTimeout(() => {

            navigate(`/otp/${formData.email}`)
          }, 3000);
         
          
        } else {
          setIsRegistering(0)
          notifyF("Error: User Account Already Exist")
          console.error('Error submitting data');
        }
      } catch (error) {
        setIsRegistering(0)
        notifyF("Error")
        console.error('Network error:', error);
      }
        
    }else{
      console.log("Failed")
      setIsRegistering(0)
      console.log(validateInputs(formData.name, formData.email,formData.dob,formData.cnic,formData.password, formData.confirmPassword, imageOne, imageTwo))
      notifyF(validateInputs(formData.name, formData.email,formData.dob,formData.cnic,formData.password, formData.confirmPassword, imageOne, imageTwo))
    }

   
  };



  return (
   


<div className=' bg-[#0A1048] w-screen h-screen flex flex-center justify-center '>  
    
<img src={clouds} className='absolute -z-0 bottom-0 w-full' alt="" />
<img src={cloud1} className='absolute -z-0 w-[140px] top-[180px] left-[250px]' alt="" />
<img src={cloud2} className='absolute -z-0 top-[180px] right-[250px]' alt="" />
<Navbar/>
<div className='flex flex-col justify-center'>
  
<div className='w-full h-[65px]'></div>
<div className='bg-white rounded-xl w-[530px] h-[720px] overflow-x-hidden custom-scrollbar  overflow-y-auto  my-auto flex flex-col justify-baseline items-center py-10 z-10 '>
        <h1 className='text-center font-bold text-[#0A1048] text-4xl mt-3 '>Welcome to <br /> RentIt</h1>
        <div className='w-[70%]  flex flex-col justify-center items-center gap-1 mt-5'>
          <div className='flex flex-col justify-center items-center gap-1 w-full'>

          <div class="field field_v1 w-full">
            <label for="name" class="ha-screen-reader">Name</label>
            <input id="name" class="field__input" placeholder="Muhammad Anique" name="name" value={formData.name}
        onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label "><span className='text-red-500'>*</span>Name</span>
            </span>
          </div>

          <div class="field field_v1 w-full">
            <label for="first-name" class="ha-screen-reader">Email</label>
            <input id="first-name" class="field__input" placeholder="email@example.com" name="email"  value={formData.email}
        onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label "><span className='text-red-500'>*</span>Email</span>
            </span>
          </div>

          <div class="field field_v1 w-full">
            <label for="first-name" class="ha-screen-reader">CNIC</label>
            <input id="first-name" class="field__input" placeholder="xxxxx-xxxxxxx-x" name="cnic"   value={formData.cnic}
        onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label"><span className='text-red-500'>*</span>CNIC</span>
            </span>
          </div>

          <div class="field field_v1 w-full">
            <label for="first-name" class="ha-screen-reader">DOB</label>
            <input id="first-name" type='date' class="field__input" name="dob" placeholder=" "  value={formData.dob}
        onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label"><span className='text-red-500'>*</span>DOB</span>
            </span>
          </div>


          <div class="field field_v1 w-full">
            <label for="first-name" class="ha-screen-reader">Password</label>
            <input id="first-name" type={passwordVisible ? "text" : "password"} class="field__input" placeholder=" " name="password"  value={formData.password}
        onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label">Password</span>
            </span>
            <span className="toggle-password absolute right-1 top-3" onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
      </span>
          </div>


          <div class="field field_v1 w-full">
            <label for="first-name" class="ha-screen-reader">Confirm Password</label>
            <input id="first-name" type="password" class="field__input" placeholder=" "  name="confirmPassword" value={formData.confirmPassword}
        onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label">Confirm Password</span>
            </span>
          </div>
          <div className="flex justify-center items-center w-full mt-4 flex-col gap-3">
            <div className='flex flex-row justify-center items-center gap-3'>
            <p className="text-sm">Provide CNIC Image</p>
            <label className="cursor-pointer bg-[#0A1048] rounded-lg px-3 py-1 text-white">
              <span>Choose File</span>
              <input type="file" className="hidden" onChange={handleImageOneChange} />
            </label>
           



            </div>
            {imageOne && <img src={URL.createObjectURL(imageOne)} alt="Image One" />}
         
              <div className='flex flex-row justify-center items-center gap-3'>
              <p className="text-sm">Provide Profile Image</p>
                  <label className="cursor-pointer  bg-[#0A1048] rounded-lg px-3 py-1 text-white">
                    <span>Choose File</span>
                    <input type="file" className="hidden" onChange={handleImageTwoChange} />
                  </label>
                 
              </div>
           
              {imageTwo && <img src={URL.createObjectURL(imageTwo)} alt="Image Two" />}

          </div>


          {!isRegistering ? ( <button onClick={()=>{handleSubmit()}} className=' text-white  px-10 py-2 mt-7 w-full bg-[#041048]'>Register</button>
           ) : ( <p  className=' text-white  px-10 py-2 mt-7 w-full bg-[#041048]'>Registering....</p>
           )}
         
          </div>
       
          <ToastContainer position="top-right" autoClose={3000} />
        </div>

        <Link to="/login" className='text-md mt-4'>Already have an account? <span className='text-[#0A1048] text-md font-bold hover:text-pr ' href="">Login</span> </Link>
    </div>     
    </div>

</div>
 
  )
}

export default Register
