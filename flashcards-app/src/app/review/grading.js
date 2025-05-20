import {enqueue, update} from "@/app/api/firestore";
import {review} from "@/app/FSRS/algorithm";


export function grading(grade, card, path){
    if(grade === 1)
        enqueue('queue', card);
    review(card, grade, card.path);
    card.lastReview = new Date();
    update(card.path, card);
}