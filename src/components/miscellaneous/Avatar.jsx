import React from "react";
import Avatar from "@mui/material/Avatar";

const stringAvatar = (name) => {
  const nameParts = name.split(" ");
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : `${nameParts[0][0]}`;

  const avatarColors = {
    red: {
      top: "#FF845E",
      bottom: "#D45246",
    },
    orange: {
      top: "#FEBB5B",
      bottom: "#F68136",
    },
    violet: {
      top: "#B694F9",
      bottom: "#6C61DF",
    },
    green: {
      top: "#9AD164",
      bottom: "#46BA43",
    },
    cyan: {
      top: "#53edd6",
      bottom: "#28c9b7",
    },
    blue: {
      top: "#5CAFFA",
      bottom: "#408ACF",
    },
    pink: {
      top: "#FF8AAC",
      bottom: "#D95574",
    },
    archive: {
      top: "#B8C2CC",
      bottom: "#9EAAB5",
    },
  };

  const colorIndex =
    Math.abs(hashCode(name)) % Object.keys(avatarColors).length;
  const colorScheme = Object.values(avatarColors)[colorIndex];

  return {
    sx: {
      background: `linear-gradient(to bottom, ${colorScheme.top}, ${colorScheme.bottom})`,
      width: 55,
      height: 55,
      fontSize: 25,
      fontWeight: "semibold",
      color: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    children: initials.toUpperCase(),
  };
};

const stringAvatar2 = (name) => {
  const nameParts = name.split(" ");
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : `${nameParts[0][0]}`;

  const avatarColors = {
    red: {
      top: "#FF845E",
      bottom: "#D45246",
    },
    orange: {
      top: "#FEBB5B",
      bottom: "#F68136",
    },
    violet: {
      top: "#B694F9",
      bottom: "#6C61DF",
    },
    green: {
      top: "#9AD164",
      bottom: "#46BA43",
    },
    cyan: {
      top: "#53edd6",
      bottom: "#28c9b7",
    },
    blue: {
      top: "#5CAFFA",
      bottom: "#408ACF",
    },
    pink: {
      top: "#FF8AAC",
      bottom: "#D95574",
    },
    archive: {
      top: "#B8C2CC",
      bottom: "#9EAAB5",
    },
  };

  const colorIndex =
    Math.abs(hashCode(name)) % Object.keys(avatarColors).length;
  const colorScheme = Object.values(avatarColors)[colorIndex];

  return {
    sx: {
      background: `linear-gradient(to bottom, ${colorScheme.top}, ${colorScheme.bottom})`,
      width: 40,
      height: 40,
      fontSize: 25,
      fontWeight: "semibold",
      color: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    children: initials.toUpperCase(),
  };
};

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const CustomAvatar = ({ name }) => {
  return <Avatar {...stringAvatar(name || "Anonymous")} />;
};

export const CustomAvatar2 = ({ name }) => {
  return <Avatar {...stringAvatar2(name || "Anonymous")} />;
};
