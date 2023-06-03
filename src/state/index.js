import { createSlice } from "@reduxjs/toolkit";
import { REMOVE_ALL, STATUS } from "../utils/constants";
const initialState = {
    todoData: [],
    isEditItem: "",
    filteredItem: "",
    searchTerm: ""
}
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodoData: (state, action) => {
            state.todoData.push(action.payload);
        },
       setIsEditItem: (state, action) => {
            state.isEditItem = action.payload;
        }, 
        setUpdatedTodoData: (state, action) => {
            const data = state.todoData.map((curElem) => {
                if (curElem.id === action.payload.id) {
                    return { ...curElem, title: action.payload.title, description: action.payload.description };
                }
                return curElem;
            });
            state.todoData = data;
        },
        setStatus: (state, action) => {
            const data = state.todoData.map((curElem) => {
                if (curElem.id === action.payload && curElem.status === STATUS.PENDING) {
                    return { ...curElem, status: STATUS.COMPLETE };
                } else if ((curElem.id === action.payload && curElem.status === STATUS.COMPLETE)) {
                    return { ...curElem, status: STATUS.PENDING };
                }
                return curElem;
            });
            state.todoData = data;
        },
        setDelete: (state, action) => {
            if (action.payload === REMOVE_ALL) {
                state.todoData = []
            }
            const updatedItems = state.todoData.filter((curElem) => {
                return curElem.id !== action.payload;
            });
            state.todoData = updatedItems
        },
        setFilteredItem: (state, action) => {
            state.filteredItem = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
});
export const { setTodoData, setIsEditItem, setUpdatedTodoData, setStatus, setDelete, setFilteredItem, setSearchTerm } =
    todoSlice.actions;
export default todoSlice.reducer;