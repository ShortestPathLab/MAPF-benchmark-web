import * as React from 'react';
import PropTypes from 'prop-types';
import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {useLocation} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DropzoneDialog } from "mui-file-dropzone";
import HelpIcon from '@mui/icons-material/Help';
import Papa from "papaparse";
import {APIConfig} from "./config";

function descendingComparator(a, b, orderBy) {
    if (orderBy === 'map_size'){
        var string_a = a[orderBy].split("x");
        var string_b = b[orderBy].split("x");
        var value_a =  parseInt(string_a[0]) * parseInt(string_a[1])
        var value_b =  parseInt(string_b[0]) * parseInt(string_b[1])
        if( value_b < value_a){
            return -1;
        }
        if( value_b > value_a){
            return 1;
        }
        return 0;
    }else{
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'map_name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'img',
        numeric: false,
        disablePadding: false,
        label: 'Image',
        sortable: false,
        alignment: 'center'
    },
    {
        id: 'map_size',
        numeric: false,
        disablePadding: false,
        label: 'Size',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'map_type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'scens',
        numeric: true,
        disablePadding: false,
        label: '#Scenarios',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'instances',
        numeric: true,
        disablePadding: false,
        label: '#Instances',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'best_lower',
        numeric: true,
        disablePadding: false,
        label: '#Best Lower-bound',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'best_solution',
        numeric: true,
        disablePadding: false,
        label: '#Best Solutions',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'closed',
        numeric: true,
        disablePadding: false,
        label: '#Instances Closed',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'solved',
        numeric: true,
        disablePadding: false,
        label: '#Instances Solved',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'submit',
        numeric: false,
        disablePadding: false,
        label: 'Submit',
        sortable: false,
        alignment: 'center'
    },
];

// function checkSortable(head, order ){
//     if(headCell.sortable){
//         return  order === 'desc' ? 'sorted descending' : 'sorted ascending'
//     }else{
//         return 'disableSortBy
//     }
// }

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead sx = {{backgroundColor: "black" }}>
            <TableRow >
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignment}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx = {{backgroundColor: "black" , color : "white",fontWeight: 'bold'}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={ createSortHandler(headCell.id) }
                            hideSortIcon={!headCell.sortable}
                            sx = {
                                {
                                    '&.MuiTableSortLabel-root': {
                                        color: 'white',
                                        pointerEvents: headCell.sortable ?  "auto" : "none"
                                    },
                                    '&.MuiTableSortLabel-root:hover': {
                                        color: 'white',
                                    },
                                    '&.Mui-active': {
                                        color: 'white',
                                    },
                                    '& .MuiTableSortLabel-icon': {
                                        color: 'white !important',
                                    },
                                }
                            }
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
};



