import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import MenuCard from "./MenuCard";
import { useSelector } from "react-redux";

const RotatingIconContainer = styled("span")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "30px",
  height: "30px",
  padding: "20px",
  transition: "transform 0.25s ease-in-out",
});

const Topbar = () => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [placeholderAnimated, setPlaceholderAnimated] = useState(false);
  const { isdark } = useSelector((state) => state.lightDark);

  const handleArrowBackClick = () => {
    setInputValue("");
    inputRef.current.blur();
    setIsFocused(false);
    if (!placeholderAnimated && inputValue) {
      setPlaceholderAnimated(true);
    }
    setTimeout(() => setPlaceholderAnimated(false), 100);
  };

  const handleSearchContainerClick = () => {
    inputRef.current.focus();
    setIsFocused(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
    inputRef.current.focus();
    if (!placeholderAnimated && inputValue) {
      setPlaceholderAnimated(true);
    }
    setTimeout(() => setPlaceholderAnimated(false), 100);
  };

  const handleMenuClick = (event) => {
    setMenuOpen(true);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <div
      className={`sticky top-0 flex h-14 px-2 items-center gap-2 select-none w-full sm:w-[420px] resize-x transition-all ease-in ${
        isdark ? "bg-[#212121]" : "bg-white"
      }`}
    >
      <RotatingIconContainer
        onClick={isFocused ? handleArrowBackClick : handleMenuClick}
        style={{
          transform: isFocused ? "rotate(180deg)" : "none",
          cursor: "pointer",
        }}
        className={` ${
          isdark ? "hover:bg-slate-800" : "hover:bg-slate-100"
        } rounded-full sm:ml-2`}
      >
        {!isFocused ? (
          <MenuIcon
            style={{ fontSize: 26, color: isdark ? "" : "rgba(0, 0, 0, 0.5)" }}
          />
        ) : (
          <ArrowBackIcon
            style={{
              fontSize: 26,
              color: isdark ? "white" : "rgba(0, 0, 0, 0.5)",
              transform: "rotate(180deg)",
            }}
          />
        )}
      </RotatingIconContainer>

      <div
        className={`flex gap-2 rounded-3xl border-2 items-center ${
          isFocused
            ? "border-[#3390ec]"
            : isdark
            ? "border-gray-500"
            : "border-gray-200"
        } w-full px-2 py-1.5 mx-2 cursor-pointer`}
        onClick={handleSearchContainerClick}
      >
        <SearchIcon
          fontSize="medium"
          style={{
            color: isFocused
              ? "#3390EC"
              : isdark
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(0, 0, 0, 0.3)",
          }}
          className="mt-0.5 ml-0.5"
        />

        <input
          ref={inputRef}
          className={`outline-none text-sm w-full mr-1.5 pr-1 topbar-search-input ${
            placeholderAnimated ? "placeholder-animated" : ""
          } ${isdark ? "dark-mode" : ""}`}
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
          onAnimationEnd={() => setPlaceholderAnimated(false)}
          style={{
            fontSize: "16px",
            transition: "font-size 0.4s ease-in-out",
            backgroundColor: isdark ? "#212121" : "white",
          }}
        />

        {inputValue && isFocused && (
          <CloseIcon
            fontSize="medium"
            style={{ color: "#3390ec", cursor: "pointer" }}
            className=" hover:bg-blue-100 p-0.5 rounded-full"
            onClick={handleClearInput}
          />
        )}
      </div>
      <MenuCard
        isOpen={menuOpen}
        onClose={handleMenuClose}
        anchorEl={menuAnchorEl}
      />
    </div>
  );
};

export default Topbar;
