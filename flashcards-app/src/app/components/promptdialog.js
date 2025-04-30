
import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button
} from "@mui/material";
import { useState } from "react";

export default function PromptDialog({ open, onClose, title = "Prompt" }) {
    const [value, setValue] = useState("");

    async function wait(){
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    async function resetVal(){
        await wait();
        setValue("");
    }

    const handleOk = () => {
        const temp = value
        resetVal()
        onClose(temp)
    };   // returns the text
    const handleCancel = () => onClose(null);

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="xs" fullWidth disableRestoreFocus >
            <DialogTitle>{title}</DialogTitle>

            <DialogContent dividers>
                <TextField
                    autoFocus fullWidth
                    label="Your answer"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            handleOk();
                        }
                    }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleOk} variant="contained">OK</Button>
            </DialogActions>
        </Dialog>
    );
}