const refreshLeader = (callback,algo_id)=>{
    const requestOptions = {
        method: 'GET',
        headers: { 'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken }
    };

    // console.log(JSON.parse(localStorage.getItem('user')).id)
    fetch(APIConfig.apiUrl+'/user/getMapSubmittedInfo/'+algo_id, requestOptions )
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(err => console.error(err));

}


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center',        paddingLeft :'10px' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
    height: 20,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function parseScen(text,num_of_agents, solution_string) {
    var lines = text.trim().split(/\r?\n/);
    var agent_state = Array(num_of_agents)
        .fill()
        .map(() =>
            new Array(1).fill().map(() => ({
                x: 0,
                y: 0
            }))
        );

    for(var i = 1; i < num_of_agents+1; i++){
        var entries  =  lines[i].split('\t');
        agent_state[i-1][0].x = parseInt(entries[4]);
        agent_state[i-1][0].y = parseInt(entries[5]);
    }
    var solution = solution_string.trim().split('\n');
    for (var i = 0; i < solution.length; i++){
        var agent_solution = solution[i];
        var previous_location =  agent_state[i][0];
        for (var j = 0; j < agent_solution.length; j++ ){
            var next_location = { x: previous_location.x, y: previous_location.y};
            if( agent_solution[j] === 'u'){
                next_location.y =  next_location.y + 1;
            }
            if( agent_solution[j] === 'd'){
                next_location.y = next_location.y - 1;
            }
            if( agent_solution[j] === 'l'){
                next_location.x = next_location.x - 1;
            }
            if( agent_solution[j] === 'r'){
                next_location.x = next_location.x + 1;
            }
            agent_state[i].push(next_location);
            previous_location = next_location;
        }
    }
    console.log('finish scenario');
    return agent_state;
}

export default function UserMapPage() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('map_type');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    const location = useLocation();
    const [rows, setRows] = React.useState([]);
    const [searched, setSearched] = React.useState("");
    const [files, setFiles] = React.useState([]);
    const [scrollDetail, setScrollDetail] = React.useState('paper');
    const [openUpload, setOpenUpload] = React.useState(false);
    const [openExplanation, setOpenExplanation] = React.useState(false);
    const [openSubmit, setOpenSubmit] = React.useState(false);
    const [selectedRow, setSelectedRow,] = React.useState(null);
    const [validationText, setValidationText] = React.useState("");
    const [submissionText, setSubmissionText] = React.useState("");
    const [submissionFeedbackText, setSubmissionFeedbackText] = React.useState("");
    const [finalizingText, setFinalizingText] = React.useState("");
    const [activeButton,setActiveButton] = React.useState(false);
    const [submissionProgress,setSubmissionProgress] = React.useState(0);
    const [showProgress,setShowProgress] = React.useState(false);



    const handleSave = (incommingFiles) => {
        // console.log("incomming files", incommingFiles);
        setValidationText('');
        setFiles(incommingFiles);
        setOpenSubmit(true);
        setActiveButton(false);
    };

    function parseMap(text) {
        var lines = text.trim().split(/\r?\n/);
        var height = parseInt(lines[1].split(" ")[1]);
        var width = parseInt(lines[2].split(" ")[1]);
        var map = Array(height)
            .fill()
            .map(() =>
                new Array(width).fill().map(() => false)
            );
        lines.slice(4).forEach((line, i) => {
            [...line].forEach((char, j) => {
                if (char === "@" || char === "T") {
                    map[i][j] = true;
                }
            });
        });
        console.log("finish loading")
        return map;
    }

    const load_map = async function () {
        var map_file = selectedRow.map_name + ".map"
        var map_path = require("./assets/maps/" + map_file);
        console.log( selectedRow.map_name)
        var map_text = await fetch(map_path).then(
            (r) => r.text()
        ).catch(err => console.error(err));
        return parseMap(map_text);
    }

    const load_scen = async function (scen_string,agent, solution_string) {
        var scen = selectedRow.map_name + "-"+scen_string + ".scen";
        var scen_path = require("./assets/scens/" + scen);
        var  scen_text = await fetch(scen_path).then(
            (r) => r.text()
        ).catch(err => console.error(err));
        return parseScen(scen_text, agent, solution_string);
    }

    const validate_path = function(solution, map){
        var height = map.length;
        var width = map[0].length;
        for (var i = 0; i < solution.length; i ++){
            for(var t = 1; t < solution[i]; t ++) {
                if(solution[i][t].x >width) {
                    return false;
                }
                if (solution[i][t].y > height) {
                    return false;
                }
                if( map[solution[i][t].y][solution[i][t].x]){
                    //obstacle case;
                    return false;
                }
                if(Math.abs(solution[i][t].x - solution[i][t-1].x) + Math.abs(solution[i][t].y - solution[i][t-1].y) > 1){
                    // invalid move;
                    return false;
                }
            }


            for( var j = 0; j < solution.length; j ++){
                if(arraysEqual(solution[i], solution[j])){
                    continue;
                }
                var a1  = solution[i].length <= solution[j].length ? solution[i] : solution[j];
                var a2 = solution[i].length <= solution[j].length ? solution[j] : solution[i];
                var t  = 1;
                for (; t < a1.length; t++)
                {
                    if (a1[t] === a2[t]) // vertex conflict
                    {
                        return false;
                    }
                    else if (a1[t] === a2[t - 1] && a1[t - 1] === a2[t]) // edge conflict
                    {
                        return false;
                    }
                }
                var target = a1[a1.length -1];
                for (; t < a2.length; t++)
                {
                    if (a2[t] === target)  // target conflict
                    {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    const validate_file = function() {
        return new Promise(async function (complete, error) {
            var map = await load_map();
            var current_display_string = "Start validation\n";
            setValidationText(current_display_string);
            var foundError = false;
            var counter = 0;
            var hearder = ["map_name", "scen_type", "type_id", "agents", "lower_cost", "solution_cost", "solution_plan"]
            Papa.parse(files[0], {
                step: async function (results, parser) {
                    parser.pause()
                    current_display_string = "Start validation\n".concat("Validating row ", counter, "\n");
                    setValidationText(current_display_string);
                    if (counter === 0) {
                        if (!arraysEqual(hearder, results.data)) {
                            foundError = true;
                            current_display_string = current_display_string.concat("Header not matched\n");
                            setValidationText(current_display_string)
                            parser.abort();
                        }
                    } else {
                        if (results.data.length !== 7) {
                            foundError = true;
                            current_display_string = current_display_string.concat("Row: ", counter, " Expected 7 entries, some entries are missing\n");
                            setValidationText(current_display_string)
                            parser.abort();
                        } else {
                            if (results.data[0] !== selectedRow.map_name) {
                                foundError = true;
                                current_display_string = current_display_string.concat("Row: ", counter, " Map name not match\n");
                                setValidationText(current_display_string)
                                parser.abort();
                            }
                            if (results.data[1] !== 'even' && results.data[1] !== 'random') {
                                foundError = true;
                                current_display_string = current_display_string.concat("Row: ", counter, " Type must equal to even or random\n");
                                setValidationText(current_display_string)
                                parser.abort();
                            }
                            if(results.data[2] === ""){
                                foundError = true;
                                current_display_string = current_display_string.concat("Row: ", counter, " Scen ID must not be empty\n");
                                setValidationText(current_display_string)
                                parser.abort();
                            }else{
                                if (parseInt(results.data[2]) > 25) {
                                    foundError = true;
                                    current_display_string = current_display_string.concat("Row: ", counter, " Scen ID must less than 25\n");
                                    setValidationText(current_display_string)
                                    parser.abort();
                                }
                            }
                            if(results.data[3] === ""){
                                foundError = true;
                                current_display_string = current_display_string.concat("Row: ", counter, " Number of agents must not be empty\n");
                                setValidationText(current_display_string)
                                parser.abort();
                            }else{
                                if (parseInt(results.data[3]) <= 0) {
                                    foundError = true;
                                    current_display_string = current_display_string.concat("Row: ", counter, " Number of agents must larger than 0\n");
                                    setValidationText(current_display_string)
                                    parser.abort();
                                }
                                if (parseInt(results.data[3]) > selectedRow.instances) {
                                    foundError = true;
                                    current_display_string = current_display_string.concat("Row: ", counter, " Number of agents must less than ", selectedRow.instances, "\n");
                                    setValidationText(current_display_string)
                                    parser.abort();
                                }
                            }
                            if (results.data[4] !== '' && results.data[5] !== '') {
                                if (parseInt(results.data[4]) > parseInt(results.data[5])) {
                                    foundError = true;
                                    current_display_string = current_display_string.concat("Row: ", counter, " Lower bound must less than soution cost\n");
                                    setValidationText(current_display_string)
                                    parser.abort();
                                }
                            }
                            if(results.data[5] !== '' && results.data[6] === '' ){
                                foundError = true;
                                current_display_string = current_display_string.concat("Row: ", counter, " solution plan is missing\n");
                                setValidationText(current_display_string)
                                parser.abort();
                            }
                            if(results.data[5] === '' && results.data[6] !== '' ){
                                foundError = true;
                                current_display_string = current_display_string.concat("Row: ", counter, " solution cost is missing\n");
                                setValidationText(current_display_string)
                                parser.abort();
                            }
                            if(results.data[5] !== '' && results.data[6] !== '' ) {
                                if (results.data[6].length - parseInt(results.data[3]) + 1 !== parseInt(results.data[5])) {
                                    foundError = true;
                                    current_display_string = current_display_string.concat("Row: ", counter, " Solution cost not match with the solution plan\n");
                                    setValidationText(current_display_string)
                                    parser.abort();
                                }
                                var parsed_solution = await load_scen(results.data[1] + "-" + results.data[2], parseInt(results.data[3]), results.data[6]);
                                // console.log(parsed_solution);
                                if (!validate_path(parsed_solution, map)) {
                                    foundError = true;
                                    current_display_string = current_display_string.concat("Row: ", counter, " Solution plan invalid\n");
                                    setValidationText(current_display_string)
                                    parser.abort();
                                }
                                // await new Promise(r => setTimeout(r, 2000));
                            }
                            //check path here;
                            // console.log(results.data[6])
                        }
                    }
                    counter++;
                    parser.resume()
                },
                error: function (error) {
                    // console.log(error);
                    setValidationText(current_display_string.concat(error));
                    foundError = true;
                    // return {complete(!foundError),counter};
                    // return [complete(!foundError), counter];
                    return complete({pass: !foundError,row_number: counter - 1});
                },
                complete: function () {
                    if (foundError === false) {
                        current_display_string = current_display_string.concat("Finished validation, total number of row: ", counter-1);
                        setValidationText(current_display_string)
                    } else {
                        current_display_string = current_display_string.concat("Validation fail, please resubmit your csv");
                        setValidationText(current_display_string)
                    }
                    return complete({pass: !foundError,row_number: counter - 1});
                }
            });
        });
    };

    const upload_file = function(row_number) {
        return new Promise(async function (complete, error) {
            // var validation_string = "Start validation\n";
            setShowProgress(true);
            setSubmissionText("Start submission\n");

            var foundError = false;
            var counter = 0;
            var chunk_array = []

            Papa.parse(files[0], {
                header: true,
                step: async function (results, parser) {
                    parser.pause()
                    chunk_array.push(results.data);
                    if (chunk_array.length === 100 || counter + 1 === row_number) {
                        // upload
                        const requestOptions = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken
                            },
                            body: JSON.stringify(
                                chunk_array
                            )
                        };
                        // console.log(JSON.parse(localStorage.getItem('user')).id)
                        await fetch(APIConfig.apiUrl+'/user/submitChunkResults/' + location.state.algo_id, requestOptions)
                            .then(response => {
                                if (response.status !== 200) {
                                    response.json().then((ms) => {
                                            setSubmissionFeedbackText(ms.message, "\n");
                                        }
                                    )
                                    foundError = true;
                                    parser.abort();
                                } else {
                                    setSubmissionProgress((counter+1)/ row_number);
                                }
                            })
                            .catch(err => console.log(err));
                        // clean;
                        chunk_array = [];
                    }
                    counter++;
                    parser.resume()
                },
                complete: function () {
                    console.log(counter)

                    if (foundError === false) {
                        setSubmissionFeedbackText("Finished submission, total number of row: ".concat("", counter));
                    } else {
                        setSubmissionFeedbackText("Submission failed, please resubmit your csv");
                    }
                    return complete(!foundError);
                }
            });
        });
    };



    const submitted_file = async function () {
        // validate_file().then((result)=>console.log("validation results", result))
        setShowProgress(false);
        setSubmissionProgress(0);
        setValidationText('');
        setSubmissionText('');
        setSubmissionFeedbackText('')
        setFinalizingText('')
        setActiveButton(false);
        var result = await validate_file();
        await new Promise(r => setTimeout(r, 1000));
        if(result.pass){
            await upload_file(result.row_number);
            await new Promise(r => setTimeout(r, 1000));
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken
                },
                body: JSON.stringify(
                    {map_name: selectedRow.map_name}
                )
            };
            var displayText = "Finalizing submission ...";
            setFinalizingText(displayText);
            // console.log(JSON.parse(localStorage.getItem('user')).id)
            await fetch(APIConfig.apiUrl+'/user/updateProgress/' + location.state.algo_id, requestOptions)
                .then(response => {
                    if (response.status !== 200) {
                        response.json().then((ms) => {
                                displayText = displayText.concat("\n", ms.message, "\n");
                                setFinalizingText(displayText);
                            }
                        )
                    }else{
                        displayText = displayText.concat(" done \n");
                        setFinalizingText(displayText);
                    }
                })
                .catch(err => console.log(err));
        }
        setActiveButton(true);
        refreshLeader((data)=>{
            setData(data);
            setRows(data);
        },location.state.algo_id);
        console.log("validtion result", result)
        // console.log("validtion result", first)
        // console.log("validtion result", second)
        // var result =  await validate_file();
    }


    React.useEffect(() => {
        if(files.length > 0) {
            submitted_file();
        }

    }, [files]);

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.map_name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
        setSearched(searchedVal);
    };

    const cancelSearch = (searchedVal) => {
        setSearched("");
        requestSearch("");
    };





    React.useEffect(() => {
        refreshLeader((data)=>{
            setData(data);
            setRows(data);
        },location.state.algo_id);

        const interval = setInterval(() => {
            refreshLeader((data)=>{
                setData(data);
                setRows(data);
            },location.state.algo_id)
        }, 1200000);
        return () => clearInterval(interval);
    }, []);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const dialogTitle = () => (
        <>
            <span>Upload file</span>
            <IconButton
                style={{left: '125px', top: '12px', position: 'absolute'}}
                onClick={() => setOpenExplanation(true)}>
                <HelpIcon />
            </IconButton>
            <IconButton
                style={{right: '12px', top: '8px', position: 'absolute'}}
                onClick={() => setOpenUpload(false)}>
                <CloseIcon />
            </IconButton>
        </>
    );

    return (
        <Box
            sx={{ minWidth : 600, position: "absolute", width: '96%', paddingLeft:"2%", top:"300px",opacity:"0.95"
            }}>
            <Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5}}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 }
                    }}
                >
                    <IconButton
                        size ='medium'
                        onClick={() => {setDense(!dense)}
                        } >
                        { dense ? <ZoomOutMapIcon fontSize='medium'/>:<ZoomInMapIcon fontSize='medium'/> }
                    </IconButton>

                    <Typography
                        sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                        variant="h6"
                        component="div"
                    >
                        {location.state.algo_name} Submissions
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        onChange={(searchVal) => requestSearch(searchVal.target.value)}
                        variant="outlined"
                        placeholder="Name"
                        size="small"
                        value={searched}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searched ==="" ? null :
                                        <IconButton onClick={(searchVal) => cancelSearch(searchVal.target.value)} >
                                            <CancelIcon/>
                                        </IconButton>}
                                </InputAdornment>
                            )
                        }}
                    />
                </Toolbar>
                <TableContainer sx = {{width : "100%"}}>
                    <Table
                        // frozen table set max-content
                        sx={{ minWidth: 600, width : "100%"}}
                        size={dense ? 'small' : 'medium'}
                        style={{ tableLayout: "auto" }}
                    >
                        <colgroup>
                            <col style={{minWidth: "160px"}} width="10%" />
                            <col style={{minWidth: "100px"}} width="10%" />
                            <col style={{minWidth: "100px"}} width="10%" />
                            <col style={{minWidth: "100px"}} width="5%" />
                            <col style={{minWidth: "100px"}} width="5%" />
                            <col style={{minWidth: "100px"}} width="10%" />
                            <col style={{minWidth: "200px"}} width="12%" />
                            <col style={{minWidth: "200px"}} width="12%" />
                            <col style={{minWidth: "200px"}} width="12%" />
                            <col style={{minWidth: "200px"}} width="12%" />
                            <col style={{minWidth: "100px"}} width="5%" />
                        </colgroup>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.map_name}
                                        >
                                            <TableCell
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                                align = "left"
                                            >
                                                {row.map_name}
                                            </TableCell>
                                            <TableCell align="center" >
                                                <img
                                                    // src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-goose.jpg"
                                                    src={`${process.env.PUBLIC_URL}/mapf-svg/`+ row.map_name+`.svg`}
                                                    alt="Canvas Logo"
                                                    width = '100%'
                                                />
                                                {/*<img src={'/public/logo192.png'} alt="logo" />*/}
                                            </TableCell>
                                            <TableCell align="left"  >{row.map_size}</TableCell>
                                            <TableCell align="left" >{row.map_type}</TableCell>
                                            <TableCell align="left" >{row.scens}</TableCell>
                                            <TableCell align="left" >{row.instances}</TableCell>
                                            <TableCell align="left" >
                                                {row.best_lower}
                                            </TableCell>
                                            <TableCell align="left" >
                                                {row.best_solution}
                                            </TableCell>
                                            <TableCell align="left" >
                                                {row.closed}
                                            </TableCell>
                                            <TableCell align="left" >
                                                {row.solved}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick= {()=>{
                                                    setOpenUpload(true)
                                                    setSelectedRow(row)
                                                }}
                                                >
                                                    <AddCircleIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={9} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog
                open={openExplanation}
                onClose={ ()=>{setOpenExplanation(false)}}
                scroll={scrollDetail}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={true}
                maxWidth={'md'}
                disableScrollLock={true}
                PaperProps={{
                    style: {mb: 2, borderRadius: 10}
                }}
                // PaperProps={{ sx: { width: "100%"}}}
            >
                <DialogTitle>Submission File Format</DialogTitle>

                <DialogContent dividers>
                    <Typography
                        sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                       File type:
                    </Typography>
                    <Typography
                        sx={{ flex: '1 1 100%',paddingLeft :'20px' }}
                        variant="h7"
                        component="div"
                        gutterBottom
                    >
                        We support uploading .csv file
                    </Typography>
                    <Typography
                        sx={{ flex: '1 1 100%' ,paddingLeft :'10px'}}
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                        File header:
                    </Typography>
                    <Typography
                        sx={{ flex: '1 1 100%',paddingLeft :'20px' }}
                        variant="h7"
                        component="div"
                        gutterBottom
                    >
                        map_name, scen_type, type_id, agents, lower_cost, solution_cost, solution_plan
                    </Typography>
                    <Typography
                        sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                        Solution Path Format:
                    </Typography>
                    <Typography
                        sx={{ flex: '1 1 100%',paddingLeft :'20px'}}
                        variant="h7"
                        component="div"
                        gutterBottom
                    >
                        For each agent, we use a motion string to represent the path, where the symbol 'u', 'd', 'l' and 'r' represents moving up, down, left and right respectively,
                        and 'w' represents waiting at its current location (eg., a path [(0,0) -> (0,1) -> (1,1) -> (2,1) -> (2,0) -> (2,0) -> (1,0)] is converted to a motion string  "urrdwl").
                    </Typography>

                    <Typography
                        sx={{ flex: '1 1 100%',paddingLeft :'20px'}}
                        variant="h7"
                        component="div"
                        gutterBottom
                    >
                        We use "\n" to separate the paths between different agents.
                    </Typography>
                    <Typography
                        sx={{ flex: '1 1 100%' ,paddingLeft :'10px'}}
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                        Example csv:
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
                                    urrurrruuurrrr
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
                                    urrurrruuurrrr
                                    ddrddrrrddrddrdrrdrddddd
                                    dddddddddddd
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {/*</Typography>*/}
                </DialogContent>



            </Dialog>
            <DropzoneDialog
                open={openUpload}
                onSave={handleSave}
                acceptedFiles={["text/csv"]}
                dialogTitle={dialogTitle()}
                // showFileNamesInPreview={false}
                dropzoneText = {"Drag and drop a file (.csv) here or click"}
                useChipsForPreview={true}
                maxFileSize={100000000000}
                onClose={ ()=>{setOpenUpload(false)}}
                filesLimit = {1}
            />
            <Dialog
                open={openSubmit}
                // onClose={ ()=>{setOpenSubmit(false)}}
                scroll={scrollDetail}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={true}
                maxWidth={'md'}
                disableScrollLock={true}
                PaperProps={{
                    style: {mb: 2, borderRadius: 10}
                }}
                // PaperProps={{ sx: { width: "100%"}}}
            >
                <DialogTitle>Submitting File to Server</DialogTitle>

                <DialogContent dividers>
                    <Typography
                        sx={{ flex: '1 1 100%' ,paddingLeft :'10px', paddingBottom :'10px'}}
                        variant="h6"
                        style={{whiteSpace: 'pre-line'}}
                    >
                        {validationText}
                    </Typography>

                    <Typography
                        sx={{ flex: '1 1 100%' ,paddingLeft :'10px'}}
                        variant="h6"
                        style={{whiteSpace: 'pre-line'}}
                    >
                        {submissionText}
                    </Typography>

                    {showProgress? <BorderLinearProgress value={submissionProgress*100} /> : null}

                    <Typography
                        sx={{ flex: '1 1 100%' ,paddingLeft :'10px',paddingBottom :'10px'}}
                        variant="h6"
                        style={{whiteSpace: 'pre-line'}}
                    >
                        {submissionFeedbackText}
                    </Typography>

                    <Typography
                        sx={{ flex: '1 1 100%' ,paddingLeft :'10px'}}
                        variant="h6"
                        style={{whiteSpace: 'pre-line'}}
                    >
                        {finalizingText}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        setOpenSubmit(false);
                        setOpenUpload(false);
                    }} autoFocus
                            disabled={activeButton ? false : true}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            {/*<FormControlLabel*/}
            {/*    control={<Switch checked={dense} onChange={handleChangeDense} />}*/}
            {/*    label="Dense padding"*/}
            {/*/>*/}
        </Box>
    );
}