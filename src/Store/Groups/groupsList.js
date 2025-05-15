import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const Groups = createSlice({
  name: "Groups",
  initialState: {
    groups_list: [],
    group_view_list: [],
  },
  reducers: {
    ListGroups: (state, action) => {
      state.groups_list = action.payload;
    },
    ListGroupDetailsView: (state, action) => {
      state.group_view_list = action.payload;
    },
  },
});

export const { ListGroups, ListGroupDetailsView } = Groups.actions;

export const ListGroupsDetails = () => async (dispatch) => {
  try {
    const response = await api.get("/group/get-all-data");
    console.log(response , 'response');
    
    dispatch(ListGroups(response.data.data));
  } catch (error) {
    throw new Error();
  }
};

export default Groups.reducer;
