import * as React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';

export default function SystemDemo() {
    const item_width = 280;
    return (
        <Box
            sx={{ minWidth : 600, position: "absolute", width: '96%', paddingLeft:"2%", top:"300px",opacity:"0.95"
            }}>
            <Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5 }}>
                {/*<div style={{width: "100%",   display: "grid",*/}
                {/*    gridTemplateColumns: "repeat(auto-fill,minmax(320px, 1fr))",*/}
                {/*    paddingTop:50*/}

                {/*}}>*/}
                    <video style = {{paddingTop: "5%", paddingLeft: "5%",paddingRight: "5%",paddingBottom: "5%",borderRadius: 5 }} width="90%" height="600" controls>
                        <source src= {require("./assets/videos/demo_video.mp4")} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                {/*</div>*/}


            </Paper>

        </Box>
    );
}