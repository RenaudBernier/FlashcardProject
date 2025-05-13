import {doc, getDoc, updateDoc, deleteField} from 'firebase/firestore'
import { db, auth } from '@/app/firebase.js'

async function update(path, obj){
    const user = auth.currentUser;
    await updateDoc(doc(db,'root', user.uid), {
        [path] : obj,
    })
}

export async function newFlash(path, keysArray) {
    keysArray = keysArray.map( (str) => Number.parseInt(str) );
    const maxKey = Math.max(...keysArray);
    const newKey = String(maxKey+1);
    path = `${path}.${newKey}`
    await update(path, {front: "<p></p>", back: "<p></p>"})
    return newKey;
}
export async function deleteFlash(path) {
    const arr = path.split('.');
    await update(path, deleteField())
    return arr[arr.length-1];
}