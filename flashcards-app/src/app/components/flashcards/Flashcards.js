'use client'
import MyCard from './MyCard.js';
import {Button} from "@mui/material";
import {useState} from "react";
import {newFlash, deleteFlash} from "./updateFlash.js"
export default function Flashcards({ sheet, path }) {

    if(!sheet || !sheet.flashcards){
        return null
    }

    const [flashcards, setFlashcards] = useState(sheet.flashcards);

    const keysArray = Object.keys(flashcards);

    async function addFlashcard(path){
        const newKey = await newFlash(path, keysArray);
        setFlashcards({...flashcards, [newKey]: {front: "<p></p>", back: "<p></p>"}});
    }
    async function deleteFlashcard(path){
        const key = await deleteFlash(path);
        console.log(flashcards);
        console.log(key);
        setFlashcards(prev => {
            const {[key] : _removed, ...rest} = prev;
            console.log(rest)
            return rest;
        })
    }


    return (
        <>
            {Object.entries(flashcards).map(([key,item]) => (
                <MyCard key={key} card={item} path={`${path}.flashcards.${key}`} deleteCard={deleteFlashcard}></MyCard>
            ))}
            <Button onClick={() => addFlashcard(`${path}.flashcards`)}>New FlashCard</Button>
        </>
    )
}