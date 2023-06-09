import { Box, IconButton, Paper, Typography } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../utils/constants";
import { Draggable } from "react-beautiful-dnd";
import ExpandView from "./ui/expandContractView";
import { setDelete, setIsEditItem, setStatus } from "../state/features/todo";

const TodoItem = ({ curElem, handleEditingData, handleFormModal, editField, handleOpen, i, editingData }) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.todos.todoData);

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        handleFormModal(!editField);
        handleEditingData(item_todo_edited);
    };

    const deleteItem = (index) => {
        dispatch(setDelete(index));
    };

    const handleStatus = (val) => {
        if (val.status === STATUS.COMPLETE) {
            dispatch(setIsEditItem(val.id));
            handleOpen();
        } else {
            dispatch(setStatus(val.id));
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
                        mx: 0,
                        backgroundColor: `${curElem.status === STATUS.COMPLETE ? 'green' : '#e5e500'}`,
                        maxWidth: 600,
                        width: '100%',
                        margin: '0 auto',
                        borderRadius: 2,
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
                            backgroundColor: "#FAEAB1",
                            borderRadius: 2,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    marginBottom: 1,
                                    textAlign: 'start'
                                }}
                            >
                                {curElem.title}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Box sx={{ wordWrap: 'break-word', width: '100%', textAlign: 'start' }}>
                                    <ExpandView text={curElem.description} limit={100} />
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                marginTop: 1
                            }}
                        >
                            <IconButton
                                disabled={curElem.status === STATUS.COMPLETE}
                                sx={{ color: "green", marginRight: 1 }}
                                onClick={() => handleStatus(curElem)}
                            >
                                <TaskAltIcon />
                            </IconButton>
                            {curElem.status !== STATUS.COMPLETE ?
                                < IconButton
                                    sx={{ marginRight: 1 }}
                                >
                                    <EditNoteOutlinedIcon
                                        onClick={() => {
                                            editItem(curElem.id);
                                            handleFormModal(true);
                                        }}
                                    />
                                </IconButton> : ""
                            }
                            {curElem.status !== STATUS.COMPLETE ? "" : (

                                <IconButton sx={{ marginRight: 1 }} onClick={() => handleStatus(curElem)}>
                                    <ReplayOutlinedIcon />
                                </IconButton>

                            )}
                            <IconButton
                                onClick={() => deleteItem(curElem.id)}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {provided.placeholder}
                </Paper>
            )
            }
        </Draggable >
    );
};

export default TodoItem;