import React, { useEffect, useState, useRef } from "react";
import useDataFetch from "../helper/dataFetch";
import { CustomAvatar } from "./miscellaneous/Avatar";
import formatDate from "../helper/formatDate";
import Topbar from "./miscellaneous/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../store/chat-slice";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { chats, selectedChat, chatsList } = useSelector((state) => state.chat);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const { isdark } = useSelector((state) => state.lightDark);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const { loading, error, data } = useDataFetch(
    `https://devapi.beyondchats.com/api/get_all_chats?page=${page}`
  );

  useEffect(() => {
    const fetchLastMessages = async () => {
      try {
        const newMessages = [];

        for (const chat of chats) {
          const chatId =
            typeof chat.id === "string" ? chat.id.split("-")[0] : chat.id;
          const response = await axios.get(
            `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
          );
          const lastMessage = response.data.data[response.data.data.length - 1];
          const {
            sender_id,
            sender: { name },
            message,
          } = lastMessage;

          newMessages.push({
            name,
            message,
            chatId,
            senderId: sender_id,
          });
        }

        dispatch(chatActions.setChatsList(newMessages));
        setLoadingMessages(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (chats.length > 0) {
      fetchLastMessages();
    }
  }, [chats, dispatch]);

  useEffect(() => {
    dispatch(chatActions.setChats([]));
  }, [dispatch]);

  useEffect(() => {
    if (data && data.data) {
      const newChats = data.data;
      if (newChats.length === 0) {
        setHasMore(false);
      } else {
        dispatch(chatActions.setChats([...chats, ...newChats]));
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting && hasMore && !loading && !loadingMessages) {
        setPage((prev) => prev + 1);
      }
    };

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore, loading, loadingMessages]);

  const setSelectedChat = (value, name) => {
    dispatch(chatActions.setSelectedChat(value));
    dispatch(chatActions.setSelectedName(name));
  };

  const handleClick = (event, chat, name) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement("span");

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    setSelectedChat(chat, name);
  };

  const findLastMessage = (chatId) => {
    return (
      chatsList.find((message) => message.chatId === chatId)?.message || ""
    );
  };

  const numSkeletonItems = Math.ceil(window.innerHeight / 70);

  return (
    <div
      className={`w-full sm:w-[420px] h-full flex flex-col resize-x select-none transition-all ease ${
        isdark ? "bg-[#26292A]" : "bg-white"
      }`}
    >
      <Topbar />
      <div className="flex-1 overflow-y-auto transition-all ease">
        <ul className="w-full flex flex-col list-none">
          {loading && loadingMessages && page <= 2 ? (
            Array.from({ length: numSkeletonItems }).map((_, index) => (
              <li key={index} className="flex items-center p-2">
                <Skeleton variant="circular" width={55} height={55} />
                <div className="ml-2 flex flex-col flex-1 min-w-0 justify-center">
                  <div className="flex justify-between items-center mb-1">
                    <Skeleton variant="text" width="30%" height={20} />
                    <Skeleton variant="text" width="15%" height={20} />
                  </div>
                  <div className="flex items-center truncate">
                    <Skeleton variant="text" width="90%" height={20} />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>
              {chats.map((chat, index) => (
                <li
                  key={`${chat.id}-${chat.created_at}-${index}`}
                  onClick={(event) =>
                    handleClick(
                      event,
                      `${chat.id}-${chat.created_at}-${index}`,
                      chat.creator?.name || "Anonymous"
                    )
                  }
                  className={`chat-item flex items-center sm:mx-2 sm:rounded-lg p-2 cursor-pointer ${
                    selectedChat === `${chat.id}-${chat.created_at}-${index}`
                      ? isdark
                        ? "bg-[#8774e1] text-white"
                        : "bg-[#3990EC] text-white"
                      : isdark
                      ? "hover:bg-gray-600"
                      : "hover:bg-gray-100"
                  } truncate`}
                >
                  <CustomAvatar name={chat.creator?.name || "Anonymous"} />
                  <div className="ml-2 flex flex-col flex-1 min-w-0 justify-center">
                    <div className="flex justify-between items-center mb-1">
                      <span className="truncate font-medium">
                        {chat.creator?.name || "Anonymous"}
                      </span>
                      <span
                        className={`text-xs ${
                          selectedChat ===
                          `${chat.id}-${chat.created_at}-${index}`
                            ? "text-white"
                            : isdark
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {formatDate(chat.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center truncate">
                      <span
                        className={`truncate ${
                          isdark ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {(() => {
                          const message = chatsList.find(
                            (msg) => msg.chatId === chat.id
                          );
                          if (!message) return null;
                          return message.senderId === chat.id
                            ? "You: "
                            : message.name
                            ? message.name + ": "
                            : "unknown: ";
                        })()}{" "}
                        {findLastMessage(chat.id)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
              {chatsList.length === chats.length &&
                page > 2 &&
                Array.from({ length: 1 }).map((_, index) => (
                  <li
                    key={`skeleton-${index}`}
                    className="flex items-center p-2"
                  >
                    <Skeleton variant="circular" width={55} height={55} />
                    <div className="ml-2 flex flex-col flex-1 min-w-0 justify-center">
                      <div className="flex justify-between items-center mb-1">
                        <Skeleton variant="text" width="30%" height={20} />
                        <Skeleton variant="text" width="15%" height={20} />
                      </div>
                      <div className="flex items-center truncate">
                        <Skeleton variant="text" width="90%" height={20} />
                      </div>
                    </div>
                  </li>
                ))}
              <div ref={loader} className="h-10"></div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
