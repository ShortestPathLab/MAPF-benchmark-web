import * as React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Toolbar from '@mui/material/Toolbar';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Divider from '@mui/material/Divider';
export default function Contribute() {
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
                        Submission File Format (csv)
                    </Typography>
                </Toolbar>
                <Divider sx={{ borderBottomWidth: '3px' }} />
                <Box
                    sx={{paddingTop: '15px', paddingLeft :'35px',paddingRight :'35px',paddingBottom :'35px'
                    }}>
                {/*<Typography*/}
                {/*    sx={{ flex: '1 1 100%' }}*/}
                {/*    variant="h6"*/}
                {/*    component="div"*/}
                {/*    gutterBottom*/}
                {/*>*/}
                {/*    File type:*/}
                {/*</Typography>*/}
                {/*<Typography*/}
                {/*    sx={{ flex: '1 1 100%'}}*/}
                {/*    variant="h7"*/}
                {/*    component="div"*/}
                {/*    gutterBottom*/}
                {/*>*/}
                {/*    We support uploading .csv file*/}
                {/*</Typography>*/}
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    component="div"
                    gutterBottom
                >
                    File header:
                </Typography>
                <Typography
                    sx={{ flex: '1 1 100%'}}
                    variant="h7"
                    component="div"
                    gutterBottom
                >
                    map_name, scen_type, type_id, agents, lower_cost, solution_cost, solution_plan
                </Typography>
                <Typography
                    sx={{ flex: '1 1 100%'}}
                    variant="h6"
                    component="div"
                    gutterBottom
                >
                    Solution Plan Format:
                </Typography>
                <Typography
                    sx={{ flex: '1 1 100%'}}
                    variant="h7"
                    component="div"
                    gutterBottom
                >
                    For each agent, we use a motion string to represent the path, where the symbol 'u', 'd', 'l' and 'r' represents moving up, down, left and right respectively,
                    and 'w' represents waiting at its current location (eg., a path [(0,0) -> (0,1) -> (1,1) -> (2,1) -> (2,0) -> (2,0) -> (1,0)] is converted to a motion string  "urrdwl").
                    We use "\n" to separate the paths between different agents.
                </Typography>
                <Typography
                    sx={{ flex: '1 1 100%'}}
                    variant="h6"
                    component="div"
                    gutterBottom
                >
                    Example File:
                </Typography>

                {/*<Typography*/}
                {/*    sx={{ flex: '1 1 100%' ,paddingLeft :'10px'}}*/}
                {/*    variant="h6"*/}
                {/*    component="div"*/}
                {/*    gutterBottom*/}
                {/*>*/}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                map_name
                            </TableCell>
                            <TableCell>
                                scen_type
                            </TableCell>
                            <TableCell>
                                type_id
                            </TableCell>
                            <TableCell>
                                agents
                            </TableCell>
                            <TableCell>
                                lower_cost
                            </TableCell>
                            <TableCell>
                                solution_cost
                            </TableCell>
                            <TableCell>
                                solution_plan
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                empty-32-32
                            </TableCell>
                            <TableCell>
                                even
                            </TableCell>
                            <TableCell>
                                1
                            </TableCell>
                            <TableCell>
                                1
                            </TableCell>
                            <TableCell>
                                14
                            </TableCell>
                            <TableCell>
                                14
                            </TableCell>
                            <TableCell>
                                urrurrruuurrrr
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                empty-32-32
                            </TableCell>
                            <TableCell>
                                even
                            </TableCell>
                            <TableCell>
                                1
                            </TableCell>
                            <TableCell>
                                2
                            </TableCell>
                            <TableCell>
                                38
                            </TableCell>
                            <TableCell>
                                38
                            </TableCell>
                            <TableCell>
                                urrurrruuurrrr<br />
                                ddrddrrrddrddrdrrdrddddd
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                empty-32-32
                            </TableCell>
                            <TableCell>
                                even
                            </TableCell>
                            <TableCell>
                                1
                            </TableCell>
                            <TableCell>
                                3
                            </TableCell>
                            <TableCell>
                                50
                            </TableCell>
                            <TableCell>
                                50
                            </TableCell>
                            <TableCell>
                                urrurrruuurrrr <br />
                                ddrddrrrddrddrdrrdrddddd<br />
                                dddddddddddd
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
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
                        How to Submit
                    </Typography>
                </Toolbar>
                <Divider sx={{ borderBottomWidth: '3px' }} />
                <Box
                    sx={{paddingTop: '15px',paddingLeft :'35px',paddingRight :'35px',paddingBottom :'35px'
                    }}>
                    <Typography
                        sx={{ flex: '1 1 100%'}}
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                        To contribute and submit new results:
                    </Typography>
                    <ul>
                        <Typography
                            sx={{ flex: '1 1 100%'}}
                            variant="h6"
                            component="li"
                            gutterBottom
                        >
                            If you are interesting in submitted results to a particular map:
                        </Typography>
                        <ul>
                            <Typography
                                sx={{ flex: '1 1 100%' }}
                                variant="h6"
                                component="li"
                                gutterBottom
                            >
                                Please contact one of organisers, we will create an account for you to upload by yourself.
                            </Typography>
                        </ul>
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                            component="li"
                            gutterBottom
                        >
                            If you are interesting in submitted results for all map:
                        </Typography>
                        <ul>
                            <Typography
                                sx={{ flex: '1 1 100%' }}
                                variant="h6"
                                component="li"
                                gutterBottom
                            >
                                Due to large size of submission files, please contact one of organisers, we will get in touch with you.
                            </Typography>
                        </ul>
                    </ul>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                        Current Contactor:
                    </Typography>
                    <ul>
                        <Typography
                            sx={{ flex: '1 1 100%'}}
                            variant="h6"
                            component="li"
                            gutterBottom
                        >
                            For submission, please contact <strong>Bojie.Shen@monash.edu</strong> or <strong>Zhe.Chen@monash.edu</strong>.
                        </Typography>

                    </ul>
                </Box>
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
                       Report Issues or Bugs
                    </Typography>
                </Toolbar>
                <Divider sx={{ borderBottomWidth: '3px' }} />
                <Box
                    sx={{paddingTop: '15px',paddingLeft :'35px',paddingRight :'35px',paddingBottom :'35px'
                    }}>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                        To report an issue or bug, please submit an issue to our <a href="https://github.com/bshen95/MAPF-benchmark-web">Github</a>.
                    </Typography>
                </Box>
            </Paper>
            {/*<textarea ref={textareaRef} className="hidden-textarea" readOnly value={bibtexEntry} />*/}



            {/*</Paper>*/}

        </Box>
    );
}