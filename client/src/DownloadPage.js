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
                        To download the benchmark scenarios, please visit  <a href="http://tracker.pathfinding.ai/quickDownload/benchmark">here</a>:
                    </Typography>

                    <ul>
                        <Typography
                            sx={{ fontSize: 16, flex: '1 1 100%'}}
                            variant="h6"
                            component="li"
                            gutterBottom
                        >
                            Each [map name].zip contains all scenarios files utilized for evaluating the solvers within this web platform.
                        </Typography>
                        <Typography
                            sx={{ fontSize: 16, flex: '1 1 100%'}}
                            variant="h6"
                            component="li"
                            gutterBottom
                        >
                           The map file and the format of the scenarios files can be found in the <a href="https://movingai.com/benchmarks/mapf/index.html">MovingAI</a> repository.
                        </Typography>
                    </ul>
                    <Typography
                        sx={{ fontSize: 16, flex: '1 1 100%'}}
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                        To download the results, please visit <a href="http://tracker.pathfinding.ai/quickDownload/result">here</a>:
                    </Typography>
                    <ul>
                        <Typography
                            sx={{ fontSize: 16, flex: '1 1 100%'}}
                            variant="h6"
                            component="li"
                            gutterBottom
                        >
                            Each [map name].zip contains a csv file which records the best known results that reported by all solvers.
                        </Typography>
                        <Typography
                            sx={{ fontSize: 16, flex: '1 1 100%'}}
                            variant="h6"
                            component="li"
                            gutterBottom
                        >
                            The format of the result files aligns with the submission file format, as illustrated below:
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
                        sx={{ fontSize: 16, flex: '1 1 100%' }}
                        component="div"
                        gutterBottom
                    >
                        File header:
                    </Typography>
                    <Typography
                        sx={{ fontSize: 16,paddingLeft :'15px',paddingBottom :'15px',flex: '1 1 100%'}}
                        component="div"
                        gutterBottom
                    >
                        map_name, scen_type, type_id, agents, lower_cost, solution_cost, solution_plan
                    </Typography>
                    <Typography
                        sx={{ fontSize: 16, flex: '1 1 100%'}}
                        component="div"
                        gutterBottom
                    >
                        Solution Plan Format:
                    </Typography>
                    <Typography
                        sx={{fontSize: 16, paddingLeft :'15px',paddingBottom :'15px', flex: '1 1 100%'}}
                        component="div"
                        gutterBottom
                    >
                        For each agent, we use a motion string to represent the path, where the symbol 'u', 'd', 'l' and 'r' represents moving up, down, left and right respectively,
                        and 'w' represents waiting at its current location (eg., a path [(0,0) -> (0,1) -> (1,1) -> (2,1) -> (2,0) -> (2,0) -> (1,0)] is converted to a motion string  "urrdwl").
                        We use "\n" to separate the paths between different agents.
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