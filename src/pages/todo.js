import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDelete } from '../state'
import { REMOVE_ALL } from "../utils/constants";
import BasicModal from "../components/ui/modal";
import { useState } from "react";
import ItemsList from "../components/ItemsList";
import DragListView from "../components/DragListView";
import SearchAppBar from "../components/ui/header";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

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
            <SearchAppBar handleToggleView={handleToggleView} toggleView={toggleView} />
            <Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#27374D" }}>

                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginY: 4,
                                marginX: 1
                            }} >ALL TASKS </Typography>
                        <FactCheckOutlinedIcon sx={{ mb: "1px" }} />
                    </Box>
                    {!toggleView
                        ? <ItemsList handleOpen={handleOpen} handleClose={handleClose} open={open} />
                        : <DragListView handleOpen={handleOpen} handleClose={handleClose} open={open} />
                    }
                    <Button
                        sx={{
                            m: 2
                        }}
                        color="error"
                        variant="outlined"
                        onClick={handleRemoveAllOpen}>
                        CLEAR LIST
                    </Button>
                </Box>
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
