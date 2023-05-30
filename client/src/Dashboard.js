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
import {useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import InfoIcon from "@mui/icons-material/Info";
import DialogContent from "@mui/material/DialogContent";
import Link from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip} from "recharts";
import Dialog from "@mui/material/Dialog";
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import { useConfirm } from "material-ui-confirm";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {APIConfig} from "./config";
import CircularProgress from "@mui/material/CircularProgress";


const infoDescriptionText = {
    'domainCompare-#Instances Closed':{
        'description':"This plot compares the number of instances closed " +
            "between selected algorithm and the state-of-the-art (i.e., all algorithms together) across different domains of the benchmark. " +
            "For a particular algorithm, the instance is closed if the algorithm reports the same lower bound and solution cost. "+
            "Algorithms that do not report lower bound data are omitted from this plot. " +
            "The number of instances closed indicates the performance of algorithms for finding and proving optimal solution (i.e., higher the better). ",
        'c_axis': "The benchmark contains many different maps, each map is associate with domain. " +
            "The category-axis displays the names of the domains available in the benchmark.",
        'v_axis': "The value-axis displays the number of instances closed for each domain. " +
            "The percentage ratio is shown, calculated based on the total number of instances in each domain."
    },
    'domainCompare-#Instances Solved':{
        'description':"This plot compares the number of instances solved " +
            "between selected algorithm and the state-of-the-art (i.e., all algorithms together) across different domains of the benchmark. " +
            "The number of instances solved indicates the performance of algorithms while ignoring solution quality (i.e., higher the better).",
        'c_axis': "The benchmark contains many different maps, each map is associate with domain. " +
            "The category-axis displays the names of the domains available in the benchmark.",
        'v_axis': "The value-axis displays the number of instances solved for each domain. " +
            "The percentage ratio is shown, calculated based on the total number of instances in each domain."
    },
    'domainCompare-#Best Lower-bounds':{
        'description': "This plot compares the number of instances that have achieved the best lower bound (reported by any algorithm) " +
            "between selected algorithm and the state-of-the-art (i.e., all algorithms together) across different domains of the benchmark. " +
            "The number of instances that achieve the best lower bound reflects the availability of algorithms for proving optimality (i.e., higher the better). " +
            "Algorithms that do not report lower bound data are omitted from this plot.",
        'c_axis': "The benchmark contains many different maps, each map is associate with domain. " +
            "The category-axis displays the names of the domains available in the benchmark.",
        'v_axis': "The value-axis displays the number of instances that have achieved the best lower bound for each domain. " +
            "The percentage ratio is shown, calculated based on the total number of instances in each domain. "
            // "For instances where no lower bound is reported, no algorithm can achieve the best lower bound in such cases."
    },
    'domainCompare-#Best Solutions':{
        'description':"This plot compares the number of instances that have achieved the best solution (reported by any algorithm) " +
            "between selected algorithm and the state-of-the-art (i.e., all algorithms together) across different domains of the benchmark. " +
            "The number of instances achieving the best solution reflects the solution quality reported by different algorithms (i.e., higher the better). ",
        'c_axis': "The benchmark contains many different maps, each map is associate with domain. " +
            "The category-axis displays the names of the domains available in the benchmark.",
        'v_axis': "The value-axis displays the number of instances that have achieved the best solution for each domain. " +
            "The percentage ratio is shown, calculated based on the total number of instances in each domain. "
            // "For instances where no solution is reported, no algorithm can achieve the best solution in such cases."
    },
}
const angle = {
    'Warehouse': -40,
    'City' : 0,
    'Empty' : 50,
    'Game' : 110,
    'Maze' : 0,
    'Random' : 0,
    'Room' : -110
}

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
        id: 'algo_name',
        numeric: false,
        disablePadding: false,
        label: 'Algorithm Name',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'authors',
        numeric: false,
        disablePadding: false,
        label: "Authors' Name",
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
        id: 'instances_closed',
        numeric: true,
        disablePadding: false,
        label: '#Instances Closed',
        sortable: true,
        alignment: 'left'
    },
    {
        id: 'instances_solved',
        numeric: true,
        disablePadding: false,
        label: '#Instances Solved',
        sortable: true,
        alignment: 'left'
    },
    {
        id: '_id',
        numeric: false,
        disablePadding: false,
        label: 'Details',
        sortable: false,
        alignment: 'center'
    },

    {
        id: 'modify',
        numeric: false,
        disablePadding: false,
        label: 'Modify',
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


async function checkNameExist(id, name) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken
        },
        body: JSON.stringify(
            {
                algo_name: name
            })
    };
    if(name ===''){
        return false;
    }
    const response = await fetch(APIConfig.apiUrl+'/user/checkAlgo/' + id, requestOptions).catch(err => console.log(err));
    return response.status === 200;
}

