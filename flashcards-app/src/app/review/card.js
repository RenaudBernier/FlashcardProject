import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import MainBlock from "@/app/components/tiptap/MainBlock";

export default function ReviewCard({ topCard, flipCard, nextCard, side }) {
    // Wrapper that centres the flash‑card and gives it a fixed height so the
    // button group never shifts even when the text is long.
    const CardShell = ({ children }) => (
        <Box
            sx={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: "95%",
                    maxWidth: 560,
                    height: { xs: "75vh", md: "65vh" }, // fixed height for stability
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Paper>
        </Box>
    );

    // ────────────────────────────────────────────────────────────────
    // 0) EMPTY DECK
    // ────────────────────────────────────────────────────────────────
    if (!topCard) {
        return (
            <CardShell>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h5" fontWeight={600}>
                        🎉 Congrats — you’ve finished this deck!
                    </Typography>
                </Box>
            </CardShell>
        );
    }

    // ────────────────────────────────────────────────────────────────
    // 1) FRONT SIDE
    // ────────────────────────────────────────────────────────────────
    if (side === "front") {
        return (
            <CardShell>
                {/* CONTENT AREA: grows & scrolls if needed */}
                <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
                    <MainBlock
                        editable={false}
                        content={topCard.front}
                        key={topCard.front}
                    />
                </Box>

                {/* BUTTON FOOTER: fixed height */}
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    sx={{ pt: 2 }}
                >
                    <Button variant="contained" color="error"   onClick={() => flipCard(1)}>Forgot</Button>
                    <Button variant="contained" color="warning" onClick={() => flipCard(2)}>Hard</Button>
                    <Button variant="contained" color="primary" onClick={() => flipCard(3)}>Good</Button>
                    <Button variant="contained" color="success" onClick={() => flipCard(4)}>Easy</Button>
                </Stack>
            </CardShell>
        );
    }

    // ────────────────────────────────────────────────────────────────
    // 2) BACK SIDE
    // ────────────────────────────────────────────────────────────────
    return (
        <CardShell>
            <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
                <MainBlock
                    editable={false}
                    content={topCard.back}
                    key={topCard.back}
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={nextCard}
                >
                    Continue
                </Button>
            </Box>
        </CardShell>
    );
}
