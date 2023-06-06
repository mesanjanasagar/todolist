import { Box, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';
import { STATUS } from '../utils/constants';
import InputModal from './ui/inputModal';
import TodoForm from './todoForm';
import BasicModal from './ui/modal';
import { setStatus } from '../state'
import { useDispatch } from 'react-redux';

const DragListView = () => {
    const todoData = useSelector(state => state.todoData);
    const [editField, seteditFeld] = useState(false);
    const [editingData, setEditingData] = useState();
    const handleFormModal = () => seteditFeld(!editField)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleEditingData = (val) => setEditingData(val);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const isEditItem = useSelector(state => state.isEditItem);
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        let add;
        let active = todoData;

        if (source.droppableId === "Todolist-active") {
            add = active[source.index];
        } else {

        }
    }
    return (
        <Box >
            <DragDropContext
                onDragEnd={onDragEnd}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Box sx={{
                        minWidth: 600
                    }}>
                        <Droppable droppableId="Todolist-active">
                            {(provided) => (
                                <Paper sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 2,
                                    backgroundColor: '#f6f8fa'
                                }}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 22,
                                            color: 'primary.dark'
                                        }}>Active Tasks</Typography>
                                    {todoData
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
                                        })}
                                    {provided.placeholder}
                                </Paper>
                            )}
                        </Droppable>
                    </Box>
                    <Box sx={{
                        minWidth: 600

                    }}>
                        <Droppable droppableId="Todolist-completed">
                            {(provided) => (
                                <Paper sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 2,
                                }}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 22,
                                            color: 'success.dark'
                                        }}>Completed Tasks</Typography>
                                    {todoData
                                        .filter((curElem) => curElem.status === STATUS.COMPLETE)
                                        .map((curElem, i) => (
                                            <TodoItem
                                                curElem={curElem}
                                                handleOpen={handleOpen}
                                                handleEditingData={handleEditingData}
                                                handleFormModal={handleFormModal}
                                                editField={editField}
                                                i={i}
                                                editingData={editingData}
                                            />
                                        ))}
                                    {provided.placeholder}
                                </Paper>
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
                        onConfirm={() =>
                            dispatch(setStatus(isEditItem))
                        }
                    />
                </Box>
            </DragDropContext >
        </Box>
    )
}

export default DragListView