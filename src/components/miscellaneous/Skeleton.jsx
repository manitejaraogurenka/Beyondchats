import React from "react";

const Skeleton = ({ variant = "text", width = "100%", height = "100%" }) => {
  const styles = {
    text: `h-4 bg-gray-300 rounded`,
    circle: `bg-gray-300 rounded-full`,
    rect: `bg-gray-300 rounded`,
  };

  return (
    <div
      className={`${styles[variant]} relative overflow-hidden`}
      style={{ width, height }}
    >
      <div className="absolute h-full bg-gray-300 w-full animate-loading"></div>
    </div>
  );
};

export default Skeleton;
