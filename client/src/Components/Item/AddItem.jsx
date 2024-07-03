import React, { useEffect, useRef, useState } from 'react'
import '../../Assets/input.css'

import clouds from '../../Assets/clouds.png'

import cloud1 from '../../Assets/cloud1.png'
import cloud2 from '../../Assets/cloud2.png'

import Navbar from '../NavBar/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Select from 'react-select'

import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';
import { selectUsername, selectPassword, selectIsAuthenticated } from '../../store/Slices/authSlice'; // Update with the correct path to your selectors file
import { imageDB } from './config'
import { getDownloadURL, getStorage, ref,uploadBytes } from 'firebase/storage'
// Import the functions you need from the SDKs you need

import {v4} from 'uuid'

function AddItem(props) {
  let { id } = useParams();
  console.log("USERID HERE IS = > ",id)

  const navigate =useNavigate()
  if(id==="null" || id===null){
    navigate('/login')
  }
 

  const [insertedItemId, setInsertedItemId] =useState(0)
  const [isInserting, setIsinserting] =useState(false)
  
  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [data, setData] =useState()
  const [username_, setUsername_] =useState(username)


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

  
  useEffect(() => {
    // Function to make the GET API call
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${username_}`); 
        if (response.ok) {
          const result = await response.json();
          setData(result); 
          console.log("INADD ADD ADD = > ", result)
          console.log("Errror tis there")
          console.log(result)
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 

  }, [username_]); 




  const options0 = [
    { value: 'Electronics & Home Appliances', label: 'Electronics & Home Appliances' },
    { value: 'Books, Hobbies & Sports', label: 'Books, Hobbies & Sports' },
    { value: 'Furniture & Home Decor', label: 'Furniture & Home Decor' },
    { value: 'Fashion & Beauty', label: 'Fashion & Beauty' },
    { value: 'Kids', label: 'Kids' },
  ];

  
  
  const options1 = [
    { value: 'Kitchen Appliances', label: 'Kitchen Appliances' },
    { value: 'Computers & Accessories', label: 'Computers Accessories' },
    { value: 'Video-Audios', label: 'Video-Audios' },
    { value: 'Cameras & Accessories', label: 'Cameras & Accessories' },
    { value: 'Games & Entertainment', label: 'Games & Entertainment' },
    { value: 'Refrigeraters & Freezers', label: 'Refrigeraters & Freezers' },
    { value: 'AC & Coolers', label: 'AC & Coolers' },
    { value: 'Televisions & Accessories', label: 'Televisions & Accessories' },
    { value: 'Heaters & Geysers', label: 'Heaters & Geysers' },
    { value: 'Microwaves & Ovens', label: 'Microwaves & Ovens' },
    { value: 'Fans', label: 'Fans' },
    { value: 'Sewing Machines', label: 'Sewing Machines' },
    { value: 'Water Dispensers', label: 'Water Dispensers' },
    { value: 'Irons & Steamers', label: 'Irons & Steamers' }
  ];


  const options2 = [
    { value: 'Books & Magazines', label: 'Books & Magazines' },
    { value: 'Sports Equipment', label: 'Sports Equipment' },
    { value: 'Gym & Fitness', label: 'Gym & Fitness' },
    { value: 'Musical Instruments', label: 'Musical Instruments' },

  ];
  

  const options3 = [
    { value: 'Sofa & Chairs', label: 'Sofa & Chairs' },
    { value: 'Beds & Wardrobes', label: 'Beds & Wardrobes' },
    { value: 'Home Decoration', label: 'Home Decoration' },
    { value: 'Tables & Dining', label: 'Tables & Dining' },
    { value: 'Garden & Outdoor', label: 'Garden & Outdoor' },
    { value: 'Curtains & Blinds', label: 'Curtains & Blinds' },
    { value: 'Rugs & Carpets', label: 'Rugs & Carpets' }
  ];


  const options4 = [
    { value: 'Clothes & Coats', label: 'Clothes & Coats' },
    { value: 'Wedding ', label: 'Wedding Dresses' },
    { value: 'Watches', label: 'Watches & Braclets' },
    { value: 'Footwear', label: 'Footwear' },
    { value: 'Jewellery', label: 'Jewellery & Accessories' },
    { value: 'Bags', label: 'Bags & Clutches' },
    { value: 'Fashion Accessories', label: 'Fashion Accessories' }
  ];
  

  const options5 = [
    { value: 'Toys', label: 'Kids Toys' },
    { value: 'Kids Vehicles', label: 'Kids Vehicles' },
    { value: 'Kids Accessories', label: 'Kids Accessories' },
    { value: 'Kids Furniture', label: 'Kids Furniture' },
    { value: 'Baby Gear', label: 'Baby Gear' },
    { value: 'Kids Clothing', label: 'Kids Clothing' },
    { value: 'Swings & Slides', label: 'Swings & Slides' }
  ];
  
  const [subCat, setSubCat] =useState({value:"select", label:"Select"})
  const [typeCat, setTypeCat] = useState({value:"select", label:"Select"})
  const [mainCatVal, setMainCatval] =useState("")
  const [subCatVal, setSubCatVal] = useState({value:"select", label:"Select"})
  const [typeCatVal, setTypeCatVal] = useState({value:1001, label:"Select"})
  const [categoryId, setCategoryId] = useState(null)
  const [keyWords, setKeywords] =useState(null)
  const [itemType, setItemType] =useState(null)

  const handleOnChangeMain = selectedOption => {
    console.log('Selected:', selectedOption);
    if(selectedOption.value){
    setMainCatval(selectedOption.value)
    }
  
   
  };
  const handleOnChangeSub = selectedOption => {
    setSubCatVal({value:selectedOption.value, label:selectedOption.value})
  };
  const handleOnChangeType= selectedOption => {
    setTypeCatVal({value:selectedOption.value, label:selectedOption.label})
  };
  

 
  useEffect(()=>{
    setSubCatVal({value:"select", label:"Select"})
    if(mainCatVal==="Electronics & Home Appliances"){
      setSubCat(options1)
    }else if(mainCatVal==="Books, Hobbies & Sports"){
      setSubCat(options2)
    }
    else if(mainCatVal==="Furniture & Home Decor"){
      setSubCat(options3)
    }
    else if(mainCatVal==="Fashion & Beauty"){
      setSubCat(options4)
    }
    else if(mainCatVal==="Kids"){
      setSubCat(options5)
    }
    else{
      setSubCat({value:"select", label:"select"})
    }
  },[mainCatVal])


  useEffect(()=>{
    setTypeCatVal({value:"select", label:"Select"})
    const fetchData = async () => {
      try {
        // Replace this with your actual API endpoint and logic
        const Value = subCatVal.value.replace(/ /g, '-'); // Replace spaces with hyphens
        const response = await fetch(`http://localhost:8080/item/getType/${Value}`);
        const data = await response.json();
        console.log("here",data); // Use the fetched data as needed
        setTypeCat(data.map(item => ({
          value: item.categoryID,
          label: item.type
        })))

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[subCatVal])

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [selectedImage5, setSelectedImage5] = useState(null);

  const [img1 , setImg1] =useState(null)
  const [img2 , setImg2] =useState(null)
  const [img3 , setImg3] =useState(null)
  const [img4 , setImg4] =useState(null)
  const [img5 , setImg5] =useState(null)

  const [formValues, setFormValues] = useState({
    itemName: '',
    itemDescription: '',
    itemCondition: '',
    itemRent: '',
    itemLocation: '',
    itemUsage: '',
    itemKeywords: '',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  

  const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImg1(file)

      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file);
      }
  };


  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    setImg2(file)
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage2(reader.result);
        };
        reader.readAsDataURL(file);
    }
};


