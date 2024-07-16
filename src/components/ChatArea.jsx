import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { chatActions } from "../store/chat-slice";
import { IconButton, InputAdornment, TextField, Skeleton } from "@mui/material";
import { CustomAvatar2 } from "./miscellaneous/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  EmojiEmotionsOutlined as EmojiIcon,
  AttachFile as AttachmentIcon,
  Mic as MicrophoneIcon,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MessageBubble from "../components/miscellaneous/MessageBubble";

const ChatArea = () => {
  const dispatch = useDispatch();
  const { isdark } = useSelector((state) => state.lightDark);
  const { selectedChat, singleChat, selectedName } = useSelector(
    (state) => state.chat
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" && window.innerWidth <= 640
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const chatId = selectedChat.split("-")[0];
        const response = await axios.get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
        );

        const messages = response.data.data.map((msg) => ({
          id: msg.id,
          message: msg.message,
          chat_id: msg.chat_id,
          created_at: msg.created_at,
          updated_at: msg.updated_at,
          sender: {
            id: msg.sender.id,
            name: msg.sender.name,
            email: msg.sender.email,
            phone: msg.sender.phone,
          },
        }));

        dispatch(chatActions.setSingleChat(messages));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat:", error);
        setLoading(false);
        setError(error);
      }
    };

    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    if (chatEndRef.current && singleChat && singleChat.length > 0) {
      chatEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [singleChat]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function formatTime(createdAt) {
    const date = new Date(createdAt);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
  }

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else if (today.getFullYear() === date.getFullYear()) {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  function shouldDisplayDate(currentMessage, previousMessage) {
    if (!previousMessage) return true;

    const currentDate = new Date(currentMessage.created_at);
    const previousDate = new Date(previousMessage.created_at);

    if (currentDate.toDateString() !== previousDate.toDateString()) {
      return true;
    }

    return false;
  }

  const numSkeletonItems = 10;

  return (
    <div
      className={`h-screen ${
        isdark ? "bg-[#272727]" : "bg-white"
      } overflow-hidden border-[1px] ${
        isdark ? "border-gray-600" : "border-gray-300"
      } w-full`}
    >
      <div
        className={`fixed top-0 py-2 px-5 w-full z-20 flex-auto items-center justify-between ${
          isdark ? "bg-[#212121]" : "bg-white"
        } shadow-sm border-[1px] ${
          isdark ? "border-gray-600" : "border-gray-300"
        } `}
      >
        <div className={`flex gap-4 items-center`}>
          {isSmallScreen ? (
            <span onClick={() => dispatch(chatActions.setSelectedChat(""))}>
              <ArrowBackIcon
                style={{
                  fontSize: "26px",
                  color: isdark ? "white" : "rgba(0, 0, 0, 0.5)",
                }}
                className={` ${
                  isdark ? "hover:bg-slate-800" : "hover:bg-slate-100"
                } rounded-full sm:ml-2`}
              />
            </span>
          ) : (
            ""
          )}
          <CustomAvatar2 name={selectedName} />
          <span className=" text-2xl font-sans select-none">
            {selectedName}
          </span>
        </div>
      </div>

      <div
        className="overflow-scroll w-full h-[95vh] px-4 pt-14 relative"
        style={{
          backgroundImage: `url(${isdark ? "/darkbg.png" : "/lightbg.png"})`,
          backgroundSize: "cover",
        }}
      >
        <div className="mt-14">
          {loading && (
            <div>
              {Array.from({ length: numSkeletonItems }).map((_, index) => (
                <div key={index} className="flex mb-4">
                  <Skeleton
                    variant="rectangular"
                    width={isdark ? "90%%" : "90%"}
                    height={40}
                    className={`rounded-lg ${
                      isdark ? "bg-[#2D2D2D]" : "bg-gray-300"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
          {error && <div>Error: {error.message}</div>}

          {singleChat && singleChat.length > 0 ? (
            singleChat.map((message, index) => (
              <div key={message.id}>
                {shouldDisplayDate(message, singleChat[index - 1]) && (
                  <div
                    className={`text-center mb-2 text-white font-semibold py-1 px-2 ${
                      isdark ? "bg-[#c508ff]" : "bg-[#0e9407]"
                    } bg-opacity-20 rounded-3xl w-fit mx-auto select-none`}
                  >
                    {formatDate(message.created_at)}
                  </div>
                )}
                <div
                  className={`flex ${
                    message.sender.id === 1 ? "justify-start" : "justify-end"
                  } mb-4`}
                >
                  <MessageBubble
                    message={message}
                    isdark={isdark}
                    formatTime={formatTime}
                    ownMessage={message.sender.id === 1}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>No messages yet!</div>
          )}
          <div ref={chatEndRef}></div>
        </div>
      </div>
      <div
        className={`bg-transparent bottom-0 flex items-center p-2 w-full z-20 text-white`}
      >
        <TextField
          placeholder="Message"
          fullWidth
          autoComplete="off"
          autoFocus
          value={inputValue}
          onChange={handleInputChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              height: "3rem",
              backgroundColor: isdark ? "#212121" : "white",
              "&.Mui-focused fieldset": {
                borderColor: "gray",
              },
              "& input, & input::placeholder": {
                color: isdark ? "white" : "black",
                padding: "10px",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <EmojiIcon style={{ color: "gray" }} />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <AttachmentIcon style={{ color: "gray", rotate: "45deg" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton>
          {inputValue !== "" ? (
            <SendIcon
              style={{
                width: "2.5rem",
                height: "2.5rem",

                color: "white",
                backgroundColor: isdark ? "#8774E1" : "#3390EC",
                padding: "8px",
                borderRadius: "100%",
              }}
            />
          ) : (
            <MicrophoneIcon
              style={{
                width: "2.5rem",
                height: "2.5rem",

                color: "white",
                backgroundColor: isdark ? "#8774E1" : "#3390EC",
                padding: "5px",
                borderRadius: "100%",
              }}
            />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;
