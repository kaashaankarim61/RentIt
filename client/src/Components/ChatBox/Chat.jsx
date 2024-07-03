import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import Navbar_ from '../NavBar/Navbar_'
import { useSelector } from 'react-redux';


function Chat() {
  const { id } = useParams();
  
  const [conversations, setConversations] = useState([]);
  const myId = useSelector(state=> state.auth.id)

  //isCLicked
  const [convState, setConvState] =useState(null)
  //activeConversationId
  const [activeConversation, setActiveConversation] =useState(null)
  //OpenConversation
  const [openConversation, setOpenConversation] =useState(null)

  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  //Messages
  const [messages, setMessages] = useState(null);
  const [user, setUser] =useState(null)


  const [recieverData, setReceiverData] =useState(null)


  const messagesContainerRef = useRef(null);

  // console.log("Id = >", id, "MyId =>", myId)
  // Function to scroll the messages container to the bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when component mounts or when messages change
  }, [openConversation]);

  useEffect(()=>{
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData()
  },[])


  useEffect(()=>{
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${receiver.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData_ = await response.json();
        setReceiverData(userData_);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData()
  },[receiver])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // console.log(openConversation, "c", openConversation.conversationId)
        const response = await fetch(`http://localhost:8080/chat/getall/${openConversation.conversationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.length > 0 ? data : null);
      } catch (error) {
        console.error(error);
      }
    };
    setTypedMessage('')
    fetchMessages(); // Fetch messages immediately when openConversation changes
  
    const intervalId = setInterval(fetchMessages, 100); // Fetch messages every 3 seconds
  
  
    return () => clearInterval(intervalId); // Clear interval on component unmount or when openConversation changes
  }, [openConversation]);

  
  //typedMessage
  const [typedMessage, setTypedMessage] = useState('')


//   useEffect(()=>{
// console.log("M",messages)
//   },[messages])
  
  useEffect(() => {
    // console.log("ActiveConv ", activeConversation)
    // Find the conversation matching the activeConversationId
    const conversation = conversations.find(conv => conv.conversationId === activeConversation);

    // console.log(conversation)
    
    // If conversation is found, update the openConversation state
    if (conversation) {
      setOpenConversation(conversation);

      // console.log("Here MyId = > ", myId)
      
      // Determine sender and receiver based on myId
      const receiver = myId === conversation.participant1Id ? {
        id: conversation.participant1Id,
        name: conversation.participant1Name,
        email: conversation.participant1Email,
        profilePic: conversation.participant1ProfilePic
    } : {
        id: conversation.participant2Id,
        name: conversation.participant2Name,
        email: conversation.participant2Email,
        profilePic: conversation.participant2ProfilePic
    };
    
    const sender = myId === conversation.participant1Id ? {
        id: conversation.participant2Id,
        name: conversation.participant2Name,
        email: conversation.participant2Email,
        profilePic: conversation.participant2ProfilePic
    } : {
        id: conversation.participant1Id,
        name: conversation.participant1Name,
        email: conversation.participant1Email,
        profilePic: conversation.participant1ProfilePic
    };
      // console.log("Sendr : ",sender)
      // console.log("Reciever" ,receiver)
      // Update sender and receiver states
      setSender(receiver);
      setReceiver(sender);


    } else {
      setOpenConversation(null); // Reset openConversation if activeConversation is not found
    }
  }, [activeConversation]);

// useEffect(()=>{


//   console.log("OC",openConversation)
// },[openConversation])

  useEffect(() => {
    // Extracting the id parameter from the window's path


    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/chat/get/all/conv/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const data = await response.json();
        setConversations(data);
        setActiveConversation(data[0].conversationId)
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text:`${typedMessage}`, conversationId: openConversation.conversationId, senderId:user.userId })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
       
      }, 150);
      setTypedMessage('')
     
     
    } catch (error) {
      console.error('Error sending message:', error);
     
    }
  };

  return (
    <>
   
    <div className='bg-pr1 w-full h-screen p-10 flex flex-col '>
    {/* <Navbar_/> */}

      <div className='flex flex-row w-full h-full gap-5'>
        <div className='bg-white  h-full w-[25%] px-[20px] py-[30px] flex flex-col gap-3'>
          <h1 className='font-bold text-pr1 text-[22px] '>Conversations</h1>
          <div className='flex flex-col gap-2'>
            {conversations.map(conversation => (
              <Conversation 
              key={conversation.conversationId} 
              conversation={conversation} 
              userId={id}
              convId = {conversation.conversationId}
              setActiveConv = {setActiveConversation} 
              activeConv= {activeConversation}/>

            ))}
          </div>           
        </div>
        <div className='bg-[#ffffff63]  h-full w-[80%] flex flex-col gap-2 p-3'>
            <div className='h-[10%] w-full flex flex-row p-4 items-center bg-[#ffffffd6] '>
                {receiver ? (<> <div className='flex flex-row gap-4'>
                <div className='overflow-hidden w-[50px] h-[50px] rounded-2xl flex justify-center items-center bg-pr1'>
                <img src={receiver.profilePic} className='object-cover' alt="" />
                </div>
                <div>
                    <h1 className='font-bold text-[18px] text-gray-900'>{receiver.name}</h1>
                    <div className='flex flex-row  items-center gap-2'>
                        {recieverData ? (recieverData.isOnline ? (<> <div className='bg-green-500 rounded-full w-[10px] h-[10px]'>
                        </div><p className='font-medium text-[16px] text-gray-500 leading-5'> online</p> </>    ) :( <> <div className='bg-gray-500 rounded-full w-[10px] h-[10px]'>
                        </div><p className='font-medium text-[16px] text-gray-500 leading-5'> offline</p> </>   )) : (<></>)}
                       
                    </div>
                    
                </div>
                </div></>) :(<></>)}
               
            </div>


            <div className='h-[80%] w-full bg-white overflow-auto p-5' ref={messagesContainerRef}>
              {
                openConversation ? (
                  <>
                  {messages && messages.map(message => (
                    <Message key={message.messageId} message={message} user={user} receiver={receiver} isMe={myId} />
                  ))}
                  {!messages && (
                    <div className='flex items-center justify-center h-full w-full font-bold text-pr1'>Sorry, No messages found</div>
                  )}
                </>
                ):(<>
                <h1 className='flex items-center justify-center'>
                  Conversation is loading...
                </h1></>)
              }

            </div>


            <div className='h-[10%] w-full items-center gap-4 flex flex-row bg-white  px-3'>
                <textarea value={typedMessage} onChange={(e)=>{setTypedMessage(e.target.value)}} className='w-full h-[60px] rounded-lg p-4 font-medium' id="" cols="30" rows="4"></textarea>
                <button onClick={(e)=>{handleSubmit(e)}} className='bg-pr1 rounded-full w-[40px] h-[40px] flex hover:bg-pr2 items-center justify-center'>
                <span class="material-symbols-outlined text-white ">
                send
                </span>
                </button>


            </div>





          
        </div>
        </div>
       
    </div>
    </>
  );
}

function Conversation(props) {
  const { participant1Id, participant1Name, participant1Email, participant2Name, participant2Email} = props.conversation;
  const displayParticipantName = participant1Id === props.userId ? participant2Name : participant1Name;
  const displayParticipantEmail = participant1Id === props.userId ? participant2Email : participant1Email;

  return (
    <>
      <div onClick={()=>{props.setActiveConv(props.convId)}} className={`${props.convId === props.activeConv  ? ('bg-[#ccd9ff3f]') : ('')}   hover:bg-[#ccd9ff3f] h-[80px] w-full rounded-3xl flex flex-row gap-5 items-center px-5 cursor-pointer`}>
        <div className='overflow-hidden w-[50px] h-[50px] rounded-2xl  bg-pr1 flex items-center justify-center'>
          <img src={participant1Id === props.userId ? props.conversation.participant2ProfilePic : props.conversation.participant1ProfilePic} className='object-cover' alt="" />
        </div>
        <div>
          <h1 className='font-bold text-[18px] text-gray-900'>{displayParticipantName}</h1>
          <p className='font-medium text-[13px] text-gray-500 leading-5'>{displayParticipantEmail}</p>      
        </div>
      </div>
      <div className='text-gray-500 bg-gray-200 h-[1px] w-full'></div>
    </>
  );
}

export default Chat;
