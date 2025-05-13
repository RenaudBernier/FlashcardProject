'use client'
import Image from "next/image";
import {Container, Typography, Drawer, Box} from "@mui/material"
import Sidebar from "./components/sidebar.js"
import LoginCheck from "@/app/login/logincheck";
import MainBlock from "./components/tiptap/MainBlock";
import MyCard from "@/app/components/flashcards/MyCard";
import {useState} from "react";
import Flashcards from "@/app/components/flashcards/Flashcards";
import React from 'react';





export default function Home() {
    const [sheet, setSheet] = useState(null);
    const [path, setPath] = useState(null);

    const openSheet = React.useCallback((sheet, path) => {
        setSheet({ ...sheet });
        setPath(path);
    }, []); // 👈 stable reference across renders
    return (
    <Box>
        <LoginCheck></LoginCheck>
        <Drawer variant="permanent">
            <Sidebar openSheet={openSheet}>
            </Sidebar>
        </Drawer>
        <Box sx={{ ml: '240px', p: 2 }}>
            <Flashcards key={path} sheet={sheet} path={path}></Flashcards>
        </Box>
    </Box>
    );
}
