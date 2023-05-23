import { Box, Button, Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Add, Check, Search } from "@mui/icons-material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
    const [editField, seteditFeld] = useState(false);
    const [editingData, setEditingData] = useState();
    // add the items fucnction
    const addItem = () => {
        if (!inputdata && !isEditItem) {
            alert("Enter Some Thing");
        } else if (editingData && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: editingData };
                    }
                    return curElem;
                })
            );
            setEditingData("");
            setIsEditItem(null);
            setToggleButton(false);
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
                status: 'Created'
            };
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };

    //edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        seteditFeld(!editField);
        setEditingData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };
    let filteredItems = items.filter((item) => {
        if (searchTerm === "") {
            return item;
        } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item;
        }
    });

    // how to delete items section
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems);
    };

    // remove all the elements
    const removeAll = () => {
        setItems([]);
    };
    const handleStatus = (val) => {
        setItems(
            items.map((curElem) => {
                if (curElem.id === val.id) {
                    return { ...curElem, status: 'Complete' };
                }
                return curElem;
            })
        );
    }
    // adding localStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    const [filter, setFilter] = useState('');
    const handleChange = (event) => {
        setFilter(event.target.value);
        console.log(event.target.value);
        filteredItems = items.filter((item) => {
            if (event.target.value === "all") {
                return item;
            } else if (item.status.toLowerCase().includes(event.target.value.toLowerCase())) {
                return item;
            }
        });
    };
    return (
        <>
            <Box>
                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Typography color={'white'} padding={4} fontWeight="bold">TODO LIST</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: 4 }}
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
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />}
                            <IconButton color="primary" onClick={addItem} sx={{ p: '10px' }} aria-label="directions">
                                <Add />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color={search ? "error" : "primary"} onClick={() => setSearch(!search)} sx={{ p: '10px' }} aria-label="directions">
                                <Search />
                            </IconButton>
                        </Paper>
                    </Box>
                    <Box sx={{ width: 120, marginX: 'auto' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter}
                                label="filter"
                                onChange={handleChange}
                            >
                                <MenuItem value={"all"}>All</MenuItem>
                                <MenuItem value={"pending"}>Pending</MenuItem>
                                <MenuItem value={"complete"}>Complete</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* show our items  */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 10 }}>
                        {filteredItems.map((curElem) => {
                            return (
                                <Paper sx={{ p: '2px 4px', p: 1.5, m: 2, mb: 4, width: '100%' }} key={curElem.id}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                        {editField && isEditItem === curElem.id ?
                                            <InputBase
                                                sx={{ ml: 1, flex: 1 }}
                                                value={editingData}
                                                onChange={(event) => setEditingData(event.target.value)}
                                            />
                                            :
                                            <Box sx={{ wordWrap: 'break-word' }}>
                                                <Typography sx={{}}>{curElem.name}</Typography>
                                            </Box>
                                        }
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {editField && isEditItem === curElem.id ?
                                                    <Check sx={{ p: 1 }} onClick={() => {
                                                        addItem();
                                                        seteditFeld(false);
                                                    }} />
                                                    :
                                                    curElem.status !== 'Complete' ?
                                                        <EditNoteOutlinedIcon sx={{ p: 1 }}
                                                            onClick={() => {
                                                                editItem(curElem.id);
                                                                seteditFeld(true)
                                                            }} /> : ""
                                                }
                                                <DeleteOutlineOutlinedIcon
                                                    sx={{ p: 1 }}
                                                    onClick={() => deleteItem(curElem.id)} />
                                                {curElem.status !== 'Complete' ?
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => handleStatus(curElem)}
                                                        sx={{ fontSize: 12 }}>Mark as Complete</Button>
                                                    : <TaskAltIcon sx={{ color: 'green' }} />}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            );
                        })}
                    </Box>
                    {/* rmeove all button  */}
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={removeAll}>
                        <span> CLEAR LIST</span>
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Todo;
