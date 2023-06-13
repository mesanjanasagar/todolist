import { Avatar, Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { REMOVE_ALL } from "../utils/constants";
import BasicModal from "../components/ui/modal";
import { useEffect, useState } from "react";
import ItemsList from "../components/ItemsList";
import DragListView from "../components/DragListView";
import SearchAppBar from "../components/ui/header";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { setDelete } from "../state/features/todo";
import Cookies from "js-cookie";
import { setToken, setUser } from "../state/features/auth";
import { useSelector } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
  const isAuth = useSelector((state) => state.auth.token);
  const userData = Cookies.get("userData");
  useEffect(() => {
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
      dispatch(setToken("login"));
    } else {
      window.location.href = "http://localhost:3001";
    } // eslint-disable-next-line
  }, [userData]);
  return (
    <>
      <SearchAppBar
        handleToggleView={handleToggleView}
        toggleView={toggleView}
      />
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#27374D",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                marginY: 4,
                marginX: 1,
              }}
            >
              ALL TASKS{" "}
            </Typography>
            <FactCheckOutlinedIcon sx={{ mb: "1px" }} />
          </Box>
          {Boolean(isAuth) ? (
            !toggleView ? (
              <ItemsList
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={open}
              />
            ) : (
              <DragListView
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={open}
              />
            )
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#B56AFF" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 2,
                }}
              >
                User Must Login First To View Todos
              </Typography>
            </Box>
          )}
          {Boolean(isAuth) ? (
            <Button
              sx={{
                m: 2,
              }}
              color="error"
              variant="outlined"
              onClick={handleRemoveAllOpen}
            >
              CLEAR LIST
            </Button>
          ) : (
            ""
          )}
        </Box>
        <BasicModal
          open={removeAllOpen}
          handleClose={handleRemoveAllClose}
          title="Are you sure you remove everything?"
          onConfirm={() => dispatch(setDelete(REMOVE_ALL))}
        />
      </Box>
    </>
  );
};

export default Todo;
