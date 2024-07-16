import React from "react";
import Linkify from "react-linkify";
import BubbleTailDark from "/BubbleTailDark.svg";
import BubbleTailLight from "/BubbleTailLight.svg";
import BubbleTailPurple from "/BubbleTailPurple.svg";
import BubbleTailLightgreen from "/BubbleTailLightgreen.svg";

const MessageBubble = ({ message, isdark, formatTime, ownMessage }) => {
  const linkifyDecorator = (href, text, key) => (
    <a
      href={href}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline"
    >
      {text}
    </a>
  );

  return (
    <div
      className={`relative ${
        !isdark && !ownMessage
          ? "bg-[#E3FEE0] text-black"
          : !isdark && ownMessage
          ? "bg-white text-black"
          : isdark && !ownMessage
          ? "bg-[#8774E1] text-white"
          : "bg-[#212121] text-white"
      } mx-1 my-[0.5px] rounded-lg py-[5px] px-[10px] max-w-[75%] ${
        message.message.length < 20 ? "pr-12" : "pb-3"
      } items-end gap-2 flex flex-col flex-wrap break-words`}
      style={{
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <Linkify componentDecorator={linkifyDecorator}>
        <span>{message.message}</span>
      </Linkify>
      <span
        className={`${!isdark ? "text-gray-800" : "text-gray-100"} ${
          message.message.length > 20 ? "pt-1" : ""
        } text-[9px] select-none text-nowrap absolute bottom-0.5 right-1`}
      >
        {formatTime(message.created_at)}
      </span>
      <img
        draggable={false}
        src={
          !isdark && !ownMessage
            ? BubbleTailLightgreen
            : !isdark && ownMessage
            ? BubbleTailLight
            : isdark && !ownMessage
            ? BubbleTailPurple
            : BubbleTailDark
        }
        alt="bubble tail"
        className={`absolute bottom-0 ${
          message.sender.id === 1
            ? "left-[-11px] bottom-[0.3px] transform -scale-x-100"
            : "right-[-11px]"
        } select-none`}
        width="22"
        height="20"
      />
    </div>
  );
};

export default MessageBubble;
