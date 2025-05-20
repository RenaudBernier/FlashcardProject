import {doc, getDoc, updateDoc, deleteField} from 'firebase/firestore'
import { db, auth } from '@/app/firebase.js'

class Folder{
    constructor(name, key) {
        this.name = name;
        this.folders = {};
        this.sheets = {};
        this.id = key;
    }
    toJson(){
        return {
            name: this.name,
            folders: this.folders,
            sheets: this.sheets,
            id: this.id
        }
    }
}

class Sheet{
    constructor(name, key) {
        this.name = name;
        this.id = key;
        this.flashcards = {};
    }
    toJson(){
        return {
            name: this.name,
            id: this.id,
            flashcards: this.flashcards
        }
    }
}

class Card{
    constructor(path){
        this.path = path;
        this.front = "<p></p>"
        this.back = "<p></p>"
    }
    toJson(){
        return {
            path: this.path,
            front: this.front,
            back: this.back
        }
    }
}

async function update(path, obj){
    const user = auth.currentUser;
    await updateDoc(doc(db,'root', user.uid), {
        [path] : obj,
    })
}

export async function newFlash(path, keysArray) {
    keysArray = keysArray.map( (str) => Number.parseInt(str) );
    let maxKey = Math.max(...keysArray);
    if (maxKey < 0)
        maxKey = 0
    const newKey = String(maxKey+1);
    path = `${path}.${newKey}`
    const myCard = new Card(path);
    await update(path, myCard.toJson());
    return newKey;
}
export async function newFolder(path, keysArray, name) {
    keysArray = keysArray.map( (str) => Number.parseInt(str) );
    let maxKey = Math.max(...keysArray);
    if (maxKey < 0)
        maxKey = 0
    const newKey = String(maxKey+1);
    path = `${path}.${newKey}`
    const f = new Folder(name, newKey);
    await update(path, f.toJson());
    return [newKey, f];
}

export async function newSheet(path, keysArray, name) {
    keysArray = keysArray.map( (str) => Number.parseInt(str) );
    let maxKey = Math.max(...keysArray);
    if (maxKey < 0)
        maxKey = 0
    const newKey = String(maxKey+1);
    path = `${path}.${newKey}`
    const s = new Sheet(name, newKey);
    await update(path, s.toJson());
    return [newKey, s];
}
export async function deleteFlash(path) {
    const arr = path.split('.');
    await update(path, deleteField())
    return arr[arr.length-1];
}