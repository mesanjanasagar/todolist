import { Box, Button, Card, Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Add, Check, Delete, Edit } from "@mui/icons-material";
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

    // add the items fucnction
    const addItem = () => {
        if (!inputdata) {
            alert("Enter Some Thing");
        } else if (inputdata && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputdata };
                    }
                    return curElem;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
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
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };

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

    // adding localStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

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
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="✍ Type Here"
                                value={inputdata}
                                onChange={(event) => setInputData(event.target.value)}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color="primary" onClick={addItem} sx={{ p: '10px' }} aria-label="directions">
                                {!toggleButton ?
                                    <Add /> :
                                    <Check />}
                            </IconButton>
                        </Paper>
                    </Box>

                    {/* show our items  */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {items.map((curElem) => {
                            return (
                                <Paper sx={{ p: '2px 4px', p: 1.5, m: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 400, mb: 4 }} key={curElem.id}>
                                    <Typography sx={{}}>{curElem.name}</Typography>
                                    <Box>
                                        <Edit sx={{ p: 1 }} onClick={() => editItem(curElem.id)} />
                                        <Delete sx={{ p: 1 }} onClick={() => deleteItem(curElem.id)} />
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
