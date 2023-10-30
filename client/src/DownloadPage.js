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
import TableContainer from '@mui/material/TableContainer';

export default function Download() {
    const item_width =300;
    return (
        <Box
            sx={{ minWidth : 600, position: "absolute", width: '96%', paddingLeft:"2%", top:"300px",opacity:"0.95"
            }}>
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
                        Download Instructions
                    </Typography>
                </Toolbar>
                <Divider sx={{ borderBottomWidth: '3px' }} />
                <Box
                    sx={{paddingTop: '15px',paddingLeft :'35px',paddingRight :'35px',paddingBottom :'35px'
                    }}>
                    <Typography
                        sx={{ fontSize: 16, flex: '1 1 100%'}}
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                        This page contains download links to all best-known results,
                        and all corresponding benchmark problem instances,
                        currently submitted to the MAPF Tracker. Results and benchmarks are offered as separate downloads,
                        grouped by map, and in zip format.
                    </Typography>

                    <ul>
                        <Typography
                            sx={{ fontSize: 16, flex: '1 1 100%'}}
                            variant="h6"
                            component="li"
                            gutterBottom
                        >
                            To download results, please visit <a href="http://tracker.pathfinding.ai/quickDownload/results/">here</a>.
                        </Typography>
                        <Typography
                            sx={{ fontSize: 16, flex: '1 1 100%'}}
                            variant="h6"
                            component="li"
                            gutterBottom
                        >
                            To download benchmarks, please visit <a href="http://tracker.pathfinding.ai/quickDownload/benchmarks/">here</a>.
                        </Typography>
                    </ul>
                </Box>
            </Paper>
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
                        Results File Format (CSV)
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
                        sx={{ fontSize: 16, flex: '1 1 100%',paddingBottom :'20px' }}
                        component="div"
                        gutterBottom
                    >
                        Each results archive (zip file) contains a single file,
                        with comma separated values,
                        which describes best known results for a single grid map.
                        The first line of the file is a header, which gives column names.
                        Each subsequent line gives the corresponding values for a single problem instance.
                        Where a best-known solution is available, we also give the corresponding plan.
                        Further details about the solution plan format are available <a href="http://tracker.pathfinding.ai/contributes">here</a>.
                    </Typography>
                    <Typography
                        sx={{ fontSize: 16,flex: '1 1 100%'}}
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
                    <TableContainer sx = {{width : "100%"}}>
                        <Table sx={{ minWidth: 600, width : "100%"}}
                               style={{ tableLayout: "auto" }}>
                            <colgroup>
                                <col style={{minWidth: "50px"}} width="10%" />
                                <col style={{minWidth: "50px"}} width="10%" />
                                <col style={{minWidth: "50px"}} width="10%" />
                                <col style={{minWidth: "50px"}} width="10%" />
                                <col style={{minWidth: "50px"}} width="10%" />
                                <col style={{minWidth: "50px"}} width="10%" />
                                <col style={{minWidth: "200px"}} width="40%" />
                            </colgroup>
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
                    </TableContainer>
                </Box>
            </Paper>

            {/*<Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5}}>*/}
            {/*    <Toolbar*/}
            {/*        sx={{*/}
            {/*            pl: { sm: 2 },*/}
            {/*            pr: { xs: 1, sm: 1 }*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Typography*/}
            {/*            sx={{ flex: '1 1 100%',paddingLeft :'10px' }}*/}
            {/*            variant="h6"*/}
            {/*            component="div"*/}
            {/*        >*/}
            {/*           Report Issues or Bugs*/}
            {/*        </Typography>*/}
            {/*    </Toolbar>*/}
            {/*    <Divider sx={{ borderBottomWidth: '3px' }} />*/}
            {/*    <Box*/}
            {/*        sx={{paddingTop: '15px',paddingLeft :'35px',paddingRight :'35px',paddingBottom :'35px'*/}
            {/*        }}>*/}
            {/*        <Typography*/}
            {/*            sx={{ fontSize: 16, flex: '1 1 100%' }}*/}
            {/*            component="div"*/}
            {/*            gutterBottom*/}
            {/*        >*/}
            {/*            To report an issue or bug, please submit it as an issue on our <a href="https://github.com/bshen95/MAPF-benchmark-web">Github</a>.*/}
            {/*        </Typography>*/}
            {/*    </Box>*/}
            {/*</Paper>*/}

            {/*<textarea ref={textareaRef} className="hidden-textarea" readOnly value={bibtexEntry} />*/}



            {/*</Paper>*/}

        </Box>
    );
}