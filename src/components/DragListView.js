import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { STATUS } from "../utils/constants";
import InputModal from "./ui/inputModal";
import TodoForm from "./todoForm";
import BasicModal from "./ui/modal";
import { useDispatch } from "react-redux";
import { getFilteredItems } from "../utils/helper";
import { setPriority, setStatus } from "../state/features/todo";
import empty from "../assets/empty.png";
const DragListView = ({ handleOpen, handleClose, open }) => {
  const todoData = useSelector((state) => state.todos.todoData);
  const [editField, seteditFeld] = useState(false);
  const [editingData, setEditingData] = useState();
  const handleFormModal = () => seteditFeld(!editField);
  const handleEditingData = (val) => setEditingData(val);
  const dispatch = useDispatch();
  const isEditItem = useSelector((state) => state.todos.isEditItem);
  const searchTerm = useSelector((state) => state.todos.searchTerm);
  const filteredItem = useSelector((state) => state.todos.filteredItem);
  let filteredItems = getFilteredItems(todoData, searchTerm, filteredItem);
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (
      source.droppableId === "Todolist-active" &&
      destination.droppableId === "Todolist-completed"
    ) {
      dispatch(setStatus(draggableId));
    } else if (
      source.droppableId === "Todolist-completed" &&
      destination.droppableId === "Todolist-active"
    ) {
      dispatch(setStatus(draggableId));
    } else if (source.droppableId === destination.droppableId) {
      dispatch(
        setPriority({ source: source.index, destination: destination.index })
      );
    }
  };
  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: { md: 4 },
            flexFlow: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              my: { md: 0, xs: 2 },
            }}
          >
            <Droppable droppableId="Todolist-active">
              {(provided) => (
                <Container maxWidth="md">
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "start",
                      border: "1px solid #EDEDED",
                      p: { md: 2, sm: 0 },
                      minHeight: "60vh",
                    }}
                    elevation={0}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Typography
                      sx={{
                        p: 2,
                        fontSize: { md: 22, sm: 18 },
                        color: "#FFD24C",
                      }}
                    >
                      Active Tasks
                    </Typography>
                    {filteredItems.filter(
                      (curElem) => curElem.status === STATUS.PENDING
                    ).length !== 0 ? (
                      filteredItems
                        .filter((curElem) => curElem.status === STATUS.PENDING)
                        .map((curElem, i) => {
                          return (
                            <TodoItem
                              curElem={curElem}
                              handleOpen={handleOpen}
                              handleEditingData={handleEditingData}
                              handleFormModal={handleFormModal}
                              editField={editField}
                              i={i}
                              editingData={editingData}
                            />
                          );
                        })
                    ) : (
                      <Box
                        sx={{ my: "auto" }}
                        component={"img"}
                        src={empty}
                      ></Box>
                    )}
                    {provided.placeholder}
                  </Paper>
                </Container>
              )}
            </Droppable>
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Droppable droppableId="Todolist-completed">
              {(provided) => (
                <Container maxWidth="md">
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "start",
                      p: { md: 2, sm: 0 },
                      border: "1px solid #EDEDED",
                      minHeight: "60vh",
                    }}
                    elevation={0}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Typography
                      sx={{
                        fontSize: { md: 22, sm: 18 },
                        color: "#AACB73",
                        py: 2,
                      }}
                    >
                      Completed Tasks
                    </Typography>
                    {filteredItems.filter(
                      (curElem) => curElem.status === STATUS.COMPLETE
                    ).length !== 0 ? (
                      filteredItems
                        .filter((curElem) => curElem.status === STATUS.COMPLETE)
                        .map((curElem, i) => {
                          return (
                            <TodoItem
                              curElem={curElem}
                              handleOpen={handleOpen}
                              handleEditingData={handleEditingData}
                              handleFormModal={handleFormModal}
                              editField={editField}
                              i={i}
                              editingData={editingData}
                            />
                          );
                        })
                    ) : (
                      <Box
                        sx={{ my: "auto" }}
                        component={"img"}
                        src={empty}
                      ></Box>
                    )}
                    {provided.placeholder}
                  </Paper>
                </Container>
              )}
            </Droppable>
          </Box>
          <InputModal fromOpen={editField} handleFormModal={handleFormModal}>
            <TodoForm
              setFormOpen={handleFormModal}
              initialValues={editingData}
            />
          </InputModal>
          <BasicModal
            open={open}
            handleClose={handleClose}
            title="Are you sure you want to reopen?"
            onConfirm={() => dispatch(setStatus(isEditItem))}
          />
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default DragListView;
