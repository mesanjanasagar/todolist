import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from '../state'
import BasicModal from "./ui/modal";
import InputModal from "./ui/inputModal";
import TodoForm from "./todoForm";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";

const ItemsList = () => {
    const [editField, seteditFeld] = useState(false);
    const [editingData, setEditingData] = useState();
    const dispatch = useDispatch();
    const items = useSelector(state => state.todoData);
    const isEditItem = useSelector(state => state.isEditItem);
    const searchTerm = useSelector(state => state.searchTerm);
    const filteredItem = useSelector(state => state.filteredItem);

    let filteredItems = items.filter((item) => {
        const nameMatches = item.title.toLowerCase().includes(searchTerm.toLowerCase());
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

    const handleFormModal = () => seteditFeld(!editField)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditingData = (val) => setEditingData(val)
    return (
        <DragDropContext >
            <Droppable droppableId="Todolist-2">
                {(provided) => (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                <TodoForm
                    setFormOpen={handleFormModal}
                    initialValues={editingData}
                />
            </InputModal>
            <BasicModal
                open={open}
                handleClose={handleClose}
                title="Are you sure you want to reopen?"
                onConfirm={() =>
                    dispatch(setStatus(isEditItem))
                }
            />
        </DragDropContext>
    )
}

export default ItemsList;