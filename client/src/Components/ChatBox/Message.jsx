import { setUserId } from "firebase/analytics";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Message(props) {
  const { message, user, receiver, isMe } = props;
  // console.log("PROPS", props)
  // console.log("IN me", user)
  // console.log("In Message,")
  const [activityFound, setActivityFound] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [activity, setActivity] = useState("");
  const [content, setContent] = useState(message.text);
  const [receiverImage, setReciverImage] = useState(receiver.profilePic);
  const [senderImage, setSenderImage] = useState(user.profilePic);
  const [days, setDays] =useState(5)

  const [isDisable, setisDisable] = useState(false);

  const [item, setItem] = useState(null);
  useEffect(() => {
    function extractNumericId(str) {
      const regex = /###item:(\d+)###/; // Regular expression to match the pattern
      const match = str.match(regex); // Use match method to find matches

      if (match && match[1]) {
        return parseInt(match[1]); // Return the numeric ID as an integer
      } else {
        return null; // Return null if no match is found or if match[1] is not defined
      }
    }

    const fetchData = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/item/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Fetched data:", result);

        if (result && result.length > 0 && result[0].itemName) {
          setItem(result[0]);

          console.log(user.userId, "", item.OwnerId);

          try {
            const response = await fetch(
              `http://localhost:8080/item/rentings/get/item/${result[0].itemId}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch rentings by item");
            }
            const data = await response.json();
            if (data.length > 0) {
              setisDisable(true);
            }
            return data;
          } catch (error) {
            console.error("Error:", error);
            // Handle error
          }
        } else {
          console.error("Invalid data structure or empty result");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const id = extractNumericId(message.text);
    if (id) {
      fetchData(id);
      setContent("I need this product. Kindly inform me about the details");
    }
  }, []);

  const [isRented, setIsRented] = useState(false);
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/item/rentings/get/item/${item.itemId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.length > 0) {
          setIsRented(true);
        }
      } catch (error) {}
    };

    fetchItemData();
  }, [item]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // // Determine the sender's name
  const senderName =
    message.senderId === receiver.id
      ? receiver.name
      : message.senderId === user.userId
      ? "Me"
      : "";

  // Inserting a new renting
  const insertRenting = async (renterId, itemId,day) => {
    try {
      const response = await fetch(
        `http://localhost:8080/item/rentings/post/${renterId}/${itemId}/${day}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to insert renting");
      }
      const data = await response.json();
   
      try {
        const response = await fetch(
          `http://localhost:8080/item/rentings/ava/${0}/${itemId}`,
          {
            method: "PUT",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to insert renting");
        }
        const data = await response.json();
        notifyS("Item Rented");
        setisDisable(true);
        setIsRented(true);
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
  };

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

  return (
    <div className="flex-col px-3 py-2 ">
      {item ? (
        <div
          name="item"
          className="flex flex-row bg-gray-100 rounded-xl border border-gray-200 overflow-hidden w-full h-auto min-h-[180px] mb-6 "
        >
          <div className="flex overflow-hidden w-[160px] h-[180px]">
            <img src={item.image1} className="object-cover" alt="" />
          </div>
          <div className="flex flex-col p-5 w-[100%]">
            <h1 className="font-bold ">{item.itemName}</h1>
            <h1 className="text-gray-600">{item.itemDescription} </h1>
            <h1 className="font-bold text-lg text-pr2 ">{item.itemRent}/-</h1>
         
            {!isRented ? (
              item.OwnerId == user.userId ? (
                <div className="flex flex-row mt-3 gap-3 items-center ">
                  <input
                    type="number"
                    className="w-[80px] h-[30px] px-3 text-3xl font-bold py-3"
                    value={days}
                    onChange={(e)=>{setDays(e.target.value)}}
                  />
                  <p>Days</p>
                  <button
                    className="px-5 py-2 bg-pr1 text-white font-bold"
                    onClick={() => {
                      insertRenting(receiver.id, item.itemId,days);
                    }}
                  >
                    Rent It
                  </button>
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-row gap-2 items-center">
        <div className="h-[40px] w-[40px] rounded-full overflow-hidden  bg-pr1 flex items-center justify-center">
          <img
            src={
              senderName == receiver.name
                ? receiverImage
                  ? receiverImage
                  : `https://avatar.oxro.io/avatar.svg?name=${
                      senderName.split(" ")[0]
                    }+${senderName.split(" ")[1]}`
                : senderName == "Me"
                ? senderImage
                  ? senderImage
                  : `https://avatar.oxro.io/avatar.svg?name=${
                      user.name.split(" ")[0]
                    }+${user.name.split(" ")[1]}`
                : ``
            }
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="font-bold">{senderName}</p>
          <p className="text-sm">{formatTime(message.timestamp)}</p>
        </div>
      </div>

      <div className="mt-3 text-lg bg-gray-100 rounded-tr-lg rounded-b-lg p-[10px]">
        <p className="px-3 text-sm">{content}</p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Message;
