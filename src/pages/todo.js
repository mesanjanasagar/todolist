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
    const [removeAllOpen, setremoveAllOpen] = useState(false);
    const [toggleView, setToggleView] = useState(false);
    const handleToggleView = () => setToggleView(!toggleView);
    const handleClose = () => setOpen(false);
    const handleRemoveAllClose = () => setremoveAllOpen(false);
    const handleRemoveAllOpen = () => setremoveAllOpen(true);
    const handleOpen = () => setOpen(true);
    return (
        <>
            <Box>
                <Paper sx={{ my: {md:4,sm:0}, mx: {md:2,sm:0}, textAlign: 'center', backgroundColor: "#ADD8E6"}}>
                    <Typography color={'white'} padding={4} fontWeight="bold">TODO LIST</Typography>
                    {/* show Input bar  */}
                    <InputBar handleToggleView={handleToggleView} toggleView={toggleView} />
                    {/* show our items  */}
                    {!toggleView
                        ? <ItemsList handleOpen={handleOpen} handleClose={handleClose} open={open} />
                        : <DragListView handleOpen={handleOpen} handleClose={handleClose} open={open} />
                    }
                    {/* remove all button  */}
                    <Button
                        sx={{
                            m: 2
                        }}
                        color="error"
                        variant="outlined"
                        onClick={handleRemoveAllOpen}>
                        CLEAR LIST
                    </Button>
                </Paper>
                <BasicModal
                    open={removeAllOpen}
                    handleClose={handleRemoveAllClose}
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
