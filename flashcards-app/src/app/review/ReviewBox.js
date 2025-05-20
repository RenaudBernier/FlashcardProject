import MainBlock from "@/app/components/tiptap/MainBlock";
import { Box, Paper } from "@mui/material";

export default function ReviewBox({ content }) {
    return (
        <Box
            sx={{
                width: "100%",
                mt: 4,                         // a little air above
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    maxWidth: 520,
                    width: "90%",
                    minHeight: 260,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <MainBlock editable={false} content={content} />
            </Paper>
        </Box>
    );
}