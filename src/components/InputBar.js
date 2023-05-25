import { Badge, Box, Divider, IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import { Add, Search } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { useDispatch, useSelector } from "react-redux";
import { setTodoData, setUpdatedTodoData, setFilteredItem, setSearchTerm } from '../state'
import { STATUS } from "../utils/constants";

const InputBar = () => {
    const [inputdata, setInputData] = useState("");
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const [search, setSearch] = useState(false);
    const [editingData, setEditingData] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
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
    // add the items fucnction
    const addItem = () => {
        if (!inputdata && !isEditItem) {
            alert("Enter Some Thing");
        } else if (editingData && toggleButton) {
            dispatch(
                setUpdatedTodoData(editingData)
            )
            setEditingData("");
            setIsEditItem(null);
            setToggleButton(false);
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
                status: STATUS.PENDING
            };
            dispatch(
                setTodoData(myNewInputData)
            );
            setInputData("");
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, mb: 4 }}
            >
                {!search ?
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="✍ Type Here"
                        value={inputdata}
                        onChange={(event) => setInputData(event.target.value)}
                    /> :
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="🔍 Search Here"
                        value={searchTerm}
                        onChange={(event) => dispatch(setSearchTerm(event.target.value))}
                    />}
                <IconButton color="primary" onClick={addItem} sx={{ p: '10px' }} aria-label="directions">
                    <Add />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color={search ? "error" : "primary"} onClick={() => setSearch(!search)} sx={{ p: '10px' }} aria-label="directions">
                    <Search />
                </IconButton>
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
        </Box>
    )
}

export default InputBar