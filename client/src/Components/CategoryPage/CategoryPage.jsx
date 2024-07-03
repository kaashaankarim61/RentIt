import React, { useEffect, useState } from 'react'
import CategoryBar from '../CategoryBar/CategoryBar'
import Item from '../Item/Item'
import { useParams } from 'react-router-dom'



function CategoryPage(props) {
    
    let {mainCategory,subCategory, type,city, query } = useParams();
    console.log("in idp M = ", mainCategory," S =  ", subCategory, " T = ", type)

    const [data, setData] = useState([]);

    var apiEndpoint = ''
    if(mainCategory!=="a" && subCategory==="a" && props.isCategory===1 && props.isCity===0 && props.isQuery===0){
      console.log("MAINMAIN === >", mainCategory)
      apiEndpoint = `http://localhost:8080/item/getbycategory/${mainCategory}`;

    }
    else if(mainCategory!=="a" && subCategory!=="a" && props.isCategory===1 && props.isCity===0 && props.isQuery===0){
      console.log("MAINMAIN***** === >", mainCategory)
      apiEndpoint = `http://localhost:8080/item/getbysubcategory/${mainCategory}/${subCategory}`
    }
    else if(mainCategory==='a' && props.isCategory===1 && props.isCity===0 && props.isQuery===0){
      console.log("MAINMAIN*****##$$ === >", mainCategory)
      apiEndpoint = `http://localhost:8080/item/getAll`
    }
    else if (mainCategory==='a' && subCategory==='a' && type==='a' && props.isCity===1 ){
      console.log("MAINMAIN****555 === >", mainCategory)
      apiEndpoint = `http://localhost:8080/item/city/${city}`

    } else if (mainCategory==='a' && subCategory==='a' && type==='a' && props.isQuery===1 ){

      console.log("QUERY ========", query)
      apiEndpoint = `http://localhost:8080/item/query/${query}`
    }
    else{
      console.log("MAINMAIN***** jjj=== >", mainCategory)
    }
    

    useEffect(()=>{
      console.log("itemData",data)

    },[data])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiEndpoint]); // Include the variable in the dependency array if it may change

    
  
  return (

    <>
    <CategoryBar />    
    <div  className='flex flex-wrap flex-row justify-center items-center w-full  gap-10 px-16  py-12  '>
    {data && data.length === 0 ? (
                <div className='text-[#4c4c4c] h-[400px] flex items-center justify-center font-bold '>Sorry, No Products Found</div>
            ) : (
                data.map((item, index) => (
                    <Item
                        key={index}
                        item_={item}
                    />
                ))
            )}
    </div> 
    </>
  )
}

export default CategoryPage
