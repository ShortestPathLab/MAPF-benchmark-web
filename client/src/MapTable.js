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
import {useNavigate} from 'react-router-dom';
import DownloadIcon from "@mui/icons-material/Download";
import {CSVLink} from "react-csv";
import {useRef} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
    Area,
    AreaChart, Bar,
    BarChart,
    Brush,
    CartesianGrid, Label,
    Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import FilterListIcon from "@mui/icons-material/FilterList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import DatasetLinkedIcon from "@mui/icons-material/DatasetLinked";
import MenuIcon from '@mui/icons-material/Menu';
import CompareIcon from '@mui/icons-material/Compare';
import randomColor from "randomcolor";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { APIConfig } from './config.js';
import Link from "@mui/material/Link";
import InfoIcon from "@mui/icons-material/Info";
import {MenuList, Popover} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const angle = {
    'Warehouse': -40,
    'City' : 0,
    'Empty' : 50,
    'Game' : 110,
    'Maze' : 0,
    'Random' : 0,
    'Room' : -110
}

const infoDescriptionText = {
    'domainProgress':{
        'description':
            "This plot tracks the progress made by the state-of-the-art (i.e., all algorithms together) in each domain of the benchmark. " +
            "The figure shows the success rate (i.e., percentage) of closed, solved, and unknown instances in each domain. " +
            "The objective here is to identify the domains that are hard to solve with existing MAPF algorithms, so that more attention can be paid to these. " ,
        'c_axis': "The benchmark contains many different maps, each map is associate with a domain (see Type column). " +
            "The category-axis displays the names of the domains available in the benchmark.",
        'v_axis': "The value-axis shows the success rate (i.e., percentage) of closed, solved, and unknown instances in each map. " +
            "The success rate is calculated according to the total number of instances in each domain.",
        'comment':  "To indicate the progress, all instances in each map are categorised into three types: " +
            "(i) closed instance: the instance has the same best lower bound and best solution cost " +
            "(indicating that the solution cannot be further improved); (ii) solved instance: the instance has a feasible solution reported, but the current best lower bound " +
            "is less than the best solution cost (i.e., improvement may be possible); and (iii) unknown instance: the instance has no solution reported."
    },
    'domainCompare-#Instances Closed':{
        'description':"This plot compares the number of instances closed by MAPF algorithms for each domain of the benchmark. " +
            "For a particular algorithm, the instance is closed if the algorithm reports the same lower bound and solution cost. "+
            "Algorithms that do not report lower bound data are omitted from this plot. " +
            "The number of instances closed indicates the performance of algorithms for finding and proving optimal solution (i.e., higher the better). ",
        'c_axis': "The benchmark contains many different maps, each map is associate with a domain (see Type column). " +
            "The category-axis displays the names of the domains available in the benchmark.",
        'v_axis': "The value-axis displays the number of instances closed for each domain. " +
            "The percentage ratio is shown, calculated based on the total number of instances in each domain."
    },
    'domainCompare-#Instances Solved':{
        'description':"This plot compares the number of instances solved by MAPF algorithms for each domain of the benchmark. " +
            "The number of instances solved indicates the performance of algorithms while ignoring solution quality (i.e., higher the better). " +
            "The figure compare between different algorithms and identify challenging domains.",
        'c_axis': "The benchmark contains many different maps, each map is associate with a domain (see Type column). " +
            "The category-axis displays the names of the domains available in the benchmark.",
        'v_axis': "The value-axis displays the number of instances solved for each domain. " +
            "The percentage ratio is shown, calculated based on the total number of instances in each domain."
    },
    'domainCompare-#Best Lower-bounds':{
        'description':"This plot compares the number of instances that have achieved the best lower bound (reported by any algorithm) " +
            "among MAPF algorithms for each domain of the benchmark. " +
            "The number of instances achieving the best lower bound reflects the availability of optimal and bounded-suboptimal algorithms for proving optimality (i.e., higher the better). " +
            "The purpose of this plot is to compare these algorithms and identify challenging domains. " +
            "Algorithms that do not report lower bound data are omitted from this plot.",
        'c_axis': "The benchmark contains many different maps, each map is associate with a domain (see Type column). " +
            "The category-axis displays the names of the domains available in the benchmark.",
        'v_axis': "The value-axis displays the number of instances that have achieved the best lower bound for each domain. " +
            "The percentage ratio is shown, calculated based on the total number of instances in each domain. "
            // "For instances where no lower bound is reported, no algorithm can achieve the best lower bound in such cases."
    },
    'domainCompare-#Best Solutions':{
        'description':"This plot compares the number of instances that have achieved the best solution (reported by any algorithm) " +
            "among MAPF algorithms for each domain of the benchmark. " +
            "The number of instances achieving the best solution reflects the solution quality reported by different algorithms (i.e., higher the better). " +
            "The figure compare between different algorithms and identify challenging scenarios. " +
            "Algorithms that do not report solution data are omitted from this plot.",
        'c_axis': "The benchmark contains many different maps, each map is associate with domain (see Type column). " +
            "The category-axis displays the names of the domains available in the benchmark.",
        'v_axis': "The value-axis displays the number of instances that have achieved the best solution for each domain. " +
            "The percentage ratio is shown, calculated based on the total number of instances in each domain. "
            // "For instances where no solution is reported, no algorithm can achieve the best solution in such cases."
    },


    'mapProgress':{
        'description':
            "This plot tracks the progress made by the state-of-the-art (i.e., all algorithms together) for each map of the benchmark " +
            "The figure shows the success rate (i.e., percentage) of closed, solved, and unknown instances for different maps. " +
            "The objective here is to allow the researchers to focus MAPF research on the map that are challenging.",
        'x_axis': "The x-axis displays the names of the maps available in the benchmark.",
        'y_axis': "The y-axis shows the success rate (percentage) of closed, solved, and unknown instances for different maps. " +
            "The success rate is calculated according to the total number of instances in each map.",
        'comment':  "To indicate the progress, all instances in each map are categorised into three types: " +
            "(i) closed instance: the instance has the same best lower bound and best solution cost " +
            "(indicating that the solution cannot be further improved); (ii) solved instance: the instance has a feasible solution reported, but the current best lower bound " +
            "is less than the best solution cost (i.e., improvement may be possible); and (iii) unknown instance: the instance has no solution reported."
    },


    'mapCompare-#Instances Closed':{
        'description':"This plot compares the number of instances closed by MAPF algorithms " +
            "for different maps in the benchmark. " +
            "For a particular algorithm, the instance is closed if the algorithm reports the same lower bound and solution cost. "+
            "Algorithms that do not report lower bound data are omitted from this plot. " +
            "The number of instances closed indicates the performance of algorithms for finding and proving optimal solution (i.e., higher the better). ",
        'x_axis': "The x-axis displays the names of the maps available in the benchmark.",
        'y_axis': "The y-axis displays the number of instances closed for different maps. " +
            "The percentage ratio is shown, calculated based on the number of instances available for each map."
    },
    'mapCompare-#Instances Solved':{
        'description':"This plot compares the number of instances solved by MAPF algorithms " +
            "for different maps in the benchmark. " +
            "The number of instances solved indicates the performance of algorithms while ignoring solution quality (i.e., higher the better). " +
            "The figure compare between different algorithms and identify challenging maps.",
        'x_axis': "The x-axis displays the names of the maps available in the benchmark.",
        'y_axis': "The y-axis displays the number of instances solved for different maps. " +
            "The percentage ratio is shown, calculated based on the number of instances available for each map."
    },
    'mapCompare-#Best Lower-bounds':{
        'description':"This plot compares the number of instances that have achieved the best lower bound (reported by any algorithm) among MAPF algorithms " +
            "for different maps in the benchmark. " +
            "The number of instances achieving the best lower bound reflects the availability of optimal and bounded-suboptimal algorithms for proving optimality (i.e., higher the better). " +
            "The purpose of this plot is to compare these algorithms and identify challenging maps. " +
            "Algorithms that do not report lower bound data are omitted from this plot.",
        'x_axis': "The x-axis displays the names of the maps available in the benchmark.",
        'y_axis': "The y-axis displays the number of instances that have achieved the best lower bound for different maps. " +
            "The percentage ratio is shown, calculated based on the number of instances available for each map. "
            // "For instances where no lower bound is reported, no algorithm can achieve the best lower bound in such cases."
    },
    'mapCompare-#Best Solutions':{
        'description':"This plot compares the number of instances that have achieved the best solution (reported by any algorithm) among MAPF algorithms " +
            "for different maps in the benchmark. " +
            "The number of instances achieving the best solution reflects the solution quality reported by different algorithms (i.e., higher the better). " +
            "The figure compare between different algorithms and identify challenging maps. " +
            "Algorithms that do not report solution data are omitted from this plot.",
        'x_axis': "The x-axis displays the names of the maps available in the benchmark.",
        'y_axis': "The y-axis displays the number of instances that have achieved the best solution for different maps. " +
            "The percentage ratio is shown, calculated based on the number of instances available for each map. "
            // "For instances where no solution is reported, no algorithm can achieve the best solution in such cases."
    },
}

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
        id: 'details',
        numeric: false,
        disablePadding: false,
        label: 'Details',
        sortable: false,
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



