import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useLocation, useNavigate} from "react-router-dom";
import TableViewIcon from '@mui/icons-material/TableView';
import PeopleIcon from '@mui/icons-material/People';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {APIConfig} from "./config";
const settings = ['Dashboard', 'Logout'];


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [login, setLogin] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenNavMenu = (event) => {
        // console.log(event.currentTarget);
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        // console.log(event.currentTarget);
        setAnchorElUser(event.currentTarget);
    };

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    React.useEffect(() => {
        // if(localStorage.getItem('user')){
        //     setLogin(true);
        // }
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const decodedJwt = parseJwt(user.accessToken);
            if (decodedJwt.exp * 1000 < Date.now()) {
                localStorage.removeItem("user");
                setLogin(false);
                navigate('/');
            }else{
                setLogin(true);
            }
        }
    }, [location]);



    const handleCloseNavMenu = (page) => {
        // console.log(page);
        if(page === "BenchmarkResults"){
            navigate('/' );
        }else if (page === "BenchmarkDataset"){
            window.location.href = 'https://movingai.com/benchmarks/mapf/index.html';
        }else if (page === "Summary"){
            navigate('/summary' );
        }else if (page === "AboutUs"){
            navigate('/aboutUs');
        }else if (page === "Submissions"){
            navigate('/submissions');
        }else if (page === 'SystemDemo'){
            navigate('/systemDemo');
        }


        // console.log(anchorElNav);
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (page) => {

        // console.log(page);
        if(page === "Logout"){
            localStorage.removeItem("user");
            setLogin(false);
            navigate('/');
        } else if (page === "Dashboard"){
            navigate('/dashboard');
        }

        setAnchorElUser(null);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: data.get('username'),password: data.get('password')})
        };

        fetch(APIConfig.apiUrl+'/auth/signin', requestOptions )
            .then(response => response.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(data));
                    setOpen(false);
                    setLogin(true);

                }else{
                    alert("Please enter the correct username and password");
                }
                return data;
            })
            .catch(err => console.error(err));
    };

    const handleClickLogin = (event)  => {
        setOpen(true);
        event.stopPropagation();
    };

    return (
        // <AppBar  style={{position:"static",background: "grey"}}>
            <AppBar elevation={0} style={{position:"fixed",background: "grey"}} sx={{ top: 0, bottom: 'auto' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters
                >
                    {/*<Box sx={{ display: {  xs: 'none', md: 'flex' }, mr: 1 }}>*/}
                    {/*    <img*/}
                    {/*        // src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-goose.jpg"*/}
                    {/*        src={`${process.env.PUBLIC_URL}/monash_logo.png`}*/}
                    {/*        alt = 'monash_logo'*/}
                    {/*        style={{ width: 90, height: 60}}*/}
                    {/*    />*/}
                    {/*</Box>*/}
                    {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: "Roboto Slab",
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                       MAPF
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            <MenuItem key="Benchmark Dataset" onClick={() =>handleCloseNavMenu("BenchmarkDataset")}>
                                <Button
                                    key="Benchmark Dataset"
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={<DatasetLinkedIcon />}
                                >
                                    Benchmark Dataset
                                </Button>
                            </MenuItem>
                            <MenuItem key="BenchmarkResults" onClick={() =>handleCloseNavMenu("BenchmarkResults")}>
                                <Button
                                    sx={{color: 'black',textTransform: "none"}}
                                    startIcon={<TableViewIcon />}
                                >
                                    Benchmark Results
                                </Button>
                            </MenuItem>
                            <MenuItem key="Submissions" onClick={() =>handleCloseNavMenu("Submissions")}>
                                <Button
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={<DriveFolderUploadIcon/>}
                                >
                                    Submissions
                                </Button>
                            </MenuItem>
                            <MenuItem key="SystemDemo" onClick={() =>handleCloseNavMenu("SystemDemo")}>
                            <Button
                                sx={{ color: 'black',textTransform: "none"}}
                                startIcon={<PlayCircleOutlineIcon/>}
                            >
                                System Demo
                            </Button>
                            </MenuItem>

                            {/*<MenuItem key="Summary" onClick={() =>handleCloseNavMenu("Summary")}>*/}
                            {/*    <Button*/}
                            {/*        sx={{ color: 'black',textTransform: "none"}}*/}
                            {/*        startIcon={<BarChartIcon/>}*/}
                            {/*    >*/}
                            {/*        Summary*/}
                            {/*    </Button>*/}
                            {/*</MenuItem>*/}
                            <MenuItem key="AboutUs" onClick={() =>handleCloseNavMenu("AboutUS")}>
                                <Button
                                    sx={{ color: 'black',textTransform: "none"}}
                                    startIcon={<PeopleIcon />}
                                >
                                    About Us
                                </Button>
                            </MenuItem>

                        </Menu>
                    </Box>
                    {/*<Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>*/}
                    {/*    <img*/}
                    {/*        // src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-goose.jpg"*/}
                    {/*        src={`${process.env.PUBLIC_URL}/monash_logo.png`}*/}
                    {/*        alt = 'monash_logo'*/}
                    {/*        style={{ width: 90, height: 60}}*/}
                    {/*    />*/}
                    {/*</Box>*/}

                    {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                       MAPF
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key="Benchmark Dataset"
                            onClick={() =>handleCloseNavMenu("BenchmarkDataset")}
                            sx={{ my: 2, color: 'white',textTransform: "none"}}
                            startIcon={<DatasetLinkedIcon />}
                        >
                            Benchmark Dataset
                        </Button>


                        <Button
                            key="BenchmarkResults"
                            onClick={() =>handleCloseNavMenu("BenchmarkResults")}
                            sx={{ my: 2, color: 'white',textTransform: "none"}}
                            startIcon={<TableViewIcon />}
                        >
                            Benchmark Results
                        </Button>

                        <Button
                            key="Submissions"
                            onClick={() =>handleCloseNavMenu("Submissions")}
                            sx={{ my: 2, color: 'white',textTransform: "none"}}
                            startIcon={<DriveFolderUploadIcon/>}
                        >
                            Submissions
                        </Button>



                        {/*<Button*/}
                        {/*    key="Summary"*/}
                        {/*    onClick={() =>handleCloseNavMenu("Summary")}*/}
                        {/*    sx={{ my: 2, color: 'white',textTransform: "none"}}*/}
                        {/*    startIcon={<BarChartIcon/>}*/}
                        {/*>*/}
                        {/*    Summary*/}
                        {/*</Button>*/}
                        <Button
                            key="SystemDemo"
                            onClick={() =>handleCloseNavMenu("SystemDemo")}
                            sx={{ my: 2, color: 'white',textTransform: "none"}}
                            startIcon={<PlayCircleOutlineIcon/>}
                        >
                            System Demo
                        </Button>

                        <Button
                            key="AboutUs"
                            onClick={() =>handleCloseNavMenu("AboutUs")}
                            sx={{ my: 2, color: 'white',textTransform: "none"}}
                            startIcon={<PeopleIcon />}
                        >
                            About Us
                        </Button>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {/*<Tooltip title="Login">*/}
                            { login ?
                                <Tooltip title={JSON.parse(localStorage.getItem('user')).username}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar>{JSON.parse(localStorage.getItem('user')).username.charAt(0).toUpperCase()}</Avatar>
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title="Login">
                                    <IconButton onClick={handleClickLogin} sx={{ p: 0 }}>
                                        <Avatar>L</Avatar>
                                    </IconButton>
                                </Tooltip>
                            }
                        {/*</Tooltip>*/}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() =>handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                        >
                            <DialogTitle id="scroll-dialog-title">Welcome to MAPF</DialogTitle>
                            <DialogContent >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="User Name"
                                            name="username"
                                            autoComplete="username"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign In
                                        </Button>
                                    </Box>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
