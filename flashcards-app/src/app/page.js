'use client'
import Image from "next/image";
import {
    Container,
    Typography,
    Drawer,
    Box,
    Button,
} from "@mui/material";
import Sidebar from "./components/sidebar.js";
import LoginCheck from "@/app/login/logincheck";
import Flashcards from "@/app/components/flashcards/Flashcards";
import ShortcutsDialog from "@/app/components/tiptap/ShortcutsDialog"; // <- new pop‑up
import React, {useState, useCallback, useRef} from "react";
import { useRouter } from "next/navigation";

function trimAfterDotFromEnd(str, k) {
    const parts = str.split(".");               // split on every dot
    if (k <= 0 || k > parts.length - 1) return str; // nothing to trim
    const keep = parts.length - k;              // how many segments to keep
    return parts.slice(0, keep).join(".");
}

export default function Home() {
    const router = useRouter();

    const [sheet, setSheet] = useState(null);
    const [path, setPath] = useState(null);
    const [shortcutsOpen, setShortcutsOpen] = useState(false);
    const sheetDict = useRef({});

    function updateRef(content, path, side, cardNb){
        path = trimAfterDotFromEnd(path, 2);
        if(!(path in sheetDict.current)){
            sheetDict.current[path] = {};
        }
        if(!("flashcards" in sheetDict.current[path])){
            sheetDict.current[path].flashcards = {};
        }
        if(!(cardNb in sheetDict.current[path].flashcards)){
            sheetDict.current[path].flashcards[cardNb] = {};
        }

        sheetDict.current[path].flashcards[cardNb][side] = content;
    }


    const openSheet = useCallback((newSheet, newPath) => {
        if(sheet){
            const updatedSheet = {...sheet, ...sheetDict.current[path]};
            sheetDict.current[path] = updatedSheet;
        }
        if(newPath in sheetDict.current)
            setSheet(sheetDict.current[newPath]);
        else {
            setSheet({...newSheet});
            console.log("not found")
        }

        setPath(newPath);
        console.log("NEW", newPath);
    }, []); // 👈 stable reference across renders

    return (
        <Box>
            <LoginCheck />

            {/* Sidebar + action buttons */}
            <Drawer variant="permanent">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        p: 2,
                    }}
                >
                    {/* Top: folder navigation */}
                    <Sidebar openSheet={openSheet} />

                    {/* Bottom: action buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                sessionStorage.setItem("path", "queue");
                                router.push("/review/practice");
                            }}
                        >
                            Review
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => setShortcutsOpen(true)}
                        >
                            Shortcuts
                        </Button>
                    </Box>
                </Box>
            </Drawer>

            {/* Main content */}
            <Box sx={{ ml: "300px", p: 2 }}>
                <Flashcards key={path} sheet={sheet} setSheet={setSheet} path={path} updateRef={updateRef} />
            </Box>

            {/* Pop‑up dialog */}
            <ShortcutsDialog
                open={shortcutsOpen}
                onClose={() => setShortcutsOpen(false)}
            />
        </Box>
    );
}
