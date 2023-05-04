import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import randomColor from "randomcolor";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import Slider from '@mui/material/Slider';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {APIConfig} from "./config";

let max_time_step  = 0;
let grid_size = 0;
let grid_line_width = 0.05;
let map_size = 0;

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
    // console.log('finish loading')
    return map;
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
        max_time_step = max_time_step > agent_solution.length ? max_time_step : agent_solution.length;
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
    // console.log('finish scenario');
    return agent_state;
    // console.log(agent_state);
    // lines.slice(1).forEach((line, i) => {
    //     var entries  =  line.split('\t');
    //     solution[i][0].x = entries[4];
    //     solution[i][0].y = entries[5];
    //     if( i === num_of_agents-1){
    //         return;
    //     }
    // });

}

function render_map(ctx,map){
    var current_y = 0;
    for(var i = 0; i < map.length; i++){
        var current_x = 0;
        for(var j = 0; j < map[i].length; j++){
            // ctx.fillStyle = 'white'

            var state = map[i][j]
            if(state){
                ctx.lineWidth = grid_line_width;
                ctx.fillStyle = 'black'
                ctx.fillRect(current_x,current_y,grid_size,grid_size);
            }else{
                ctx.lineWidth = grid_line_width;
                ctx.strokeStyle = 'black'
                ctx.strokeRect(current_x,current_y,grid_size,grid_size);
            }
            current_x = current_x + grid_size;
        }
        current_y  = current_y + grid_size;
    }
    // console.log("Finishing drawing")
}

function render_agents_timesteps(ctx,solution,color,clear_timeSteps,render_timesteps){
    for(var i = 0; i < solution.length;i++){
        var agent_solution = solution[i];
        var clear_location = clear_timeSteps >agent_solution.length-1 ? agent_solution[agent_solution.length-1] : agent_solution[clear_timeSteps];
        var render_location = render_timesteps >agent_solution.length-1 ? agent_solution[agent_solution.length-1] : agent_solution[render_timesteps];
        if(clear_location !== render_location){
            ctx.strokeStyle = 'black';
            ctx.lineWidth = grid_line_width;
            ctx.clearRect(clear_location.x * grid_size, clear_location.y * grid_size, grid_size, grid_size);
            ctx.strokeRect(clear_location.x * grid_size, clear_location.y * grid_size, grid_size, grid_size);
            ctx.fillStyle = color[i];
            ctx.fillRect(render_location.x * grid_size, render_location.y*grid_size, grid_size, grid_size);
        }
    }
}

function render_agents(ctx,solution,color,timeSteps,total_width, total_height){
    ctx.clearRect(0,0,total_width, total_height);
    for(var i = 0; i < solution.length;i++){
        var agent_solution = solution[i];
        if(agent_solution.length > timeSteps){
            ctx.fillStyle = color[i];
            ctx.fillRect(agent_solution[timeSteps].x * grid_size, agent_solution[timeSteps].y*grid_size, grid_size, grid_size);
        }else{
            if(agent_solution.length !== 0){
                ctx.fillStyle = color[i];
                ctx.fillRect(agent_solution[agent_solution.length - 1].x * grid_size, agent_solution[agent_solution.length - 1].y*grid_size, grid_size, grid_size);
            }
        }
    }
}

