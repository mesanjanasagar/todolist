import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Check } from "@mui/icons-material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../utils/constants";
import { setTodoData, setUpdatedTodoData, setIsEditItem, setStatus, setDelete } from '../state'

const ItemsList = () => {
    const [inputdata, setInputData] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const [editField, seteditFeld] = useState(false);
    const [editingData, setEditingData] = useState();
    const dispatch = useDispatch();
    const items = useSelector(state => state.todoData);
    const isEditItem = useSelector(state => state.isEditItem);
    const searchTerm = useSelector(state => state.searchTerm);
    const filteredItem = useSelector(state => state.filteredItem);

    // add the items function
    const addItem = () => {
        if (!inputdata && !isEditItem) {
            alert("Enter Some Thing");
        } else if (editingData && toggleButton) {
            dispatch(
                setUpdatedTodoData(editingData)
            )
            setEditingData("");
            setIsEditItem(null);
            setToggleButton(false);
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
                status: STATUS.PENDING
            };
            dispatch(
                setTodoData(myNewInputData)
            );
            setInputData("");
        }
    };

    //edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        seteditFeld(!editField);
        setEditingData(item_todo_edited.name);
        dispatch(
            setIsEditItem(index)
        )
        setToggleButton(true);
    };

    let filteredItems = items.filter((item) => {
        const nameMatches = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatches = item.status.toLowerCase().includes(filteredItem.toLowerCase());
        if (searchTerm === "" && filteredItem === "all") {
            return true; // no search or filter applied
        }
        if (searchTerm !== "" && !nameMatches) {
            return false; // search term doesn't match name
        }
        if (filteredItem !== "all" && !statusMatches) {
            return false; // status value doesn't match filter
        }
        return true; // item matches search and filter criteria
    });

    const deleteItem = (index) => {
        dispatch(
            setDelete(index)
        )
    };

    const handleStatus = (val) => {
        dispatch(setStatus(val.id))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            {filteredItems.map((curElem) => {
                return (
                    <Paper sx={{ m: 2, mb: 4, pl: 1, width: 600, backgroundColor: `${curElem.status === STATUS.COMPLETE ? 'green' : '#e5e500'}` }} elevation={2} key={curElem.id}>
                        <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
                            {editField && isEditItem === curElem.id ?
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    value={editingData}
                                    onChange={(event) => setEditingData(event.target.value)}
                                />
                                :
                                <Box sx={{ wordWrap: 'break-word' }}>
                                    <Typography sx={{}}>{curElem.name}</Typography>
                                </Box>
                            }
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton >
                                        {editField && isEditItem === curElem.id ?
                                            <Check onClick={() => {
                                                addItem();
                                                seteditFeld(false);
                                            }} />
                                            :
                                            curElem.status !== STATUS.COMPLETE ?
                                                <EditNoteOutlinedIcon
                                                    onClick={() => {
                                                        editItem(curElem.id);
                                                        seteditFeld(true)
                                                    }} /> : ""
                                        }
                                    </IconButton>
                                    <IconButton>
                                        <DeleteOutlineOutlinedIcon
                                            onClick={() => deleteItem(curElem.id)} />
                                    </IconButton>
                                    {curElem.status !== STATUS.COMPLETE ?
                                        <IconButton >
                                            <TaskAltIcon
                                                sx={{ color: 'green' }}
                                                onClick={() => handleStatus(curElem)}
                                            />
                                        </IconButton>
                                        : <IconButton disabled>
                                            <TaskAltIcon sx={{ color: 'grey' }} />
                                        </IconButton>}
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                );
            })}
        </Box>
    )
}

export default ItemsList