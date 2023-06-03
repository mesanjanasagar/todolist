import { Box, IconButton, Paper, Typography } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../utils/constants";
import {  setIsEditItem, setStatus, setDelete } from '../state'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { Draggable } from "react-beautiful-dnd";
import ExpandView from "./ui/expandContractView";

const TodoItem = ({ curElem, handleEditingData, handleFormModal, editField, handleOpen, i, editingData }) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.todoData);

    // add the items function
    // const addItem = () => {
    //     if (!inputdata && !isEditItem) {
    //         alert("Enter Some Thing");
    //     } else if (editingData) {
    //         dispatch(
    //             setUpdatedTodoData(editingData)
    //         )
    //         handleEditingData("");
    //         setIsEditItem(null);
    //     } else {
    //         const myNewInputData = {
    //             id: new Date().getTime().toString(),
    //             name: inputdata,
    //             status: STATUS.PENDING
    //         };
    //         dispatch(
    //             setTodoData(myNewInputData)
    //         );
    //         setInputData("");
    //     }
    // };
    //edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        handleFormModal(!editField);
        handleEditingData(item_todo_edited);
    };


    const deleteItem = (index) => {
        dispatch(
            setDelete(index)
        )
    };
    const handleStatus = (val) => {
        if (val.status === STATUS.COMPLETE) {
            dispatch(
                setIsEditItem(val.id)
            )
            handleOpen();
        } else {
            dispatch(setStatus(val.id))
        }
    };
    return (
        <Draggable draggableId={curElem.id} index={i} key={curElem.id}>
            {(provided) => (
                <Paper
                    sx={{
                        m: 2,
                        mb: 4,
                        pl: 1,
                        width: 600,
                        backgroundColor: `${curElem.status === STATUS.COMPLETE ? 'green' : '#e5e500'}`
                    }}
                    elevation={2}
                    key={curElem.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Box
                        sx={{
                            p: 1.5,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}>
                        <Box
                            sx={{
                                wordWrap: 'break-word',
                                p: 2, textAlign: 'start',
                                width: 400
                            }}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: 18
                                }} >{curElem.title}</Typography>
                            <ExpandView
                                text={curElem.description}
                                limit={100} />
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <IconButton >
                                    {
                                        curElem.status !== STATUS.COMPLETE ?
                                            <EditNoteOutlinedIcon
                                                onClick={() => {
                                                    editItem(curElem.id);
                                                    handleFormModal(true)
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
                                    : <Box>
                                        <IconButton disabled>
                                            <TaskAltIcon sx={{ color: 'grey' }} />
                                        </IconButton>
                                        <IconButton onClick={() => handleStatus(curElem)}>
                                            <ReplayOutlinedIcon />
                                        </IconButton>
                                    </Box>}
                            </Box>
                        </Box>
                    </Box>
                    {provided.placeholder}
                </Paper>
            )}
        </Draggable>
    )
}

export default TodoItem