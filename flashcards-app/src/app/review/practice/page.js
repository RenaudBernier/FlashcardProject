'use client'
import {useEffect, useRef, useState} from "react";
import {deleteFromArr, get} from "@/app/api/firestore";
import ReviewCard from "@/app/review/card";


export default function Page() {
    const [folder, setFolder] = useState(null);
    const [topCard, setTopCard] = useState(null);
    const [side, setSide] = useState("front");
    const index = useRef(0);
    const path = "queue"
    async function timer(){
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    async function fetchData() {
        const f = await get(path);
        setFolder(f);
        return f;
    }
    async function resetDeck(){
        const f = await fetchData();
        index.current = 0;
        setTopCard(f[0]);
        setSide("front");
    }


    useEffect(() => {
        resetDeck();
    }, []);

    function flipCard(grade){
        if(grade !== 1){
            deleteFromArr(path, index.current);
        }
        setSide("back");
    }
    async function nextCard(){
        index.current += 1;
        if(index.current === folder.length){
            await resetDeck();
        }
        else {
            setSide("front");
            setTopCard(folder[index.current]);
        }
    }

    if(!folder) //Not yet loaded
        return(
            <></>
        )
    if(!topCard){ //Loaded, but deck is empty
        return(
            <>Congrats! You've reviewed everything</>
        )
    }

    return(
        <ReviewCard topCard={topCard} flipCard={flipCard} nextCard={nextCard} side={side}></ReviewCard>
    )
}