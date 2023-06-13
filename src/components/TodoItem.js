import { Box, IconButton, Menu, Paper, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../utils/constants";
import { Draggable } from "react-beautiful-dnd";
import ExpandView from "./ui/expandContractView";
import { setDelete, setIsEditItem, setStatus } from "../state/features/todo";
import { useState } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
const TodoItem = ({
  curElem,
  handleEditingData,
  handleFormModal,
  editField,
  handleOpen,
  i,
}) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.todoData);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const editItem = (index) => {
    setAnchorEl(null);
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    handleFormModal(!editField);
    handleEditingData(item_todo_edited);
  };

  const deleteItem = (index) => {
    setAnchorEl(null);
    dispatch(setDelete(index));
  };

  const handleStatus = (val) => {
    setAnchorEl(null);
    if (val.status === STATUS.COMPLETE) {
      dispatch(setIsEditItem(val.id));
      handleOpen();
    } else {
      dispatch(setStatus(val.id));
    }
  };
  const open = Boolean(anchorEl);

  return (
    <Draggable draggableId={curElem.id} index={i} key={curElem.id}>
      {(provided) => (
        <Paper
          sx={{
            m: 2,
            mb: 4,
            mx: 0,
            backgroundColor: `${
              curElem.status === STATUS.COMPLETE ? "#AACB73" : "#FFD24C"
            }`,
            maxWidth: 600,
            width: "100%",
            margin: "0 auto",
            borderRadius: 2.5,
            border: "1px solid #E0E1E0",
            position: "relative",
          }}
          elevation={1}
          key={curElem.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              backgroundColor: "#FEFEFF",
              borderRadius: 2,
              alignItems: "center",
              justifyContent: "space-between",
              ml: 1,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 18,
                  marginBottom: 1,
                  textAlign: "start",
                }}
              >
                {curElem.title}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "start" }}>
                <Box
                  sx={{
                    wordWrap: "break-word",
                    wordBreak: "break-all",
                    width: "100%",
                    textAlign: "start",
                  }}
                >
                  <ExpandView text={curElem.description} limit={100} />
                </Box>
              </Box>
            </Box>
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon sx={{ color: "#989898" }} />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              transformOrigin={{
                vertical:"center",
                horizontal:"center",
              }}
            >
              {curElem.status !== STATUS.COMPLETE ? (
                <IconButton
                  disabled={curElem.status === STATUS.COMPLETE}
                  sx={{ color: "#AACB73" }}
                  onClick={() => handleStatus(curElem)}
                >
                  <TaskAltIcon />
                </IconButton>
              ) : (
                ""
              )}
              {curElem.status !== STATUS.COMPLETE ? (
                <IconButton>
                  <EditNoteOutlinedIcon
                    onClick={() => {
                      editItem(curElem.id);
                      handleFormModal(true);
                    }}
                  />
                </IconButton>
              ) : (
                ""
              )}
              {curElem.status !== STATUS.COMPLETE ? (
                ""
              ) : (
                <IconButton onClick={() => handleStatus(curElem)}>
                  <ReplayOutlinedIcon />
                </IconButton>
              )}
              <IconButton onClick={() => deleteItem(curElem.id)}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Menu>
          </Box>
          {provided.placeholder}
        </Paper>
      )}
    </Draggable>
  );
};

export default TodoItem;
