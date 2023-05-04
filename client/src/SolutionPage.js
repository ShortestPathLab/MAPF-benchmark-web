import * as React from 'react';
import PropTypes from 'prop-types';
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
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';
import {useNavigate,  useLocation } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import TableViewIcon from '@mui/icons-material/TableView';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {CSVLink} from 'react-csv';
import {useRef} from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import InfoIcon from '@mui/icons-material/Info';
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area} from 'recharts';
import { Radar, RadarChart, PolarGrid,  PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterListIcon from "@mui/icons-material/FilterList";
import Menu from "@mui/material/Menu";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MenuIcon from "@mui/icons-material/Menu";
import CompareIcon from "@mui/icons-material/Compare";
import randomColor from "randomcolor";
import {APIConfig} from "./config";
import async from "async";



const angle = {
    'Warehouse': -40,
    'City' : 0,
    'Empty' : 50,
    'Game' : 110,
    'Maze' : 0,
    'Random' : 0,
    'Room' : -110
}

function descendingComparator(a, b, orderBy) {
    if (orderBy === 'solution_algos' || orderBy === 'lower_algos'){
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
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
        id: 'lower_date',
        numeric: false,
        disablePadding: false,
        label: 'Claim Date',
        sortable: true,
        alignment: 'left',
        rowspan: 1
    },
    {
        id: 'lower_cost',
        numeric: false,
        disablePadding: false,
        label: 'Cost',
        sortable: true,
        alignment: 'left',
        rowspan: 1
    },
    {
        id: 'lower_algos',
        numeric: false,
        disablePadding: false,
        label: '#Claims',
        sortable: true,
        alignment: 'left',
        rowspan: 1
    },
    {
        id: 'solution_date',
        numeric: true,
        disablePadding: false,
        label: 'Claim Date',
        sortable: true,
        alignment: 'left',
        rowspan: 1
    },
    {
        id: 'solution_cost',
        numeric: false,
        disablePadding: false,
        label: 'Cost',
        sortable: true,
        alignment: 'left',
        rowspan: 1
    },
    {
        id: 'solution_algos',
        numeric: true,
        disablePadding: false,
        label: '#Claims',
        sortable: true,
        alignment: 'left',
        rowspan: 1
    }
    // {
    //     id: 'solution_path',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'View/Download',
    //     sortable: false,
    //     alignment: 'center',
    //     rowspan: 1
    // },

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
        <TableHead sx = {{backgroundColor: "black"}}>
            <TableRow sx = {{backgroundColor: "black"}}>
                <TableCell
                    key={'agents'}
                    align={'left'}
                    padding={'normal'}
                    sortDirection={orderBy === 'agents'? order : false}
                    rowSpan= {2}
                    sx = {{backgroundColor: "black" , color : "white",fontWeight: 'bold'}}
                >
                    <TableSortLabel
                        active={orderBy === 'agents'}
                        direction={orderBy === 'agents'? order : 'asc'}
                        onClick={ createSortHandler('agents') }
                        sx = {
                            {
                                '&.MuiTableSortLabel-root': {
                                    color: 'white'
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
                        {'#Agents'}
                        {orderBy ==='agents'? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
                <TableCell align="center" colSpan={3}   style={{paddingBottom:0,paddingTop:10}}  sx = {{backgroundColor: "black" , color : "white",border: "none",fontWeight: 'bold' }}>
                    Lower Bound Record
                    <div
                        style={{
                            background: 'black',
                            height: '8px',
                        }}
                    />
                    <div
                        style={{
                            background: 'white',
                            height: '2px',
                        }}
                    />
                </TableCell>
                <TableCell align="center" colSpan={3} style={{paddingBottom:0,paddingTop:10}}  sx = {{ backgroundColor: "black" , color : "white" ,border: "none",fontWeight: 'bold'}}>
                    Solution Record
                    <div
                        style={{
                            background: 'black',
                            height: '8px',
                        }}
                    />
                    <div
                        style={{
                            background: 'white',
                            height: '2px',
                        }}
                    />
                </TableCell>
                <TableCell
                    key={'download'}
                    align={'center'}
                    padding={'normal'}
                    rowSpan= {2}
                    sx = {{backgroundColor: "black" , color : "white",fontWeight: 'bold'}}
                >
                    View / Download
                </TableCell>
            </TableRow>
            <TableRow sx = {{backgroundColor: "black"}}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignment}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        rowSpan= {headCell.rowspan}
                        style={{paddingTop:10,paddingBottom:10,fontWeight: 'bold'}}
                        sx = {{backgroundColor: "black" , color : "white"}}
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

const getAlgorithmData = (callback,id)=>{
    fetch(APIConfig.apiUrl+'/algorithm/algo_detail/'+id, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => console.error(err));
}

//
// const getAlgoRadarChart = (callback,id)=>{
//     fetch(APIConfig.apiUrl+'/algorithm/getLowerInfoGroup/'+id, {method: 'GET'})
//         .then(res => res.json())
//         .then(data => {
//             callback(data);
//         })
//         .catch(err => console.error(err));
// }



const refreshLeader = (callback,id)=>{
    fetch(APIConfig.apiUrl+'/instance/'+id, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            // console.log("finisheddddddddd")
            callback(data);
        })
        .catch(err => console.error(err));
}



function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

// const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
//     height: 10,
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
//     },
// }));

function CustomizedLabel(props) {
    const { x, y, cx,cy, payload } = props;
    return (
        <g transform={`translate(${x + (x - cx) / 16},${y + (y - cy) / 16 })`}>
            <text x={2} y={0}
                  fontFamily="Roboto Slab" textAnchor={'middle'} transform= {`rotate(${angle[payload.value] === undefined ? 0: angle[payload.value]})`}>
                {payload.value}
            </text>
        </g>
    );
}
// const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

// const getPercent = (value, total) => {
//     const ratio = total > 0 ? value / total : 0;
//
//     return toPercent(ratio, 2);
// };



export default function SolutionPage() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('agents');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])

    const [selectedAlgo, setSelectedAlgo] = React.useState([]);

    const [algodata, setAlgodata] = React.useState([]);
    const [algoChartData, setAlgoChartData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [algoID, setalgoID] = React.useState('');
    const [csvData, setCsvData] = React.useState([]);
    const [csvFilename, setCsvFilename] = React.useState([]);
    const csvLinkEl = useRef();
    const [loading, setLoading] = React.useState(false);
    const [query_id, setQuery_id] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [searched, setSearched] = React.useState("");
    const [openAlgoDetail, setOpenAlgoDetail] = React.useState(false);
    const [scrollAlgoDetail, setScrollAlgoDetail] = React.useState('paper');
    const [domainQuery, setDomainQuery] = React.useState('#Instances Closed');

    const [openChart, setOpenChart] = React.useState(false);
    const [scrollOpenChart, setScrollOpenChart] = React.useState('paper');
    const [maxRatio, setMaxRatio] = React.useState(0);
    const [progressChartData, setProgressChartData] = React.useState([]);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

    const [openComparator, setOpenComparator] = React.useState(false);
    const [algorithm_name, setAlgorithm_name] = React.useState([]);

    const [agentQuery, setAgentQuery] = React.useState('Solution Cost');
    const [agentQueryResult, setAgentQueryResult] = React.useState([]);
    const [agentChartAlgorithms, setAgentChartAlgorithms ] = React.useState([]);
    const [agentChartDisplayAlgorithms, setAgentChartDisplayAlgorithms ] = React.useState([]);
    const [agentChartDisplayData, setAgentChartDisplayData ] = React.useState([]);
    const [agentChartOriData, setAgentChartOriData ] = React.useState([]);
    const [agentFilterState, setAgentFilterState] = React.useState({});
    const [agentAnchorEl, setAgentAnchorEl] = React.useState(null);
    const [agentLoading, setAgentLoading] =  React.useState(true);
    const [domainLoading, setDomainLoading] =  React.useState(true);
    const [progressLoading, setProgressLoading] =  React.useState(false);
    const [maxAgentResults, setMaxAgentResults] = React.useState(0);
    const [color,setColor] = React.useState(Array(100)
        .fill()
        .map((currElement, index) =>
            currElement=randomColor({seed : 60 + 4*index})
        ))
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.agents.toString().includes(searchedVal);
        });
        setRows(filteredRows);
        setSearched(searchedVal);
    };

    const cancelSearch = (searchedVal) => {
        setSearched("");
        requestSearch("");
    };

    // const navigateToDownload =  (object_id,agents) => {
    //     // const data = await getCSVData();
    //     setCsvFilename(`${location.state.mapName}_${location.state.scenType}_${location.state.scenTypeID}_${agents}`);
    //     fetch('http://localhost:8080/api/instance/DownloadRow/'+object_id, {method: 'GET'})
    //         .then(res => res.json())
    //         .then(data => {
    //             setCsvData(data);
    //             });
    // };
    const navigateToDownload =  (event,object_id,agents) => {
        setQuery_id(object_id);
        setLoading(true);
        setCsvFilename(`${location.state.mapName}_${location.state.scenType}_${location.state.scenTypeID}_${agents}`);
        event.stopPropagation();
    };
    React.useEffect(() => {
        if(loading&&query_id !==''){
            fetch(APIConfig.apiUrl+'/instance/DownloadRow/'+query_id, {method: 'GET'})
                .then(res => res.json())
                .then(data => {
                    setCsvData(data);
                    setQuery_id('');
                }).catch(err => console.error(err));
        }
    }, [loading]);

    React.useEffect(() => {
        if(csvData.length !== 0){
            setLoading(false);
            csvLinkEl.current.link.click();
            setCsvData([]);
        }
    }, [csvData]);

    const handleClickOpen  = (event,scrollType, instance_id, algo_type)  => {
        // setalgoID(algo_id);
        // console.log(instance_id)
        var algo_API = APIConfig.apiUrl+'/instance/getAlgo/'+ instance_id;
        fetch(algo_API , {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setOpen(true);
                setScroll(scrollType);
                setSelectedAlgo(data[0][algo_type]);
            }).catch(err => console.error(err));
        event.stopPropagation();
    };

    const handleAlgoDetailClickOpen  = (event,scrollType, algo_id)  => {
        setOpenAlgoDetail(true);
        setScrollAlgoDetail(scrollType);
        setalgoID(algo_id);
        event.stopPropagation();
    };


    const handleAlgoDetailClose = () => {
        setOpenAlgoDetail(false);
        setDomainQuery('#Instances Closed');
    };


    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
        if( progressLoading === true) {
            var progressChartData_copy = []
            for (var i = 1; i < location.state.numAgents + 1; i++) {
                progressChartData_copy.push(
                    {
                        "name": i.toString(),
                        "Lower Bound Cost": 0,
                        "Solution Cost": 0,
                        "Suboptimality Ratio": -1
                    }
                )
            }
            data.forEach(function (element) {
                if (element.lower_cost !== null) {
                    progressChartData_copy[element.agents - 1]["Lower Bound Cost"] = element.lower_cost;
                }
                if (element.solution_cost !== null) {
                    progressChartData_copy[element.agents - 1]["Solution Cost"] = element.solution_cost;
                }
            })
            var max_ratio = 0
            progressChartData_copy.forEach(function (element) {
                if (element["Lower Bound Cost"] !== 0 && element["Solution Cost"] !== 0) {
                    element["Suboptimality Ratio"] = (element["Solution Cost"] - element["Lower Bound Cost"]) / element["Lower Bound Cost"]
                    max_ratio = element["Suboptimality Ratio"] > max_ratio ? element["Suboptimality Ratio"] : max_ratio
                }
            })

            progressChartData_copy.forEach(function (element) {
                element["Suboptimality Ratio"] = element["Suboptimality Ratio"] === -1 ? max_ratio + max_ratio * 0.5 : element["Suboptimality Ratio"];
            })
            setMaxRatio(max_ratio);
            setProgressChartData(progressChartData_copy);
            setTimeout(() => {
                // Your code here
                setProgressLoading(false);
            }, 300);
            // setProgressLoading(false);
            // console.log("finished setting");
        }
    }, [progressLoading]);
    //
    // React.useEffect(() => {
    //     if( progressLoading === true && progressChartData.length >0) {
    //         console.log(progressChartData);
    //         console.log("finished ");
    //         setProgressLoading(false);
    //     }
    // }, [progressChartData]);

    const handleChartClickOpen  = (event,scrollType)  => {
        setOpenChart(true);
        setScrollOpenChart(scrollType);
        setProgressLoading(true);
        event.stopPropagation();
        // compute_suboptimilaity();
    };



    const handleChartClose = () => {
        setOpenChart(false);
    };


    // const descriptionElementRef = React.useRef(null);
    // React.useEffect(() => {
    //     if (open) {
    //         // getAlgorithmData((algodata)=>{
    //         //     setAlgodata(algodata)
    //         // },algoID);
    //     }
    // }, [open]);


    React.useEffect(() => {
        if (openAlgoDetail) {
            setDomainLoading(true);
            getAlgorithmData((algodata)=>{
                setAlgodata(algodata)
            },algoID);

            fetch(APIConfig.apiUrl+'/algorithm/getClosedInfoGroup/'+algoID, {method: 'GET'})
                .then(res => res.json())
                .then(data => {
                    data.forEach((element)=>(element.name =  element.name.charAt(0).toUpperCase() +element.name.slice(1)));
                    // console.log(data);
                    setAlgoChartData(data);
                    setDomainLoading(false);
                })
                .catch(err => console.error(err));

        }
    }, [openAlgoDetail]);

    // React.useEffect(() => {
    //     if (algoChartData.length >0) {
    //         var data = algoChartData;
    //         console.log(data);
    //         data.forEach((element)=>(element.name =  element.name.charAt(0).toUpperCase() +element.name.slice(1)));
    //         setAlgoChartData(data);
    //     }
    // }, [algoChartData]);
    const location = useLocation();

    React.useEffect(() => {
        refreshLeader((data)=>{
            setData(data);
            setRows(data);
        },location.state.scenId);

        const interval = setInterval(() => {
            refreshLeader((data)=>{
                setData(data);
                setRows(data);
            },location.state.scenId)
        }, 30000);
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

    const handleDomainQueryChange = (event) => {
        setDomainLoading(true);
        setDomainQuery(event.target.value);

        var domain_API = '';
        if(event.target.value ==='#Instances Closed'){
            domain_API = APIConfig.apiUrl+'/algorithm/getClosedInfoGroup/'+algoID;
        }else if(event.target.value ==='#Instances Solved'){
            domain_API = APIConfig.apiUrl+'/algorithm/getSolvedInfoGroup/'+algoID;
        }
        else if (event.target.value === '#Best Lower-bounds'){
            domain_API = APIConfig.apiUrl+'/algorithm/getLowerInfoGroup/'+algoID;
        }else{
            domain_API = APIConfig.apiUrl+'/algorithm/getSolutionInfoGroup/'+algoID;
        }
        // console.log(domain_API);
        fetch(domain_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                data.forEach((element)=>(element.name =  element.name.charAt(0).toUpperCase() +element.name.slice(1)));
                setAlgoChartData(data);
                setDomainLoading(false);
            })
            .catch(err => console.error(err));
    }




    const navigate = useNavigate();

    const navigateToVisualization = (event,path_id, num_agents) => {
        // 👇️ navigate to /contacts
        // console.log(id)
        // console.log(location.state.mapName)
        // console.log(location.state.scenTypeID)
        // console.log(location.state.scenType)
        //
        // console.log(planning_results);
        // console.log(path_id);
        var scen_string = location.state.mapName + "-" + location.state.scenType+ "-" + location.state.scenTypeID;
        navigate('/visualization',{ state: { path_id: path_id, map_name: location.state.mapName, scen_string: scen_string,
                num_agents: num_agents}, replace: false} )
        event.stopPropagation();
        // state={instance_id : id}, replace: false});
    };


    const handleClickOpenComparator  = (event,scrollType)  => {
        setOpenComparator(true);
        setScroll(scrollType);

        var algorithm_API = APIConfig.apiUrl+'/algorithm/';
        fetch( algorithm_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                var key = [];
                data.forEach(a => key.push(a.algo_name));
                key.sort();
                setAlgorithm_name(key);
            })
            .catch(err => console.error(err));

        event.stopPropagation();
    };


    React.useEffect(() => {
        if(algorithm_name.length > 0) {
            setAgentLoading(true);
            setAgentQuery('Solution Cost');
            var agent_cost_API = APIConfig.apiUrl+'/algorithm/getAgentSolutionCost/'+location.state.mapId+"&"+location.state.scenId;
            // console.log(agent_cost_API)
            fetch( agent_cost_API, {method: 'GET'})
                .then(res => res.json())
                .then(data => {
                    setAgentQueryResult(data);
                })
                .catch(err => console.error(err));
        }
    }, [algorithm_name]);


    React.useEffect(() => {
        if(agentQueryResult.length >0){

            var agentChartData = []
            for(var i = 1; i < location.state.numAgents +1; i ++){
                agentChartData.push(
                    {
                        "name" :   i.toString(),
                    }
                )
            }
            const algorithm = new Set();
            for( var i = 0; i < agentQueryResult.length; i ++){
                // iterate map
                var agentIndex = agentQueryResult[i].agents -1;

                for(var j = 0 ; j < agentQueryResult[i].record.length; j ++){
                    var algo =  agentQueryResult[i].record[j]
                    algorithm.add(algo.algo_name);
                    agentChartData[agentIndex][algo.algo_name] = parseInt(algo.cost);
                }
            }
            var unique_key = [];
            var check_box_state={};
            algorithm.forEach(function(algo){
                unique_key.push(algo);
                check_box_state[algo]= true;
                agentChartData.forEach(function(element){
                    if( element[algo] === undefined){
                        element[algo] = -1;
                    }
                });
            })
            unique_key.sort();
            setAgentFilterState(check_box_state);
            setAgentChartAlgorithms(unique_key);
            setAgentChartDisplayAlgorithms(unique_key);
            var max_value  = 0 ;

            for( var i = 0; i < data.length; i ++){
               if(agentQuery === "Solution Cost"){
                   unique_key.forEach(function (element) {
                       if(data[i]["solution_cost"] === null || agentChartData[parseInt(data[i]["agents"] )- 1][element] === -1){
                           agentChartData[parseInt(data[i]["agents"] )- 1][element] = -1;
                       }else{
                           agentChartData[parseInt(data[i]["agents"] ) - 1][element] =  (agentChartData[parseInt(data[i]["agents"] ) -1][element]- data[i]["solution_cost"])/ data[i]["solution_cost"];
                           max_value = max_value >  agentChartData[parseInt(data[i]["agents"] ) - 1][element]? max_value :  agentChartData[parseInt(data[i]["agents"] ) - 1][element];
                       }
                   })
               }else{
                   unique_key.forEach(function (element) {
                       if(data[i]["lower_cost"] === null || data[i]["lower_algos"] === 0  || agentChartData[parseInt(data[i]["agents"] )- 1][element] === -1){
                           agentChartData[parseInt(data[i]["agents"] )- 1][element] = -1;
                       }else{
                           agentChartData[parseInt(data[i]["agents"] ) - 1][element] =  ( data[i]["lower_cost"] - agentChartData[parseInt(data[i]["agents"] ) -1][element])/ data[i]["lower_cost"];
                           max_value = max_value >  agentChartData[parseInt(data[i]["agents"] ) - 1][element]? max_value :  agentChartData[parseInt(data[i]["agents"] ) - 1][element];
                       }
                   })
               }
            }
            for( var i = 0; i < agentChartData.length; i ++){
                unique_key.forEach(function (element) {
                    if( agentChartData[i][element]  < 0){
                        agentChartData[i][element] = (1+0.5)* max_value
                    }
                })
            }
            setMaxAgentResults(max_value);
            setAgentChartDisplayData(agentChartData);
            setAgentChartOriData(agentChartData);
            setAgentLoading(false);
        }
    }, [agentQueryResult]);


    React.useEffect(() => {
        var displayData = []
        // console.log(solvedChartOriData);
        agentChartOriData.forEach(function(element) {
            var mapData  = {}
            mapData['name'] = element['name'];
            agentChartAlgorithms.forEach(function(algo){
                if(agentFilterState[algo]){
                    mapData[algo] = element[algo]
                }
            })
            displayData.push(mapData);
        })
        // console.log(displayData);
        var displayKey =[]
        agentChartAlgorithms.forEach(function(algo){
            if(agentFilterState[algo]){
                displayKey.push(algo);
            }
        })
        setAgentChartDisplayAlgorithms(displayKey);
        setAgentChartDisplayData(displayData);
    }, [agentFilterState]);

    const handleAgentChange = (event) => {
        setAgentLoading(true);
        setAgentQuery(event.target.value);

        var agent_API = '';
        if(event.target.value ==='Solution Cost'){
            agent_API = APIConfig.apiUrl+'/algorithm/getAgentSolutionCost/'+location.state.mapId+"&"+location.state.scenId;
        }else{
            agent_API = APIConfig.apiUrl+'/algorithm/getAgentLower/'+location.state.mapId+"&"+location.state.scenId;
        }
        fetch(agent_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setAgentQueryResult(data);
            })
            .catch(err => console.error(err));

    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (

            <Box
                sx={{ minWidth : 600, position: "absolute", width: '96%', paddingLeft:"2%", top:"300px",opacity:"0.95"
                }}>
                <Paper  elevation={12} sx={{ width: '100%', mb: 2, borderRadius: 5}}>
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 }
                        }}
                    >
                        <IconButton
                            aria-controls="domain-filter-menu"
                            aria-haspopup="true"
                            onClick={(event)=>{setMenuAnchorEl(event.currentTarget)}}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={menuAnchorEl}
                            keepMounted
                            open={Boolean(menuAnchorEl)}
                            // onClick ={handleDomainFilterChange}
                            onClose={()=>{setMenuAnchorEl(null)}}
                        >
                            <MenuItem key="Dense">
                                <Button
                                    key="Dense"
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={ dense ? <ZoomOutMapIcon/>:<ZoomInMapIcon /> }
                                    onClick={() =>{
                                        setDense(!dense);
                                        setMenuAnchorEl(null);
                                    }}
                                >
                                    { dense ? "Sparse Margin":"Densify Margin " }
                                </Button>
                            </MenuItem>

                            <MenuItem key="Progress">
                                <Button
                                    key="Progress"
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={<ShowChartIcon/>}
                                    onClick={(event) =>{handleChartClickOpen(event,'paper');
                                        setMenuAnchorEl(null);
                                    } }
                                >
                                    Monitor Progress
                                </Button>
                            </MenuItem>
                            <MenuItem key="Comparator">
                                <Button
                                    key="Comparator"
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={<CompareIcon />}
                                    onClick={(event) =>{handleClickOpenComparator(event,'paper');
                                        setMenuAnchorEl(null);
                                    } }
                                >
                                    Compare Algorithms
                                </Button>
                            </MenuItem>
                        </Menu>
                        <Typography
                            sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                            component="div"
                        >
                            <Typography
                                sx={{ display: "inline-block",verticalAlign: "middle" }}
                                variant="h6"
                                component="div"
                            >
                                {capitalizeFirstLetter(location.state.mapName)} ({location.state.scenType}-{location.state.scenTypeID} scenario) &nbsp;
                            </Typography>
                            <Typography
                                sx={{ display: "inline-block", width : 50 ,verticalAlign: "middle"}}
                                component="img"
                                src={`${process.env.PUBLIC_URL}/mapf-svg/`+ location.state.mapName+`.svg`}
                            >

                            </Typography>
                        </Typography>

                        <TextField
                            id="outlined-basic"
                            onChange={(searchVal) => requestSearch(searchVal.target.value)}
                            variant="outlined"
                            placeholder="#Agents"
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

                                <col style={{minWidth: "100px"}} width="10%" />
                                <col style={{minWidth: "150px"}} width="15%" />
                                <col style={{minWidth: "100px"}} width="10%" />
                                <col style={{minWidth: "100px"}} width="10%" />
                                <col style={{minWidth: "150px"}} width="15%" />
                                <col style={{minWidth: "100px"}} width="10%" />
                                <col style={{minWidth: "100px"}} width="10%" />
                                <col style={{minWidth: "200px"}} width="20%" />
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
                                                key={row.id}
                                                // onClick={(event) => navigateToVisualization(event,row.id,row.agents,row.solution_path)}
                                            >
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="normal"
                                                    align = "left"
                                                >
                                                    {row.agents}
                                                </TableCell>
                                                <TableCell align="left" >{row.lower_date}</TableCell>
                                                <TableCell align="left"  >{row.lower_cost}
                                                </TableCell>
                                                <TableCell align="left" >
                                                    { row.lower_cost === null ? null :
                                                        <div>
                                                            {row.lower_algos}
                                                            <IconButton onClick={(event) =>handleClickOpen(event,'paper', row.id, "lower_algos")}>
                                                                <TableViewIcon />
                                                            </IconButton>
                                                        </div>
                                                    }
                                                </TableCell>
                                                <TableCell align="left" >{row.solution_date}</TableCell>
                                                <TableCell align="left" >{row.solution_cost}</TableCell>
                                                <TableCell align="left" >
                                                    { row.solution_cost === null ? null :
                                                        <div>
                                                            {row.solution_algos}
                                                            <IconButton onClick={(event) =>handleClickOpen(event,'paper', row.id, "solution_algos")}>
                                                                <TableViewIcon  />
                                                            </IconButton>
                                                        </div>
                                                    }

                                                </TableCell>
                                                <TableCell align="center" >
                                                    { row.solution_cost === null ? null :
                                                        <div>
                                                            <IconButton onClick={(event) => navigateToVisualization(event,row.solution_path_id,row.agents)}>
                                                                <VisibilityIcon/>
                                                            </IconButton>
                                                            <IconButton onClick= { (event) => navigateToDownload(event,row.id,row.agents)}>
                                                                {loading && row.id === query_id?  <CircularProgress size={24} />:<DownloadIcon/>}
                                                            </IconButton>
                                                        </div>
                                                    }
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
                                        <TableCell colSpan={8} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <CSVLink
                            data={csvData}
                            filename={`${csvFilename}.csv`}
                            className="hidden"
                            target="_blank"
                            ref={csvLinkEl}
                        />
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100, 500]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    disableScrollLock={ true }
                    PaperProps={{
                        style: { mb: 2,borderRadius: 10 }
                    }}
                >

                    <DialogContent dividers={scroll === 'paper'} >
                        <Table sx={{ width : "400"}}>
                            <colgroup>
                                <col width="200" />
                                <col width="200" />
                            </colgroup>
                            <TableHead sx = {{backgroundColor: "black"}}>
                                <TableRow sx = {{backgroundColor: "black"}}>
                                    <TableCell align="left" sx = {{backgroundColor: "black" , color : "white",fontWeight: 'bold'}}>Algorithm Name</TableCell>
                                    <TableCell align="left" sx = {{backgroundColor: "black" , color : "white",fontWeight: 'bold'}}>Submitted Date</TableCell>
                                    <TableCell align="left" sx = {{backgroundColor: "black" , color : "white",fontWeight: 'bold'}}>Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedAlgo.map((algo) => (
                                    <TableRow key={algo.algo_id}>
                                        <TableCell >{algo.algo_name}</TableCell>
                                        <TableCell > {algo.date}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={(event) =>handleAlgoDetailClickOpen(event,'paper', algo.algo_id)}>
                                                <InfoIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                    {/*<DialogActions>*/}
                    {/*    <Button onClick={handleClose}>Cancel</Button>*/}
                    {/*</DialogActions>*/}
                </Dialog>
                <Dialog
                    open={openAlgoDetail}
                    onClose={handleAlgoDetailClose}
                    scroll={scrollAlgoDetail}
                    fullWidth={true}
                    maxWidth={'md'}
                    disableScrollLock={ true }
                    // PaperProps={{ sx: { width: "100%"}}}
                    PaperProps={{
                        style: { mb: 2,borderRadius: 10 }
                    }}
                >
                    <DialogContent dividers={scrollAlgoDetail === 'paper'}  sx={{width: 850, display : 'flex'}}>

                        <Table sx={{ width : 500}}>
                            <colgroup>
                                {/*<col width="120" />*/}
                                {/*<col width="150" />*/}
                                {/*<col width="65" />*/}
                                {/*<col width="200" />*/}
                                <col width="120" />
                                <col width="150" />
                                <col width="50" />
                                <col width="150" />
                            </colgroup>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{paddingRight:0,paddingLeft:0 }} >Algorithm Name:</TableCell>
                                    <TableCell style={{paddingRight:0,paddingLeft:0 }}> {algodata.algo_name}</TableCell>
                                    <TableCell style={{paddingRight:0,paddingLeft:0 }}> Authors: </TableCell>
                                    <TableCell style={{paddingRight:0,paddingLeft:0 }}> {algodata.authors}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{paddingRight:0,paddingLeft:0 }}>  Github Link: </TableCell>
                                    <TableCell style={{paddingRight:0,paddingLeft:0 }} colSpan={3}>
                                        <Link href={algodata.github} underline="hover">
                                            {algodata.github}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{paddingRight:0,paddingLeft:0,verticalAlign: "top" }} > Paper Reference: </TableCell>
                                    <TableCell style={{paddingRight:0,paddingLeft:0,verticalAlign: "top" }} colSpan={3} > {algodata.papers} </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{paddingRight:0,paddingLeft:0, verticalAlign: "top"}}> Comments: </TableCell>
                                    <TableCell style={{paddingRight:0,paddingLeft:0,verticalAlign: "top" }} colSpan={3}> {algodata.comments}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        {/*<ResponsiveContainer width={500} height={380}>*/}
                        <div style={{width:30}}/>
                    {/*<Paper  elevation={12} sx={{  width : 350, height: 464, mb: 2, borderRadius: 5}}>*/}
                        <Box sx={{ width : 350, height: 464}}>
                            <Toolbar
                                sx={{
                                    pl: { sm: 2 },
                                    pr: { xs: 1, sm: 1 }
                                }}
                            >
                                <Typography
                                    sx={{ flex: '1 1 100%' }}
                                    variant="h8"
                                    component="div"
                                >
                                   Summary
                                </Typography>
                                <FormControl sx={{ m: 1, minWidth: 120, width:300}}  size = 'small' >
                                    <Select
                                        displayEmpty = {true}
                                        value={domainQuery}
                                        onChange={handleDomainQueryChange}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={"#Instances Closed"}>#Instances Closed</MenuItem>
                                        <MenuItem value={"#Instances Solved"}>#Instances Solved</MenuItem>
                                        <MenuItem value={"#Best Lower-bounds"}>#Best Lower-bounds</MenuItem>
                                        <MenuItem value={"#Best Solutions"}>#Best Solutions</MenuItem>
                                    </Select>

                                </FormControl>
                            </Toolbar>
                            {domainLoading ? <Box display="flex"
                                                  justifyContent="center"
                                                  alignItems="center" width={350} height={400} ><CircularProgress
                                    size={80}/></Box> :
                                <RadarChart width={350} height={400} cx="50%" cy="60%" outerRadius="80%"
                                            data={algoChartData}>
                                    {/*<text x="50%" y="0" dominantBaseline="hanging" fontSize="20"  textAnchor={'middle'} style = {{ fontFamily: "Roboto Slab" }}>Solution</text>*!/*/}
                                    <Legend verticalAlign="top" align="center" wrapperStyle={{
                                        fontFamily: "Roboto Slab"
                                    }}/>
                                    <PolarGrid/>
                                    <PolarAngleAxis dataKey="name"
                                                    tick={<CustomizedLabel/>}
                                                    style={{
                                                        fontFamily: "Roboto Slab"
                                                    }}/>
                                    <Tooltip wrapperStyle={{fontFamily: "Roboto Slab"}} formatter={(tick) => {
                                        var value = tick * 100
                                        return `${value.toFixed(2)}%`;
                                    }}
                                    />
                                    <PolarRadiusAxis angle={38.5} domain={[0, algoChartData.length > 0 ? 'dataMax' : 1]}
                                                     tickFormatter={(tick) => {
                                                         var value = tick * 100
                                                         return `${value.toFixed(0)}%`;
                                                     }}
                                    />
                                    <Radar key={'State of The Art'} dataKey={'State of The Art'} fillOpacity={0.6}
                                           stroke={`#87ceeb`} fill={`#87ceeb`}/>
                                    <Radar key={algodata.algo_name} dataKey={algodata.algo_name} fillOpacity={0.6}
                                           stroke={`#ff4500`} fill={`#ff4500`}/>
                                </RadarChart>
                            }
                        </Box>
                    {/*</Paper>*/}
                        {/*</ResponsiveContainer>*/}
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openChart}
                    onClose={handleChartClose}
                    scroll={scrollOpenChart}
                    disableScrollLock={ true }
                    fullWidth={true}
                    maxWidth={'md'}
                    PaperProps={{
                        style: { mb: 2,borderRadius: 10 }
                    }}
                >
                    <DialogContent dividers={scrollOpenChart === 'paper'}
                                   sx={{width: 850, height : 480}}>
                        {/*<Paper  elevation={12} sx={{ width: '100%', mb: 2, borderRadius: 5}}>*/}
                        <Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5}}>
                            <Toolbar
                                sx={{
                                    pl: { sm: 2 },
                                    pr: { xs: 1, sm: 1 }
                                }}
                            >
                                {/*<Typography*/}
                                {/*    sx={{ flex: '1 1 100%',paddingLeft :'10px' }}*/}
                                {/*    variant="h6"*/}
                                {/*    component="div"*/}
                                {/*>*/}
                                {/*    Suboptimality on #Agents */}
                                {/*</Typography>*/}

                                <Typography
                                    sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                                    component="div"
                                >
                                    <Typography
                                        sx={{ display: "inline-block",verticalAlign: "middle" }}
                                        variant="h6"
                                        component="div"
                                    >
                                        Suboptimality on #Agents ({capitalizeFirstLetter(location.state.mapName)} {location.state.scenType}-{location.state.scenTypeID} scenario) &nbsp;
                                    </Typography>
                                    {/*<Typography*/}
                                    {/*    sx={{ display: "inline-block", width : 50 ,verticalAlign: "middle"}}*/}
                                    {/*    component="img"*/}
                                    {/*    src={`${process.env.PUBLIC_URL}/mapf-svg/`+ location.state.mapName+`.svg`}*/}
                                    {/*>*/}

                                    {/*</Typography>*/}
                                </Typography>


                            </Toolbar>
                            {progressLoading ? <Box display="flex"
                                                  justifyContent="center"
                                                  alignItems="center" width= {850}  height={400} ><CircularProgress
                                    size={80} thickness={4}/></Box> :
                                <AreaChart
                                    data={progressChartData}
                                    width= {850}  height={400}
                                >
                                    <Legend verticalAlign="top"  height={30} align="center" wrapperStyle={{
                                        fontFamily: "Roboto Slab"
                                    }}/>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                           dataKey="name"
                                           // label={{ value: "Number of Agents",
                                           //     position: "insideBottom",
                                           //     dy: 20,
                                           //     style:{fontFamily: "Roboto Slab" }
                                           //  }}
                                           angle={-60} height={60} textAnchor="end"
                                           dy = {30}
                                           dx  = {-5}
                                           // domain={[0,"dataMax"]}
                                           interval="preserveStartEnd"
                                           style={{
                                               fontFamily: "Roboto Slab"
                                           }}
                                    />
                                    <Brush  y={330} dataKey="name"  height={20} stroke='rgba(0, 0, 0, 0.5)' />
                                    <YAxis domain={[0, (maxRatio+maxRatio*0.5)]}
                                           interval="preserveEnd"
                                           padding={{ bottom: 20 }}
                                           tickFormatter={(tick) => {
                                        if(tick === (maxRatio+maxRatio*0.5)){
                                            return "Inf"
                                        }
                                        return `${(tick* 100).toFixed(0)}%`;
                                    }}/>
                                    <Tooltip
                                        formatter={(tick) => {
                                            if(tick === (maxRatio+maxRatio*0.5)){
                                                return "Inf"
                                            }
                                            var value = tick*100
                                            return `${value.toFixed(2)}%`;
                                            // return `${tick* 100}%`;

                                        }}
                                        labelFormatter={(tick) => {
                                            return `#Agents: ${tick}`;}}
                                        wrapperStyle={{ fontFamily: "Roboto Slab" ,  backgroundColor: "white", borderStyle: "ridge"}} />
                                    <Area strokeWidth={4} type="monotone" dataKey="Suboptimality Ratio" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                    {/*<Area type="monotone" dataKey="Solution Cost" stackId="2" stroke="#82ca9d" fill="#82ca9d" />*/}
                                </AreaChart>
                            }
                        </Paper>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openComparator}
                    onClose={()=>setOpenComparator(false)}
                    scroll={scroll}
                    disableScrollLock={ true }
                    fullWidth={true}
                    maxWidth={'md'}
                    PaperProps={{
                        style: { mb: 2,borderRadius: 10 }
                    }}
                >
                    <DialogContent dividers={scroll === 'paper'} sx={{width: 850, height : 430, display : 'flex'}}>
                        <Box sx={{width: '100%'}}>
                            <Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5}}>
                                <Toolbar
                                    sx={{
                                        pl: { sm: 2 },
                                        pr: { xs: 1, sm: 1 }
                                    }}
                                >
                                    <Typography
                                        sx={{ flex: '1 1 100%' }}
                                        variant="h6"
                                        id="tableTitle"
                                        component="div"
                                    >
                                        Comparison between Algorithms on #Agents
                                    </Typography>

                                    <FormControl sx={{ m: 1, minWidth: 120, width:300}}  size = 'small' >
                                        <Select
                                            value={agentQuery}
                                            displayEmpty = {true}
                                            onChange={handleAgentChange}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={"Solution Cost"}>Solution Cost</MenuItem>
                                            <MenuItem value={"Lower Bound"}>Lower Bound</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <IconButton
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={(event)=>{setAgentAnchorEl(event.currentTarget)}}
                                    >
                                        <FilterListIcon />
                                    </IconButton>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={agentAnchorEl}
                                        keepMounted
                                        open={Boolean(agentAnchorEl)}
                                        // onClick ={handleMapFilterChange}
                                        onClose={()=>setAgentAnchorEl(null)}
                                    >
                                        {agentChartAlgorithms.map((algo) => (
                                            <MenuItem key = {algo} value={algo} onClick ={
                                                (event)=>{
                                                    setAgentFilterState({
                                                        ...agentFilterState,
                                                        [event.currentTarget.innerText]: !agentFilterState[event.currentTarget.innerText],
                                                    });
                                                }
                                            } >
                                                <Checkbox
                                                    checked={agentFilterState[algo]}
                                                    onChange={(event) =>{
                                                        setAgentFilterState({
                                                            ...agentFilterState,
                                                            [event.target.name]: event.target.checked,
                                                        });
                                                    }}
                                                    name={algo}
                                                />
                                                <ListItemText primary={algo} />
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Toolbar>
                                {agentLoading ? <Box display="flex"
                                                     justifyContent="center"
                                                     alignItems="center" width={850} height={350}><CircularProgress
                                        size={80}/></Box> :
                                    <AreaChart
                                        data={agentChartDisplayData}
                                        stackOffset="expand"
                                        width={850} height={350}
                                    >
                                        <Legend verticalAlign="top" align="center" wrapperStyle={{
                                            fontFamily: "Roboto Slab"
                                        }}/>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="name" angle={-60} height={50} interval="preserveStartEnd"
                                               textAnchor="end"
                                               dy={30}
                                               dx={-5}
                                               style={{
                                                   fontFamily: "Roboto Slab"
                                               }}
                                        />
                                        {/*<YAxis tickFormatter={toPercent} />*/}
                                        <YAxis domain={[0, (maxAgentResults+maxAgentResults*0.5)]}
                                               interval="preserveEnd"
                                               padding={{ bottom: 20 }}
                                               tickFormatter={(tick) => {
                                                   if(tick === (maxAgentResults+maxAgentResults*0.5)){
                                                       return "Inf"
                                                   }
                                                   return `${(tick* 100).toFixed(1)}%`;
                                               }}/>
                                        <Brush y={290} dataKey="name" height={20} stroke='rgba(0, 0, 0, 0.5)'/>
                                        {/*<Tooltip labelFormatter={(value) => '#Agents: ' + value} wrapperStyle={{*/}
                                        {/*    fontFamily: "Roboto Slab",*/}
                                        {/*    backgroundColor: "white",*/}
                                        {/*    borderStyle: "ridge"*/}
                                        {/*}}/>*/}

                                        <Tooltip
                                            formatter={(tick) => {
                                                if(tick === (maxAgentResults+maxAgentResults*0.5)){
                                                    return "Inf"
                                                }
                                                var value = tick*100
                                                return `${value.toFixed(2)}%`;
                                                // return `${tick* 100}%`;

                                            }}
                                            labelFormatter={(tick) => {
                                                return `#Agents: ${tick}`;}}
                                            wrapperStyle={{ fontFamily: "Roboto Slab" ,  backgroundColor: "white", borderStyle: "ridge"}} />

                                        {agentChartDisplayAlgorithms.map((algo) => (
                                                <Area type="monotone" key={algo} dataKey={algo}
                                                      stroke={color[algorithm_name.indexOf(algo)]}
                                                      fill={color[algorithm_name.indexOf(algo)]}/>
                                            )
                                        )}
                                    </AreaChart>
                                }
                            </Paper>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>

    );
}