import React from 'react';
import './App.css';
import NaivgationBar from './navigation_bar'
import MapTable from "./MapTable";
import {
  Routes,
  Route, BrowserRouter,
} from "react-router-dom";

import Typography from '@mui/material/Typography';
import ScenarioTable from "./ScenarioTable";
import SolutionPage from "./SolutionPage";
import Visualizer from "./MAPFVis";
import Summary from "./Summary";
import AboutUs from "./AboutUsPage";
import Submissions from "./Submissions";
import Dashboard from "./Dashboard";
import UserMapPage from "./UserMapPage";
import SystemDemo from "./SystemDemo";
import { useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ConfirmProvider } from "material-ui-confirm";

const theme = createTheme({
  typography: {
    allVariants: {
        fontFamily: '"Roboto Slab", "Helvetica", "Arial", sans-serif'
    },
  },
})

export default function App() {
    const location = useLocation();


    return (
        // src={`${process.env.PUBLIC_URL}/mapf-svg/`+ row.map_name+`.svg`}
        // <div style={{
        //   backgroundImage: `url(${process.env.PUBLIC_URL}/warehourse.jpeg)`
        // }}>
        <ThemeProvider theme={theme}>
            <ConfirmProvider>
          <div style={{minWidth : 600}}>
              < NaivgationBar/>
              <div style={{background: "grey", width: "100%", height: "400px",
                justifyContent:"center",
                alignItems:"center",
                mx: "auto", textAlign: "center",
                display :  location.pathname === "/visualization" ? "none" : ""
              }}>
                <Typography
                    variant="h2"
                    color="white"
                    style={{paddingTop: "120px"}}
                >
                    Tracking Progress in MAPF
                </Typography>
                <Typography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
                  <i>A repository maintains the results of MAPF Benchmark</i>
                </Typography>
              </div>
              <Routes>
                  <Route path="/" element={<MapTable/>} />
                  <Route path="/scenarios" element={<ScenarioTable />} />
                  <Route path="/instances" element={<SolutionPage/>} />
                  <Route path="/visualization" element={<Visualizer/>} />
                  <Route path="/summary" element={<Summary/>} />
                  <Route path="/aboutUs" element={<AboutUs/>} />
                  <Route path="/systemDemo" element={<SystemDemo/>} />
                  <Route path="/submissions" element={<Submissions/>} />
                  <Route path="/dashboard" element={localStorage.getItem("user") !== null ? <Dashboard/> : <Navigate to='/'/>} />
                  <Route path="/user/maps" element={localStorage.getItem("user") !== null ? <UserMapPage/> : <Navigate to='/'/>} />
              </Routes>
        </div>
            </ConfirmProvider>
        </ThemeProvider>
    )



  // nextPath(path) {
  //   this.props.history.push(path);
  // }
  //
  // handleChangeTab = (event, newValue) => {
  //   this.setState({tab: newValue},() => {
  //     if (newValue === 0){
  //       this.nextPath('/')
  //     }
  //         // else if (newValue === 1){
  //         //   this.nextPath('/setups')
  //     // }
  //     else if (newValue === 1){
  //       this.nextPath('/grid')
  //     }
  //     else if (newValue === 2){
  //       this.nextPath('/anyangle')
  //     }
  //     else if (newValue === 3){
  //       this.nextPath('/about')
  //     }
  //     else if (newValue === 4){
  //       this.nextPath('/setting')
  //     }
  //     else if (newValue === 5){
  //       this.nextPath('/admin')
  //     }
  //   } );
  // };
  //
  // set_login = (data)=>{
  //
  //   localStorage.setItem('login_data', JSON.stringify(data));
  //
  //   this.setState({login_data:data});
  // }
  //
  // set_logout = ()=>{
  //   localStorage.setItem('grid_account', null);
  //   localStorage.setItem('anyangle_account', null);
  //   localStorage.setItem('login_data', null);
  //   this.setState({login_data:undefined});
  // }
  //
  // login_github = async (code,state) => {
  //   this.setState({loading:true},()=>{
  //     fetch('/api/auth/github_signin', {
  //       method: 'POST',
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({ code: code, state: state }),
  //     })
  //         .then((res)=>res.json())
  //         .then((body)=>{
  //           if (body.success){
  //             this.set_login(body)
  //           }
  //           else(
  //               this.setState({loading:false})
  //           )
  //         })
  //
  //   })
  // };
  //
  // componentDidMount(){
  //   const url = window.location.href;
  //   const hasCode = url.includes("?code=");
  //
  //   var login_data = JSON.parse(localStorage.getItem('login_data'));
  //   if (hasCode){
  //     const data = url.split("?code=")[1].split("&state=");
  //     const code = data[0];
  //     const state = data[1];
  //     this.login_github(code,state);
  //     this.nextPath('/');
  //   }
  //   else if(login_data == null && !hasCode){
  //     this.setState({login:false});
  //   }
  //   else if (login_data != null ){
  //     this.set_login(login_data);
  //   }
  // }
  //
  //
  //
  //
  // render() {
  //   const { classes } = this.props;
  //   const styles = {
  //     tab: {
  //       color: '#ffffff'
  //     }
  //   }
  //   return (
  //       <ThemeProvider theme={theme} >
  //         <div className={classes.root}>
  //           <AppBar className={classes.welcome} position="static">
  //             <Grid  container alignItems="center" spacing={0}>
  //               <Grid className={classes.bar_grid} item xs={12} sm={8} md={10} lg={10}>
  //                 <Tabs
  //                     className={classes.tab_div}
  //                     // variant="fullWidth"
  //                     value={this.state.tab}
  //                     indicatorColor="secondary"
  //                     textColor="secondary"
  //                     onChange={this.handleChangeTab.bind(this)}
  //                     aria-label="Navi tab"
  //                 >
  //                   <Tab className={classes.tab} style={styles.tab}  icon={<HomeIcon />} label="Home" />
  //                   {/* <Tab className={classes.tab} style={styles.tab} icon={<AssignmentIcon />} label="Setups" /> */}
  //                   <Tab className={classes.tab} style={styles.tab} icon={<GridOnIcon />} label="Grid Based" />
  //                   <Tab className={classes.tab} style={styles.tab} icon={<TimelineIcon />} label="Anyangle" />
  //                   <Tab className={classes.tab} style={styles.tab}  icon={<InfoIcon />} label="About Us" />
  //                   {this.state.login_data!==undefined?<Tab className={classes.tab} style={styles.tab} icon={<SettingsIcon />} label="Account" />:""}
  //
  //                   {this.state.login_data!==undefined && this.state.login_data.roles.includes("ROLE_ADMIN")?<Tab className={classes.tab} style={styles.tab} icon={<SupervisorAccountIcon />} label="Manage" />:""}
  //                 </Tabs>
  //               </Grid>
  //               <Grid item xs={12} sm={4} md={2} lg={2}>
  //                 {/*<LoginModule set_logout={this.set_logout.bind(this)} login_data={this.state.login_data} ></LoginModule>*/}
  //               </Grid>
  //             </Grid>
  //           </AppBar>
  //           <div className={classes.content}>
  //             <Routes>
  //               <Route path="/maps" element={<MapTable/>} />
  //               {/*<Route path="/grid" render={()=>(<Competition track={"GRID4"} tab={this.state.tab} set_logout={this.set_logout.bind(this)} login_data={this.state.login_data} />)}></Route>*/}
  //               {/*<Route path="/anyangle" render={()=>(<Competition track={"ANYANGLE"} tab={this.state.tab}  set_logout={this.set_logout.bind(this)} login_data={this.state.login_data} />)}></Route>*/}
  //               {/*<Route path="/about" render={()=>(<ExternalPage page={"about.html"} tab={this.state.tab}/>)}  key={1}></Route>*/}
  //               {/*<Route path="/setting" render={()=>(<Setting tab={this.state.tab}  login_data={this.state.login_data} />)}></Route>*/}
  //               {/*<Route path="/admin" render={()=>(<Admin tab={this.state.tab}  login_data={this.state.login_data} />)}></Route>*/}
  //               {/*<Route path="/" render={()=>(<ExternalPage page={"index.html"} tab={this.state.tab}/>)} key={2}></Route>*/}
  //             </Routes>
  //           </div>
  //         </div>
  //       </ThemeProvider>
  //
  //
  //   );
  // }
}
