import React from 'react';
import {
    BrowserRouter,
} from "react-router-dom";
import {createRoot} from 'react-dom/client';
import App from './App';
import "@fontsource/roboto-slab";
import './index.css';
// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// root.render(
//     <Router>
//         <Routes>
//             <Route path="/maps" element={<MapTable/>} />
//             <Route path="/scenarios" element={<ScenarioTable />} />
//             <Route path="/instances" element={<SolutionPage/>} />
//
//             <Route path="/visualization" element={<Visualizer/>} />
//             <Route path="/" element={<App />}/>
//         </Routes>
//     </Router>
// );



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
