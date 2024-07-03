import React, { useDebugValue, useEffect, useState } from "react";
import { logo } from "../../Assets/logo.png";
import Navbar_ from "../NavBar/Navbar_";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditItem from "../Item/EditItem";
import { useSelector } from "react-redux";
import Rating from "react-rating-stars-component";
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const ReviewForm = (props) => {
    const itemId =props.revItem;
    const givenBy =props.id;
    const [qualityRating, setQualityRating] = useState(0);
    const [convenienceRating, setConvenienceRating] = useState(0);
    const [accuracyRating, setAccuracyRating] = useState(0);
    const [communicationRating, setCommunicationRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const url = 'http://localhost:8080/item/addReview'; // Replace 'your-api-endpoint' with the actual API endpoint URL
  
      const formData = {
          itemId: itemId,
          givenBy: givenBy,
          reviewText: reviewText,
          communicationRating: communicationRating,
          accuracyRating: accuracyRating,
          itemQualityRating: qualityRating,
          convenienceRating: convenienceRating
      };
  
      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });
  
          const data = await response.json();
          alert("Submitted the Review")
          props.setBox(false)
          props.setRevCheck(true)
          console.log('Review added successfully:', data);
          // Add any additional logic here, such as showing a success message to the user
      } catch (error) {
          console.error('Error adding review:', error);
          // Handle errors, such as displaying an error message to the user
      }
  };
  

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-10 flex items-center justify-center flex-col z-50">
            <div className="mb-4">
                <div className="mb-4">
                    <label>Quality: {qualityRating}</label>
                    <Rating
                        count={5}
                        value={qualityRating}
                        onChange={(rating) => setQualityRating(rating)}
                        size={40}
                        activeColor="#ffd700"
                        isHalf={true}
                        emptyIcon={<FaRegStar />}
                        halfIcon={<FaStarHalfAlt />}
                        filledIcon={<FaStar />}
                    />
                </div>
                <div className="mb-4">
                    <label>Convenience: {convenienceRating}</label>
                    <Rating
                        count={5}
                        value={convenienceRating}
                        onChange={(rating) => setConvenienceRating(rating)}
                        size={40}
                        activeColor="#ffd700"
                        isHalf={true}
                        emptyIcon={<FaRegStar />}
                        halfIcon={<FaStarHalfAlt />}
                        filledIcon={<FaStar />}
                    />
                </div>
                <div className="mb-4">
                    <label>Accuracy: {accuracyRating}</label>
                    <Rating
                        count={5}
                        value={accuracyRating}
                        onChange={(rating) => setAccuracyRating(rating)}
                        size={40}
                        activeColor="#ffd700"
                        isHalf={true}
                        emptyIcon={<FaRegStar />}
                        halfIcon={<FaStarHalfAlt />}
                        filledIcon={<FaStar />}
                    />
                </div>
                <div className="mb-4">
                    <label>Communication: {communicationRating}</label>
                    <Rating
                        count={5}
                        value={communicationRating}
                        onChange={(rating) => setCommunicationRating(rating)}
                        size={40}
                        activeColor="#ffd700"
                        isHalf={true}
                        emptyIcon={<FaRegStar />}
                        halfIcon={<FaStarHalfAlt />}
                        filledIcon={<FaStar />}
                    />
                </div>
                <label>Review:</label>
                <textarea
                    rows="4"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
            </div>

            <div className="flex flex-row gap-3 ">
            <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Submit Review
            </button>

            <button
                onClick={()=>{props.setBox(false)}}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Cancel
            </button>

            </div>
          
        </div>
    );
};

