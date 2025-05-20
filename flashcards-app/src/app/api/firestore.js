import {doc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import { db, auth } from '@/app/firebase.js'

function timer(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

async function getRef(){
    let user = auth.currentUser;
    let count = 0;

    while (!user){
        if (++count > 20)
            throw new Error("Authentication timeout!!");

        await timer(200);
        user = auth.currentUser;
    }
    return doc(db,'root', user.uid);
}


export async function update(path, obj){
    const ref = await getRef();
    await updateDoc(ref, {
        [path] : obj,
    })
}

export async function peekFront(path){
    const arr = await get(path);
    return arr[0];
}

export async function dequeue(path){
    const arr = await get(path);
    const item = arr.shift();
    await update(path, arr);
    return item;
}

export async function enqueue(path, obj){
    const arr = await get(path);
    arr.push(obj);
    await update(path, arr);
}

export async function deleteFromArr(path, index){
    const arr = await get(path);
    arr.splice(index, 1);
    await update(path, arr);
}

export async function requeue(path){
    const arr = await get(path);
    const item = arr.shift();
    arr.push(item);
    await update(path, arr);
    return item;
}

export async function get(path){
    const ref = await getRef();
    const doc = await getDoc(ref);
    const data = doc.data();
    const pathArr = path.split('.');
    let curr = data;

    for (let i= 0; i < pathArr.length; i++){
        curr = curr[pathArr[i]];
        console.log(curr);
    }
    return curr;
}