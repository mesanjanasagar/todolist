import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Badge, Box, Button, Divider, IconButton, InputBase, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import InputModal from "./inputModal";
import TodoForm from "../todoForm";
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { setFilteredItem, setSearchTerm } from '../../state/features/todo';
import LogoutIcon from '@mui/icons-material/Logout';
import { setToken, setUser } from '../../state/features/auth';
import Cookies from 'js-cookie';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    border: '1px solid #FAEAB1',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar({ handleToggleView, toggleView }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [fromOpen, setFormOpen] = useState(false);
    const open = Boolean(anchorEl);
    const filteredItem = useSelector(state => state.todos.filteredItem);
    const searchTerm = useSelector(state => state.todos.searchTerm);
    const isAuth = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
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
    const handleFormModal = () => setFormOpen(false);
    const handleLogout = () => {
        dispatch(setToken());
        dispatch(setUser());
        Cookies.remove('userData');
    }

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <AppBar position="static"
                sx={{ backgroundColor: "#C58940", color: "#DDE6ED", borderRadius: 2, border: '1px solid #FAEAB1' }}
            >
                <Toolbar >
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Button sx={{ color: "#DDE6ED", borderColor: "#FAEAB1" }} variant='outlined' onClick={() => setFormOpen(true)}>
                            <Add />
                            <Typography sx={{ fontSize: 14 }}>
                                Add
                            </Typography>
                        </Button>
                        <Divider
                            sx={{ height: 28, m: 0.5 }}
                            orientation="vertical"
                        />
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ color: "#DDE6ED" }}
                        >
                            <Badge
                                color="primary"
                                variant="dot"
                                invisible={!Boolean(filteredItem)}
                            >
                                <FilterListOutlinedIcon sx={{ color: "#DDE6ED" }} />
                            </Badge>
                        </IconButton>
                        <Divider
                            sx={{ height: 28, m: 0.5 }}
                            orientation="vertical"
                        />
                        <IconButton
                            sx={{ color: "#DDE6ED" }}
                            onClick={handleToggleView}>
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
                    <Search >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            value={searchTerm}
                            onChange={(event) => dispatch(setSearchTerm(event.target.value))}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {Boolean(isAuth)
                        ? < IconButton sx={{ ml: { md: 2 }, color: "#DDE6ED" }}>
                            <LogoutIcon onClick={handleLogout} />
                        </IconButton>
                        : <Link to={"http://localhost:3001"}>
                            < IconButton sx={{ ml: { md: 2 }, color: "#DDE6ED" }}>
                                <LoginIcon />
                            </IconButton>
                        </Link>
                    }
                </Toolbar>
                <InputModal fromOpen={fromOpen} handleFormModal={handleFormModal}>
                    <TodoForm setFormOpen={handleFormModal} />
                </InputModal>
            </AppBar>
        </Box >
    );
}