// const refreshAllAlgorithms = (callback)=>{
//     fetch('http://localhost:8080/api/algorithm/all_detail', {method: 'GET'})
//         .then(res => res.json())
//         .then(data => {
//             callback(data);
//         })
//         .catch(err => console.error(err));
// }

const refreshAlgorithms = (callback)=>{
    const requestOptions = {
        method: 'GET',
        headers: { 'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken }
    };

    // console.log(JSON.parse(localStorage.getItem('user')).id)
    fetch(APIConfig.apiUrl+'/userAlgo/'+JSON.parse(localStorage.getItem('user')).id, requestOptions )
        .then(response => response.json())
        .then(data => {
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
//
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


export default function Dashboard() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('map_type');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    // const [csvData, setCsvData] = React.useState([]);
    // // const [csvFilename, setCsvFilename] = React.useState([]);
    // const csvLinkEl = useRef();
    // const [query_id, setQuery_id] = React.useState('');
    // const [loading, setLoading] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [searched, setSearched] = React.useState("");
    const [openAlgoDetail, setOpenAlgoDetail] = React.useState(false);
    const [openAlgoModify, setOpenAlgoModify] = React.useState(false);
    const [scrollAlgoDetail, setScrollAlgoDetail] = React.useState('paper');
    const [domainQuery, setDomainQuery] = React.useState('#Instances Closed');
    const [algodata, setAlgodata] = React.useState([]);
    const [algoChartData, setAlgoChartData] = React.useState([]);
    const [openAlgoCreate, setOpenAlgoCreate] = React.useState(false);
    const [domainLoading, setDomainLoading] =  React.useState(true);
    const [openMonitorDetail, setOpenMonitorDetail] =  React.useState(false);
    const [infoDescription, setInfoDescription] = React.useState(0);

    const handleOpenInfo = (key)  => {
        setInfoDescription(infoDescriptionText[key]);
        setOpenMonitorDetail(true);
    };
    const confirm = useConfirm();

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.algo_name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
        setSearched(searchedVal);
    };

    const cancelSearch = (searchedVal) => {
        setSearched("");
        requestSearch("");
    };

    // const navigateToDownload =  (event, object_id,filename) => {
    //     setQuery_id(object_id);
    //     setLoading(true);
    //     setCsvFilename(filename);
    //     event.stopPropagation();
    // };
    //
    //
    // React.useEffect(() => {
    //     if(loading&&query_id !==''){
    //         fetch(APIConfig.apiUrl+'/instance/DownloadMapByID/'+query_id, {method: 'GET'})
    //             .then(res => res.json())
    //             .then(data => {
    //                 setCsvData(data);
    //                 setQuery_id('');
    //             });
    //     }
    // }, [loading]);
    //
    //
    // React.useEffect(() => {
    //     if(csvData.length !== 0){
    //         setLoading(false);
    //         csvLinkEl.current.link.click();
    //         setCsvData([]);
    //     }
    // }, [csvData]);



    React.useEffect(() => {

        refreshAlgorithms((data)=>{
            setData(data);
            setRows(data);
        });

        const interval = setInterval(() => {
            refreshAlgorithms((data)=>{
                setData(data);
                setRows(data);
            })
        }, 1200000);
        return () => clearInterval(interval);
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // var valid = false;
        checkNameExist(algodata.id,data.get('algoName')).then(result =>{
            if(result){
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken },
                    body:JSON.stringify(
                        { algo_name: data.get('algoName'),
                            authors: data.get("algoAuthor"),
                            github: data.get("algoGit"),
                            papers: data.get("algoPaper"),
                            comments: data.get("algoComments"),
                        })
                };
                // console.log(JSON.parse(localStorage.getItem('user')).id)
                fetch(APIConfig.apiUrl+'/user/updateAlgo/'+algodata.id, requestOptions )
                    .then(response => {
                        if(response.status === 200){
                            // alert("Algorithm was updated successfully.")
                            confirm({
                                title :"",
                                description: "Algorithm was updated successfully",
                                cancellationButtonProps: { sx :{ display: 'none'}},
                                dialogProps: {fullWidth: true, maxWidth: 'xs'}
                            })
                            // setConfirmOpen(true);
                            refreshAlgorithms((data)=>{
                                setData(data);
                                setRows(data);
                            });
                            setOpenAlgoModify(false);
                        }
                    })
                    .catch(err => console.error(err));
            }else{
                confirm({
                    title :"",
                    description: "Invalid algorithm name: " + data.get('algoName') ,
                    cancellationButtonProps: { sx :{ display: 'none'}},
                    dialogProps: {fullWidth: true, maxWidth: 'xs'}
                })
            }
            }
        )


    }


    const handleCreationSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // var valid = false;
        checkNameExist("-1",data.get('algoName')).then(result =>{
                if(result){
                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken },
                        body:JSON.stringify(
                            { algo_name: data.get('algoName'),
                                authors: data.get("algoAuthor"),
                                github: data.get("algoGit"),
                                papers: data.get("algoPaper"),
                                comments: data.get("algoComments"),
                                user_id: JSON.parse(localStorage.getItem('user')).id,
                            })
                    };
                    fetch(APIConfig.apiUrl+'/user/createAlgo/', requestOptions )
                        .then(response => {
                            if(response.status === 200){
                                // alert("Algorithm was updated successfully.")
                                confirm({
                                    title :"",
                                    description: "Algorithm was created successfully",
                                    cancellationButtonProps: { sx :{ display: 'none'}},
                                    dialogProps: {fullWidth: true, maxWidth: 'xs'}
                                })
                                // setConfirmOpen(true);
                                refreshAlgorithms((data)=>{
                                    setData(data);
                                    setRows(data);
                                });
                                setOpenAlgoCreate(false);
                            }
                        })
                        .catch(err => console.error(err));
                }else{
                    confirm({
                        title :"",
                        description: "Invalid algorithm name: " + data.get('algoName') ,
                        cancellationButtonProps: { sx :{ display: 'none'}},
                        dialogProps: {fullWidth: true, maxWidth: 'xs'}
                    })
                }
            }
        )


    }

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

    const navigateToMaps = (event, algo_id,algo_name) => {
        // 👇️ navigate to /contacts
        // // console.log(id)
        // console.log(event.target);
        // console.log(event.target.getAttribute('type'));
        navigate('/user/maps',{ state: { algo_id: algo_id, algo_name: algo_name}, replace: false} )
        event.stopPropagation();
        // state={instance_id : id}, replace: false});
    };

    const handleAlgoDetailClickOpen  = (event,scrollType, algo_data)  => {
        setOpenAlgoDetail(true);
        setScrollAlgoDetail(scrollType);
        setAlgodata(algo_data);
        event.stopPropagation();
    };


    const handleAlgoModifyClickOpen  = (event,scrollType, algo_data)  => {
        setOpenAlgoModify(true);
        setScrollAlgoDetail(scrollType);
        setAlgodata(algo_data);
        event.stopPropagation();
    };
    const handleAlgoModifyClose = () => {
        setOpenAlgoModify(false);
    };

    const handleAlgoDetailClose = () => {
        setOpenAlgoDetail(false);
        setDomainQuery('#Instances Closed');
    };
    React.useEffect(() => {
        if (openAlgoDetail) {
            setDomainLoading(true);
            fetch(APIConfig.apiUrl+'/algorithm/getClosedInfoGroup/'+algodata['id'], {method: 'GET'})
                .then(res => res.json())
                .then(data => {
                    data.forEach(function(element){
                        if(element[algodata.algo_name] === undefined){
                            element[algodata.algo_name] =0;
                        }
                        element.name =  element.name.charAt(0).toUpperCase() +element.name.slice(1)
                    })
                    setAlgoChartData(data);
                    setDomainLoading(false);
                })
                .catch(err => console.error(err));

        }
    }, [openAlgoDetail]);





    const handleDomainQueryChange = (event) => {
        setDomainQuery(event.target.value);
        setDomainLoading(true);
        var domain_API = '';
        if(event.target.value ==='#Instances Closed'){
            domain_API = APIConfig.apiUrl+'/algorithm/getClosedInfoGroup/'+algodata['id'];
        }else if(event.target.value ==='#Instances Solved'){
            domain_API = APIConfig.apiUrl+'/algorithm/getSolvedInfoGroup/'+algodata['id'];
        }
        else if (event.target.value === '#Best Lower-bounds'){
            domain_API = APIConfig.apiUrl+'/algorithm/getLowerInfoGroup/'+algodata['id'];
        }else{
            domain_API = APIConfig.apiUrl+'/algorithm/getSolutionInfoGroup/'+algodata['id'];
        }
        fetch(domain_API, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                data.forEach(function(element){
                    if(element[algodata.algo_name] === undefined){
                        element[algodata.algo_name] =0;
                    }
                    element.name =  element.name.charAt(0).toUpperCase() +element.name.slice(1)
                })
                setAlgoChartData(data);
                setDomainLoading(false);
            })
            .catch(err => console.error(err));
    }



    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box
            sx={{
                minWidth: 600, position: "absolute", width: '96%', paddingLeft: "2%", top: "300px", opacity: "0.95"
            }}>
            <Paper elevation={12} sx={{width: '100%', mb: 2, borderRadius: 5}}>
                <Toolbar
                    sx={{
                        pl: {sm: 2},
                        pr: {xs: 1, sm: 1}
                    }}
                >
                    <IconButton
                        size='medium'
                        onClick={() => {
                            setDense(!dense)
                        }
                        }>
                        {dense ? <ZoomOutMapIcon fontSize='medium'/> : <ZoomInMapIcon fontSize='medium'/>}
                    </IconButton>

                    <IconButton
                        size ='medium'
                        onClick={() => {
                            setOpenAlgoCreate(true)
                        }
                        }>
                        <LibraryAddIcon  fontSize ='medium'/>
                    </IconButton>

                    <Typography
                        sx={{flex: '1 1 100%', paddingLeft: '10px'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        My Submissions
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
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searched === "" ? null :
                                        <IconButton onClick={(searchVal) => cancelSearch(searchVal.target.value)}>
                                            <CancelIcon/>
                                        </IconButton>}
                                </InputAdornment>
                            )
                        }}
                    />
                </Toolbar>
                <TableContainer sx={{width: "100%"}}>
                    <Table
                        // frozen table set max-content
                        sx={{minWidth: 600, width: "100%"}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        style={{tableLayout: "auto"}}
                    >
                        <colgroup>
                            <col style={{minWidth: "200px"}} width="15%"/>
                            <col style={{minWidth: "200px"}} width="15%"/>
                            <col style={{minWidth: "200px"}} width="15%"/>
                            <col style={{minWidth: "200px"}} width="15%"/>
                            <col style={{minWidth: "200px"}} width="15%"/>
                            <col style={{minWidth: "200px"}} width="15%"/>
                            <col style={{minWidth: "100px"}} width="5%"/>
                            <col style={{minWidth: "100px"}} width="5%"/>
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
                                            onClick={(event) => navigateToMaps(event,row.id,row.algo_name)}
                                        >
                                            <TableCell
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                                align="left"
                                            >
                                                {row.algo_name}
                                            </TableCell>
                                            <TableCell align="left">{row.authors}</TableCell>
                                            <TableCell align="left">{row.best_lower}</TableCell>
                                            <TableCell align="left">{row.best_solution}</TableCell>
                                            <TableCell align="left">{row.instances_closed}</TableCell>
                                            <TableCell align="left">{row.instances_solved}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={(event) => handleAlgoDetailClickOpen(event, 'paper', row)}>
                                                    <InfoIcon/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={(event) => handleAlgoModifyClickOpen(event, 'paper', row)}>
                                                    <EditIcon/>
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
                                    <TableCell colSpan={9}/>
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


                <Dialog
                    open={openAlgoDetail}
                    onClose={handleAlgoDetailClose}
                    scroll={scrollAlgoDetail}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth={true}
                    maxWidth={'md'}
                    disableScrollLock={ true }
                    PaperProps={{
                        style: { mb: 2,borderRadius: 10 }
                    }}
                    // PaperProps={{ sx: { width: "100%"}}}
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
                                    id="tableTitle"
                                    component="div"
                                >
                                    Summary
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
                                        <MenuItem value={"#Best Lower-bounds"}>Best Lower Bound</MenuItem>
                                        <MenuItem value={"#Best Solutions"}>Best Solution</MenuItem>
                                    </Select>

                                </FormControl>
                            </Toolbar>
                            {domainLoading ? <Box display="flex"
                                                  justifyContent="center"
                                                  alignItems="center" width={350} height={400}><CircularProgress
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
                    {/*<DialogActions>*/}
                    {/*    <Button onClick={handleAlgoDetailClose}>Cancel</Button>*/}
                    {/*</DialogActions>*/}
                </Dialog>

                <Dialog
                    open={openAlgoModify}
                    onClose={handleAlgoModifyClose}
                    scroll={scrollAlgoDetail}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    // fullWidth={true}
                    maxWidth={'md'}
                    disableScrollLock={true}
                    PaperProps={{
                        style: {mb: 2, borderRadius: 10}
                    }}
                    // PaperProps={{ sx: { width: "100%"}}}
                >
                    <DialogContent dividers={scrollAlgoDetail === 'paper'} sx={{width: 470, display: 'flex'}}>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Table sx={{width: 470}}>
                                <colgroup>
                                    <col width="120"/>
                                    <col width="150"/>
                                    <col width="50"/>
                                    <col width="150"/>
                                </colgroup>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{paddingRight: 0, paddingLeft: 0}}>Algorithm Name:</TableCell>
                                        <TableCell
                                            style={{paddingRight: 10, paddingLeft: 10}}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoName"
                                                name="algoName"
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                maxRows = {1}
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"
                                                defaultValue={algodata.algo_name}
                                            />
                                        </TableCell>
                                        <TableCell style={{paddingRight: 0, paddingLeft: 0}}> Authors: </TableCell>
                                        <TableCell
                                            style={{paddingRight: 10, paddingLeft:10}}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoAuthor"
                                                name="algoAuthor"
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                maxRows = {1}
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"
                                                defaultValue={algodata.authors}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{paddingRight: 0, paddingLeft: 0}}> Github Link: </TableCell>
                                        <TableCell style={{paddingRight: 10, paddingLeft: 10}} colSpan={3}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoGit"
                                                name="algoGit"
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                maxRows = {1}
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"
                                                defaultValue={algodata.github}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            style={{paddingRight: 0, paddingLeft: 0, verticalAlign: "top"}}> Paper
                                            Reference: </TableCell>
                                        <TableCell style={{paddingRight: 10, paddingLeft:10, verticalAlign: "top"}}
                                                   colSpan={3}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoPaper"
                                                name="algoPaper"
                                                maxRows = {4}
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"
                                                defaultValue={algodata.papers}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{
                                            paddingRight: 0,
                                            paddingLeft: 0,
                                            verticalAlign: "top"
                                        }}> Comments: </TableCell>
                                        <TableCell style={{paddingRight: 10, paddingLeft: 10, verticalAlign: "top"}}
                                                   colSpan={3}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoComments"
                                                name="algoComments"
                                                maxRows = {4}
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"
                                                defaultValue={algodata.comments}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Button
                                type="submit"
                                // fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2,mr:1}}
                                style={{float : 'right'}}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={openAlgoCreate}
                    onClose={ ()=>{setOpenAlgoCreate(false)}}
                    scroll={scrollAlgoDetail}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    // fullWidth={true}
                    maxWidth={'md'}
                    disableScrollLock={true}
                    PaperProps={{
                        style: {mb: 2, borderRadius: 10}
                    }}
                    // PaperProps={{ sx: { width: "100%"}}}
                >
                    <DialogContent dividers={scrollAlgoDetail === 'paper'} sx={{width: 470, display: 'flex'}}>
                        <Box component="form" onSubmit={handleCreationSubmit} noValidate sx={{ mt: 1 }}>
                            <Table sx={{width: 470}}>
                                <colgroup>
                                    <col width="120"/>
                                    <col width="150"/>
                                    <col width="50"/>
                                    <col width="150"/>
                                </colgroup>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{paddingRight: 0, paddingLeft: 0}}>Algorithm Name:</TableCell>
                                        <TableCell
                                            style={{paddingRight: 10, paddingLeft: 10}}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoName"
                                                name="algoName"
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                maxRows = {1}
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"
                                            />
                                        </TableCell>
                                        <TableCell style={{paddingRight: 0, paddingLeft: 0}}> Authors: </TableCell>
                                        <TableCell
                                            style={{paddingRight: 10, paddingLeft:10}}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoAuthor"
                                                name="algoAuthor"
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                maxRows = {1}
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"

                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{paddingRight: 0, paddingLeft: 0}}> Github Link: </TableCell>
                                        <TableCell style={{paddingRight: 10, paddingLeft: 10}} colSpan={3}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoGit"
                                                name="algoGit"
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                maxRows = {1}
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            style={{paddingRight: 0, paddingLeft: 0, verticalAlign: "top"}}> Paper
                                            Reference: </TableCell>
                                        <TableCell style={{paddingRight: 10, paddingLeft:10, verticalAlign: "top"}}
                                                   colSpan={3}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoPaper"
                                                name="algoPaper"
                                                maxRows = {4}
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{
                                            paddingRight: 0,
                                            paddingLeft: 0,
                                            verticalAlign: "top"
                                        }}> Comments: </TableCell>
                                        <TableCell style={{paddingRight: 10, paddingLeft: 10, verticalAlign: "top"}}
                                                   colSpan={3}>
                                            <TextField
                                                margin='none'
                                                required
                                                fullWidth
                                                id="algoComments"
                                                name="algoComments"
                                                maxRows = {4}
                                                size  = 'small'
                                                autoFocus
                                                multiline
                                                inputProps={{style: {fontSize: 14}}}
                                                // variant="standard"
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Button
                                type="submit"
                                // fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2,mr:1}}
                                style={{float : 'right'}}
                            >
                                Create Algorithm
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openMonitorDetail}
                    onClose={()=>setOpenMonitorDetail(false)}
                    fullWidth={true}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    maxWidth={'sm'}
                    disableScrollLock={ true }
                    PaperProps={{
                        style: { mb: 2,borderRadius: 10 }
                    }}
                    // PaperProps={{ sx: { width: "100%"}}}
                >
                    <DialogContent sx={{width: 550, display : 'flex'}}>
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
            </Paper>
        </Box>
    );
}
