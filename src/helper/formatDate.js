const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "";
  }

  const today = new Date();

  const isSameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const startOfPastWeek = new Date(today);
  startOfPastWeek.setDate(today.getDate() - 6);

  const isSameWeek = date >= startOfPastWeek && date <= today && !isSameDay;

  const isSameMonth = date.getMonth() === today.getMonth();
  const isSameYear = date.getFullYear() === today.getFullYear();

  if (isSameDay) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } else if (isSameWeek) {
    return date.toLocaleDateString([], { weekday: "short" });
  } else if (isSameMonth || isSameYear) {
    return `${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getDate()}`;
  } else {
    return `${date.getDate()}/${date.toLocaleString("en-US", {
      month: "short",
    })}/${date.getFullYear().toString().slice(-2)}`;
  }
};

export default formatDate;
