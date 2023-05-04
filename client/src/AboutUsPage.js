import * as React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';

export default function AboutUs() {
    const item_width = 280;
    return (
        <Box
            sx={{ minWidth : 600, position: "absolute", width: '96%', paddingLeft:"2%", top:"300px",opacity:"0.95"
            }}>
            <Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5 }}>
                <div style={{width: "100%",   display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(320px, 1fr))",
                    paddingTop:50

                }}>
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width : item_width,  m:2
                        }}>
                        <Avatar
                            alt="Bojie Shen"
                            src= {require("./assets/photo/Bojie.jpg")}
                            sx={{ width: item_width, height: item_width }}
                        />
                        <Typography
                            sx={{ width :item_width,  m: 2,  textAlign: 'center'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Bojie Shen
                        </Typography>
                        <Typography
                            sx={{ width :item_width,  m: 2,  textAlign: 'center' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Ph.D. Candidate, Monash University
                        </Typography>
                    </Box>
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width : item_width,  m:2
                        }}>
                        <Avatar
                            alt="Zhe Chen"
                            src= {require("./assets/photo/zhe_chen.jpg")}
                            sx={{ width: item_width, height: item_width }}
                        />
                        <Typography
                            sx={{ width : item_width,  m: 2,  textAlign: 'center'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Zhe Chen
                        </Typography>
                        <Typography
                            sx={{ width : item_width,  m: 2,  textAlign: 'center' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Ph.D. Candidate, Monash University
                        </Typography>
                    </Box>
                    {/*<Box*/}
                    {/*    justifyContent="center"*/}
                    {/*    alignItems="center"*/}
                    {/*    sx={{ width : item_width, m:2*/}
                    {/*    }}>*/}
                    {/*    <Avatar*/}
                    {/*        alt="Jiaoyang Li"*/}
                    {/*        src= {require("./assets/photo/jiaoyang.jpeg")}*/}
                    {/*        sx={{ width: item_width, height: item_width}}*/}
                    {/*    />*/}
                    {/*    <Typography*/}
                    {/*        sx={{ width : item_width,  m: 2,  textAlign: 'center'}}*/}
                    {/*        variant="h6"*/}
                    {/*        id="tableTitle"*/}
                    {/*        component="div"*/}
                    {/*    >*/}
                    {/*        Jiaoyang Li*/}
                    {/*    </Typography>*/}
                    {/*    <Typography*/}
                    {/*        sx={{ width : item_width,  m: 2,  textAlign: 'center' }}*/}
                    {/*        variant="h6"*/}
                    {/*        id="tableTitle"*/}
                    {/*        component="div"*/}
                    {/*    >*/}
                    {/*        Associate Professor,*/}
                    {/*        Robotics Institute,*/}
                    {/*        Carnegie Mellon University*/}
                    {/*    </Typography>*/}
                    {/*</Box>*/}

                    <Box
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width : item_width, m:2
                        }}>
                        <Avatar
                            alt="Muhammad Aamir Cheema"
                            src= {require("./assets/photo/Aamir.jpeg")}
                            sx={{ width: item_width, height: item_width}}
                        />
                        <Typography
                            sx={{ width : item_width,  m: 2,  textAlign: 'center'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Muhammad Aamir Cheema
                        </Typography>
                        <Typography
                            sx={{ width : item_width,  m: 2,  textAlign: 'center' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Associate Professor,
                            Faculty of Information Technology,
                            Monash University
                        </Typography>
                    </Box>
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width : item_width, m:2
                        }}>
                        <Avatar
                            alt="Daniel Harabor"
                            src= {require("./assets/photo/daniel.jpg")}
                            sx={{ width : item_width,  height: item_width }}
                        />
                        <Typography
                            sx={{ width: item_width, m: 2,  textAlign: 'center'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Daniel Harabor
                        </Typography>
                        <Typography
                            sx={{ width: item_width, m: 2,  textAlign: 'center' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Senior Lecturer,
                            Faculty of Information Technology,
                            Monash University
                        </Typography>
                    </Box>

                    <Box
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width : item_width, m:2
                        }}>
                        <Avatar
                            alt="Peter Stuckey"
                            src= {require("./assets/photo/Peter.jpg")}
                            sx={{width : item_width, height: item_width }}
                        />

                        <Typography
                            sx={{ width : item_width,  m: 2,  textAlign: 'center'}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Peter Stuckey
                        </Typography>
                        <Typography
                            sx={{ width : item_width,  m: 2,  textAlign: 'center' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Professor,
                            Faculty of Information Technology,
                            Monash University
                        </Typography>
                    </Box>

                </div>


            </Paper>

        </Box>
    );
}