function Profile() {
  let { id } = useParams();

  const myId = useSelector((state) => state.auth.id);

  console.log("ID = >", id, myId);
  // alert("ID = ", id, "myid", myId)
  const [user, setUser] = useState(null);
  const [items, setItems] = useState(null);

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

  function Item(props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    function calculateDaysLeft(dateStr, numDays) {
      // Convert ISO 8601 date string to Date object
      const inputDate = new Date(dateStr);

      // Calculate future date
      const futureDate = new Date(
        inputDate.getTime() + numDays * 24 * 60 * 60 * 1000
      );

      // Calculate days left
      const currentDate = new Date();
      const timeDiff = futureDate.getTime() - currentDate.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

      return daysLeft;
    }
    const handleClick = () => {
      setIsDeleting(true);
      fetch(`http://localhost:8080/item/delete/${props.itemId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete item");
          }
          console.log("Item deleted successfully");
          notifyS("Item Deleted Successfully");
          // Optionally, you can perform any additional actions after successful deletion
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          // Optionally, you can handle errors or display error messages
        })
        .finally(() => {
          setIsDeleting(false);
        });
    };
    return (
      <>
        <div className="w-full h-auto bg-[#cdd5f63d]  py-4  rounded-md flex flex-row justify-between px-5 ">
          <div className="flex flex-row items-center gap-5 ">
            <div className="w-[55px] h-[55px] rounded-md overflow-hidden items-center justify-center bg-pr1 flex">
              <img className="object-cover" src={props.image} alt="" />
            </div>
            <div className="flex items-center flex-row gap-[50px]">
              <h1 className="font-bold w-[150px] overflow-hidden text-sm">
                {props.title}
              </h1>
              <h1 className=" w-[200px] overflow-hidden text-xs">
                {props.description}
              </h1>
              <h1 className="font-medium text-green-600 w-[80px] text-sm overflow-hidden">
                {props.status}{" "}
              </h1>
              <h1 className="font-bold w-[80px] text-sm overflow-hidden">
                {props.price}/-{" "}
              </h1>
              {props.item.renterId ? (
                <h1 className="font-bold w-[100px] overflow-hidden text-sm">
                  {props.item.renterId}{" "}
                </h1>
              ) : (
                <h1 className="text-sm w-[100px]"> ----------------- </h1>
              )}
              {props.item.renterId ? (
                <h1 className="font-bold w-[80px] overflow-hidden text-sm">
                  {calculateDaysLeft(props.item.rentedOn, props.item.forDays)}{" "}
                </h1>
              ) : (
                <h1 className="text-sm w-[100px]"> ----------------- </h1>
              )}
              {props.item.rentedOn ? (
                <h1 className="font-bold w-[120px] overflow-hidden text-sm">
                  {props.item.rentedOn}{" "}
                </h1>
              ) : (
                <h1 className="text-sm w-[100px]"> ----------------- </h1>
              )}
              {props.item.renterId ? (
                <h1 className="font-bold w-[120px] overflow-hidden text-sm">
                  {props.price * props.item.forDays}{" "}
                </h1>
              ) : (
                <h1 className="text-sm w-[100px]"> ----------------- </h1>
              )}
            </div>
          </div>

          {id == myId ? (
            <div className="flex flex-row gap-4 items-center">
              <button onClick={handleClick} disabled={isDeleting}>
                <span className="material-symbols-outlined hover:text-red-500">
                  Delete
                </span>
              </button>

              <button
                onClick={() => {
                  setIsEditor(!isEditor);
                }}
              >
                <span class="material-symbols-outlined hover:text-pr2">
                  edit
                </span>
              </button>
            </div>
          ) : (
            <></>
          )}

          <ToastContainer position="top-right" autoClose={3000} />
        </div>
        {isEditor ? <EditItem item={props.item} /> : <></>}
      </>
    );
  }

  useEffect(() => {
    console.log("user->", user);
    console.log("items->", items);
  }, [user, items]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
        setBio(userData.bio);
        setPhone(userData.phone);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchItemsData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/get/user/items/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items data");
        }
        const itemsData = await response.json();
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items data:", error);
      }
    };

    fetchUserData();
    fetchItemsData();
  }, []); // Empty dependency array to run effect only once when component mounts

  const [rentings, setRentings] = useState(null);

  useEffect(() => {
    const getRentingsByRenterId = async (renterId) => {
      try {
        const response = await fetch(
          `http://localhost:8080/item/rentings/get/${renterId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch rentings by renterId");
        }
        const data = await response.json();
        console.log("Rentings : ", data);
        setRentings(data);
        return data;
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    };
    getRentingsByRenterId(myId);
  }, [myId]);

  const [prEdit, setprEdit] = useState(false);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const handleUpdate = () => {
    const url = `http://localhost:8080/update/profile/${myId}`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phone, bio: bio }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile updated successfully:", data);
        setprEdit(false); // Close the edit profile section upon successful update
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Handle error appropriately, e.g., display error message to the user
      });
  };

  const [report, setReport] = useState(false);
  const [r, setR] = useState(0);
  const [reasons, setReasons] = useState({
    inappropriateContent: false,
    harassment: false,
    spam: false,
    fakeAccount: false,
  });

  const [disabler, setdisabler] = useState(false);
  const handleUpdate_ = async (victim, filer) => {
    const url = `http://localhost:8080/report/${victim}/${filer}/${r}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You can add body data here if needed
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Report is Submitted");
      setdisabler(true);
      console.log("Reported:", phone, "Reasons:", reasons);
      console.log("Report submitted successfully");
    } catch (error) {
      console.error("Error submitting report:", error.message);
    }

    // Reset form after reporting

    setReasons({
      inappropriateContent: false,
      harassment: false,
      spam: false,
      fakeAccount: false,
    });
    setReport(false);
  };

  function calculateDaysLeft(dateStr, numDays) {
    // Convert ISO 8601 date string to Date object
    const inputDate = new Date(dateStr);

    // Calculate future date
    const futureDate = new Date(
      inputDate.getTime() + numDays * 24 * 60 * 60 * 1000
    );

    // Calculate days left
    const currentDate = new Date();
    const timeDiff = futureDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysLeft;
  }

  async function returnItem(itemId) {
    try {
      const response = await fetch(
        `http://localhost:8080/item/rentings/ava/${1}/${itemId}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to insert renting");
      }
      const data = await response.json();

      try {
        const response = await fetch(
          `http://localhost:8080/item/rentings/del/item/${itemId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to insert renting");
        }
        const data = await response.json();
        notifyS("Item Returned");
        return data;
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  }


  const [revBox, setRevBox] = useState(false);
  const [revItem, setRevItem] = useState(null);

  const reviewItem = async (itemId) => {
    setRevBox(true)
    setRevItem(itemId)
  };


  const [revCheck , setRevCheck] =useState(false)


  return (
    <div>
      <Navbar_ />

      {user && items ? (
        <>
          {revBox && (
            <div className="h-[100vh] w-[100vw] bg-[#0000009f] absolute z-50 items-center justify-center flex ">
                <ReviewForm revItem={revItem} id={myId} setBox={setRevBox} setRevCheck={setRevCheck} />
              </div>
            
          )}
          <div
            className={` ${
              prEdit ? "absolute" : "hidden"
            } w-[100%]  self-center h-[100%] bg-[#000000a6] z-30 flex items-center justify-center`}
          >
            <div className="bg-white rounded-xl w-[30%] h-[35%] p-5 flex flex-col gap-6">
              <h1 className="font-bold text-xl">Edit Profile</h1>
              <div className="flex flex-row items-center">
                <p className="w-[100px]">Phone</p>
                <input
                  type="text"
                  className="w-[400px] h-[40px] rounded-md border-2 border-gray-300 p-2 "
                  placeholder="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center">
                <p className="w-[100px]">Bio</p>
                <textarea
                  className="w-[400px] h-[80px] rounded-md border-2 border-gray-300 p-2"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="flex flex-row gap-3">
                <button
                  className="bg-pr1 hover:bg-pr2 text-white w-[130px] h-[40px] rounded-lg"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setprEdit(false);
                  }}
                  className="bg-pr1 hover:bg-pr2 text-white w-[130px] h-[40px] rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div
            className={` ${
              report ? "absolute" : "hidden"
            } w-[100%]  self-center h-[100%] bg-[#000000a6] z-30 flex items-center justify-center`}
          >
            <div className="bg-white rounded-xl w-[30%] h-[40%] p-5 flex flex-col gap-6">
              <h1 className="font-bold text-xl">Report Profile</h1>

              <div className="flex flex-col gap-2">
                <label>
                  <input
                    type="radio"
                    name="reason"
                    value="inappropriateContent"
                    checked={reasons === "inappropriateContent"}
                    onChange={() => {
                      setReasons("inappropriateContent");
                      setR(1);
                    }}
                  />
                  Inappropriate Content
                </label>
                <label>
                  <input
                    type="radio"
                    name="reason"
                    value="harassment"
                    checked={reasons === "harassment"}
                    onChange={() => {
                      setReasons("harassment");
                      setR(2);
                    }}
                  />
                  Harassment
                </label>
                <label>
                  <input
                    type="radio"
                    name="reason"
                    value="spam"
                    checked={reasons === "spam"}
                    onChange={() => {
                      setReasons("spam");
                      setR(3);
                    }}
                  />
                  Spam
                </label>
                <label>
                  <input
                    type="radio"
                    name="reason"
                    value="fakeAccount"
                    checked={reasons === "fakeAccount"}
                    onChange={() => {
                      setReasons("fakeAccount");
                      setR(4);
                    }}
                  />
                  Fake Account
                </label>
              </div>

              <div className="flex flex-row gap-3 mt-auto">
                <button
                  className="bg-pr1 hover:bg-red-500 text-white w-[130px] h-[40px] rounded-lg"
                  onClick={() => {
                    handleUpdate_(id, myId);
                  }}
                >
                  Report
                </button>
                <button
                  onClick={() => {
                    setReport(false);
                  }}
                  className="bg-pr1 hover:bg-pr2 text-white w-[130px] h-[40px] rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="bg-pr1 min-h-screen mt-[60px] w-[100%] h-auto flex flex-col p-10 relative">
            <div className="flex-row flex p-5 gap-4">
              <div className="bg-white  w-[60%] h-[270px] flex flex-row items-center p-5 gap-6 ">
                <div className="w-[200px] h-[200px] rounded-lg overflow-hidden flex items-center justify-center bg-black">
                  {user.profilePic ? (
                    <img
                      className="object-cover "
                      src={user.profilePic}
                      alt=""
                    />
                  ) : (
                    <img
                      className="object-cover"
                      src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1710446491~exp=1710447091~hmac=92ac61329ac478561262a3ba0612dce1386d787e5306bebc76e63ced6ea740cb"
                      alt=""
                    />
                  )}

                  {id == myId ? (
                    <button
                      onClick={() => {
                        setprEdit(true);
                      }}
                      className=" absolute leading-[19px] mt-2 translate-y-24 bg-blue-600 w-[120px] font-bold p-1 text-xs items-center hover:bg-pr1 justify-center flex rounded-full text-white"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setReport(true);
                      }}
                      className={`absolute leading-[19px] mt-2 translate-y-24 bg-red-600 w-[120px] font-bold p-1 text-xs items-center hover:bg-pr1 justify-center  rounded-full text-white ${
                        disabler ? "hidden" : "flex"
                      }`}
                    >
                      Report User
                    </button>
                  )}
                </div>
                <div className="flex flex-col w-auto h-auto ">
                  <h1 className="font-bold text-2xl">{user.name}</h1>
                  <p className="leading-[14px] mt-2 ">{user.email}</p>
                  <p className="leading-[19px] mt-2">
                    {" "}
                    <span className="font-bold">Phone :</span> {phone}
                  </p>
                  <p className="leading-[19px] mt-2">
                    {" "}
                    <span className="font-bold">CNIC :</span> {user.cnic}
                  </p>
                  <p className="mt-4 bg-[#3b3b3b16] p-2 rounded-md">{bio}</p>
                </div>
              </div>
              <div className="bg-white  w-[40%] h-[270px] flex flex-col items-center p-1 gap-1">
                <p className="w-full text-center p-3">Profile Overview</p>

                <div className="flex flex-row flex-wrap w-full  h-full justify-center items-center gap-5">
                  <div className="flex flex-col justify-center items-center bg-[#c5d7ff49] p-4 rounded-lg">
                    <h1 className="font-bold text-5xl">23</h1>
                    <p className="leading-[15px] text-center mt-2 text-sm">
                      Product <br /> Added
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center bg-[#c5d7ff49] p-4 rounded-lg">
                    <h1 className="font-bold text-5xl">
                      2.0 <br />{" "}
                    </h1>
                    <p className="leading-[15px] text-center mt-2 text-sm">
                      Ratings
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center bg-[#c5d7ff49] p-4 rounded-lg">
                    <h1 className="font-bold text-5xl">
                      2+ <br />
                    </h1>
                    <p className="leading-[15px] text-center mt-2 text-sm">
                      Reviews
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center bg-[#c5d7ff49] p-4 rounded-lg">
                    <h1 className="font-bold text-5xl">7</h1>
                    <p className="leading-[15px] text-center mt-2 text-sm">
                      Success <br /> Score
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full h-auto p-5 flex flex-col">
              {items.length > 0 ? (
                <div className="flex bg-white flex-col w-full p-2 gap-1 ">
                  <h1 className="font-bold">Postings</h1>
                  <div className="w-full h-[35px] bg-[#cdd5f671] rounded-md flex flex-row justify-between px-2 ">
                    <div className="flex flex-row items-center gap-5">
                      <h1 className="w-[70px]"></h1>
                      <div className="flex flex-row gap-[50px]">
                        <h1 className="font-bold w-[150px]">Title </h1>
                        <h1 className="font-bold w-[200px]">Description</h1>
                        <h1 className="font-bold w-[80px]">Status</h1>
                        <h1 className="font-bold w-[80px]">Rent</h1>
                        <h1 className="font-bold w-[100px]">Rented to</h1>
                        <h1 className="font-bold w-[80px]">Days Left</h1>
                        <h1 className="font-bold w-[120px]">Date Rented</h1>
                        <h1 className="font-bold w-[120px]">Total Rent</h1>
                      </div>
                    </div>
                  </div>
                  {items.map((item) => (
                    <Item
                      key={item.itemId} // Assuming itemName is unique, use a unique key for each item
                      title={item.itemName}
                      description={item.itemDescription}
                      price={item.itemRent}
                      status={item.isAvailable ? "Available" : "Not Available"}
                      image={item.image1}
                      itemId={item.itemId}
                      item={item}
                      renterId={item.renterId}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
              {id == myId ? (
                <div className="flex bg-white  flex-col w-full p-2 gap-1 ">
                  <h1 className="font-bold">Rentings</h1>
                  <div className="w-full h-[35px] bg-[#cdd5f671] rounded-md flex flex-row justify-between px-2 ">
                    <div className="flex flex-row items-center gap-5">
                      <h1 className="w-[70px]"></h1>
                      <div className="flex flex-row gap-[50px]">
                        <h1 className="font-bold w-[150px]">Title </h1>
                        <h1 className="font-bold w-[100px]">Rent</h1>
                        <h1 className="font-bold w-[120px]">Date Rented</h1>
                        <h1 className="font-bold w-[120px]">Rented From</h1>
                        <h1 className="font-bold w-[120px]">For Days</h1>
                        <h1 className="font-bold w-[120px]">Days Left</h1>
                        <h1 className="font-bold w-[120px]">Total Rent</h1>
                        <h1 className="font-bold w-[110px]">Review</h1>
                        <h1 className="font-bold w-[110px]">Return</h1>
                      </div>
                    </div>
                  </div>
                  {rentings &&
                    rentings.map((item) => (
                      <div
                        key={item.itemId}
                        className="w-full h-auto bg-[#cdd5f63d] py-4 rounded-md flex flex-row justify-between px-5"
                      >
                        <div className="flex flex-row items-center gap-5">
                          <div className="w-[55px] h-[55px] rounded-md overflow-hidden items-center justify-center bg-pr1 flex">
                            {item.image1 && (
                              <img
                                className="object-cover"
                                src={item.image1}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="flex items-center flex-row gap-[50px]">
                            <h1 className="font-bold w-[150px] text-sm overflow-hidden">
                              {item.itemName || "No Name"}
                            </h1>
                            <h1 className="font-bold w-[100px] text-sm overflow-hidden">
                              {item.itemRent ? `${item.itemRent}/-` : "No Rent"}
                            </h1>
                            <h1 className="font-bold w-[120px] text-sm overflow-hidden">
                              {item.rentedOn
                                ? `${item.rentedOn}`
                                : "------------"}
                            </h1>
                            <h1 className="font-bold w-[120px] text-sm overflow-hidden">
                              {item.OwnerId
                                ? `${item.OwnerId}`
                                : "------------"}
                            </h1>
                            <h1 className="font-bold w-[120px] text-sm overflow-hidden">
                              {item.forDays
                                ? `${item.forDays}`
                                : "------------"}
                            </h1>
                            <h1 className="font-bold w-[120px] text-sm overflow-hidden">
                              {item.rentedOn
                                ? `${calculateDaysLeft(
                                    item.rentedOn,
                                    item.forDays
                                  )}`
                                : "------------"}
                            </h1>
                            <h1 className="font-bold w-[120px] text-sm overflow-hidden">
                              {item.itemRent
                                ? `${item.itemRent * item.forDays}`
                                : "------------"}
                            </h1>


                            {
                              !revCheck ? (
                                <button
                                onClick={() => {
                                  reviewItem(item.itemId);
                                }}
                                className="w-[110px] h-[50px] text-white bg-pr1 rounded-lg hover:bg-pr2"
                              >
                                Review
                              </button>
                              ) : (  <button
                               
                                className="w-[110px] h-[50px] text-white bg-pr1 rounded-lg hover:bg-pr2"
                              >
                                submitted
                              </button>)
                            }
                          
                            <button
                              onClick={() => {
                                returnItem(item.itemId);
                              }}
                              className="w-[110px] h-[50px] text-white bg-pr1 rounded-lg hover:bg-pr2"
                            >
                              Return
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
