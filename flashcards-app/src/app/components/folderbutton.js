import {
    Collapse,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";

export default function FolderButton({item}) {

    const [open, setOpen] = React.useState([]);

    function handleOpen(id) {
        console.log(id);
        if (open.includes(id)) {
            setOpen(open.filter((item) => item !== id));
        }
        else
            setOpen([...open, id]);
    }

    return (
        <>
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
            <IconButton
                edge="end"
            >
                <AddIcon />
            </IconButton>
        </ListItemSecondaryAction>

    </ListItem>

    <Collapse in={open.includes(item.id)} timeout="auto" unmountOnExit>
        <Folder folder={item} />
    </Collapse>
        </>
)
}