import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import { useSelector } from "react-redux";

const App = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" && window.innerWidth <= 640
  );

  const { isdark } = useSelector((state) => state.lightDark);
  const { selectedChat } = useSelector((state) => state.chat);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${isdark ? "/darkbg.png" : "/lightbg.png"})`,
        backgroundRepeat: "repeat",
      }}
    >
      <div
        className={`flex w-screen overflow-hidden h-screen ${
          isdark ? " text-white" : ""
        }`}
      >
        {isSmallScreen ? (
          selectedChat ? (
            <ChatArea />
          ) : (
            <Sidebar />
          )
        ) : (
          <>
            <Sidebar />
            <div className="h-screen w-full">
              {selectedChat && <ChatArea />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
