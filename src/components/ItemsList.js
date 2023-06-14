import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicModal from "./ui/modal";
import InputModal from "./ui/inputModal";
import TodoForm from "./todoForm";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import { getFilteredItems } from "../utils/helper";
import { setStatus } from "../state/features/todo";

const ItemsList = ({ handleOpen, handleClose, open }) => {
  const [editField, seteditFeld] = useState(false);
  const [editingData, setEditingData] = useState();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.todoData);
  const isEditItem = useSelector((state) => state.todos.isEditItem);
  const searchTerm = useSelector((state) => state.todos.searchTerm);
  const filteredItem = useSelector((state) => state.todos.filteredItem);

  let filteredItems = getFilteredItems(items, searchTerm, filteredItem);
  const handleFormModal = () => seteditFeld(!editField);
  const handleEditingData = (val) => setEditingData(val);
  return (
    <DragDropContext>
      <Droppable droppableId="Todolist-2">
        {(provided) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredItems.map((curElem, i) => {
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
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <InputModal fromOpen={editField} handleFormModal={handleFormModal}>
        <TodoForm setFormOpen={handleFormModal} initialValues={editingData} />
      </InputModal>
      <BasicModal
        open={open}
        handleClose={handleClose}
        title="Are you sure you want to reopen?"
        onConfirm={() => dispatch(setStatus(isEditItem))}
      />
    </DragDropContext>
  );
};

export default ItemsList;
