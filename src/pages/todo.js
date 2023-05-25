import { Box, Button, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDelete } from '../state'
import { REMOVE_ALL } from "../utils/constants";
import InputBar from "../components/InputBar";
import ItemsList from "../components/ItemsList";
// get the localStorage data back


const Todo = () => {
    const dispatch = useDispatch();

    // remove all the elements
    const removeAll = () => {
        dispatch(
            setDelete(REMOVE_ALL)
        )
    };

    return (
        <>
            <Box>
                <Paper sx={{ m: 8, textAlign: 'center', backgroundColor: "#ADD8E6" }}>
                    <Typography color={'white'} padding={4} fontWeight="bold">TODO LIST</Typography>
                    {/* show Input bar  */}
                    <InputBar />
                    {/* show our items  */}
                    <ItemsList />
                    {/* remove all button  */}
                    <Button
                        sx={{
                            m: 2
                        }}
                        color="error"
                        variant="outlined"
                        onClick={removeAll}>
                        <span> CLEAR LIST</span>
                    </Button>
                </Paper>
            </Box>
        </>
    );
};

export default Todo;
