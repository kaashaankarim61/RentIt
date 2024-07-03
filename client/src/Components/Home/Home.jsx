import React, { useEffect, useState } from "react";
import adven from "../../Assets/adven.png";
import "../../Assets/fonts.css";
import EandH from "../../Assets/EandH.jpg";
import Lahore from "../../Assets/Lahore.png";
import Multan from "../../Assets/Multan.png";
import Isl from "../../Assets/Islamabaad.png";
import Khi from "../../Assets/Karachi.png";
import Pwr from "../../Assets/Peshawar.png";
import Pr2 from "../../Assets/Pr2.svg";

import Pr1 from "../../Assets/Pr1.png";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Slices/authSlice";
import Item from "../Item/Item";

function Home() {
  const [query, setQuery] = useState("");
  const authId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Auth : ", authId);
    // Function to fetch data from the API endpoint
    const fetchData = async () => {
      try {
        // Make a GET request using fetch
        const response = await fetch(
          `http://localhost:8080/item/getReco/${authId}`
        );
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the JSON response
        const jsonData = await response.json();
        console.log("Jessy ", jsonData);
        // Set the fetched data in the state
        setData(jsonData);
      } catch (error) {
        // Handle any errors
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();

    // Cleanup function (optional)
    return () => {
      // Cleanup code, if any
    };
  }, [authId]); // Empty dependency array means the effect runs only once, similar to componentDidMount

  // const dispatch =useDispatch()
  function handleSearch() {
    const Q_ = query.replace(/-/g, "fff");
    const Q = Q_.replace(/ /g, "-");
    try {
      if (authId) {
        fetch(`http://localhost:8080/beh/q/${authId}/${Q}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Assuming you are sending JSON data
          },
          body: JSON.stringify({
            // Include any data you want to send in the request body
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // Handle response data
            console.log("Response:", data);
          })
          .catch((error) => {
            // Handle errors
            console.error("Error:", error);
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    navigate(`/Category/Id/a/a/a/q/${Q}`);
  }

  return (
    <>
      <div className="flex flex-col w-full h-auto">
        <div className="h-screen overflow-x-hidden relative ">
          <div className="absolute z-10 flex flex-col items-center justify-center ml-[17%] mt-[15%]">
            <h1 className="text-[#0A1048] font-bold text-5xl text-center">
              Rent <span className="gochi_ text-[#295CD3]">Household </span>{" "}
              <br /> Item from People <br /> in your area{" "}
            </h1>
            <p className="text-[#4b4b4b] text-xl mt-5">
              Borrow almost anything from people nearby <br /> for jobs at home,
              fun experiences or work.
            </p>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="w-[400px] h-[40px] border-2 rounded-full border-[#4b4b4b] mt-5 px-5 "
                placeholder="Search"
              ></input>
              <button
                onClick={() => {
                  handleSearch();
                }}
                className="absolute z-10 right-5 top-7"
              >
                <span class="material-symbols-outlined text-[#295CD3] hover:text-blue-400">
                  search
                </span>
              </button>
            </div>
          </div>
          <img
            src={adven}
            className="absolute z-0 right-0 w-[500px] bottom-0 "
            alt=""
          />
        </div>
        <div className="bg-white w-full h-auto flex flex-col justify-center items-center px-10  gap-[100px] mt-[100px]">
          <div className="w-full h-auto flex flex-col justify-center items-center px-10 py-10">
            <div className=" w-[80%] relative">
              <h1 className=" font-bold text-xl">Recommendations</h1>
              <div className="bg-[#295CD3] opacity-10 w-[180px] h-[15px] absolute translate-y-[-10px] translate-x-[20px]"></div>
            </div>
            {authId && data ? (
          <div className="flex flex-wrap flex-row justify-center items-center w-full  gap-10 px-16  py-12  ">
            {data && data.length === 0 ? (
              <></>
            ) : (
              data.map((item, index) => <Item key={index} item_={item} />)
            )}
          </div>
        ) : (
          <></>
        )}
          </div>
        </div>

      

        <div className="bg-white w-full h-auto flex flex-col justify-center items-center px-10 py-[100px] gap-[100px]">
          <div className="w-full h-auto flex flex-col justify-center items-center px-10 py-10">
            <div className=" w-[80%] relative">
              <h1 className=" font-bold text-xl">Browse by Category</h1>
              <div className="bg-[#295CD3] opacity-10 w-[180px] h-[15px] absolute translate-y-[-10px] translate-x-[20px]"></div>
            </div>

            <div className="flex flex-row w-[80%] items-center justify-center gap-7 mt-10">
              <Link
                to="/Category/Id/eha/a/a"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl  hover:scale-[1.15] ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[200px]  overflow-hidden bg-white rounded-t-2xl">
                  <img
                    src={EandH}
                    className="object-cover scale-[2.2] translate-y-[55px]"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center mt-2 ">
                  Electronics & <br /> Home Appliances
                </p>
              </Link>

              <Link
                to="/Category/Id/bhs/a/a"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl  hover:scale-[1.15]   ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[200px] rounded-t-2xl overflow-hidden bg-white">
                  <img
                    src="https://secure.touchnet.com/C20175_ustores/web/uploaded_images/store_54/Sports_Image.jpg"
                    className="object-cover scale-[2.2] translate-y-[55px]"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center mt-2">
                  Books, Hobbies & <br />
                  Sports
                </p>
              </Link>

              <Link
                to="/Category/Id/fb/a/a"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl  hover:scale-[1.15] ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[200px] rounded-t-2xl overflow-hidden bg-white">
                  <img
                    src="https://img.mensxp.com/media/content/2015/Dec/outrageous-reasons-why-clothes-from-high-street-brands-are-so-cheap980-1449570771.jpg"
                    className="object-cover scale-[2.2] translate-y-[55px]"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center mt-2">
                  Fashion & <br /> Beauty
                </p>
              </Link>

              <Link
                to="/Category/Id/fhd/a/a"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl  hover:scale-[1.15]  ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[200px] rounded-t-2xl overflow-hidden bg-white">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/022/819/321/non_2x/interior-background-of-living-room-with-stucco-wall-vase-with-twig-on-decorative-accent-coffee-table-empty-mock-up-wall-and-wooden-flooring-pendant-light-modern-home-decor-ai-generated-free-photo.jpeg"
                    className="object-cover scale-[2.2] translate-y-[55px]"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center mt-2">
                  Furniture & <br /> Home Decor
                </p>
              </Link>

              <Link
                to="/Category/Id/5"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl hover:scale-[1.15]  ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[200px] rounded-t-2xl overflow-hidden bg-white">
                  <img
                    src="https://res.cloudinary.com/babylist/image/upload/f_auto,q_auto:best,c_scale,w_768/v1659997704/hello-baby/Baby_Gear_Save_vs._Splurge.jpg"
                    className="object-cover scale-[2.2] translate-y-[55px]"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center mt-2">
                  Kids <br /> <span className="text-white">bbb</span>
                </p>
              </Link>
            </div>
          </div>

          <div className="flex w-full h-auto flex-row justify-center  items-center">
            <div>
              <img src={Pr1} className="h-[450px] " alt="" />
            </div>

            <div className="w-[500px] h-full ml-3">
              <p className="text-3xl font-bold">
                Wanna Play <span className="text-[#295CD3]">Sports</span> and
                You Dont Have the Equipment?
              </p>
              <p className="text-xl mt-4">
                {" "}
                No need to worry. Find the perfect sports Equipment and Excel in
                Sports{" "}
              </p>

              <Link
                to="/Category/Id/bhs/a/a"
                className="bg-[#295CD3] mt-[10px] w-[160px] flex flex-row justify-center items-center text-white px-6 py-2 font-bold"
              >
                Get Sports
              </Link>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col justify-center items-center px-10 py-10">
            <div className=" w-[80%] relative">
              <h1 className=" font-bold text-xl">Browse by Area</h1>
              <div className="bg-[#295CD3] opacity-10 w-[180px] h-[15px] absolute translate-y-[-10px] translate-x-[20px]"></div>
            </div>

            <div className="flex flex-row w-[80%] items-center justify-center gap-7 mt-5">
              <Link
                to="/Category/Id/a/a/a/lahore"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl  ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[180px] overflow-hidden rounded-t-2xl relative">
                  <img
                    src={Lahore} // Replace with your image source
                    className="hover:opacity-50"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center  ">Lahore</p>
              </Link>

              <Link
                to="/Category/Id/a/a/a/islamabaad"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl   ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[180px] rounded-t-2xl overflow-hidden bg-white">
                  <img
                    src={Isl} // Replace with your image source
                    className="hover:opacity-50"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center">Islamabad</p>
              </Link>

              <Link
                to="/Category/Id/a/a/a/karachi"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl  ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[180px] rounded-t-2xl overflow-hidden bg-white">
                  <img
                    src={Khi} // Replace with your image source
                    className="hover:opacity-50"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center ">Karachi</p>
              </Link>

              <Link
                to="/Category/Id/a/a/a/multan"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl    ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[180px] rounded-t-2xl overflow-hidden bg-white">
                  <img
                    src={Multan} // Replace with your image source
                    className="hover:opacity-50"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center ">Multan</p>
              </Link>

              <Link
                to="/Category/Id/a/a/a/peshawar"
                className="flex flex-col justify-center items-center shadow-md pb-2 rounded-b-2xl  ease-in-out duration-300 hover:cursor-pointer"
              >
                <div className="w-[200px] h-[180px] rounded-t-2xl overflow-hidden bg-white">
                  <img
                    src={Pwr} // Replace with your image source
                    className="hover:opacity-50"
                    alt=""
                  />
                </div>
                <p className="text-[#4b4b4b] text-center ">Peshawar</p>
              </Link>
            </div>
          </div>

          <div className="flex w-full h-auto flex-row justify-center mt-[50px]  items-center">
            <div className="w-[500px] h-full ml-3 flex flex-col gap-1">
              <p className="text-3xl font-bold">
                Need Something for a while ?{" "}
                <span className="text-[#295CD3]">Do not</span> Buy It!
              </p>
              <p className="text-xl mt-4">
                {" "}
                We have got you. Find the perfect match to your needs on our
                platform{" "}
              </p>

              <Link
                to="/Category/Id/a/a/a"
                className="bg-[#295CD3] mt-[10px] w-[130px] flex flex-row justify-center items-center text-white px-6 py-2 font-bold"
              >
                Discover
              </Link>
            </div>
            <div>
              <img src={Pr2} className="h-[450px] " alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