const handleImageChange3 = (event) => {

  const file = event.target.files[0];
  setImg3(file)
  if (file) {
      const reader = new FileReader();
      reader.onload = () => {
          setSelectedImage3(reader.result);
      };
      reader.readAsDataURL(file);
  }
};



const handleImageChange4 = (event) => {
 
  const file = event.target.files[0];
  setImg4(file)
  if (file) {
      const reader = new FileReader();
      reader.onload = () => {
          setSelectedImage4(reader.result);
      };
      reader.readAsDataURL(file);
  }
};


const handleImageChange5 = (event) => {
  const file = event.target.files[0];
  setImg5(file)
  if (file) {
      const reader = new FileReader();
      reader.onload = () => {
          setSelectedImage5(reader.result);
      };
      reader.readAsDataURL(file);
  }
};

// Function to upload Blob to Firebase Storage
const uploadImageToFirebase = async (img,isMandatory) => {
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
  }else if(!img && !isMandatory) {
    return 'https://firebasestorage.googleapis.com/v0/b/rentit-e521b.appspot.com/o/nnnm.PNG?alt=media&token=f7b3708f-3dd9-4a8a-9c72-8c94022cc4de'
  } else if(!img && isMandatory){
    return null;
  }
  
};

function validateRequestBody(requestBody) {
  const {
    itemName,
    itemDescription,
    itemRent,
    itemType,
    itemKeywords,
    itemCondition, 
    itemLocation,
    image1,
  } = requestBody;

  // Function to check if a value is null or undefined
  const isNullOrUndefined = value => value === null || value === undefined;

  // Check for null values except itemUsage
  const hasNullValues = [itemName, itemDescription, itemRent, itemType, image1,itemKeywords, itemCondition, itemLocation].some(value => isNullOrUndefined(value) && value !== formValues.itemUsage);

  // Check for itemName length
  const isItemNameValid = itemName.length > 2;

  // Check for itemDescription length
  const isItemDescriptionValid = itemDescription.length >= 30;

  // Check if itemRent is numeric
  const isRentNumeric = !isNaN(parseFloat(itemRent)) && isFinite(itemRent);

  // Check if itemType is numeric
  const isTypeNumeric = !isNaN(parseFloat(itemType)) && isFinite(itemType);

  // Final validation
  if (hasNullValues) {
    return "All fields except Usage details must have a value.";
  } else if (!isItemNameValid) {
    return "Item name must be at least 6 characters long.";
  } else if (!isItemDescriptionValid) {
    return "Item description must be between 30 and 200 characters long.";
  } else if (!isRentNumeric && itemRent > 0 ) {
    return "Item rent must be a positive numeric value.";
  } else if (!isTypeNumeric) {
    return "Select the Categories Accurately";
  }

  // All validations passed
  return "success";
}


