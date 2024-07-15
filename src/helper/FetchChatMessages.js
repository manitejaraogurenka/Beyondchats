import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchChatMessages = ({ chatIds, onMessagesFetched }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          chatIds.map((chatId) =>
            axios
              .get(`https://devapi.beyondchats.com/api/get_chat_messages`, {
                params: { chat_id: chatId },
              })
              .then((response) => response.data)
          )
        );
        const allChatMessages = responses.map((response) => response.messages);
        onMessagesFetched(allChatMessages.flat());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatIds, onMessagesFetched]);

  return null;
};

export default FetchChatMessages;
