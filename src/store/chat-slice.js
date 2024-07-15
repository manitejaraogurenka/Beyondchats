import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    search: "",
    searchResult: "",
    selectedChat: "",
    chats: [],
    chatsList: [],
    singleChat: [],
    selectedName: "",
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setSearchResult(state, action) {
      state.searchResult = action.payload;
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    setChats(state, action) {
      state.chats = action.payload;
    },
    setChatsList(state, action) {
      state.chatsList = [...state.chatsList, ...action.payload];
    },
    setSingleChat(state, action) {
      state.singleChat = action.payload;
    },
    setSelectedName(state, action) {
      state.selectedName = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
