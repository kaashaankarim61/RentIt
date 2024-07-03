import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported
import L from "leaflet"; // Import Leaflet

const LeafletMap = (props) => {
  const [searchLocation, setSearchLocation] = useState(null);
  const searchTerm = props.location;

  useEffect(() => {
    if (searchTerm) {
      // Perform search based on the searchTerm
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setSearchLocation({
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
            });
          }
        })
        .catch((error) => console.error("Error searching location:", error));
    }
  }, [searchTerm]);

  return (
    <div style={{ height: "400px", width: "85%" }}>
      <MapContainer
        center={[31.5497, 74.3436]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {searchLocation && (
          <Marker
            position={[searchLocation.lat, searchLocation.lng]}
            icon={customIcon}
          >
            <Popup>{searchTerm}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

// Define custom icon
const customIcon = L.icon({
  iconUrl:
    "https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function ItemDetailPage() {
  let { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.id);

  const [item, setItem] = useState(" ");
  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState({ CR: 0, AR: 0, CoR: 0, QR: 0 });
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    console.log("Item Details: ", itemId);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/item/${itemId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Fetched data:", result);

        if (result && result.length > 0 && result[0].itemName) {
          setItem(result[0]);
        } else {
          console.error("Invalid data structure or empty result");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [itemId]);




  useEffect(() => {
  
    const fetchData = async () => {
      fetch(`http://localhost:8080/beh/i/${id}/${itemId}`, {
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
    
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Item Details: ", itemId);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/item/getReviews/${itemId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Fetched data:", result);

        if (result && result.length > 0) {
          setReviews(result);
          console.log(result);
        } else {
          console.error("Invalid data structure or empty result");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [itemId]);

  useEffect(() => {
    console.log("Item Details: ", itemId);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/item/getRatings/${itemId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Fetched data:", result);

        if (result && result.length > 0) {
          setRatings(result[0]);
          console.log(result);
        } else {
          console.error("Invalid data structure or empty result");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [itemId]);

  useEffect(() => {
    setDisplayImage(item.image1);
  }, [item]);

  const [displayImg, setDisplayImage] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const notifyF = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT, // Change position to BOTTOM_RIGHT
      autoClose: 3000,
    });
  };
  const notifyS = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT, // Set the position of the toast
      autoClose: 3000, // Set auto-close time in milliseconds
    });
  };

  const handleAddConversation = async () => {
    setIsButtonDisabled(true);
    try {
      const response = await fetch("http://localhost:8080/chat/addconv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participant1: id,
          participant2: item.OwnerId,
          unReadCount: 0,
          status: "pending",
          message: `###item:${item.itemId}###`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add conversation");
      }

      const data = await response.json();
      console.log("Conversation added successfully:", data);
      notifyS("chat inserted");

      navigate(`/home/${id}/chat`);
      setIsButtonDisabled(false);
      // Do something with the response, such as displaying a success message or updating state
    } catch (error) {
      console.error("Error adding conversation:", error);
      setIsButtonDisabled(false);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <div className="w-[70%]  h-auto py-2 px-2 font-medium mt-[85px]">
        <h1 className="text-md ">
          {" "}
          {item.mainCategory} &gt; {item.subCategory} &gt; {item.type}
        </h1>
        <div className="flex flex-row justify-center items-center h-[400px] bg-[#ffffff] p-3 rounded-md mt-4 relative">
          <div className="w-[100%] bg-black shadow-md flex items-center justify-center  h-full rounded-lg overflow-hidden ">
            <img className="object-fit" src={displayImg} alt="" />
          </div>
          <div className=" h-[100px]  p-1 w-[300px] rounded-md absolute bottom-0 right-15 flex flex-row gap-3 items-center justify-center">
            <img
              src={item.image1}
              onClick={() => {
                setDisplayImage(item.image1);
              }}
              className=" object-cover rounded-md w-[75px] h-auto shadow-lg cursor-pointer hover:scale-[1.2] ease-in-out duration-200 "
              alt=""
            />
            <img
              src={item.image2}
              onClick={() => {
                setDisplayImage(item.image2);
              }}
              className=" object-cover rounded-md w-[75px] h-auto shadow-lg cursor-pointer hover:scale-[1.2] ease-in-out duration-200 "
              alt=""
            />
            <img
              src={item.image3}
              onClick={() => {
                setDisplayImage(item.image3);
              }}
              className=" object-cover rounded-md w-[75px] h-auto shadow-lg cursor-pointer hover:scale-[1.2] ease-in-out duration-200 "
              alt=""
            />
            <img
              src={item.image4}
              onClick={() => {
                setDisplayImage(item.image4);
              }}
              className=" object-cover rounded-md w-[75px] h-auto shadow-lg cursor-pointer hover:scale-[1.2] ease-in-out duration-200 "
              alt=""
            />
            <img
              src={item.image5}
              onClick={() => {
                setDisplayImage(item.image5);
              }}
              className=" object-cover rounded-md w-[75px] h-auto shadow-lg cursor-pointer hover:scale-[1.2] ease-in-out duration-200 "
              alt=""
            />
          </div>

          {/* <div className='w-[50%] h-full flex flex-col gap-2 px-2 '>

                <div className='shadow-md  flex flex-row w-full gap-2 h-[50%]'>
                <div className='w-[50%] h-full  overflow-hidden '>
                <img className='object-fit' src={item.image2} alt="" />
                </div>
                <div className='w-[50%] h-full overflow-hidden '>
                <img className='object-cover' src={item.image3}  alt="" />
                </div>

                </div>
               
                <div className='flex shadow-md  flex-row w-full gap-2 h-[50%]'>
                <div className='w-[50%] h-full  overflow-hidden '>
                <img className='object-cover' src={item.image4}  alt="" />
                </div>
                <div className='w-[50%] h-full  overflow-hidden flex items-center justify-center '>
                <img className='object-cover' src={item.image5}  alt="" />
                </div>
                </div>
               
            </div> */}
        </div>
        <div className=" w-full h-auto flex flex-row justify-between gap-10 mt-5">
          <div className="flex flex-col mt-3 w-[50%]">
            <h1 className="text-xl font-bold">{item.itemName}</h1>
            <p className="text-xs text-[#4b4b4b] mt-2">{item.keywords}</p>
            <div className="flex flex-row gap-3">
              <p className="text-xs font-bold">
                {ratings && ratings.AR
                  ? (ratings.AR + ratings.CR + ratings.CoR + ratings.QR) / 4
                  : "0.0"}
              </p>

              <p className="text-xs font-bold">
                {reviews && reviews.length > 0 ? `${reviews.length}` : "0"}{" "}
                Reviews
              </p>
            </div>

            <hr className="w-[100%] bg-[#c2c2c2] h-[1px] mt-5" />
            <a
              href={`/home/${item.userId}/profile`}
              className="flex flex-row hover:underline ease-in-out duration-300  items-center mt-5 "
            >
              <img
                className="rounded-full w-[45px] h-[45px]"
                src={item.profilePic}
                alt=""
              />
              <div className="ml-5 ">
                <h1 className="text-xs">{item.name}</h1>
                <p className="text-[9px] text-[#4b4b4b]">{item.dateCreated}</p>
              </div>
            </a>

            <hr className="w-[100%] bg-[#c2c2c2] h-[1px] mt-5" />
            <p className="text-xs text-[#6c6c6c] mt-3">
              {item.itemDescription}
            </p>
            <hr className="w-[100%] bg-[#c2c2c2] h-[1px] mt-5" />

            {item && item.status === "verified" ? (
              <div className="mt-5 flex flex-row gap-4 items-center">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/verified-symbol-icon.png"
                  className="w-[50px] h-[50px]"
                  alt=""
                />
                <div className="flex flex-col ">
                  <h1 className="font-bold">Verified User</h1>
                  <p className="text-sm text-zinc-500">
                    Verified users have their identities approved
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}

            {item && item.success_score >= 2 ? (
              <div className="mt-5 flex flex-row gap-4 items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png"
                  className="w-[50px] h-[50px]"
                  alt=""
                />
                <div className="flex flex-col ">
                  <h1 className="font-bold">Sponsored User</h1>
                  <p className="text-sm text-zinc-500">
                    The Sponsored users have good reputation and are RentIt
                    choice
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}

            {item && item.level && item.success_score ? (
              <div className="mt-5 flex flex-row gap-4 items-center">
                <div className="flex flex-col ">
                  <h1 className="font-bold">Level {item.level}</h1>
                  <p className="text-sm text-zinc-500">
                    The user is on level 1 of renting with a <span className="font-bold text-pr2 mx-1">success score</span> of <span className="font-bold  rounded-full text-pr2 text-xl ml-1">{item.success_score}</span>
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="flex flex-col mt-10 gap-5">
              <div className="flex flex-row gap-3 ">
                <h1 className="font-medium text-md text-zinc-700">
                  {" "}
                  Communication:{" "}
                </h1>

                <div className="flex items-center gap-5">
                  <div className="w-[300px] h-[5px] bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${((ratings.CR ?? 0) / 5) * 100}%` }}
                    ></div>
                  </div>
                  <img
                    src="https://t4.ftcdn.net/jpg/05/70/03/51/360_F_570035178_kjB04e6Myv95x9YukX6ie8ynaaaY7i0L.jpg"
                    className="w-[20px] h-[20px] "
                    alt=""
                  />
                  <h1>{ratings.CR ?? "0.0"}</h1>
                </div>
              </div>

              <div className="flex flex-row gap-3 ">
                <h1 className="font-medium text-md text-zinc-700">
                  {" "}
                  Item Quality:{" "}
                </h1>

                <div className="flex items-center gap-5 ml-7">
                  <div className="w-[300px] h-[5px] bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${((ratings.QR ?? 0) / 5) * 100}%` }}
                    ></div>
                  </div>
                  <img
                    src="https://t4.ftcdn.net/jpg/05/70/03/51/360_F_570035178_kjB04e6Myv95x9YukX6ie8ynaaaY7i0L.jpg"
                    className="w-[20px] h-[20px] "
                    alt=""
                  />
                  <h1>{ratings.QR ?? "0.0"}</h1>
                </div>
              </div>

              <div className="flex flex-row gap-3 ">
                <h1 className="font-medium text-md text-zinc-700">
                  {" "}
                  Accuracy:{" "}
                </h1>

                <div className="flex items-center gap-5 ml-[52px]">
                  <div className="w-[300px] h-[5px] bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${((ratings.AR ?? 0) / 5) * 100}%` }}
                    ></div>
                  </div>
                  <img
                    src="https://t4.ftcdn.net/jpg/05/70/03/51/360_F_570035178_kjB04e6Myv95x9YukX6ie8ynaaaY7i0L.jpg"
                    className="w-[20px] h-[20px] "
                    alt=""
                  />
                  <h1>{ratings.AR ?? "0.0"}</h1>
                </div>
              </div>

              <div className="flex flex-row gap-3 ">
                <h1 className="font-medium text-md text-zinc-700">
                  {" "}
                  Convenience:{" "}
                </h1>

                <div className="flex items-center gap-5 ml-[25px]">
                  <div className="w-[300px] h-[5px] bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${((ratings.CoR ?? 0) / 5) * 100}%` }}
                    ></div>
                  </div>
                  <img
                    src="https://t4.ftcdn.net/jpg/05/70/03/51/360_F_570035178_kjB04e6Myv95x9YukX6ie8ynaaaY7i0L.jpg"
                    className="w-[20px] h-[20px] "
                    alt=""
                  />
                  <h1>{ratings.CoR ?? "0.0"}</h1>
                </div>
              </div>
            </div>

            {/* 
                 <img src="https://firebasestorage.googleapis.com/v0/b/rentit-e521b.appspot.com/o/s1.PNG?alt=media&token=ee2f2eee-94ca-454d-9bf0-851688c80e6b" alt="" />
                 <img src="https://firebasestorage.googleapis.com/v0/b/rentit-e521b.appspot.com/o/s2.PNG?alt=media&token=63659dc8-362c-4e2d-af05-aa5b53fe6946" alt="" /> */}
          </div>

          <div className="w-[45%] h-[600px] p-10 ">
            <div className="bg-white shadow-lg w-full h-full rounded-lg  items-center flex border-[1px] border-[#ededed]  flex-col p-10">
              <div className="w-full h-[50%] flex flex-col justify-start items-center ">
                <h1>Renting Details</h1>
                <div className="border-2 border-[#dcdcdc] h-[50px] w-[100%] flex flex-col items-center justify-center  rounded-lg mt-5">
                  <div className="flex justify-center items-center h-[50%]">
                    <h1 className="font-medium">
                      Item {item.isAvailable ? "Avaialable" : "Not Available"}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-full h-[50%]  flex flex-col justify-end">
                <ul className="text-[12px] text-[#7c7c7c]">
                  <li>1. Inspect the item thoroughly before renting.</li>
                  <li>2. Read and understand the rental agreement.</li>
                  <li>3. Keep the item in a safe and secure location</li>
                  <li>4. Use the item according to its intended purpose.</li>
                  <li>
                    5. Report any damages or malfunctions to the owner
                    immediately.
                  </li>
                </ul>

                <hr className="bg-[#4b4b4b] mt-5" />
                <div className="flex flex-row mt-5 justify-between items-center">
                  <h1 className="text-xl text-[#295Dc3] font-bold">
                    Rent per day
                  </h1>
                  <h1>{item.itemRent}/-</h1>
                </div>
                <div className="flex flex-row mt-2 justify-between items-center">
                  <h1 className="text-md text-[#6d6d6d]">Security Deposit</h1>
                  <h1>{item.itemRent * 0.2}/-</h1>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                handleAddConversation();
              }}
              disabled={isButtonDisabled}
              className="text-white w-full bg-[#295cd3] px-3 py-2 h-[50px] mt-[20px] rounded-lg hover:bg-pr1"
            >
              Chat
            </button>
          </div>
        </div>
        <div className="h-[90px] w-full"></div>
      </div>

      <div className="h-auto flex flex-col items-center rounded-xl shadow-sm overflow-hidden w-full ">
        <h1 className="font-bold text-2xl">Location</h1>
        <div className="rounded-lg overflow-hidden w-[100%] h-auto flex items-center justify-center mt-5">
          {" "}
          <LeafletMap location={item.location} />
        </div>
      </div>

      <div className="h-auto flex flex-col px-10 mt-[30px]  items-center rounded-xl shadow-sm overflow-hidden w-3/4 ">
        <h1 className="font-bold text-2xl mt-3 ">Reviews</h1>
        <div className="w-full h-auto flex flex-row items-center mt-3 gap-16 py-16 overflow-auto">
          {reviews && reviews.length > 0 ? (
            reviews.map((rev, index) => {
              return (
                <div key={index} className="w-[300px] flex flex-col ">
                  <div className="flex flex-row items-center gap-3">
                    <div className="overflow-hidden rounded-full h-[50px] w-[50px]">
                      <img src={rev.profilePic} alt="" />
                    </div>

                    <div className="flex flex-col ">
                      <h1 className="text-sm font-bold text-zinc-800">
                        {rev.name}
                      </h1>
                      <p className="text-xs text-zinc-400">{rev.email}</p>
                    </div>
                  </div>

                  <h1 className="text-[10px] text-zinc-500 mt-5">
                    {rev.reviewText}
                  </h1>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="w-full h-[70px]"></div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ItemDetailPage;