const refreshLeader = (callback)=>{
    fetch(APIConfig.apiUrl + '/map', {method: 'GET'})
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


export default function MapTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('map_type');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    const [csvData, setCsvData] = React.useState([]);
    const [csvFilename, setCsvFilename] = React.useState([]);
    const csvLinkEl = useRef();
    const [query_id, setQuery_id] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [benchmarkLoading, setBenchmarkLoading] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [searched, setSearched] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [progressChartData, setProgressChartData] = React.useState([]);
    const [domainProgressChartData, setDomainProgressChartData] = React.useState([]);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
    const [openComparator, setOpenComparator] = React.useState(false);
    const [algorithm_name, setAlgorithm_name] = React.useState([]);

    const [progressColor] = React.useState({'Unknown': "#BF0A30", 'Solved': "#F9812A", 'Closed': "#4CBB17"  } )
    const [color] = React.useState(Array(100)
        .fill()
        .map((currElement, index) =>
            currElement=randomColor({seed : 60 + 4*index})
        ))
    const [mapQuery, setMapQuery] = React.useState('#Instances Closed');
    const [mapQueryResult, setMapQueryResult] = React.useState([]);
    const [mapBarChartAlgorithms, setMapBarChartAlgorithms ] = React.useState([]);
    const [mapBarChartDisplayAlgorithms, setMapBarChartDisplayAlgorithms ] = React.useState([]);
    const [mapBarChartDisplayData, setMapBarChartDisplayData ] = React.useState([]);
    const [mapBarChartOriData, setMapBarChartOriData ] = React.useState([]);
    const [mapFilterState, setMapFilterState] = React.useState({});
    const [mapAnchorEl, setMapAnchorEl] = React.useState(null);
    const [mapLoading, setMapLoading] =  React.useState(true);

    const [domainQuery, setDomainQuery] = React.useState('#Instances Closed');
    const [domainQueryResult, setDomainQueryResult] = React.useState([]);
    const [domainBarChartAlgorithms, setDomainBarChartAlgorithms ] = React.useState([]);
    const [domainBarChartDisplayAlgorithms, setDomainBarChartDisplayAlgorithms ] = React.useState([]);
    const [domainBarChartDisplayData, setDomainBarChartDisplayData ] = React.useState([]);
    const [domainBarChartOriData, setDomainBarChartOriData ] = React.useState([]);
    const [domainFilterState, setDomainFilterState] = React.useState({});
    const [domainAnchorEl, setDomainAnchorEl] = React.useState(null);
    const [domainLoading, setDomainLoading] =  React.useState(true);

    const [openMapDetail, setOpenMapDetail] = React.useState(false);
    const [scrollMapDetail, setScrollMapDetail] = React.useState('paper');
    const [mapdata, setMapdata] =  React.useState(true);

    const [subAnchorEl, setSubAnchorEl] = React.useState(null);
    const [openMenuIndex, setOpenMenuIndex] =React.useState(null);
    const [domainProgressOpen, setDomainProgressOpen] = React.useState(false);
    const [mapProgressOpen, setMapProgressOpen] = React.useState(false);
    const [domainCompareOpen, setDomainCompareOpen] = React.useState(false);
    const [mapCompareOpen, setMapCompareOpen] = React.useState(false);
    const [mapCompareYLabel, setMapCompareYLabel] = React.useState('');

    const [openMonitorDetail, setOpenMonitorDetail] =  React.useState(false);
    const [infoDescription, setInfoDescription] = React.useState(0);

    const handleOpenInfo = (key)  => {
        setInfoDescription(infoDescriptionText[key]);
        setOpenMonitorDetail(true);
    };


    const handleMapDetailClose = () => {
        setOpenMapDetail(false);
    };

    const handleMapDetailClickOpen  = (event,scrollType, map_data)  => {
        setOpenMapDetail(true);
        setScrollMapDetail(scrollType);
        setMapdata(map_data);
        event.stopPropagation();
    };
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

    const navigateToDownload =  (event, object_id,filename) => {
        setQuery_id(object_id);
        setLoading(true);
        setCsvFilename(filename);
        event.stopPropagation();
    };

    const navigateToDownloadBenchmark =  (event, filename) => {
        setBenchmarkLoading(true);
        handleDownload(filename+'.zip');
        event.stopPropagation();
    };

    const handleDownload = async (fileName) => {
        var filePath = require("./assets/download/" + fileName);
        await fetch(filePath)
            .then(response => response.blob())
            .then(async blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setBenchmarkLoading(false);
    };

    React.useEffect(() => {
        if(loading&&query_id !==''){
            fetch(APIConfig.apiUrl + '/instance/DownloadMapByID/'+query_id, {method: 'GET'})
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
            // console.log(loading);
            csvLinkEl.current.link.click();
            setCsvData([]);
        }
    }, [csvData]);



    React.useEffect(() => {
        refreshLeader((data)=>{
            setData(data);
            setRows(data);
        });

        const interval = setInterval(() => {
            refreshLeader((data)=>{
                setData(data);
                setRows(data);
            })
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

    // const handleChangeDense = () => {
    //     setDense(!dense);
    // };

    const navigate = useNavigate();

    const navigateToInstances = (event, id, map_name) => {
        // 👇️ navigate to /contacts
        // // console.log(id)
        // console.log(event.target);
        // console.log(event.target.getAttribute('type'));
        navigate('/scenarios',{ state: { mapId: id, mapName: map_name}, replace: false} )
        event.stopPropagation();
        // state={instance_id : id}, replace: false});
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

    const renderMapTooltipContent = (o) => {
        const {active, payload, label } = o;
        if (active && payload && payload.length) {
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

    const renderDomainTooltipContent = (o) => {
        const {active, payload, label } = o;
        if (active && payload && payload.length) {
            const total = payload[0].payload.total;
            payload.sort((a, b) => a.name > b.name ? 1 : -1);
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
    const renderDomainProgressTooltipContent = (o) => {
        const {active, payload, label } = o;
        if (active && payload && payload.length) {
            const total = payload[0].payload.total;
            const closed = payload[0].payload.Closed;
            const solved = payload[0].payload.Solved;
            payload.sort((a, b) => a.name > b.name ? 1 : -1);
            return (
                <div className="customized-tooltip-content" style={{paddingLeft: 10, paddingRight: 10}}>
                    <p className="total">{`${label} (Total: ${total})`}</p>
                    <ul className="list">
                        <li key={`item-0`} style={{color: "#4CBB17"}}>
                            { `Closed: ${Math.round(closed*total)} (${getPercent(Math.round(closed*total), total)})`}
                        </li>
                        <li key={`item-1`} style={{color: "#F9812A"}}>
                            { `Solved: ${Math.round((solved-closed)*total)} (${getPercent(Math.round((solved-closed)*total), total)})`}
                        </li>
                        <li key={`item-2`} style={{color: "#BF0A30"}}>
                            { `Unknown: ${Math.round((1-solved)*total)} (${getPercent(Math.round((1-solved)*total), total)})`}
                        </li>

                        {/*<li key={`item-1`} style={{color: entry.color}}>*/}

                        {/*    { `${entry.name}: ${Math.round(entry.value*total)} (${getPercent(Math.round(entry.value*total), total)})`}*/}
                        {/*</li>*/}
                        {/*<li key={`item-2`} style={{color: entry.color}}>*/}

                        {/*    { `${entry.name}: ${Math.round(entry.value*total)} (${getPercent(Math.round(entry.value*total), total)})`}*/}
                        {/*</li>*/}

                        {/*{payload.map((entry, index) => (*/}
                        {/*    <li key={`item-${index}`} style={{color: entry.color}}>*/}

                        {/*        { `${entry.name}: ${Math.round(entry.value*total)} (${getPercent(Math.round(entry.value*total), total)})`}*/}
                        {/*    </li>*/}
                        {/*))}*/}
                    </ul>
                </div>
            );
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenComparator  = (event,scrollType)  => {
        setOpenComparator(true);
        setScroll(scrollType);

        var algorithm_API = APIConfig.apiUrl +'/algorithm/';
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
        setMapLoading(true);
        setMapQuery(event.target.value);

        var map_API = '';
        if(event.target.value ==='#Instances Closed'){
            setMapCompareYLabel('Instances Closed')
            map_API = APIConfig.apiUrl +'/algorithm/getClosedInfo';
        }else if (event.target.value === '#Instances Solved') {
            setMapCompareYLabel('Instances Solved')
            map_API = APIConfig.apiUrl +'/algorithm/getSolvedInfo';
        }else if (event.target.value === '#Best Lower-bounds'){
            setMapCompareYLabel('Instances with Best LB')
            map_API = APIConfig.apiUrl +'/algorithm/getLowerInfo';
        }else{
            setMapCompareYLabel('Instances with Best Solution')
            map_API = APIConfig.apiUrl +'/algorithm/getSolutionInfo';
        }

        fetch(map_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setMapQueryResult(data);
            })
            .catch(err => console.error(err));

    };

    const handleDomainQueryChange = (event) => {
        setDomainLoading(true);
        setDomainQuery(event.target.value);

        var domain_API = '';
        if(event.target.value ==='#Instances Closed'){
            domain_API = APIConfig.apiUrl + '/algorithm/getDomainClosedInfo';
        }else if (event.target.value === '#Instances Solved'){
            domain_API = APIConfig.apiUrl +'/algorithm/getDomainSolvedInfo';
        }else if (event.target.value === '#Best Lower-bounds'){
            domain_API = APIConfig.apiUrl +'/algorithm/getDomainLowerInfo';
        }else{
            domain_API = APIConfig.apiUrl +'/algorithm/getDomainSolutionInfo';
        }
        fetch(domain_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setDomainQueryResult(data);
            })
            .catch(err => console.error(err));
    }


    React.useEffect(() => {
        if(algorithm_name.length > 0) {
            setDomainLoading(true);
            setMapLoading(true);
            setDomainQuery('#Instances Closed');
            setMapQuery('#Instances Closed');
            var closed_API = APIConfig.apiUrl + '/algorithm/getClosedInfo';
            var domain_chart_API = APIConfig.apiUrl +'/algorithm/getDomainClosedInfo';
            Promise.all([
                fetch(closed_API, {method: 'GET'}),
                fetch(domain_chart_API  , {method: 'GET'})
            ])
                .then((values) => {
                    return Promise.all(values.map((r) => r.json()))
                })
                .then(([closed_data,
                           domain_chart_data
                       ]) => {
                    setMapQueryResult(closed_data);
                    setDomainQueryResult(domain_chart_data);
                    // console.log(domain_chart_data);
                }).catch(err => console.error(err));
        }
    }, [algorithm_name]);




    React.useEffect(() => {
        if(mapQueryResult.length >0){
            var mapChartData = [];
            [...new Set(data.map(item => item.map_name))].forEach(element=>
                mapChartData.push({name:element})
            );
            const algorithm = new Set();
            for( var i = 0; i < mapQueryResult.length; i ++){
                // iterate map
                var mapIndex = mapChartData.findIndex(x => x.name === mapQueryResult[i].map_name);
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
        if(domainQueryResult.length >0){
            var domainChartData = [];
            [...new Set(data.map(item => item.map_type))].forEach(element=>
                domainChartData.push({name:element})
            );
            const algorithm = new Set();
            for( var i = 0; i < domainQueryResult.length; i ++){
                // iterate map
                var domainIndex = domainChartData.findIndex(x => x.name === domainQueryResult[i].map_type);

                for(var j = 0 ; j < domainQueryResult[i].results.length; j ++){
                    var algo = domainQueryResult[i].results[j]
                    algorithm.add(algo.algo_name);
                    domainChartData[domainIndex][algo.algo_name] = algo.count;
                    domainChartData[domainIndex]['total'] = algo.total_ins;
                }
            }
            var unique_key = [];
            var check_box_state={};
            algorithm.forEach(function(algo){
                unique_key.push(algo);
                check_box_state[algo]= true;
                domainChartData.forEach(function(element){
                    if( element[algo] === undefined){
                        element[algo] = 0;
                    }
                });
            })
            unique_key.sort();
            domainChartData.forEach((element)=>(element.name =  element.name.charAt(0).toUpperCase() +element.name.slice(1)));
            // console.log(domainChartData);
            setDomainFilterState(check_box_state);

            unique_key.sort((a, b) => {
                var value_a = 0;
                var value_b = 0;
                domainChartData.forEach(function (element){
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

            setDomainBarChartAlgorithms(unique_key);
            setDomainBarChartDisplayAlgorithms(unique_key);
            setDomainBarChartDisplayData(domainChartData);
            setDomainBarChartOriData(domainChartData);
            setDomainLoading(false);
        }
    }, [domainQueryResult]);

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
        var displayData = []
        // console.log(solvedChartOriData);
        domainBarChartOriData.forEach(function(element) {
            var domainData  = {}
            domainData['name'] = element['name'];
            domainData['total'] = element['total'];
            domainBarChartAlgorithms.forEach(function(algo){
                if(domainFilterState[algo]){
                    domainData[algo] = element[algo]
                }
            })
            displayData.push(domainData);
        })

        // console.log(displayData);
        var displayKey =[]
        domainBarChartAlgorithms.forEach(function(algo){
            if(domainFilterState[algo]){
                displayKey.push(algo);
            }
        })
        setDomainBarChartDisplayAlgorithms(displayKey);
        setDomainBarChartDisplayData(displayData);
    }, [domainFilterState]);


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

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const handleMenuOpen = (event, index) => {
        setSubAnchorEl(event.currentTarget);
        setOpenMenuIndex(index);
    };

    const handleMenuClose = () => {
        setSubAnchorEl(null);
        setOpenMenuIndex(null);
        setMenuAnchorEl(null);
    };

    const isSubmenuOpen = (index) => {
        return openMenuIndex === index && Boolean(subAnchorEl);
    };


    const handleClickOpenDomainProgress  = (event,scrollType)  => {
        setDomainProgressOpen(true);
        setScroll(scrollType);
        var domainChartData = {}
        data.forEach(function(element){
                if(!(element.map_type in domainChartData)){
                    domainChartData[element.map_type] =  {name:element.map_type.charAt(0).toUpperCase() +element.map_type.slice(1), total:element.instances,
                        Closed: element.instances_closed,
                        Solved: element.instances_solved - element.instances_closed,
                        Unknown: element.instances - element.instances_solved}
                }else{
                    domainChartData[element.map_type].total = domainChartData[element.map_type].total + element.instances;
                    domainChartData[element.map_type].Closed = domainChartData[element.map_type].Closed +  element.instances_closed;
                    domainChartData[element.map_type].Solved = domainChartData[element.map_type].Solved +  element.instances_solved - element.instances_closed;
                    domainChartData[element.map_type].Unknown = domainChartData[element.map_type].Unknown + element.instances - element.instances_solved;
                }
            }

        );
        var domain_result = [];
        for (const key in  domainChartData) {
            domainChartData[key].Closed  =  domainChartData[key].Closed/ domainChartData[key].total;
            domainChartData[key].Solved  =  domainChartData[key].Solved/ domainChartData[key].total + domainChartData[key].Closed ;
            domainChartData[key].Unknown = 1.0;
            domain_result.push(domainChartData[key]);
        }
        setDomainProgressChartData(domain_result);
        event.stopPropagation();
    };

    const handleClickOpenMapProgress  = (event,scrollType)  => {
        setMapProgressOpen(true);
        setScroll(scrollType);
        var progressChartData = [];
        data.forEach(function(element){
                progressChartData.push({name:element.map_name, total:element.instances,
                    Closed: element.instances_closed,
                    Solved: element.instances_solved - element.instances_closed,
                    Unknown: element.instances - element.instances_solved
                });
            }

        );
        setProgressChartData(progressChartData);
        event.stopPropagation();
    };

    // React.useEffect(() => {
    //     if(algorithm_name.length > 0) {
    //         setDomainLoading(true);
    //         setMapLoading(true);
    //         setDomainQuery('#Instances Closed');
    //         setMapQuery('#Instances Closed');
    //         var closed_API = APIConfig.apiUrl + '/algorithm/getClosedInfo';
    //         var domain_chart_API = APIConfig.apiUrl +'/algorithm/getDomainClosedInfo';
    //         Promise.all([
    //             fetch(closed_API, {method: 'GET'}),
    //             fetch(domain_chart_API  , {method: 'GET'})
    //         ])
    //             .then((values) => {
    //                 return Promise.all(values.map((r) => r.json()))
    //             })
    //             .then(([closed_data,
    //                        domain_chart_data
    //                    ]) => {
    //                 setMapQueryResult(closed_data);
    //                 setDomainQueryResult(domain_chart_data);
    //                 // console.log(domain_chart_data);
    //             }).catch(err => console.error(err));
    //     }
    // }, [algorithm_name]);
    const handleClickOpenDomainComparator  = async (event, scrollType) => {
        setDomainCompareOpen(true);
        setDomainLoading(true);
        setScroll(scrollType);
        var algorithm_API = APIConfig.apiUrl + '/algorithm/';
        await fetch(algorithm_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                var key = [];
                data.forEach(a => key.push(a.algo_name));
                key.sort();
                setAlgorithm_name(key);
            })
            .catch(err => console.error(err));
        setDomainQuery('#Instances Closed');
        var domain_chart_API = APIConfig.apiUrl +'/algorithm/getDomainClosedInfo';
        await fetch(domain_chart_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setDomainQueryResult(data);
            })
            .catch(err => console.error(err));
        event.stopPropagation();
    };


    const handleClickOpenMapComparator  = async (event, scrollType) => {
        setMapCompareOpen(true);
        setMapLoading(true);
        setScroll(scrollType);
        var algorithm_API = APIConfig.apiUrl + '/algorithm/';
        await fetch(algorithm_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                var key = [];
                data.forEach(a => key.push(a.algo_name));
                key.sort();
                setAlgorithm_name(key);
            })
            .catch(err => console.error(err));
        setMapQuery('#Instances Closed');
        setMapCompareYLabel('Instances Closed')
        var closed_API = APIConfig.apiUrl + '/algorithm/getClosedInfo';
        await fetch(closed_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setMapQueryResult(data);
            })
            .catch(err => console.error(err));
        event.stopPropagation();
    };

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
                        <MenuItem key="Dense" onClick={() =>{
                            setDense(!dense);
                            setMenuAnchorEl(null);
                        }}>
                            <Button
                                key="Dense"
                                sx={{ color: 'black',textTransform: "none"}}
                                startIcon={ dense ? <ZoomOutMapIcon/>:<ZoomInMapIcon /> }
                                style={{ backgroundColor: 'transparent' }}
                                disableElevation
                                disableRipple
                            >
                                { dense ? "Sparse Margin":"Densify Margin " }
                            </Button>
                        </MenuItem>

                        <MenuItem key="Progress"    onClick={(event) =>{
                            handleMenuOpen(event, 1);
                            // handleClickOpen(event,'paper');
                        } }>
                            <Button
                                key="Progress"
                                sx={{ color: 'black',textTransform: "none"}}
                                startIcon={<ShowChartIcon/>}
                                style={{ backgroundColor: 'transparent' }}
                                disableElevation
                                disableRipple
                            >
                                Monitor Progress
                            </Button>
                        </MenuItem>
                        <MenuItem key="Comparator" onClick={(event) =>{
                            handleMenuOpen(event, 2);
                            // handleClickOpenComparator(event,'paper');
                        } }>
                            <Button
                                key="Comparator"
                                sx={{ color: 'black',textTransform: "none"}}
                                startIcon={<CompareIcon />}
                                style={{ backgroundColor: 'transparent' }}
                                disableElevation
                                disableRipple
                            >
                                Compare Algorithms
                            </Button>
                        </MenuItem>
                    </Menu>

                    <Popover
                        open={isSubmenuOpen(1)}
                        anchorEl={subAnchorEl}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuList>
                            <MenuItem key="M_domains"  onClick={(event) =>{
                                handleClickOpenDomainProgress(event,'paper');
                                setMenuAnchorEl(null);
                                setSubAnchorEl(null);
                            } }>
                                <Button
                                    key="M_domains"
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={<ChevronRightIcon />}
                                    style={{ backgroundColor: 'transparent' }}
                                    disableElevation
                                    disableRipple
                                >
                                    Domains
                                </Button>
                            </MenuItem>
                            <MenuItem key="M_maps"  onClick={(event) =>{
                                handleClickOpenMapProgress(event,'paper');
                                setMenuAnchorEl(null);
                                setSubAnchorEl(null);
                            } }>
                                <Button
                                    key="M_maps"
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={<ChevronRightIcon />}
                                    style={{ backgroundColor: 'transparent' }}
                                    disableElevation
                                    disableRipple
                                >
                                    Maps
                                </Button>
                            </MenuItem>
                        </MenuList>
                    </Popover>

                    <Popover
                        open={isSubmenuOpen(2)}
                        anchorEl={subAnchorEl}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuList>
                            <MenuItem key="C_domains" onClick={(event) =>{
                                // handleClickOpenScenComparator(event,'paper');
                                handleClickOpenDomainComparator(event,'paper');
                                setMenuAnchorEl(null);
                                setSubAnchorEl(null);
                            } }>
                                <Button
                                    key="C_domains"
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={<ChevronRightIcon />}
                                    style={{ backgroundColor: 'transparent' }}
                                    disableElevation
                                    disableRipple
                                >
                                    Domains
                                </Button>
                            </MenuItem>
                            <MenuItem key="C_maps" onClick={(event) =>{
                                // handleClickOpenAgentComparator(event,'paper');
                                handleClickOpenMapComparator(event,'paper');
                                setMenuAnchorEl(null);
                                setSubAnchorEl(null);
                            } }>
                                <Button
                                    key="C_maps"
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={<ChevronRightIcon />}
                                    style={{ backgroundColor: 'transparent' }}
                                    disableElevation
                                    disableRipple
                                >
                                    Maps
                                </Button>
                            </MenuItem>
                        </MenuList>
                    </Popover>


                    <Typography
                        sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                        variant="h6"
                        component="div"
                    >
                        MAPF Benchmarks
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
                            <col style={{minWidth: "200px"}} width="20%" />
                            <col style={{minWidth: "200px"}} width="20%" />
                            <col style={{minWidth: "100px"}} width="5%" />
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
                                            key={row.id}
                                            onClick={(event) => navigateToInstances(event,row.id,row.map_name)}
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
                                            <TableCell align="center" >
                                                <BorderLinearProgress value={row.solved_percentage*100} />
                                                {/*<ProgressBar animated now={row.lower_bound_uploaded/row.problems*100} label={`${row.lower_bound_uploaded/row.problems*100}%`}  />*/}
                                            </TableCell>
                                            <TableCell align="center" >
                                                <BorderLinearProgress value={row.closed_percentage*100} />
                                                {/*<ProgressBar animated now={row.solution_uploaded/row.problems*100} label={`${row.solution_uploaded/row.problems*100}%`} />*/}
                                            </TableCell>
                                            <TableCell align="center" >
                                                <IconButton onClick={(event) =>handleMapDetailClickOpen(event,'paper', row)}>
                                                    <InfoIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center" >
                                                {/*<Button variant="contained" onClick={routeChange}>View</Button>*/}
                                                {/*<Button variant="contained" onClick={() => navigateToInstance(row.id,row.type_id,row.scen_type)}>View</Button>*/}
                                                {/*<IconButton onClick={(event) => navigateToInstances(event,row.id,row.map_name)}>*/}
                                                {/*    <VisibilityIcon/>*/}
                                                {/*</IconButton>*/}
                                                <IconButton onClick={(event) =>
                                                    navigateToDownload(event, row.id,row.map_name)}
                                                >
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
                                    <TableCell colSpan={9} />
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
                open={domainCompareOpen}
                onClose={()=>setDomainCompareOpen(false)}
                scroll={scroll}
                disableScrollLock={ true }
                // fullWidth={true}
                // maxWidth={'300px'}
                maxWidth={false}
                // sx={{ maxWidth: '800px' }}
                PaperProps={{
                    style: { mb: 2,borderRadius: 10 }
                }}
            >
                <DialogContent dividers={scroll === 'paper'} sx={{width: 750, height : 500, display : 'flex'}}>
                    <Box sx={{  width: '100%'}}>
                        {/*<Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5}}>*/}
                            <Toolbar
                                sx={{
                                    pl: { sm: 1 },
                                    pr: { xs: 1, sm: 1 }
                                }}
                            >
                                <Typography
                                    sx={{ flex: '1 1 100%' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Comparison between Algorithms on Domains
                                    <IconButton onClick={()=>{handleOpenInfo('domainCompare-'+domainQuery)}}>
                                        <InfoIcon />
                                    </IconButton>
                                </Typography>
                                <FormControl sx={{ m: 1, minWidth: 120, width:300}}  size = 'small' >
                                    <Select
                                        displayEmpty = {true}
                                        value={domainQuery}
                                        onChange={handleDomainQueryChange}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={"#Instances Closed"}>Instances Closed</MenuItem>
                                        <MenuItem value={"#Instances Solved"}>Instances Solved</MenuItem>
                                        <MenuItem value={"#Best Lower-bounds"}>Best Lower-Bound</MenuItem>
                                        <MenuItem value={"#Best Solutions"}>Best Solution</MenuItem>
                                    </Select>
                                </FormControl>
                                <IconButton
                                    aria-controls="domain-filter-menu"
                                    aria-haspopup="true"
                                    onClick={(event)=>{setDomainAnchorEl(event.currentTarget)}}
                                >
                                    <FilterListIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={domainAnchorEl}
                                    keepMounted
                                    open={Boolean(domainAnchorEl)}
                                    // onClick ={handleDomainFilterChange}
                                    onClick={()=>{setDomainAnchorEl(null)}}
                                >
                                    {domainBarChartAlgorithms.map((algo) => (
                                        <MenuItem key = {algo} value={algo} onClick ={(event) => {
                                            setDomainFilterState({
                                                ...domainFilterState,
                                                [event.currentTarget.innerText]: !domainFilterState[event.currentTarget.innerText],
                                            });
                                        }} >
                                            <Checkbox
                                                checked={domainFilterState[algo]}
                                                onChange={(event) => {
                                                    setDomainFilterState({
                                                        ...domainFilterState,
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
                            {domainLoading ? <Box width="100%" display="flex"
                                                  justifyContent="center"
                                                  alignItems="center" height={445}><CircularProgress size={80}/></Box> :
                                <ResponsiveContainer width="100%" height={445}>
                                    <RadarChart cx="50%" cy="55%" outerRadius="80%" data={domainBarChartDisplayData}>
                                        {/*<text x="50%" y="0" dominantBaseline="hanging" fontSize="20"  textAnchor={'middle'} style = {{ fontFamily: "Roboto Slab" }}>Solution</text>*!/*/}
                                        <Legend verticalAlign="top" align="center" wrapperStyle={{
                                            fontFamily: "Roboto Slab"
                                        }}  payload={[...domainBarChartDisplayAlgorithms].sort().map(name => ({ value: name,
                                            // id: item.name,
                                            type: "square", color:color[algorithm_name.indexOf(name)] }))}/>
                                        <Tooltip content={renderDomainTooltipContent}
                                                 itemSorter={item => item.name}
                                                 wrapperStyle={{
                                                     fontFamily: "Roboto Slab",
                                                     backgroundColor: "white",
                                                     borderStyle: "ridge"
                                                 }} formatter={(tick) => {
                                            var value = tick * 100
                                            return `${value.toFixed(2)}%`;
                                        }}
                                        />
                                        {domainBarChartDisplayAlgorithms.map((algo) => (
                                                <Radar key={algo} dataKey={algo}
                                                       stroke={color[algorithm_name.indexOf(algo)]}
                                                    // stackId="1"
                                                       fill={color[algorithm_name.indexOf(algo)]} fillOpacity={0.6}/>
                                            )
                                        )}
                                        <PolarRadiusAxis angle={38.5}
                                                         domain={[0, domainBarChartDisplayAlgorithms.length > 0 ? 'dataMax' : 1]}
                                                         stroke={'black'}
                                                         tickFormatter={(tick) => {
                                                             var value = tick * 100
                                                             return `${value.toFixed(0)}%`;
                                                         }}
                                                         style={{
                                                             fontFamily: "Roboto Slab",
                                                             opacity: "0.3"
                                                         }}
                                        />
                                        <PolarGrid  stroke={'black'} style={{
                                            fontFamily: "Roboto Slab",
                                            opacity: "0.3"
                                        }}/>
                                        <PolarAngleAxis dataKey="name"
                                                        tick={<CustomizedLabel/>}
                                            // stroke={'black'}
                                                        style={{
                                                            fontFamily: "Roboto Slab"
                                                        }}/>
                                    </RadarChart>
                                </ResponsiveContainer>
                            }
                        {/*</Paper>*/}
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog
                open={mapCompareOpen}
                onClose={()=>setMapCompareOpen(false)}
                scroll={scroll}
                disableScrollLock={ true }
                fullWidth={true}
                maxWidth={'md'}
                PaperProps={{
                    style: { mb: 2,borderRadius: 10 }
                }}
            >
                <DialogContent dividers={scroll === 'paper'} sx={{width: 850,  height : 500, display : 'flex'}}>
                    <Box sx={{width: '100%'}}>
                        {/*<Paper elevation={12} sx={{width: '100%', mb: 2, borderRadius: 5}}>*/}
                            <Toolbar
                                sx={{
                                    pl: {sm: 2},
                                    pr: {xs: 1, sm: 1}
                                }}
                            >
                                <Typography
                                    sx={{flex: '1 1 100%'}}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Comparison between Algorithms on Maps
                                    <IconButton onClick={()=>{handleOpenInfo('mapCompare-'+mapQuery)}}>
                                        <InfoIcon />
                                    </IconButton>
                                </Typography>

                                <FormControl sx={{m: 1, minWidth: 120, width: 300}} size='small'>
                                    <Select
                                        value={mapQuery}
                                        displayEmpty={true}
                                        onChange={handleMapChange}
                                        inputProps={{'aria-label': 'Without label'}}
                                    >
                                        <MenuItem value={"#Instances Closed"}>Instances Closed</MenuItem>
                                        <MenuItem value={"#Instances Solved"}>Instances Solved</MenuItem>
                                        <MenuItem value={"#Best Lower-bounds"}>Best Lower-Bound</MenuItem>
                                        <MenuItem value={"#Best Solutions"}>Best Solution</MenuItem>
                                    </Select>
                                </FormControl>
                                <IconButton
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={(event) => {
                                        setMapAnchorEl(event.currentTarget)
                                    }}
                                >
                                    <FilterListIcon/>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={mapAnchorEl}
                                    keepMounted
                                    open={Boolean(mapAnchorEl)}
                                    // onClick ={handleMapFilterChange}
                                    onClose={() => setMapAnchorEl(null)}
                                >
                                    {mapBarChartAlgorithms.map((algo) => (
                                        <MenuItem key={algo} value={algo} onClick={
                                            (event) => {
                                                setMapFilterState({
                                                    ...mapFilterState,
                                                    [event.currentTarget.innerText]: !mapFilterState[event.currentTarget.innerText],
                                                });
                                            }
                                        }>
                                            <Checkbox
                                                checked={mapFilterState[algo]}
                                                onChange={(event) => {
                                                    setMapFilterState({
                                                        ...mapFilterState,
                                                        [event.target.name]: event.target.checked,
                                                    });
                                                }}
                                                name={algo}
                                            />
                                            <ListItemText primary={algo}/>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Toolbar>
                            {mapLoading ?  <Box width="100%" display="flex"
                                                justifyContent="center"
                                                alignItems="center" height={440}><CircularProgress size={80}/></Box>:
                                <ResponsiveContainer width="100%" height={440}>
                                    <BarChart
                                        data={mapBarChartDisplayData}
                                        margin={{ top: 5, right: 5, bottom: 5,left: 10 }}
                                    >
                                        <Legend verticalAlign="top" align="center" wrapperStyle={{
                                            fontFamily: "Roboto Slab"
                                        }}/>
                                        <Brush y={330} dataKey="name" height={20} stroke='rgba(0, 0, 0, 0.5)'/>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="name" angle={-60} height={100} interval={0} textAnchor="end"
                                               tickFormatter={(tick) => tick === 0 ? "" : tick.substring(0, 5) + "..."}
                                               dy={30}
                                               style={{
                                                   fontFamily: "Roboto Slab"
                                               }}
                                        ><Label value="Name of Maps" position="insideBottom" offset={-20}  style={{
                                            fontFamily: "Roboto Slab"
                                        }} fill="#626262" fontSize={18}/>
                                        </XAxis>
                                        <YAxis tickFormatter={(tick) => {
                                            return `${tick * 100}%`;
                                        }}>
                                            <Label value={mapCompareYLabel} angle={-90} position="insideLeft"
                                                   style={{ textAnchor: 'middle',fontFamily: "Roboto Slab" }}
                                                   fill="#626262" offset={0}  fontSize={18}/>
                                        </YAxis>
                                        <Tooltip content={renderMapTooltipContent} wrapperStyle={{
                                            fontFamily: "Roboto Slab",
                                            backgroundColor: "white",
                                            borderStyle: "ridge"
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
                        {/*</Paper>*/}
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog
                open={domainProgressOpen}
                onClose={()=>setDomainProgressOpen(false)}
                scroll={scroll}
                disableScrollLock={ true }
                // fullWidth={true}
                maxWidth={false}
                PaperProps={{
                    style: { mb: 2,borderRadius: 10 }
                }}
            >
                <DialogContent dividers={scroll === 'paper'} sx={{width: 700, height : 500, display : 'flex'}}>
                    <Box sx={{  width: '100%'}}>
                        {/*<Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5}}>*/}
                            <Toolbar
                                sx={{
                                    pl: { sm: 1 },
                                    pr: { xs: 1, sm: 1 }
                                }}
                            >
                                <Typography
                                    sx={{ flex: '1 1 100%' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Success Rate on Domains
                                    <IconButton onClick={()=>{handleOpenInfo('domainProgress')}}>
                                        <InfoIcon />
                                    </IconButton>
                                </Typography>

                            </Toolbar>
                            <ResponsiveContainer width="100%" height={445}>
                                <RadarChart cx="50%" cy="55%" outerRadius="80%" data={domainProgressChartData}>
                                    {/*<text x="50%" y="0" dominantBaseline="hanging" fontSize="20"  textAnchor={'middle'} style = {{ fontFamily: "Roboto Slab" }}>Solution</text>*!/*/}
                                    <Legend verticalAlign="top"  align="center" wrapperStyle={{
                                        fontFamily: "Roboto Slab"
                                    }} payload={['Solved','Closed','Unknown'].sort().map(name => ({ value: name,
                                        // id: item.name,
                                        type: "square", color:progressColor[name] }))}/>
                                    <Tooltip content={renderDomainProgressTooltipContent}
                                             itemSorter={item => item.name}
                                             wrapperStyle={{
                                                 fontFamily: "Roboto Slab",
                                                 backgroundColor: "white",
                                                 borderStyle: "ridge"
                                             }} formatter={(tick) => {
                                        var value = tick * 100
                                        return `${value.toFixed(2)}%`;
                                    }}
                                    />
                                    <Radar type="monotone" dataKey="Unknown" stroke="#BF0A30" fill="#BF0A30" fillOpacity={0.8}/>
                                    <Radar type="monotone" dataKey="Solved"  stroke="#F9812A" fill="#F9812A" fillOpacity={0.8}/>
                                    <Radar type="monotone" dataKey="Closed" stroke="#4CBB17" fill="#4CBB17" fillOpacity={0.8}/>
                                    <PolarRadiusAxis angle={38.5}
                                                     domain={[0, 1]}
                                                     tickFormatter={(tick) => {
                                                         var value = tick * 100
                                                         return `${value.toFixed(0)}%`;
                                                     }}
                                                     stroke={"black"}
                                                     style={{
                                                         fontFamily: "Roboto Slab",
                                                         opacity: "0.3"
                                                     }}
                                    />
                                    <PolarAngleAxis dataKey="name"
                                                    tick={<CustomizedLabel/>}
                                                    style={{
                                                        fontFamily: "Roboto Slab"
                                                    }}/>
                                    <PolarGrid
                                        stroke={"black"}
                                        style={{
                                            fontFamily: "Roboto Slab",
                                            opacity: "0.3"
                                        }}/>
                                </RadarChart>
                            </ResponsiveContainer>
                        {/*</Paper>*/}
                    </Box>
                    {/*</ResponsiveContainer>*/}
                </DialogContent>
            </Dialog>

            <Dialog
                open={mapProgressOpen}
                onClose={()=>setMapProgressOpen(false)}
                scroll={scroll}
                disableScrollLock={ true }
                fullWidth={true}
                maxWidth={'md'}
                PaperProps={{
                    style: { mb: 2,borderRadius: 10 }
                }}
            >
                <DialogContent dividers={scroll === 'paper'} sx={{width: 850, height : 500, display : 'flex'}}>
                    {/*<ResponsiveContainer width="98%"  height={400}>*/}
                    <Box sx={{width: '100%'}}>
                    {/*<Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5}}>*/}
                        <Toolbar
                            sx={{
                                pl: { sm: 1 },
                                pr: { xs: 1, sm: 1 }
                            }}
                        >
                            <Typography
                                sx={{ flex: '1 1 100%',paddingLeft :'10px' }}
                                variant="h6"
                                component="div"
                            >
                                Success Rate on Maps
                                <IconButton onClick={()=>{handleOpenInfo('mapProgress')}}>
                                    <InfoIcon />
                                </IconButton>
                            </Typography>
                        </Toolbar>
                        <AreaChart
                            data={progressChartData}
                            stackOffset="expand"
                            width= {850}  height={440}
                            margin={{ top: 5, right: 5, bottom: 5,left: 10 }}
                        >
                            <Legend verticalAlign="top"  align="center" height={30} wrapperStyle={{
                                fontFamily: "Roboto Slab"
                            }} payload={['Solved','Closed','Unknown'].sort().map(name => ({ value: name,
                                // id: item.name,
                                type: "square", color:progressColor[name] }))}/>

                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-60} height={100} interval={0} textAnchor="end"
                                   tickFormatter={(tick) => tick === 0 ? "" : tick.substring(0, 5) + "..."}
                                   dy = {30}
                                   dx  = {-5}
                                   style={{
                                       fontFamily: "Roboto Slab"
                                   }}
                            >
                                <Label value="Name of Maps" position="insideBottom" offset={-20}  style={{
                                    fontFamily: "Roboto Slab"
                                }} fill="#626262" fontSize={18}/>
                            </XAxis>
                            {/*<YAxis tickFormatter={toPercent} />*/}
                            <YAxis  tickFormatter={(tick) => {
                                return `${tick* 100}%`;
                            }}>
                                <Label value="Success Rate" angle={-90} position="insideLeft"
                                       style={{ textAnchor: 'middle',fontFamily: "Roboto Slab" }}
                                       fill="#626262" offset={0}  fontSize={18}/>
                            </YAxis>
                            <Brush  y={330} dataKey="name"  height={20} stroke='rgba(0, 0, 0, 0.5)' />
                            <Tooltip content={renderTooltipContent}  wrapperStyle={{ fontFamily: "Roboto Slab" , backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px"}} />
                            <Area type="monotone" dataKey="Closed" stackId="1" stroke="#4CBB17" fill="#4CBB17" fillOpacity={0.8}/>
                            <Area type="monotone" dataKey="Solved" stackId="1" stroke="#F9812A" fill="#F9812A" fillOpacity={0.8} />
                            <Area type="monotone" dataKey="Unknown" stackId="1" stroke="#BF0A30" fill="#BF0A30" fillOpacity={0.8}/>
                        </AreaChart>
                    {/*</Paper>*/}
                    </Box>
                    {/*</ResponsiveContainer>*/}
                </DialogContent>
            </Dialog>

            <Dialog
                open={openMapDetail}
                onClose={handleMapDetailClose}
                scroll={scrollMapDetail}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={true}
                maxWidth={'sm'}
                disableScrollLock={ true }
                PaperProps={{
                    style: { mb: 2,borderRadius: 10 }
                }}
                // PaperProps={{ sx: { width: "100%"}}}
            >
                <DialogContent dividers={scrollMapDetail === 'paper'}  sx={{width: 550, display : 'flex'}}>
                    <Table sx={{ width : 550}}>
                        <colgroup>
                            {/*<col width="120" />*/}
                            {/*<col width="150" />*/}
                            {/*<col width="65" />*/}
                            {/*<col width="200" />*/}
                            <col width="150" />
                            <col width="150" />
                            <col width="150" />
                            <col width="50" />
                        </colgroup>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{paddingRight:0,paddingLeft:0 }} >Name:</TableCell>
                                <TableCell style={{paddingRight:0,paddingLeft:0 }}> {mapdata.map_name}</TableCell>
                                <TableCell style={{paddingRight:0,paddingLeft:0 }}> Download Benchmark: </TableCell>
                                <TableCell style={{paddingRight:0,paddingLeft:0 }}>
                                    <IconButton onClick={(event) =>
                                        navigateToDownloadBenchmark(event,mapdata.map_name)}
                                    >
                                        {benchmarkLoading?  <CircularProgress size={24} />:<DownloadIcon/>}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{paddingRight:0,paddingLeft:0 }}>  Original Link: </TableCell>
                                <TableCell style={{paddingRight:0,paddingLeft:0 }} colSpan={3}>
                                    <Link href={mapdata.original_link} underline="hover">
                                        {mapdata.original_link}
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{paddingRight:0,paddingLeft:0,verticalAlign: "top" }} > Paper Reference: </TableCell>
                                <TableCell style={{paddingRight:0,paddingLeft:0,verticalAlign: "top" }} colSpan={3} > {mapdata.papers} </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>

            <Dialog
                open={openMonitorDetail}
                onClose={()=>setOpenMonitorDetail(false)}
                fullWidth={true}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth={'sm'}
                disableScrollLock={ true }
                PaperProps={{
                    style: { mb: 2,borderRadius: 10 }
                }}
                // PaperProps={{ sx: { width: "100%"}}}
            >
                <DialogContent  dividers={scroll === 'paper'} sx={{width: 550, display : 'flex'}}>
                    <Table sx={{ width : 550}}>
                        <colgroup>
                            {/*<col width="120" />*/}
                            {/*<col width="150" />*/}
                            {/*<col width="65" />*/}
                            {/*<col width="200" />*/}
                            <col width="150" />
                            <col width="150" />
                            <col width="150" />
                            <col width="50" />
                        </colgroup>
                        <TableBody>
                            <TableRow >
                                <TableCell  style={{paddingRight:0,paddingLeft:0, verticalAlign: 'top'}}>  Description:  </TableCell>
                                <TableCell  style={{paddingRight:0,paddingLeft:0 , verticalAlign: 'top'}} colSpan={3}>
                                    {infoDescription.description}
                                </TableCell>
                            </TableRow>
                            {infoDescription.c_axis != null ?<TableRow>
                                <TableCell style={{paddingRight:0,paddingLeft:0 , verticalAlign: 'top'}}>  Category-axis:  </TableCell>
                                <TableCell style={{paddingRight:0,paddingLeft:0, verticalAlign: 'top'}} colSpan={3}>
                                    {infoDescription.c_axis}
                                </TableCell>
                            </TableRow>: null}
                            {infoDescription.v_axis != null ? <TableRow>
                                <TableCell style={{paddingRight:0,paddingLeft:0, verticalAlign: 'top' }}>  Value-axis:  </TableCell>
                                <TableCell style={{paddingRight:0,paddingLeft:0 , verticalAlign: 'top'}} colSpan={3}>
                                    {infoDescription.v_axis}
                                </TableCell>
                            </TableRow>: null}

                            {infoDescription.x_axis != null ?<TableRow>
                                <TableCell style={{paddingRight:0,paddingLeft:0 , verticalAlign: 'top'}}>  X-axis:  </TableCell>
                                <TableCell style={{paddingRight:0,paddingLeft:0, verticalAlign: 'top'}} colSpan={3}>
                                    {infoDescription.x_axis}
                                </TableCell>
                            </TableRow>: null}
                            {infoDescription.y_axis != null ? <TableRow>
                                <TableCell style={{paddingRight:0,paddingLeft:0, verticalAlign: 'top' }}>  Y-axis:  </TableCell>
                                <TableCell style={{paddingRight:0,paddingLeft:0 , verticalAlign: 'top'}} colSpan={3}>
                                    {infoDescription.y_axis}
                                </TableCell>
                            </TableRow>: null}
                            {infoDescription.comment != null ?
                                <TableRow>
                                    <TableCell style={{paddingRight:0,paddingLeft:0, verticalAlign: 'top' }}> Comments:  </TableCell>
                                    <TableCell style={{paddingRight:0,paddingLeft:0 , verticalAlign: 'top'}} colSpan={3}>
                                        {infoDescription.comment}
                                    </TableCell>
                                </TableRow>
                                : null
                            }

                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>

            {/*<FormControlLabel*/}
            {/*    control={<Switch checked={dense} onChange={handleChangeDense} />}*/}
            {/*    label="Dense padding"*/}
            {/*/>*/}
        </Box>
    );
}