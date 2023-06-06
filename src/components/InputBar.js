import { Badge, Box, Button, Collapse, Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { useDispatch, useSelector } from "react-redux";
import { setFilteredItem, setSearchTerm } from '../state'
import InputModal from "./ui/inputModal";
import TodoForm from "./todoForm";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const InputBar = ({ handleToggleView, toggleView }) => {
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
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4,
                    maxWidth: '100%',
                    minWidth: '200',
                    width:{md:600}
                }}
            >

                <Collapse orientation="horizontal" in={!toggleView}>
                    <InputBase
                        sx={{
                            ml: 1,
                            flex: 1,
                            width: '100%',
                        }}
                        placeholder="🔍 Search Here"
                        value={searchTerm}
                        onChange={(event) => dispatch(setSearchTerm(event.target.value))}
                    />
                </Collapse>

                <Box sx={{ display: 'flex' }}>
                    {!toggleView && (
                        <>
                            <Divider
                                sx={{ height: 28, m: 0.5, display: `${toggleView ? "none" : ""}` }}
                                orientation="vertical"
                            />
                            <IconButton
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <Badge
                                    color="primary"
                                    variant="dot"
                                    invisible={!Boolean(filteredItem)}
                                >
                                    <FilterListOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <Divider
                                sx={{ height: 28, m: 0.5 }}
                                orientation="vertical"
                            />
                        </>
                    )}

                    <Button onClick={() => setFormOpen(true)}>
                        <Add />
                        <Typography sx={{ fontSize: 14 }}>
                            Add
                        </Typography>
                    </Button>
                    <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                    />
                    <IconButton onClick={handleToggleView}>
                        {!toggleView ? (
                            <AutoAwesomeMosaicIcon />
                        ) : (
                            <FormatListBulletedIcon />
                        )}
                    </IconButton>
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
                    <MenuItem onClick={() => handleClose("all")}>All</MenuItem>
                    <MenuItem onClick={() => handleClose("pending")}>Pending</MenuItem>
                    <MenuItem onClick={() => handleClose("complete")}>Complete</MenuItem>
                </Menu>
            </Paper>
            <InputModal fromOpen={fromOpen} handleFormModal={handleFormModal}>
                <TodoForm setFormOpen={handleFormModal} />
            </InputModal>
        </Box>
    );
}

export default InputBar;