const Visualization = () => {

    // get canvas
    const canvasRef = useRef()
    const agentcanvasRef = useRef()
    const invisiblecanvasRef = useRef()

    // set frame counter
    const [counter, setCounter] = useState(0)
    const [shouldStop, setShouldStop] = useState(true)
    const [data, setData] = useState("")
    const [map, setMap] = useState([[]])
    const [solution, setSolution] = useState([[]])
    const [color, setColor] = useState([])
    const [speed, setSpeed] = useState(60)

    const [timeSteps, setTimeSteps] = useState(0)

    const navigate = useNavigate();
    const location = useLocation();
    const [canvas_setting, setCanvas_setting] = useState({width : 750, height : 750})
    const [scale, setScale] = useState(1)
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [original_canvas_setting, setOriginal_canvas_setting] = useState({width : 750, height : 750})

    //
    useEffect(() => {
        max_time_step  = 0;
        grid_size = 0;
        grid_line_width = 0.05;
        map_size = 0;
        fetch(APIConfig.apiUrl+'/solution_path/'+location.state.path_id, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setData(data.solution_path);
            }).catch(err => console.error(err));
        }, []
    );

    useEffect(() => {
        if(data.length !== 0 ) {

            var map_file = location.state.map_name + ".map"
            // var map_file = "brc202d.map"
            // var map_file = "empty-48-48.map"
            // var map_file = "warehouse-10-20-10-2-2.map"
            // var map_file = "w_woundedcoast.map"
            // var map_file = "orz900d.map"
            var map_path = require("./assets/maps/" + map_file);

            var agent = location.state.num_agents;
            var color = Array(agent)
                .fill()
                .map((currElement, index) =>
                    currElement=randomColor({seed :  100*index})
                );
            setColor(color);


            var solution_string = data;
            // "uuuu\ndddd\nlllll\nrrrr"
            var scen = location.state.scen_string + ".scen";
            var scen_path = require("./assets/scens/" + scen);


            Promise.all([fetch(map_path), fetch(scen_path)])
                .then((values) => {
                    return Promise.all(values.map((r) => r.text()))
                })
                .then(([map_text, scen_text]) => {
                    setMap(parseMap(map_text));
                    setSolution(parseScen(scen_text, agent, solution_string));
                }).catch(err => console.error(err));
        }
        }, [data]
    );


    useEffect(() => {
        if(map.length > 1){
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,canvas_setting.width,canvas_setting.height);
            var map_height= map.length;
            var map_width = map[0].length;
            var grid_height = canvas_setting.height/map_height;
            var grid_width = canvas_setting.width/map_width;
            grid_size =  grid_height < grid_width ? grid_height : grid_width;
            map_size = map_height*map_width;
            if(grid_size > 1){
                // round to int if possible.
                grid_size = Math.floor(grid_size);
            }else{
                grid_size = 1;
            }
            grid_height = grid_size * map_height;
            grid_width = grid_size * map_width;
            setCanvas_setting({width: grid_width, height: grid_height});
            setOriginal_canvas_setting({width: grid_width, height: grid_height});
        }
    }, [map]);


    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const previousTimeSteps = usePrevious(timeSteps);
    const previousShouldStop = usePrevious(shouldStop);
    useEffect(
        () => {
            if(imageData === null && map.length > 1){
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0,0,canvas_setting.width,canvas_setting.height);
                render_map(ctx,map);
                var image = ctx.getImageData(0, 0, canvas_setting.width , canvas_setting.height);
                setImageData(image);
                const agent_canvas = agentcanvasRef.current;
                const agent_context = agent_canvas.getContext('2d');
                render_agents( agent_context, solution, color,timeSteps,canvas_setting.width,canvas_setting.height);
                setLoading(false);
            }else if (!loading){
                grid_size = canvas_setting.height/ map.length;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (map_size < 100000){
                    ctx.clearRect(0,0,canvas_setting.width,canvas_setting.height);
                    render_map(ctx,map);
                }else{
                    const  newCanvas= invisiblecanvasRef.current;
                    newCanvas.width = original_canvas_setting.width;
                    newCanvas.height = original_canvas_setting.height;
                    newCanvas.getContext("2d").putImageData(imageData, 0, 0);
                    ctx.scale(scale,scale);
                    ctx.drawImage(newCanvas, 0, 0);
                    newCanvas.width = canvas_setting.width;
                    newCanvas.height = canvas_setting.height;
                }
                const agent_canvas = agentcanvasRef.current;
                const agent_context = agent_canvas.getContext('2d');
                render_agents( agent_context, solution, color,timeSteps,canvas_setting.width,canvas_setting.height);
                setShouldStop(previousShouldStop);
            }

        } , [canvas_setting]
    )



        // output graphics
    useEffect(() => {
        if(timeSteps >= 0 ) {
            const canvas = agentcanvasRef.current
            const context = canvas.getContext('2d')
            render_agents(context, solution, color,timeSteps,canvas_setting.width,canvas_setting.height);
            // render_agents_timesteps(context, solution, color,previousTimeSteps, timeSteps);
        }
    }, [timeSteps])




    useEffect(() => {
        if(counter === speed){
            setCounter(0);
            setTimeSteps(t => t +1);
            if(timeSteps === max_time_step){
                setTimeSteps(0);
            }
        }
    }, [counter])




    // update the counter
    useLayoutEffect(() => {
        if (!shouldStop) {
            let timerId

            const animate = () => {
                setCounter(c => c + 1)
                timerId = requestAnimationFrame(animate)
            }
            timerId = requestAnimationFrame(animate)
            return () => cancelAnimationFrame(timerId)
        }
    }, [shouldStop])


    const handleChange = (event) => {
        setSpeed(event.target.value);
        setCounter(0);
    };

    const handleChangeCanvas = (value) => ()  =>{
        setShouldStop(true)
        var current_scale = scale + value;
        if(current_scale > 0){
            setScale(current_scale);
            setCanvas_setting({width: original_canvas_setting.width*(current_scale), height: original_canvas_setting.height*(current_scale )});
        }
    }

    return (
        <div className="container">
        {loading ? (
                <div className="loader-container">
                    <div className="spinner">
                    </div>
                </div>
            ) : (null)}
        <div  style={{ backgroundColor: 'grey', width : "fit-content", height : "100%"
        }}>

            <div style={{ display: "grid", minHeight: "calc(100vh - 100px)",minWidth: "calc(100vw - 100px)", paddingTop: "70px",paddingBottom: "70px",paddingRight: "70px",paddingLeft: "70px"}}>
                <canvas ref={invisiblecanvasRef} width={0} height= {0}
                        style={{zIndex: 0,
                            gridArea: "2 / 2 / 2 / 2"
                        }}/>
                <canvas ref={canvasRef} width={canvas_setting.width} height={canvas_setting.height}
                        style={{ backgroundColor: 'white',zIndex: 1,
                            gridArea: "2 / 2 / 2 / 2"
                    }}
                />
                <canvas ref={agentcanvasRef} width={canvas_setting.width} height={canvas_setting.height}
                        style={{zIndex: 2,
                            gridArea: "2 / 2 / 2 / 2"
                }}/>

            </div>
            <AppBar position="fixed" color="grey" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <IconButton
                        onClick={() => setTimeSteps(t => t - 1 < 0 ?  max_time_step : t-1)}
                    >
                        <SkipPreviousIcon />
                    </IconButton>

                    <IconButton
                        onClick={() => setShouldStop(!shouldStop)}
                    >
                        { shouldStop ? <PlayCircleIcon /> : <PauseCircleIcon/>  }
                    </IconButton>

                    <IconButton
                        onClick={() => setTimeSteps(t => t + 1 > max_time_step ?  0 : t+1)}
                    >
                        <SkipNextIcon />
                    </IconButton>
                    <Slider value={timeSteps} min={0}
                            max={max_time_step} valueLabelDisplay="on"/>
                    <Select
                        IconComponent = {ShutterSpeedIcon}
                        value={speed}
                        onChange={handleChange}

                        sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 },     "&:hover": {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                borderRadius: "5px"
                            }}}
                    >
                        <MenuItem value={15}>4x</MenuItem>
                        <MenuItem value={30}>2x</MenuItem>
                        <MenuItem value={60}>1x</MenuItem>
                        <MenuItem value={120}>0.5x</MenuItem>
                    </Select>

                    <IconButton
                        onClick={handleChangeCanvas(0.2)}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleChangeCanvas(-0.2)}
                    >
                        <RemoveCircleOutlineIcon  />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>

        </div>
    )
}

export default Visualization ;
