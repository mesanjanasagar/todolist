import { Box, Button, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDelete } from '../state'
import { REMOVE_ALL } from "../utils/constants";
import InputBar from "../components/InputBar";
import BasicModal from "../components/ui/modal";
import { useState } from "react";
import ItemsList from "../components/ItemsList";
import DragListView from "../components/DragListView";
// get the localStorage data back


const Todo = () => {
    const dispatch = useDispatch();
    // remove all the elements
    const [open, setOpen] = useState(false);
    const [toggleView, setToggleView] = useState(false);
    const handleToggleView =()=> setToggleView(!toggleView);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const removeAll = () => handleOpen(true);
    return (
        <>
            <Box>
                <Paper sx={{ m: 8, textAlign: 'center', backgroundColor: "#ADD8E6" }}>
                    <Typography color={'white'} padding={4} fontWeight="bold">TODO LIST</Typography>
                    {/* show Input bar  */}
                    <InputBar handleToggleView={handleToggleView} toggleView={toggleView}/>
                    {/* show our items  */}
                    {toggleView
                        ? <ItemsList  handleOpen={handleOpen} />
                        : <DragListView />
                    }
                    {/* remove all button  */}
                    <Button
                        sx={{
                            m: 2
                        }}
                        color="error"
                        variant="outlined"
                        onClick={removeAll}>
                        CLEAR LIST
                    </Button>
                </Paper>
                <BasicModal
                    open={open}
                    handleClose={handleClose}
                    title="Are you sure you remove everything?"
                    onConfirm={() => dispatch(
                        setDelete(REMOVE_ALL)
                    )}
                />
            </Box>
        </>
    );
};

export default Todo;
