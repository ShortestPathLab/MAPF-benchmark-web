import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Brush, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer , AreaChart, Area} from 'recharts';
import { Radar, RadarChart, PolarGrid,  PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import randomColor from "randomcolor";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from "@mui/material/IconButton";
import FilterListIcon from '@mui/icons-material/FilterList';
import Menu from "@mui/material/Menu";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import {APIConfig} from "./config";

const angle = {
    'Warehouse': -40,
    'City' : 0,
    'Empty' : 50,
    'Game' : 110,
    'Maze' : 0,
    'Random' : 0,
    'Room' : -110
}

const getClosedInfo = (callback)=>{
    fetch(APIConfig.apiUrl+'/algorithm/getClosedInfo', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => console.error(err));
}

const getLowerBoundInfo = (callback)=>{
    fetch(APIConfig.apiUrl+'/algorithm/getLowerInfo/', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => console.error(err));
}

const getSoultionInfo = (callback)=>{
    fetch(APIConfig.apiUrl+'/algorithm/getSolutionInfo/', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => console.error(err));
}

export default function Summary() {

    const [mapData, setMapData ] = React.useState([]);
    const [mapQueryResult, setMapQueryResult] = React.useState([]);
    const [color,setColor] = React.useState(Array(100)
        .fill()
        .map((currElement, index) =>
            currElement=randomColor({seed : 60 + 6*index})
        ))
    const [mapBarChartAlgorithms, setMapBarChartAlgorithms ] = React.useState([]);
    const [mapBarChartDisplayAlgorithms, setMapBarChartDisplayAlgorithms ] = React.useState([]);
    const [mapBarChartDisplayData, setMapBarChartDisplayData ] = React.useState([]);
    const [mapBarChartOriData, setMapBarChartOriData ] = React.useState([]);
    const [mapQuery, setMapQuery] = React.useState('#Instances Closed');
    const [mapFilterState, setMapFilterState] = React.useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [progressChartData, setProgressChartData] = React.useState([]);
    const [algorithm_name, setAlgorithm_name] = React.useState([]);


    const [domainQuery, setDomainQuery] = React.useState('#Instances Closed');
    const [domainQueryResult, setDomainQueryResult] = React.useState([]);
    const [domainBarChartAlgorithms, setDomainBarChartAlgorithms ] = React.useState([]);
    const [domainBarChartDisplayAlgorithms, setDomainBarChartDisplayAlgorithms ] = React.useState([]);
    const [domainBarChartDisplayData, setDomainBarChartDisplayData ] = React.useState([]);
    const [domainBarChartOriData, setDomainBarChartOriData ] = React.useState([]);
    const [domainFilterState, setDomainFilterState] = React.useState({});

    const [domainAnchorEl, setDomainAnchorEl] = React.useState(null);
    // const [domainQuery, setDomainQuery] = React.useState('');
    // const [domainChartData, setDomainChartData] = React.useState([]);
    // const [domainType, setDomainType] = React.useState('#Instances Closed');
    //

    const handleDomainFilterClick = e => {
        setDomainAnchorEl(e.currentTarget);
    };
    const handleDomainFilterClose = () => {
        setDomainAnchorEl(null);
    };

    const handleMapFilterClick = e => {
        setAnchorEl(e.currentTarget);
    };
    const handleMapFilterClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setMapQuery(event.target.value);
        if(event.target.value ==='#Instances Closed' ){
            getClosedInfo((data)=>{
                setMapQueryResult(data);
                // console.log("finished query")
            });
        }else if (event.target.value ==="#Best Lower-bounds" ){
            getLowerBoundInfo((data)=>{
                setMapQueryResult(data);
                // console.log("finished query")
            });
        }else{
            getSoultionInfo((data)=>{
                setMapQueryResult(data);
                // console.log("finished query")
            });
        }

    };
    const handleDomainQueryChange = (event) => {
        setDomainQuery(event.target.value);

        var domain_API = '';
        if(event.target.value ==='#Instances Closed'){
            domain_API = APIConfig.apiUrl+'/algorithm/getDomainClosedInfo';
        }else if (event.target.value === '#Best Lower-bounds'){
            domain_API = APIConfig.apiUrl+'/algorithm/getDomainLowerInfo';
        }else{
            domain_API = APIConfig.apiUrl+'/algorithm/getDomainSolutionInfo';
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
    }, []);


    React.useEffect(() => {
        if(algorithm_name.length > 0) {

            var map_API = APIConfig.apiUrl+'/map';
            var closed_API = APIConfig.apiUrl+'/algorithm/getClosedInfo';
            var domain_chart_API = APIConfig.apiUrl+'/algorithm/getDomainClosedInfo';

            Promise.all([fetch(map_API, {method: 'GET'}),
                fetch(closed_API, {method: 'GET'}),
                fetch(domain_chart_API  , {method: 'GET'})
            ])
                .then((values) => {
                    return Promise.all(values.map((r) => r.json()))
                })
                .then(([map_data, closed_data,
                           domain_chart_data
                       ]) => {
                    setMapData(map_data);
                    setMapQueryResult(closed_data);
                    setDomainQueryResult(domain_chart_data);
                }).catch(err => console.error(err));
        }
    }, [algorithm_name]);


    React.useEffect(() => {
        if(mapData.length >0){
            var progressChartData = [];
            mapData.forEach(element=>progressChartData.push({name:element.map_name, total:element.instances,
                Closed: element.instances_closed,
                Solved: element.instances_solved - element.instances_closed,
                Unknown: element.instances - element.instances_solved,
            }));
            setProgressChartData(progressChartData)
        }
    }, [mapData]);


    React.useEffect(() => {
        if(mapQueryResult.length >0){
            var mapChartData = [];
            [...new Set(mapData.map(item => item.map_name))].forEach(element=>
                mapChartData.push({name:element})
            );
            const algorithm = new Set();
            for( var i = 0; i < mapQueryResult.length; i ++){
                // iterate map
                var mapIndex = mapChartData.findIndex(x => x.name === mapQueryResult[i].map_name);
                for(var j = 0 ; j < mapQueryResult[i].solved_instances.length; j ++){
                    var algo = mapQueryResult[i].solved_instances[j]
                    algorithm.add(algo.algo_name);
                    mapChartData[mapIndex][algo.algo_name] = algo.count;
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
        }
    }, [mapQueryResult]);

    React.useEffect(() => {
        if(domainQueryResult.length >0){
            var domainChartData = [];
            [...new Set(mapData.map(item => item.map_type))].forEach(element=>
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
            setDomainFilterState(check_box_state);
            setDomainBarChartAlgorithms(unique_key);
            setDomainBarChartDisplayAlgorithms(unique_key);
            setDomainBarChartDisplayData(domainChartData);
            setDomainBarChartOriData(domainChartData);
        }
    }, [domainQueryResult]);

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

    React.useEffect(() => {
        var displayData = []
        // console.log(solvedChartOriData);
        mapBarChartOriData.forEach(function(element) {
            var mapData  = {}
            mapData['name'] = element['name'];
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


    const handleMapFilterChange = (event) => {
        setMapFilterState({
            ...mapFilterState,
            [event.target.name]: event.target.checked,
        });
    };

    const handleMapTextClick = (event) => {
        setMapFilterState({
            ...mapFilterState,
            [event.currentTarget.innerText]: !mapFilterState[event.currentTarget.innerText],
        });
    };

    const handleDomainTextClick = (event) => {
        setDomainFilterState({
            ...domainFilterState,
            [event.currentTarget.innerText]: !domainFilterState[event.currentTarget.innerText],
        });
    };

    const handleDomainFilterChange = (event) => {
        setDomainFilterState({
            ...domainFilterState,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <Box
            sx={{ minWidth : 600, position: "absolute", width: '96%', paddingLeft:"2%", top:"300px",opacity:"0.95"
            }}>
            <Box sx={{ minWidth :  600,  width: '100%', display : 'flex'}}>
                <Paper elevation={12} sx={{ width: '68%', mb: 2,borderRadius: 5}}>
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
                            Current Progress
                        </Typography>
                    </Toolbar>
                    <ResponsiveContainer width="98%"  height={400}>
                        <AreaChart
                            data={progressChartData}
                            stackOffset="expand"
                        >
                            <Legend verticalAlign="top"  align="center" wrapperStyle={{
                                fontFamily: "Roboto Slab"
                            }}/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-60} height={80} interval={0} textAnchor="end"
                                   tickFormatter={(tick) => tick === 0 ? "" : tick.substring(0, 5) + "..."}
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
                            <Brush  y={310} dataKey="name"  height={20} stroke='rgba(0, 0, 0, 0.5)' />
                            <Tooltip content={renderTooltipContent}  wrapperStyle={{ fontFamily: "Roboto Slab" , background:"white"}} />
                            <Area type="monotone" dataKey="Closed" stackId="1" stroke="#4CBB17" fill="#4CBB17" />
                            <Area type="monotone" dataKey="Solved" stackId="1" stroke="#F9812A" fill="#F9812A" />
                            <Area type="monotone" dataKey="Unknown" stackId="1" stroke="#BF0A30" fill="#BF0A30" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Paper>
                <div style = {{width:'2%'}}/>

                <Paper elevation={12} sx={{ width: '38%', mb: 2,borderRadius: 5}}>
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
                            Domain Summary
                        </Typography>
                        <FormControl sx={{ m: 1, minWidth: 120, width:300}}  size = 'small' >
                            <Select
                                displayEmpty = {true}
                                value={domainQuery}
                                onChange={handleDomainQueryChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={"#Instances Closed"}>#Instances Closed</MenuItem>
                                <MenuItem value={"#Best Lower-bounds"}>#Best Lower-bounds</MenuItem>
                                <MenuItem value={"#Best Solutions"}>#Best Solutions</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton
                            aria-controls="domain-filter-menu"
                            aria-haspopup="true"
                            onClick={handleDomainFilterClick}
                            aria-label="Open to show more"
                            title="Open to show more"
                        >
                            <FilterListIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={domainAnchorEl}
                            keepMounted
                            open={Boolean(domainAnchorEl)}
                            // onClick ={handleDomainFilterChange}
                            onClose={handleDomainFilterClose}
                        >
                            {domainBarChartAlgorithms.map((algo) => (
                                <MenuItem key = {algo} value={algo} onClick ={handleDomainTextClick} >
                                    <Checkbox
                                        checked={domainFilterState[algo]}
                                        onChange={handleDomainFilterChange}
                                        name={algo}
                                    />
                                    <ListItemText primary={algo} />
                                </MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>
                    <ResponsiveContainer width="100%" height={380}>
                        <RadarChart cx="50%" cy="60%" outerRadius="80%" data={domainBarChartDisplayData}>
                            {/*<text x="50%" y="0" dominantBaseline="hanging" fontSize="20"  textAnchor={'middle'} style = {{ fontFamily: "Roboto Slab" }}>Solution</text>*!/*/}
                            <Legend verticalAlign="top"  align="center" wrapperStyle={{
                                fontFamily: "Roboto Slab"
                            }}/>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name"
                                            tick={<CustomizedLabel/>}
                                            style={{
                                                fontFamily: "Roboto Slab"
                                            }}/>
                            <Tooltip wrapperStyle={{ fontFamily: "Roboto Slab" }}   formatter={(tick) => {
                                var value = tick*100
                                return `${value.toFixed(2)}%`;}}
                            />
                            <PolarRadiusAxis angle={38.5} domain={[0, domainBarChartDisplayAlgorithms.length > 0 ? 'dataMax': 1]}
                                             tickFormatter={(tick) => {
                                                 var value = tick*100
                                                 return `${value.toFixed(0)}%`;
                                             }}
                            />
                            {domainBarChartDisplayAlgorithms.map((algo) => (
                                    <Radar  key={algo}  dataKey={algo} stroke={color[algorithm_name.indexOf(algo)]} fill={color[algorithm_name.indexOf(algo)]} fillOpacity={0.6} />
                                )
                            )}
                        </RadarChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>
            <Box sx={{ minWidth :  600,  width: '100%'}}>
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
                            Comparison between Algorithms on Maps
                        </Typography>

                        <FormControl sx={{ m: 1, minWidth: 120, width:300}}  size = 'small' >
                            <Select
                                value={mapQuery}
                                displayEmpty = {true}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={"#Instances Closed"}>#Instances Closed</MenuItem>
                                <MenuItem value={"#Best Lower-bounds"}>#Best Lower-bounds</MenuItem>
                                <MenuItem value={"#Best Solutions"}>#Best Solutions</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleMapFilterClick}
                        >
                            <FilterListIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            // onClick ={handleMapFilterChange}
                            onClose={handleMapFilterClose}
                        >
                            {mapBarChartAlgorithms.map((algo) => (
                                <MenuItem key = {algo} value={algo} onClick ={handleMapTextClick} >
                                    <Checkbox
                                        checked={mapFilterState[algo]}
                                        onChange={handleMapFilterChange}
                                        name={algo}
                                    />
                                    <ListItemText primary={algo} />
                                </MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>

                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart
                            data={mapBarChartDisplayData}
                        >
                            <Legend verticalAlign="top"  align="center" wrapperStyle={{
                                fontFamily: "Roboto Slab"
                            }}/>
                            <Brush  y={510} dataKey="name"  height={20} stroke='rgba(0, 0, 0, 0.5)' />
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-60} height={80} interval={0} textAnchor="end"
                                   tickFormatter={(tick) => tick === 0 ? "" : tick.substring(0, 5) + "..."}
                                   dy = {30}
                                   style={{
                                       fontFamily: "Roboto Slab"
                                   }}
                            />
                            <YAxis  tickFormatter={(tick) => {
                                return `${tick* 100}%`;
                            }}/>
                            <Tooltip  wrapperStyle={{ fontFamily: "Roboto Slab" }}
                                      formatter={(tick) => {
                                          var value = tick*100
                                          return `${value.toFixed(2)}%`;}}
                            />
                            {mapBarChartDisplayAlgorithms.map((algo) => (
                                    <Bar key={algo}  dataKey={algo} stroke = {color[algorithm_name.indexOf(algo)]} fill={color[algorithm_name.indexOf(algo)]} />
                                )
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>
        </Box>
    );
}
