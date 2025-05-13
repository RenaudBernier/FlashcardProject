'use client'
import {IconButton, ListItemSecondaryAction, Button, Container, Typography, List, ListItem, ListItemButton, ListItemText, Box, ListItemIcon, Collapse} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import * as React from 'react';
import NotesIcon from '@mui/icons-material/Notes';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PromptDialog from "@/app/components/promptdialog";
import {useState} from "react";


export default function Folder({ folder, path, openSheet }) {
    const [open, setOpen] = React.useState([]);

    function handleOpen(id) {
        console.log(id);
        if (open.includes(id)) {
            setOpen(open.filter((item) => item !== id));
        }
        else
            setOpen([...open, id]);
    }
    console.log("FOLDER", folder)

    return(
        <List sx={{ml: 2}}>
            {Object.entries(folder.sheets).map(([key, item]) => (

                <ListItemButton key={key} onClick={() => openSheet(item, `${path}.sheets.${key}`)}>
                    <ListItemIcon><NotesIcon></NotesIcon></ListItemIcon>
                    <ListItemText primary={item.name}></ListItemText>
                </ListItemButton>
            ))}
            {Object.entries(folder.folders).map(([key, item]) => (
                <React.Fragment key={key}>
                    <ListItem disablePadding sx={{ position: 'relative' }}>
                        <ListItemButton onClick={() => handleOpen(item.id)}>
                            <ListItemIcon><FolderIcon /></ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>

                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                            >
                                <SettingsIcon />
                            </IconButton>
                            <AddBtn item={item}></AddBtn>
                        </ListItemSecondaryAction>

                    </ListItem>

                    <Collapse in={open.includes(item.id)} timeout="auto" unmountOnExit>
                        <Folder folder={item} path={`${path}.folders.${key}`} openSheet={openSheet}/>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    )
}

function AddBtn({item}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [dialog, setDialog] = useState(false);
    const [answer, setAnswer] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <>
        <IconButton
            edge="end"
            id="add-button"
            aria-controls={open ? 'add-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <AddIcon />
        </IconButton>
            <Menu
                id="add-menu"
                aria-labelledby="add-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => setDialog(true)}>Add Folder</MenuItem>
                <MenuItem onClick={handleClose}>Add File</MenuItem>
            </Menu>
            <PromptDialog
                open={dialog}
                onClose={(val) => { setDialog(false); setAnswer(val); }}
                title="Name your folder"
            />
        </>
    )
}