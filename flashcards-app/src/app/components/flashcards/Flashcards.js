'use client'
import MyCard from './MyCard.js';
import { Box, Button, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import { newFlash, deleteFlash } from "./updateFlash.js";

export default function Flashcards({ sheet, setSheet, path, updateRef }) {
    // Local flashcard state mirrors Firestore data
    const [flashcards, setFlashcards] = useState(sheet?.flashcards ?? {});

    // Memo‑cache keys so we don’t rebuild on every render
    const keysArray = useMemo(() => Object.keys(flashcards), [flashcards]);

    // ——————————————————————————————————————————
    // CRUD helpers
    // ——————————————————————————————————————————
    const addFlashcard = async flashPath => {
        const newKey = await newFlash(flashPath, keysArray);
        setFlashcards(prev => ({
            ...prev,
            [newKey]: { front: "<p></p>", back: "<p></p>" }
        }));
    };

    const deleteFlashcard = async flashPath => {
        const key = await deleteFlash(flashPath);
        let myCards = null;
        setFlashcards(prev => {
            const { [key]: _removed, ...rest } = prev; // eslint-disable-line no-unused-vars
            myCards = prev;
            return rest;
        });
        setSheet(prev => {
            const mySheet = {...prev};
            mySheet.flashcards = myCards;
            return mySheet;
        })
    };

    // ——————————————————————————————————————————
    // Empty‑state UI
    // ——————————————————————————————————————————
    if (!sheet || !sheet.flashcards) {
        return (
            <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary">
                    No flashcards yet — start by adding one!
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 2 }}
                    onClick={() => addFlashcard(`${path}.flashcards`)}
                >
                    Add Your First Flashcard
                </Button>
            </Box>
        );
    }

    // ——————————————————————————————————————————
    // Main UI: one card per row (fixed width inside <MyCard>)
    // ——————————————————————————————————————————
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {Object.entries(flashcards).map(([key, item]) => (
                <MyCard
                    key={key}
                    card={item}
                    path={`${path}.flashcards.${key}`}
                    deleteCard={deleteFlashcard}
                    updateRef={updateRef}
                    sheet={sheet}
                />
            ))}

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => addFlashcard(`${path}.flashcards`)}
                >
                    Add Flashcard
                </Button>

            </Box>
        </Box>
    );
}
