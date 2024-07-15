import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import ToggleLightDark from "../miscellaneous/ToggleLightDark";
import { lightDarkActions } from "../../store/lightDark";
import {
  TurnedInNotOutlined,
  ArchiveOutlined,
  SlowMotionVideoOutlined,
  PermContactCalendarOutlined,
  SettingsOutlined,
  Brightness4Outlined,
  HelpOutline,
  BugReportOutlined,
  AddCircleOutlineOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

const StyledMenu = styled(Menu)(({ theme, isdark }) => ({
  "& .MuiPaper-root": {
    backgroundColor: isdark ? "#212121" : theme.palette.background.default,
    color: isdark ? "#ffffff" : "#212121",
    borderRadius: 8,
    marginTop: "0.5rem",
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  fontFamily: "Roboto, Arial, sans-serif",
  minHeight: "40px",
  padding: "8px 16px",
  fontWeight: "500",
}));

const MenuCard = ({ isOpen, onClose, anchorEl }) => {
  const theme = useTheme();
  const { isdark } = useSelector((state) => state.lightDark);
  const dispatch = useDispatch();

  const iconStyle = {
    fontSize: 24,
    marginLeft: "0.5rem",
    marginRight: "0.8rem",
  };

  return (
    <StyledMenu
      anchorEl={anchorEl}
      isdark={isdark}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      theme={theme}
    >
      <StyledMenuItem onClick={onClose}>
        <TurnedInNotOutlined style={iconStyle} />
        Saved Messages
      </StyledMenuItem>

      <StyledMenuItem onClick={onClose}>
        <ArchiveOutlined style={iconStyle} />
        Archived Chats
      </StyledMenuItem>

      <StyledMenuItem onClick={onClose}>
        <SlowMotionVideoOutlined style={iconStyle} />
        My Stories
      </StyledMenuItem>

      <StyledMenuItem onClick={onClose}>
        <PermContactCalendarOutlined style={iconStyle} />
        Contacts
      </StyledMenuItem>

      <StyledMenuItem onClick={onClose}>
        <SettingsOutlined style={iconStyle} />
        Settings
      </StyledMenuItem>

      <StyledMenuItem
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Brightness4Outlined style={iconStyle} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            width: "100%",
          }}
        >
          <span>Dark Mode</span>
          <span>
            <ToggleLightDark
              isChecked={isdark}
              handleChange={() => {
                dispatch(lightDarkActions.setDark());
              }}
            />
          </span>
        </div>
      </StyledMenuItem>

      <StyledMenuItem onClick={onClose}>
        <HelpOutline style={iconStyle} />
        Beyond Chats Features
      </StyledMenuItem>

      <StyledMenuItem onClick={onClose}>
        <BugReportOutlined style={iconStyle} />
        Report bug
      </StyledMenuItem>

      <StyledMenuItem onClick={onClose}>
        <AddCircleOutlineOutlined style={iconStyle} />
        Install App
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default MenuCard;
