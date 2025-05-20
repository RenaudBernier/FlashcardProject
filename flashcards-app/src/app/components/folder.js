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
import { useRouter } from 'next/navigation'
import {newFolder, newSheet} from "@/app/components/flashcards/updateFlash";




export default function Folder({ f, path, openSheet, noSheets }) {
    const router = useRouter();
    const [folder, setFolder] = useState(f);

    React.useEffect(() => {
        // whenever the parent gives us a new f, copy it in
        setFolder(f);
    }, [f]);

    async function addFolder(name, path, key){
        const keyArr = Object.keys(folder.folders[key].folders);
        console.log(path);
        const [newKey, newF] = await newFolder(`${path}.folders`, keyArr, name);
        const folderCopy = {...folder};
        folderCopy.folders[key].folders[newKey] = newF;
        setFolder(folderCopy);
    }

    //Wrong folder here, has to be the correct nested folder
    async function addSheet(name, path, key){
        const keyArr = Object.keys(folder.folders[key].sheets);
        const [newKey, newS] = await newSheet(`${path}.sheets`, keyArr, name);
        const folderCopy = {...folder};
        folderCopy.folders[key].sheets[newKey] = newS;
        setFolder(folderCopy);
    }

    function reviewFolder(path){
        sessionStorage.setItem('path', path);
        router.push('/review');
    }

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




    if (!noSheets)
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
                                <IconButton onClick={() => reviewFolder(`${path}.folders.${key}`)}
                                    edge="end"
                                >
                                    <SettingsIcon />
                                </IconButton>
                                <AddBtn item={item} addFolder={addFolder} addSheet={addSheet} path={`${path}.folders.${key}`} key1={key}></AddBtn>
                            </ListItemSecondaryAction>

                        </ListItem>

                        <Collapse in={open.includes(item.id)} timeout="auto" unmountOnExit>
                            <Folder f={item} path={`${path}.folders.${key}`} openSheet={openSheet} noSheets={false} />
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
        )
    return(
        <List sx={{ml: 2}}>
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
                            <AddBtn item={item} addFolder={addFolder}></AddBtn>
                        </ListItemSecondaryAction>

                    </ListItem>

                    <Collapse in={open.includes(item.id)} timeout="auto" unmountOnExit>
                        <Folder f={item} path={`${path}.folders.${key}`} openSheet={openSheet} noSheets={true} />
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    )
}

function AddBtn({item, addFolder, path, key1, addSheet}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [dialog, setDialog] = useState(false);
    const [sheetDialog, setSheetDialog] = useState(false);
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
                <MenuItem onClick={() => setSheetDialog(true)}>Add File</MenuItem>
            </Menu>
            <PromptDialog
                open={dialog}
                onClose={(val) => {
                    setDialog(false);
                    if(val)
                        addFolder(val, path, key1);
                    console.log(path);
                }}
                title="Name your folder"
            />
            <PromptDialog
                open={sheetDialog}
                onClose={(val) => {
                    setSheetDialog(false);
                    if(val)
                        addSheet(val, path, key1);
                }}
                title="Name your sheet"
            />
        </>
    )
}