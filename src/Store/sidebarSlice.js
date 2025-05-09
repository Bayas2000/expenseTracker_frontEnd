import { createSlice } from "@reduxjs/toolkit";


const SideBarSlice = createSlice({
    name:'Sidebar',
    initialState : {
        sidebarToggle: 'home'
    },
    reducers:{
        toggleSidebar:(state , action) => {
            state.sidebarToggle = action.payload
        }
    }
})

export const {toggleSidebar} = SideBarSlice.actions

export default SideBarSlice.reducer