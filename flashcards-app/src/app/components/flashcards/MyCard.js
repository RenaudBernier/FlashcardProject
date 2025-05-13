import {Box, Button} from "@mui/material";
import MainBlock from "@/app/components/tiptap/MainBlock";
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '@/app/firebase.js'

export default function MyCard({ card, path, deleteCard }) {

    async function editCard(content, isFront){

        try {
            console.log(content);
            const user = auth.currentUser;
            const side = isFront ? 'front' : 'back';
            await updateDoc(doc(db, 'root', user.uid), {
                [`${path}.${side}`] : content
            })

        } catch (e) {
            console.error('Error updating document:', e)
        }
    }

    if(!card){
        return null
    }
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2  }}>
                <MainBlock content={card.front} editCard={editCard} isFront={true}></MainBlock>
                <MainBlock content={card.back} editCard={editCard} isFront={false}></MainBlock>
            </Box>
            <Button onClick={() => deleteCard(path)}>Delete</Button>
        </>
    )
}