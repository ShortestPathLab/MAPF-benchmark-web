import * as React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import './BibTex.css'; // Import the CSS file for styling
import Divider from '@mui/material/Divider';

export default function AboutUs() {
    const item_width =300;
    return (
        <Box
            sx={{ minWidth : 600, position: "absolute", width: '96%', paddingLeft:"2%", top:"300px",opacity:"0.95"
            }}>
            <Paper elevation={12} sx={{ width: '100%', mt: 2, mb: 2, borderRadius: 5 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 }
                    }}
                >
                    <Typography
                        sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                        variant="h6"
                        component="div"
                    >
                        About the Website
                    </Typography>
                </Toolbar>
                <Divider sx={{ borderBottomWidth: '3px' }} />
                <Typography
                    sx={{fontSize: 16, flex: '1 1 100%',paddingTop:'15px', paddingLeft :'35px',paddingRight :'35px',paddingBottom :'35px' }}
                    variant="h6"

                    component="div"
                >
                    Multi-Agent Path Finding (MAPF) is a combinatorial problem that asks us to compute collision-free paths for teams of
                    cooperative agents.
                    Many works appear on this topic each year, and a large number of substantial advancements and improvements have been reported. Yet measuring overall progress in
                    MAPF is difficult:
                    there are many potential competitors, and the computational burden for comprehensive experimentation is prohibitively large.
                    Moreover, detailed data from past experimentation is usually unavailable.
                    This online platform introduces a set of methodological and visualisation tools which can help the community establish clear indicators for
                    state-of-the-art MAPF performance and which can facilitate large-scale comparisons between MAPF solvers.
                    Our objectives are to lower the barrier of entry for new
                    researchers and to further promote the study of MAPF.
                </Typography>

            </Paper>
                <Paper elevation={12} sx={{ width: '100%', mt: 2, mb: 2,borderRadius: 5}}>
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 }
                        }}
                    >
                        <Typography
                            sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                            variant="h6"
                            component="div"
                        >
                            Advisor Board
                        </Typography>
                    </Toolbar>
                    <Divider sx={{ borderBottomWidth: '3px' }} />
                    {/*<Divider variant="middle" style={{ margin: '1rem 0' }} />*/}
                    <div style={{width: "100%",   display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(320px, 1fr))",
                        paddingTop:'20px'

                    }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar
                                    alt="Daniel Harabor"
                                    src= {require("./assets/photo/daniel.jpg")}
                                    sx={{ width : item_width-100,  height: item_width-100 }}
                                />
                                <Typography
                                    sx={{ fontSize: 16, width: item_width, m: 2,  textAlign: 'center'}}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Daniel Harabor (Lab Leader)
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 16, width: item_width, mb: 2,  textAlign: 'center' }}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Associate Professor,
                                    Faculty of Information Technology,
                                    Monash University
                                </Typography>
                            </Box>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar
                                    alt="Peter Stuckey"
                                    src= {require("./assets/photo/Peter.jpg")}
                                    sx={{width : item_width-100, height: item_width-100 }}
                                />

                                <Typography
                                    sx={{ fontSize: 16,width : item_width,  m: 2,  textAlign: 'center'}}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Peter Stuckey
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 16, width : item_width,  mb: 2, textAlign: 'center' }}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Professor,
                                    Faculty of Information Technology,
                                    Monash University
                                </Typography>
                            </Box>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar
                                    alt="Muhammad Aamir Cheema"
                                    src= {require("./assets/photo/Aamir.jpeg")}
                                    sx={{ width: item_width-100, height: item_width-100}}
                                />
                                <Typography
                                    sx={{ fontSize: 16,width : item_width,  m: 2,  textAlign: 'center'}}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Muhammad Aamir Cheema
                                </Typography>
                                <Typography
                                    sx={{fontSize: 16, width : item_width, mb: 2,   textAlign: 'center' }}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Associate Professor,
                                    Faculty of Information Technology,
                                    Monash University
                                </Typography>
                            </Box>
                        </div>
                    </div>
                </Paper>

                <Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5}}>
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 }
                        }}
                    >
                        <Typography
                            sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                            variant="h6"
                            component="div"
                        >
                            Developer Board
                        </Typography>
                    </Toolbar>
                    <Divider sx={{ borderBottomWidth: '3px' }} />
                    <div style={{width: "100%",   display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(320px, 1fr))",
                        paddingTop:20

                    }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar alt="Bojie Shen" src= {require("./assets/photo/Bojie.jpg")}
                                        sx={{width: item_width-100, height: item_width-100 }}
                                />
                                <Typography
                                    sx={{ fontSize: 16, width :item_width,  m: 2,  textAlign: 'center'}}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Bojie Shen
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 16, width :item_width, mb: 2, textAlign: 'center' }}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Ph.D. Candidate, Monash University
                                </Typography>
                            </Box>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar
                                    alt="Zhe Chen"
                                    src= {require("./assets/photo/zhe_chen.jpg")}
                                    sx={{ width: item_width-100, height: item_width-100 }}
                                />
                                <Typography
                                    sx={{ fontSize: 16,width : item_width,  m: 2,  textAlign: 'center'}}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Zhe Chen
                                </Typography>
                                <Typography
                                    sx={{fontSize: 16, width : item_width, mb: 2, textAlign: 'center' }}
                                    id="tableTitle"
                                    component="div"
                                >
                                    Ph.D. Candidate, Monash University
                                </Typography>
                            </Box>
                        </div>
                    </div>
                </Paper>
            {/*<textarea ref={textareaRef} className="hidden-textarea" readOnly value={bibtexEntry} />*/}



            {/*</Paper>*/}

        </Box>
    );
}