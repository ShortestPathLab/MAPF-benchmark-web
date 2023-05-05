import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
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
import { useNavigate,  useLocation } from 'react-router-dom';
import DownloadIcon from "@mui/icons-material/Download";
import {CSVLink} from 'react-csv';
import {useRef} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
    Area,
    AreaChart, Bar,
    BarChart,
    Brush,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CompareIcon from "@mui/icons-material/Compare";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterListIcon from "@mui/icons-material/FilterList";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import randomColor from "randomcolor";
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
        id: 'type_id',
        numeric: true,
        disablePadding: false,
        label: 'Scenarios ID',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'scen_type',
        numeric: false,
        disablePadding: false,
        label: 'Scenarios Type',
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
        id: 'solved_percentage',
        numeric: true,
        disablePadding: false,
        label: '%Instances Solved',
        sortable: true,
        alignment: 'center'
    },
    {
        id: 'closed_percentage',
        numeric: true,
        disablePadding: false,
        label: '%Instances Closed',
        sortable: true,
        alignment: 'center'
    },
    {
        id: 'tool',
        numeric: false,
        disablePadding: false,
        label: 'Download',
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
            <TableRow>
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

const refreshLeader = (callback,id)=>{
    fetch(APIConfig.apiUrl+'/scenario/map/'+id, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            data.forEach(function(element) {
                    element.solved_percentage = element.instances_solved/element.instances;
                    element.closed_percentage = element.instances_closed/element.instances;
                }
            );
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

const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));


export default function ScenarioTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('scen_type');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    const [csvData, setCsvData] = React.useState([]);
    const csvLinkEl = useRef();
    const location = useLocation();
    const [csvFilename, setCsvFilename] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [query_id, setQuery_id] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [searched, setSearched] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [progressChartData, setProgressChartData] = React.useState([]);
    const [agentProgressChartData, setAgentProgressChartData] = React.useState([]);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
    const [agentProgressLoading, setAgentProgressLoading] =  React.useState(true);

    //comparator chart
    const [openComparator, setOpenComparator] = React.useState(false);
    const [algorithm_name, setAlgorithm_name] = React.useState([]);
    const [color,setColor] = React.useState(Array(100)
        .fill()
        .map((currElement, index) =>
            currElement=randomColor({seed : 60 + 4*index})
        ))
    const [scenQuery, setScenQuery] = React.useState('#Instances Closed');
    const [scenQueryResult, setScenQueryResult] = React.useState([]);

    const [mapQuery, setMapQuery] = React.useState('#Instances Closed');
    const [mapQueryResult, setMapQueryResult] = React.useState([]);

    const [mapBarChartAlgorithms, setMapBarChartAlgorithms ] = React.useState([]);
    const [mapBarChartDisplayAlgorithms, setMapBarChartDisplayAlgorithms ] = React.useState([]);
    const [mapBarChartDisplayData, setMapBarChartDisplayData ] = React.useState([]);
    const [mapBarChartOriData, setMapBarChartOriData ] = React.useState([]);
    const [mapFilterState, setMapFilterState] = React.useState({});
    const [mapAnchorEl, setMapAnchorEl] = React.useState(null);
    const [mapLoading, setMapLoading] =  React.useState(true);


    const [agentQuery, setAgentQuery] = React.useState('#Instances Closed');
    const [agentQueryResult, setAgentQueryResult] = React.useState([]);
    const [agentChartAlgorithms, setAgentChartAlgorithms ] = React.useState([]);
    const [agentChartDisplayAlgorithms, setAgentChartDisplayAlgorithms ] = React.useState([]);
    const [agentChartDisplayData, setAgentChartDisplayData ] = React.useState([]);
    const [agentChartOriData, setAgentChartOriData ] = React.useState([]);
    const [agentFilterState, setAgentFilterState] = React.useState({});
    const [agentAnchorEl, setAgentAnchorEl] = React.useState(null);
    const [agentLoading, setAgentLoading] =  React.useState(true);
    const [progressColor] = React.useState({'Unknown': "#BF0A30", 'Solved': "#F9812A", 'Closed': "#4CBB17"  } )


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            // console.log( row.type_id);
            return row.type_id.toString().includes(searchedVal);
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
            setData(data)
            setRows(data)
        },location.state.mapId);

        const interval = setInterval(() => {
            refreshLeader((data)=>{
                setData(data)
                setRows(data)
            },location.state.mapId)
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

    const navigate = useNavigate();

    const navigateToInstance = (event, id,scen_id,scen_type,num_agents) => {
        // 👇️ navigate to /contacts

        navigate('/instances',{ state: { scenId: id, scenTypeID:scen_id, scenType:scen_type, mapName:location.state.mapName,
                mapId:location.state.mapId,
                numAgents: num_agents}, replace: false} )
        event.stopPropagation();
        // state={instance_id : id}, replace: false});
    };


    const navigateToDownload =  (event, object_id,scen_type,type_id) => {
        setQuery_id(object_id);
        setLoading(true);
        setCsvFilename(`${location.state.mapName}_${scen_type}_${type_id}`);
        event.stopPropagation();
    };

    // const navigateToDownload =  (object_id,scen_type,type_id) => {
    //     // const data = await getCSVData();
    //
    //     setCsvFilename(`${location.state.mapName}_${scen_type}_${type_id}`);
    //     fetch('http://localhost:8080/api/instance/DownloadInstance/'+object_id, {method: 'GET'})
    //         .then(res => res.json())
    //         .then(data => {
    //             setCsvData(data);
    //         });
    // };
    React.useEffect(() => {
        if(loading&&query_id !==''){
            fetch(APIConfig.apiUrl+'/instance/DownloadInstance/'+query_id, {method: 'GET'})
                .then(res => res.json())
                .then(data => {
                    setCsvData(data);
                    setQuery_id('');
                }).catch(err => console.log(err));
        }
    }, [loading]);

    React.useEffect(() => {
        if(csvData.length !== 0){
            setLoading(false);
            csvLinkEl.current.link.click();
            setCsvData([]);
        }
    }, [csvData]);


    const handleClickOpen  = (event,scrollType)  => {
        setAgentProgressLoading(true);
        setOpen(true);
        setScroll(scrollType);
        fetch(APIConfig.apiUrl+'/instance/test/'+location.state.mapId, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setAgentProgressLoading(false);
                setAgentProgressChartData(data);
            })
            .catch(err => console.error(err));
        var progressChartData = [];
        data.forEach(element=>progressChartData.push({
            name: (element.scen_type ==="random"? "rand": "even") + " "+ element.type_id,
            total: element.instances,
            Closed: element.instances_closed,
            Solved: element.instances_solved - element.instances_closed,
            Unknown: element.instances - element.instances_solved,
        }));
        setProgressChartData(progressChartData);

        event.stopPropagation();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
    const getPercent = (value, total) => {
        const ratio = total > 0 ? value / total : 0;

        return toPercent(ratio, 2);
    };
    const renderTooltipContent = (o) => {
        const {active, payload, label } = o;
        if (active && payload && payload.length) {
            const total = payload.reduce((result, entry) => result + entry.value, 0);
            return (
                <div className="customized-tooltip-content" style={{paddingLeft: 10, paddingRight: 10}}>
                    <p className="total">{`${label} (Total: ${total})`}</p>
                    <ul className="list">
                        {payload.map((entry, index) => (
                            <li key={`item-${index}`} style={{color: entry.color}}>
                                {`${entry.name}: ${entry.value} (${getPercent(entry.value, total)})`}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };


    const renderAgentTooltipContent = (o) => {
        const {active, payload, label } = o;
        if (active && payload && payload.length) {
            // console.log(payload);
            const total = payload[0].payload.total;
            payload.sort((a, b) => a.name > b.name ? 1 : -1);
            return (
                <div className="customized-tooltip-content" style={{paddingLeft: 10, paddingRight: 10}}>
                    <p className="total">{`#Agents: ${label} (Total: ${total})`}</p>
                    <ul className="list">
                        {payload.map((entry, index) => (
                            <li key={`item-${index}`} style={{color: entry.color}}>
                                {`${entry.name}: ${Math.round(entry.value*total)} (${getPercent(Math.round(entry.value*total), total)})`}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    const renderScenTooltipContent = (o) => {
        const {active, payload, label } = o;
        if (active && payload && payload.length) {
            // console.log(payload);
            const total = payload[0].payload.total;
            return (
                <div className="customized-tooltip-content" style={{paddingLeft: 10, paddingRight: 10}}>
                    <p className="total">{`${label} (Total: ${total})`}</p>
                    <ul className="list">
                        {payload.map((entry, index) => (
                            <li key={`item-${index}`} style={{color: entry.color}}>
                                {`${entry.name}: ${Math.round(entry.value*total)} (${getPercent(Math.round(entry.value*total), total)})`}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
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

    const handleMapChange = (event) => {
        setMapQuery(event.target.value);
        setMapLoading(true);
        var map_API = '';
        if(event.target.value ==='#Instances Closed'){
            map_API = APIConfig.apiUrl+'/algorithm/getScenClosedInfo/' + location.state.mapId;
        }else if (event.target.value === '#Instances Solved'){
            map_API = APIConfig.apiUrl+'/algorithm/getScenSolvedInfo/' + location.state.mapId;
        }else if (event.target.value === '#Best Lower-bounds'){
            map_API = APIConfig.apiUrl+'/algorithm/getScenLowerInfo/' + location.state.mapId;
        }else{
            map_API = APIConfig.apiUrl+'/algorithm/getScenSolutionInfo/' + location.state.mapId;
        }

        fetch(map_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setMapQueryResult(data);
            })
            .catch(err => console.error(err));

    };

    const handleAgentChange = (event) => {
        setAgentQuery(event.target.value);
        setAgentLoading(true);
        var agent_API = '';
        if(event.target.value ==='#Instances Closed'){
            agent_API = APIConfig.apiUrl+'/algorithm/getAgentClosedInfo/' + location.state.mapId;
        }else if (event.target.value === '#Instances Solved'){
            agent_API = APIConfig.apiUrl+'/algorithm/getAgentSolvedInfo/' + location.state.mapId;
        }else if (event.target.value === '#Best Lower-bounds'){
            agent_API = APIConfig.apiUrl+'/algorithm/getAgentLowerInfo/' + location.state.mapId;
        }else{
            agent_API = APIConfig.apiUrl+'/algorithm/getAgentSolutionInfo/' + location.state.mapId;
        }
        fetch(agent_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setAgentQueryResult(data);
            })
            .catch(err => console.error(err));

    };

    React.useEffect(() => {
        if(algorithm_name.length > 0) {

            // var agent_data = [];
            // data.forEach(
            //     function(element) {
            //         var num_of_agents = element.instances;
            //         for ( var i = 1; i <= num_of_agents; i ++){
            //             if(agent_data.length < i){
            //                 agent_data.push({name:i,total : 1})
            //             }else{
            //                 agent_data[i-1].total = agent_data[i-1].total +1;
            //             }
            //         }
            //     }
            // );
            setAgentLoading(true);
            setMapLoading(true);
            setAgentQuery('#Instances Closed');
            setMapQuery('#Instances Closed');
            var closed_API = APIConfig.apiUrl+'/algorithm/getScenClosedInfo/' + location.state.mapId;
            var agent_chart_API = APIConfig.apiUrl+'/algorithm/getAgentClosedInfo/' + location.state.mapId;
            Promise.all([
                fetch(closed_API, {method: 'GET'}),
                fetch(agent_chart_API, {method: 'GET'})
            ])
                .then((values) => {
                    return Promise.all(values.map((r) => r.json()))
                })
                .then(([closed_data,
                           agent_closed_data
                       ]) => {
                    setMapQueryResult(closed_data);
                    setAgentQueryResult(agent_closed_data);
                }).catch(err => console.error(err));
        }
    }, [algorithm_name]);



    React.useEffect(() => {
        if(mapQueryResult.length >0){

            var mapChartData = [];
            [...new Set(data.map(item => (item.scen_type ==="random"? "rand": "even") + " "+ item.type_id ))].forEach(element=>
                mapChartData.push({name:element})
            );
            // console.log(mapChartData);

            const algorithm = new Set();
            for( var i = 0; i < mapQueryResult.length; i ++){
                // iterate map
                var mapIndex = mapChartData.findIndex(x => x.name === (( mapQueryResult[i].scen_type ==="random"? "rand": "even") + " "+  mapQueryResult[i].type_id));
                for(var j = 0 ; j < mapQueryResult[i].solved_instances.length; j ++){
                    var algo = mapQueryResult[i].solved_instances[j]
                    algorithm.add(algo.algo_name);
                    mapChartData[mapIndex][algo.algo_name] = algo.count/algo.total;
                    mapChartData[mapIndex]['total'] = algo.total;
                }
            }
            var unique_key = [];
            var check_box_state={};
            algorithm.forEach(function(algo){
                unique_key.push(algo);
                check_box_state[algo]= true;
            })
            unique_key.sort();
            setMapFilterState(check_box_state);
            setMapBarChartAlgorithms(unique_key);
            setMapBarChartDisplayAlgorithms(unique_key);
            setMapBarChartDisplayData(mapChartData);
            setMapBarChartOriData(mapChartData);
            setMapLoading(false);
        }
    }, [mapQueryResult]);

    React.useEffect(() => {
        var displayData = []
        // console.log(solvedChartOriData);
        mapBarChartOriData.forEach(function(element) {
            var mapData  = {}
            mapData['name'] = element['name'];
            mapData['total'] = element['total'];
            mapBarChartAlgorithms.forEach(function(algo){
                if(mapFilterState[algo]){
                    mapData[algo] = element[algo]
                }
            })
            displayData.push(mapData);
        })
        // console.log(displayData);
        var displayKey =[]
        mapBarChartAlgorithms.forEach(function(algo){
            if(mapFilterState[algo]){
                displayKey.push(algo);
            }
        })
        setMapBarChartDisplayAlgorithms(displayKey);
        setMapBarChartDisplayData(displayData);
    }, [mapFilterState]);


    React.useEffect(() => {
        if(agentQueryResult.length >0){
            var agent_data = [];
            data.forEach(
                function(element) {
                    var num_of_agents = element.instances;
                    for ( var i = 1; i <= num_of_agents; i ++){
                        if(agent_data.length < i){
                            agent_data.push({name:i,total : 1})
                        }else{
                            agent_data[i-1].total = agent_data[i-1].total +1;
                        }
                    }
                }
            );
            const algorithm = new Set();
            for( var i = 0; i < agentQueryResult.length; i ++){
                // iterate map
                var agentIndex = agentQueryResult[i].agents -1;

                for(var j = 0 ; j < agentQueryResult[i].solved_instances.length; j ++){
                    var algo =  agentQueryResult[i].solved_instances[j]
                    algorithm.add(algo.algo_name);
                    agent_data[agentIndex][algo.algo_name] = algo.count/agent_data[agentIndex].total;
                }
            }
            var unique_key = [];
            var check_box_state={};
            algorithm.forEach(function(algo){
                unique_key.push(algo);
                check_box_state[algo]= true;
                agent_data.forEach(function(element){
                    if( element[algo] === undefined){
                        element[algo] = 0;
                    }
                });
            })
            unique_key.sort();
            setAgentFilterState(check_box_state);
            unique_key.sort((a, b) => {
                var value_a = 0;
                var value_b = 0;
                agent_data.forEach(function (element){
                    value_a += element[a];
                    value_b += element[b];
                })
                if( value_b < value_a){
                    return -1;
                }
                if( value_b > value_a){
                    return 1;
                }
                return 0;
            });

            setAgentChartAlgorithms(unique_key);
            setAgentChartDisplayAlgorithms(unique_key);
            setAgentChartDisplayData(agent_data);
            setAgentChartOriData(agent_data);
            setAgentLoading(false);
            // console.log("print data ");
            // console.log(agent_data);
        }
    }, [agentQueryResult]);


    React.useEffect(() => {
        var displayData = []
        // console.log(solvedChartOriData);
        agentChartOriData.forEach(function(element) {
            var mapData  = {}
            mapData['name'] = element['name'];
            mapData['total'] = element['total'];
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
        // console.log(displayData)
        setAgentChartDisplayAlgorithms(displayKey);
        setAgentChartDisplayData(displayData);
    }, [agentFilterState]);


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
            <Box
                sx={{ minWidth : 600, position: "absolute", width: '96%', paddingLeft:"2%", top:"300px",opacity:"0.95"
                }}>
            <Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5 }}>
                {/*<EnhancedTableToolbar numSelected={selected.length}/>*/}
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 }
                    }}
                >
                    {/*<IconButton*/}
                    {/*    size ='medium'*/}
                    {/*    onClick={() => {setDense(!dense)}*/}
                    {/*    } >*/}
                    {/*    { dense ? <ZoomOutMapIcon fontSize='medium'/>:<ZoomInMapIcon fontSize='medium'/> }*/}
                    {/*</IconButton>*/}
                    {/*<IconButton*/}
                    {/*    size ='medium'*/}
                    {/*    onClick={(event) =>handleClickOpen(event,'paper') } >*/}
                    {/*    <ShowChartIcon fontSize ='medium'/>*/}
                    {/*</IconButton>*/}

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
                                onClick={(event) =>{handleClickOpen(event,'paper');
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
                        sx={{ flex: '1 1 100%' ,paddingLeft :'10px'}}
                        component="div"
                    >
                        <Typography
                            sx={{ display: "inline-block",verticalAlign: "middle" }}
                            variant="h6"
                            component="div"
                        >
                            {capitalizeFirstLetter(location.state.mapName)}&nbsp;
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
                        placeholder="Scenario ID"
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
                        sx={{ minWidth: 600, width : '100%'}}
                        size={dense ? 'small' : 'medium'}
                        style={{ tableLayout: "auto" }}
                    >
                        <colgroup>
                            <col style={{minWidth: "160px"}} width="10%" />
                            <col style={{minWidth: "200px"}} width="10%" />
                            <col style={{minWidth: "100px"}} width="10%" />
                            <col style={{minWidth: "200px"}} width="30%" />
                            <col style={{minWidth: "200px"}} width="30%" />
                            <col style={{minWidth: "200px"}} width="10%" />
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
                                            onClick={(event) => navigateToInstance(event,row.id,row.type_id,row.scen_type,row.instances)}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                                align = "left"
                                            >
                                                {row.type_id}
                                            </TableCell>
                                            <TableCell align="left"  >{row.scen_type}</TableCell>
                                            <TableCell align="left" >{row.instances}</TableCell>
                                            <TableCell align="center" >
                                                <BorderLinearProgress value={row.solved_percentage*100} />
                                                {/*<ProgressBar animated now={row.solution_uploaded/row.problems*100} label={`${row.solution_uploaded/row.problems*100}%`} />*/}
                                            </TableCell>
                                            <TableCell align="center" >
                                                <BorderLinearProgress value={row.closed_percentage*100} />
                                                {/*<ProgressBar animated now={row.solution_uploaded/row.problems*100} label={`${row.solution_uploaded/row.problems*100}%`} />*/}
                                            </TableCell>
                                            <TableCell align="center" >
                                                {/*<Button variant="contained" onClick={routeChange}>View</Button>*/}
                                                {/*<Button variant="contained" onClick={() => navigateToInstance(row.id,row.type_id,row.scen_type)}>View</Button>*/}
                                                {/*<IconButton onClick={(event) => navigateToInstance(event, row.id,row.type_id,row.scen_type)}>*/}
                                                {/*    <VisibilityIcon/>*/}
                                                {/*</IconButton>*/}
                                                <IconButton onClick={(event) => navigateToDownload(event, row.id,row.scen_type,row.type_id)}>
                                                    {loading && row.id === query_id?  <CircularProgress size={24} />:<DownloadIcon/>}
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
                                    <TableCell colSpan={6} />
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
                open={open}
                onClose={handleClose}
                scroll={scroll}
                disableScrollLock={ true }
                fullWidth={true}
                maxWidth={'md'}
                PaperProps={{
                    style: { mb: 2,borderRadius: 10 }
                }}
            >

                <DialogContent dividers={scroll === 'paper'} sx={{width: 850, height : 900}}>
                    {/*<ResponsiveContainer width="98%"  height={400}>*/}
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
                            Success Rate on Scenarios ({capitalizeFirstLetter(location.state.mapName)})&nbsp;
                        </Typography>
                    </Toolbar>
                    <AreaChart
                        data={progressChartData}
                        stackOffset="expand"
                        width= {850}  height={400}
                    >
                        {/*<Legend verticalAlign="top"  align="center" wrapperStyle={{*/}
                        {/*    fontFamily: "Roboto Slab"*/}
                        {/*}}/>*/}
                        <Legend verticalAlign="top"  align="center" height={30} wrapperStyle={{
                            fontFamily: "Roboto Slab"
                        }} payload={['Solved','Closed','Unknown'].sort().map(name => ({ value: name,
                            // id: item.name,
                            type: "square", color:progressColor[name] }))}/>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-60} height={100} interval={2}
                               textAnchor="end"
                               dy = {30}
                               dx  = {-5}
                               style={{
                                   fontFamily: "Roboto Slab"
                               }}
                        />
                        {/*<YAxis tickFormatter={toPercent} />*/}
                        <YAxis  tickFormatter={(tick) => {
                            return `${tick* 100}%`;
                        }}/>
                        <Brush y={290} dataKey="name"  height={20} stroke='rgba(0, 0, 0, 0.5)' />
                        <Tooltip content={renderTooltipContent}  wrapperStyle={{ fontFamily: "Roboto Slab" ,  backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px"}} />
                        <Area type="monotone" dataKey="Closed" stackId="1" stroke="#4CBB17" fill="#4CBB17" fillOpacity={0.8} />
                        <Area type="monotone" dataKey="Solved" stackId="1" stroke="#F9812A" fill="#F9812A" fillOpacity={0.8}/>
                        <Area type="monotone" dataKey="Unknown" stackId="1" stroke="#BF0A30" fill="#BF0A30" fillOpacity={0.8} />
                    </AreaChart>
                    </Paper>
                    <Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5}}>
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 }
                        }}
                    >
                        <Typography
                            sx={{ flex: '1 1 100%' ,paddingLeft :'10px'}}
                            component="div"
                        >

                            <Typography
                                sx={{ display: "inline-block",verticalAlign: "middle" }}
                                variant="h6"
                                component="div"
                            >
                                Success Rate on #Agents ({capitalizeFirstLetter(location.state.mapName)})&nbsp;
                            </Typography>
                            {/*<Typography*/}
                            {/*    sx={{ display: "inline-block", width : 50 ,verticalAlign: "middle"}}*/}
                            {/*    component="img"*/}
                            {/*    src={`${process.env.PUBLIC_URL}/mapf-svg/`+ location.state.mapName+`.svg`}*/}
                            {/*>*/}

                            {/*</Typography>*/}

                        </Typography>

                    </Toolbar>
                        {agentProgressLoading ? <Box display="flex"
                                                     justifyContent="center"
                                                     alignItems="center" width={850} height={350}><CircularProgress
                                size={80}/></Box> :
                            <AreaChart
                                data={agentProgressChartData}
                                stackOffset="expand"
                                width={850} height={350}
                            >
                                {/*<Legend verticalAlign="top" align="center" wrapperStyle={{*/}
                                {/*    fontFamily: "Roboto Slab"*/}
                                {/*}}/>*/}
                                <Legend verticalAlign="top"  align="center" height={30} wrapperStyle={{
                                    fontFamily: "Roboto Slab"
                                }} payload={['Solved','Closed','Unknown'].sort().map(name => ({ value: name,
                                    // id: item.name,
                                    type: "square", color:progressColor[name] }))}/>
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
                                <YAxis tickFormatter={(tick) => {
                                    return `${tick * 100}%`;
                                }}/>
                                <Brush y={290} dataKey="name" height={20} stroke='rgba(0, 0, 0, 0.5)'/>
                                <Tooltip content={renderTooltipContent} wrapperStyle={{
                                    fontFamily: "Roboto Slab",
                                    backgroundColor: "white",
                                    borderStyle: "ridge",
                                    paddingLeft: "10px",
                                    paddingRight: "10px"
                                }}/>
                                <Area type="monotone" dataKey="Closed" stackId="1" stroke="#4CBB17" fill="#4CBB17" fillOpacity={0.8}/>
                                <Area type="monotone" dataKey="Solved" stackId="1" stroke="#F9812A" fill="#F9812A" fillOpacity={0.8}/>
                                <Area type="monotone" dataKey="Unknown" stackId="1" stroke="#BF0A30" fill="#BF0A30" fillOpacity={0.8}/>
                            </AreaChart>
                        }
                    </Paper>
                    {/*</ResponsiveContainer>*/}
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
                    <DialogContent dividers={scroll === 'paper'} sx={{width: 850, height : 550, display : 'flex'}}>
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
                                        Comparison between Algorithms on Scenarios ({capitalizeFirstLetter(location.state.mapName)})&nbsp;
                                    </Typography>

                                    <FormControl sx={{ m: 1, minWidth: 120, width:300}}  size = 'small' >
                                        <Select
                                            value={mapQuery}
                                            displayEmpty = {true}
                                            onChange={handleMapChange}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={"#Instances Closed"}>#Instances Closed</MenuItem>
                                            <MenuItem value={"#Instances Solved"}>#Instances Solved</MenuItem>
                                            <MenuItem value={"#Best Lower-bounds"}>#Best Lower-bounds</MenuItem>
                                            <MenuItem value={"#Best Solutions"}>#Best Solutions</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <IconButton
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={(event)=>{setMapAnchorEl(event.currentTarget)}}
                                    >
                                        <FilterListIcon />
                                    </IconButton>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={mapAnchorEl}
                                        keepMounted
                                        open={Boolean(mapAnchorEl)}
                                        // onClick ={handleMapFilterChange}
                                        onClose={()=>setMapAnchorEl(null)}
                                    >
                                        {mapBarChartAlgorithms.map((algo) => (
                                            <MenuItem key = {algo} value={algo} onClick ={
                                                (event)=>{
                                                    setMapFilterState({
                                                        ...mapFilterState,
                                                        [event.currentTarget.innerText]: !mapFilterState[event.currentTarget.innerText],
                                                    });
                                                }
                                            } >
                                                <Checkbox
                                                    checked={mapFilterState[algo]}
                                                    onChange={(event) =>{
                                                        setMapFilterState({
                                                            ...mapFilterState,
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
                                {mapLoading ? <Box width="100%" display="flex"
                                                   justifyContent="center"
                                                   alignItems="center" height={500}><CircularProgress
                                        size={80}/></Box> :
                                    <ResponsiveContainer width="100%" height={500}>
                                        <BarChart
                                            data={mapBarChartDisplayData}
                                        >
                                            <Legend verticalAlign="top" align="center" wrapperStyle={{
                                                fontFamily: "Roboto Slab"
                                            }}/>
                                            <Brush y={390} dataKey="name" height={20} stroke='rgba(0, 0, 0, 0.5)'/>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            {/*<XAxis dataKey="name" angle={-60} height={80} interval={0} textAnchor="end"*/}
                                            {/*       tickFormatter={(tick) => tick === 0 ? "" : tick.substring(0, 5) + "..."}*/}
                                            {/*       dy = {30}*/}
                                            {/*       style={{*/}
                                            {/*           fontFamily: "Roboto Slab"*/}
                                            {/*       }}*/}
                                            {/*/>*/}
                                            <XAxis dataKey="name" angle={-60} height={100} interval={2}
                                                   textAnchor="end"
                                                   dy={30}
                                                   dx={-5}
                                                   style={{
                                                       fontFamily: "Roboto Slab"
                                                   }}
                                            />
                                            <YAxis tickFormatter={(tick) => {
                                                return `${tick * 100}%`;
                                            }}/>
                                            <Tooltip content={renderScenTooltipContent} wrapperStyle={{
                                                backgroundColor: "white",
                                                borderStyle: "ridge",
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                fontFamily: "Roboto Slab"
                                            }}
                                                     formatter={(tick) => {
                                                         var value = tick * 100
                                                         return `${value.toFixed(2)}%`;
                                                     }}
                                            />
                                            {mapBarChartDisplayAlgorithms.map((algo) => (
                                                    <Bar key={algo} dataKey={algo}
                                                         stroke={color[algorithm_name.indexOf(algo)]}
                                                         fill={color[algorithm_name.indexOf(algo)]}/>
                                                )
                                            )}
                                        </BarChart>
                                    </ResponsiveContainer>
                                }
                            </Paper>


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
                                        Comparison between Algorithms on #Agents ({capitalizeFirstLetter(location.state.mapName)})&nbsp;
                                    </Typography>

                                    <FormControl sx={{ m: 1, minWidth: 120, width:300}}  size = 'small' >
                                        <Select
                                            value={agentQuery}
                                            displayEmpty = {true}
                                            onChange={handleAgentChange}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={"#Instances Closed"}>#Instances Closed</MenuItem>
                                            <MenuItem value={"#Instances Solved"}>#Instances Solved</MenuItem>
                                            <MenuItem value={"#Best Lower-bounds"}>#Best Lower-bounds</MenuItem>
                                            <MenuItem value={"#Best Solutions"}>#Best Solutions</MenuItem>
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
                                {agentLoading ? <Box  display="flex"
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
                                        }} payload={[...agentChartDisplayAlgorithms].sort().map(name => ({ value: name,
                                                    // id: item.name,
                                                    type: "square", color:color[algorithm_name.indexOf(name)] }))}
                                        />
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
                                        <YAxis tickFormatter={(tick) => {
                                            return `${tick * 100}%`;
                                        }}/>
                                        <Brush y={290} dataKey="name" height={20} stroke='rgba(0, 0, 0, 0.5)'/>
                                        <Tooltip content={renderAgentTooltipContent} wrapperStyle={{
                                            fontFamily: "Roboto Slab",
                                            backgroundColor: "white",
                                            borderStyle: "ridge",
                                            paddingLeft: "10px",
                                            paddingRight: "10px"
                                        }}/>
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