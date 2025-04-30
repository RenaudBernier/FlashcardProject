'use client'
import {Container, Typography, List, ListItem, ListItemButton, ListItemText, Box, ListItemIcon, Collapse} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import * as React from 'react';
import NotesIcon from '@mui/icons-material/Notes';
import Folder from './folder.js';
import getcards from '../api/getcards.js'
import {db, auth} from '../firebase.js'
import {useState, useEffect } from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getDoc, doc} from "firebase/firestore";


const contents = getcards()



export default function Sidebar() {

    const [cards, setCards] = useState(contents);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
            const document = await getDoc(doc(db,"root", user.uid));
            const data = document.data();
            console.log(data);
            console.log(data.cards)
            setCards(data.cards);
        })
        return () => unsubscribe();
    }, []);

    return (
        <List sx={{minWidth: 250, ml: 0}}>
            <ListItemButton>
                <ListItemIcon><FolderIcon sx={{color: 'blue'}}/></ListItemIcon>
                <ListItemText primary="Hello"/>
            </ListItemButton>
            <Folder folder={cards}></Folder>
        </List>

    )
}



