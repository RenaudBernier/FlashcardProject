import Image from "next/image";
import {Container, Typography, Drawer, Box} from "@mui/material"
import Sidebar from "./components/sidebar.js"
import LoginCheck from "@/app/login/logincheck";
import MainBlock from "./components/tiptap/MainBlock";



export default async function Home() {


    return (
    <Box>
        <LoginCheck></LoginCheck>
        <Drawer variant="permanent">
            <Sidebar>
            </Sidebar>
        </Drawer>
        <Box sx={{ ml: '240px', p: 2 }}>
            <MainBlock />
        </Box>
    </Box>
    );
}
