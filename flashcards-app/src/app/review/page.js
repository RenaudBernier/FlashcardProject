'use client'
import { useEffect, useState } from 'react';
import {get} from '@/app/api/firestore.js'
import Sidebar from "@/app/components/sidebar";
import {Box, Button, Typography} from "@mui/material";
import MainBlock from "@/app/components/tiptap/MainBlock";
import {grading} from "@/app/review/grading";
import ReviewCard from "@/app/review/card";
import Page from "@/app/review/practice/page";


export default function HUD({practice}) {
    const [path, setPath] = useState(null);
    const [folder, setFolder] = useState(null);
    const [cards, setCards] = useState(null);
    const [side, setSide] = useState("front");

    function flipCard(grade, card){
        grading(grade, cards[0], path);
        setSide("back");
    }
    function nextCard(){
        const newCards = cards.slice(1); //removes first element
        setSide("front");
        setCards(newCards);
    }


    useEffect(() => {
        const path = sessionStorage.getItem("path");

        async function fetchData() {
            console.log(path);
            if (!path)
                return;
            const f = await get(path);
            setFolder(f);
            setPath(path);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (folder) {
            const time = new Date();
            const currentDate = new Date(time.getFullYear(), time.getMonth(), time.getDate());
            const reviewQueue = [];
            for (const sheet of Object.values(folder.sheets)){
                for (const card of Object.values(sheet.flashcards)){
                    let cardDate = null;
                    if (card.reviewDate){
                        cardDate = card.reviewDate.toDate();
                        cardDate = new Date(cardDate.getFullYear(), cardDate.getMonth(), cardDate.getDate());
                    }
                    if (!cardDate || cardDate <= currentDate){
                        reviewQueue.push(card);
                    }
                }
            }
            reviewQueue.sort(() => Math.random() - 0.5); //Makes card order random
            setCards(reviewQueue);
        }
    }, [folder]);

    if(!cards){
        return(
            <></>
        )
    }
    const deck = cards;
    const topCard = deck[0];

    return(
    <ReviewCard topCard={topCard} flipCard={flipCard} nextCard={nextCard} side={side}></ReviewCard>
    )
}