const handleSubmit = async (e) => {
  setIsinserting(true)
  var Id= 0;
  var isAdded = 0;
  
   
  console.log("the data is ready ==> ==>")
  console.log(formValues)
  console.log(typeCatVal.value)
  console.log(selectedImage)
  console.log()
  const requiredFields = ['itemName', 'itemDescription', 'itemCondition', 'itemRent', 'itemLocation'];
  const hasNullValues = requiredFields.some((field) => formValues[field] === null || formValues[field] === '');

  if (hasNullValues) {
    console.error('Please fill in all required fields');
    return;
  }

  const i1= await uploadImageToFirebase(img1,1);
  const i2 = await uploadImageToFirebase(img2,0);
  const i3 = await uploadImageToFirebase(img3,0);
  const i4 = await uploadImageToFirebase(img4,0);
  const i5 = await uploadImageToFirebase(img5,0);


  const requestBody = {
    itemName: formValues.itemName,
    itemDescription: formValues.itemDescription,
    itemCondition: formValues.itemCondition,
    itemRent: formValues.itemRent,
    itemLocation: formValues.itemLocation,
    itemUsageDetails: formValues.itemUsage,
    itemKeywords: formValues.itemKeywords,
    itemType: typeCatVal.value,
    ownerId: data.userId,
    image1 :  i1,
    image2:   i2,
    image3 :  i3,
    image4 :  i4,
    image5 :  i5
  };

  const validationMessage = validateRequestBody(requestBody);
  if(validationMessage==="success"){

  console.log("RRR",requestBody)
  try {
   
    const response = await fetch('http://localhost:8080/item/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      isAdded=1
      Id= data.Id_  
     
      notifyS(`Item Inserted`)
      setIsinserting(0)
      setTimeout(() => {
        navigate(`/Category/Id/a/a/a`)
        
      }, 3000);
    
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  }else{
    setIsinserting(0)
    notifyF(validationMessage)
  }

  

};





  return (
    
    <div className=' bg-[#0A1048] w-auto h-auto flex flex-center justify-center overflow-x-hidden'>  
 
    <div className='bg-white rounded-3xl w-[1200px] mt-[100px]  my-auto flex flex-col mb-[80px] items-center py-10 z-10'>
      <h1>
        Add Item
      </h1>

      <div  className='flex flex-col justify-center w-[100%] h-auto overflow-y-auto items-center gap-[20px] px-[150px] py-5'>
        <div className='flex flex-col w-[800px] gap-5 '>
         <div class="field field_v1 w-full">
            <label for="name" class="ha-screen-reader">Name</label>
            <input id="name" class="field__input" placeholder="Camera" name="itemName" value={formValues.itemName}
            onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label"><span className='text-red-500'>*</span>Item Name</span>
            </span>
          </div>


          <div class="field field_v1 w-full flex flex-col gap-2">
            <label for="name" class="ha-screen-reader">Name</label>
            <p className='mt-5'> <span className='text-red-500'>*</span>Description</p>
            <textarea id="name" rows={5}  style={{ height: '5em' }} className="field__input"  placeholder=" " name="itemDescription" value={formValues.itemDescription}
            onChange={handleInputChange} />
          </div>

          <div class="field field_v1 w-full">
            <label for="name" class="ha-screen-reader">Condition</label>
            <input id="name" class="field__input" placeholder="Good/Excellent/Outstanding" name="itemCondition"  value={formValues.itemCondition}
            onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label"><span className='text-red-500'>*</span>Item Condition</span>
            </span>
          </div>


          <div class="field field_v1 w-full">
            <label for="name" class="ha-screen-reader">Item Rent</label>
            <input type="number" id="name" class="field__input" placeholder=" " name="itemRent"  value={formValues.itemRent}
            onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label"><span className='text-red-500'>*</span>Item Rent Rs.</span>
            </span>
          </div>

          
          <div class="field field_v1 w-full">
            <label for="security" class="ha-screen-reader">Item Rent</label>
            <input type="number" id="security" class="field__input" placeholder=" " name="itemSecurity"  value={formValues.itemRent *0.20}
            onChange={handleInputChange}/>
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label"><span className='text-red-500'>*</span>Security Deposit Rs.</span>
            </span>
          </div>

          <div class="field field_v1 w-full">
            <label for="name" class="ha-screen-reader">Item Rent</label>
            <input id="name" class="field__input" placeholder=" " name="itemLocation" value={formValues.itemLocation}
            onChange={handleInputChange} />
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label">Location</span>
            </span>
          </div>


          <div class="field field_v1 w-full">
            <label for="name" class="ha-screen-reader">Item Rent per day</label>
            <input id="name" class="field__input" placeholder="e.g. Uncover the lens cover before using" name="itemUsage" value={formValues.itemUsage}
            onChange={handleInputChange} />
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label">Usage Details</span>
            </span>
          </div>

        </div>

        {/* <div className='w-[2px] h-full bg-[#dfdfdf]'>

        </div> */}

        <div className='flex flex-col gap-5 w-[800px]'>
        <p className='mt-2 text-xs'> <span className='text-red-500'>*</span>Main category</p>
        <Select className='text-xs ' options={options0} onChange={handleOnChangeMain}  />
        <p className='mt-2 text-xs'> <span className='text-red-500'>*</span>Sub Category</p>
        <Select className='text-xs ' options={subCat} value={subCatVal}  onChange={handleOnChangeSub}/>
        <p className='mt-2 text-xs'> <span className='text-red-500'>*</span>Type</p>
        <Select className='text-xs ' options={typeCat} value={typeCatVal} onChange={handleOnChangeType} />
        <div className='h-[2px] w-full bg-[#d5d5d5]'>

        </div>
        <div class="field field_v1 w-full flex flex-col gap-2">
            <label for="name" class="ha-screen-reader">Name</label>
            <p className='mt-5'> <span className='text-red-500'>*</span>KeyWords</p>
            <textarea id="name" rows={5}  style={{ height: '5em' }} className="field__input"  placeholder="Camera" name="itemKeywords" value={formValues.itemKeywords}
            onChange={handleInputChange} />
          </div>
       
        </div>

        {/* <div className='w-[2px] h-full bg-[#dfdfdf]'>

        </div> */}

        <div className='flex flex-row flex-wrap gap-5 w-[800px]'>
            <div className='w-[100px] h-[100px]'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="fileInput"
                />
                <label htmlFor="fileInput" className="border-2 border-gray-300 p-2 rounded-lg cursor-pointer w-full h-full flex items-center justify-center">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                        <span>+</span>
                    )}
                </label>
            </div>

            <div className='w-[100px] h-[100px]'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange2}
                    className="hidden"
                    id="fileInput2"
                />
                <label htmlFor="fileInput2" className="border-2 border-gray-300 p-2 rounded-lg cursor-pointer w-full h-full flex items-center justify-center">
                    {selectedImage2 ? (
                        <img src={selectedImage2} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                        <span>+</span>
                    )}
                </label>
            </div>
            <div className='w-[100px] h-[100px]'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange3}
                    className="hidden"
                    id="fileInput3"
                />
                <label htmlFor="fileInput3" className="border-2 border-gray-300 p-2 rounded-lg cursor-pointer w-full h-full flex items-center justify-center">
                    {selectedImage3 ? (
                        <img src={selectedImage3} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                        <span>+</span>
                    )}
                </label>
            </div>
            <div className='w-[100px] h-[100px]'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange4}
                    className="hidden"
                    id="fileInput4"
                />
                <label htmlFor="fileInput4" className="border-2 border-gray-300 p-2 rounded-lg cursor-pointer w-full h-full flex items-center justify-center">
                    {selectedImage4 ? (
                        <img src={selectedImage4} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                        <span>+</span>
                    )}
                </label>
            </div>
            <div className='w-[100px] h-[100px]'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange5}
                    className="hidden"
                    id="fileInput5"
                />
                <label htmlFor="fileInput5" className="border-2 border-gray-300 p-2 rounded-lg cursor-pointer w-full h-full flex items-center justify-center">
                    {selectedImage5 ? (
                        <img src={selectedImage5} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                        <span>+</span>
                    )}
                </label>
            </div>
         
       
            
        </div>
        {!isInserting ? (        <button  onClick={()=>{handleSubmit()}} className='bg-[#0a1048] text-white rounded-lg w-[150px] h-[60px] hover:bg-[#0a1048e4]'>Add Item</button>
        ) : (        <button className='bg-[#0a1048] text-white rounded-lg w-[150px] h-[60px] hover:bg-[#0a1048e4]'>Inserting...</button>
        )}

       
     
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    
    </div>     
    </div>
  )
}

export default AddItem
