// MyCard.jsx
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MainBlock from "@/app/components/tiptap/MainBlock";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/app/firebase.js";

export default function MyCard({ card, path, deleteCard, updateRef, sheet }) {
    // Update either side when the user edits
    const editCard = async (content, isFront) => {
        try {
            const user = auth.currentUser;
            const side = isFront ? "front" : "back";
            const pathArr = path.split(".");
            const cardNb = pathArr[pathArr.length - 1];
            console.log(sheet);
            if(!(cardNb in sheet.flashcards)){
                sheet.flashcards[cardNb] = {};
            }
            sheet[`flashcards.${cardNb}.${side}`] = content;
            const sheetPathArr = pathArr.splice(0,pathArr.length - 2);
            const sheetPath = sheetPathArr.join(".")
            updateRef(content, path, side, cardNb);
            await updateDoc(doc(db, "root", user.uid), {
                [`${path}.${side}`]: content,
            });
        } catch (e) {
            console.error("Error updating document:", e);
        }
    };

    if (!card) return null;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center", // centre the icon vertically
                gap: 2,
            }}
        >
            {/* Front side */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <MainBlock
                    content={card.front}
                    editCard={editCard}
                    isFront={true}
                    editable={true}
                />
            </Box>

            {/* Delete icon in the middle */}
            <Tooltip title="Delete flashcard">
                <IconButton
                    aria-label="delete flashcard"
                    size="small"
                    onClick={() => deleteCard(path)}
                    sx={{
                        color: "error.main",
                        border: "1px solid",
                        borderColor: "divider",
                        "&:hover": {
                            bgcolor: "error.light",
                            color: "common.white",
                        },
                    }}
                >
                    <DeleteForeverOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            {/* Back side */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <MainBlock
                    content={card.back}
                    editCard={editCard}
                    isFront={false}
                    editable={true}
                />
            </Box>
        </Box>
    );
}