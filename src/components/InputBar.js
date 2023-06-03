import { Badge, Box, Button, Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { useDispatch, useSelector } from "react-redux";
import { setFilteredItem, setSearchTerm } from '../state'
import InputModal from "./ui/inputModal";
import TodoForm from "./todoForm";
const InputBar = ({ handleToggleView, toggleView }) => {
    // const [search, setSearch] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [fromOpen, setFormOpen] = useState(false);
    const filteredItem = useSelector(state => state.filteredItem);
    const searchTerm = useSelector(state => state.searchTerm);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (item) => {
        if (item && item.length) {
            dispatch(
                setFilteredItem(item)
            )
        }
        setAnchorEl(null);
    };
    const handleFormModal = () => setFormOpen(false)
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 600, mb: 4 }}
            >
                {/* {!search ?
                    <Button
                        variant="outlined"
                        onClick={() => setFormOpen(true)}
                    >
                        <Add />
                        <Typography sx={{ fontSize: 14 }}>
                            Add Task
                        </Typography>
                    </Button>
                    : */}

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="🔍 Search Here"
                    value={searchTerm}
                    onChange={(event) => dispatch(setSearchTerm(event.target.value))}
                />
                {/* } */}
                <Box sx={{ display: 'flex' }}>

                    {/* <IconButton color={search ? "error" : "primary"} onClick={() => setSearch(!search)} sx={{ p: '10px' }} aria-label="directions">
                        <Search />
                    </IconButton> */}
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Badge color="primary" variant="dot" invisible={!Boolean(filteredItem)} >
                            <FilterListOutlinedIcon />
                        </Badge>
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <Button
                        // variant="outlined"
                        onClick={() => setFormOpen(true)}
                    >
                        <Add />
                        <Typography sx={{ fontSize: 14 }}>
                            Add Task
                        </Typography>
                    </Button>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <Button
                        // variant="outlined"
                        onClick={handleToggleView}>{toggleView ? "DragList View" : "List View"}</Button>
                </Box>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => handleClose("all")} >All</MenuItem>
                    <MenuItem onClick={() => handleClose("pending")} >Pending</MenuItem>
                    <MenuItem onClick={() => handleClose("complete")} >Complete</MenuItem>
                </Menu>
            </Paper>
            <InputModal fromOpen={fromOpen} handleFormModal={handleFormModal}>
                <TodoForm setFormOpen={handleFormModal} />
            </InputModal>
        </Box >
    )
}

export default InputBar