import * as React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import { Tooltip } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {useState} from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import './BibTex.css'; // Import the CSS file for styling
import ClipboardJS from 'clipboard';

const bibtexEntry = `@misc{MAPF_Tracker,
  doi = {10.48550/arXiv.2305.08446},
  url = {https://arxiv.org/abs/2305.08446},
  author = {Bojie Shen and Zhe Chen and Muhammad Aamir Cheema and Daniel D. Harabor and Peter J. Stuckey}, 
  title = {Tracking Progress in Multi-Agent Path Finding}, 
  publisher = {arXiv},
  year = {2023}
}`;
export default function AboutUs() {
    const item_width =300;
    const [copySuccess, setCopySuccess] = useState(false);

    // const handleCopyClick = async () => {
    //     try {
    //         await navigator.clipboard.writeText(bibtexEntry);
    //         setCopySuccess(true);
    //     } catch (error) {
    //         console.error('Failed to copy BibTeX code:', error);
    //     }
    // };
    // const handleCopyClick = async () => {
    //     try {
    //         await clipboardy.write(bibtexEntry);
    //         setCopySuccess(true);
    //     } catch (error) {
    //         console.error('Failed to copy BibTeX code:', error);
    //     }
    // };

    // const handleCopyClick = () => {
    //     try {
    //         copyPaste.copy(bibtexEntry);
    //         setCopySuccess(true);
    //     } catch (error) {
    //         console.error('Failed to copy BibTeX code:', error);
    //     }
    // };

    const handleCopyClick = () => {
        const copyButton = document.createElement('button');
        copyButton.setAttribute('data-clipboard-text', bibtexEntry);

        const clipboard = new ClipboardJS(copyButton);

        clipboard.on('success', () => {
            setCopySuccess(true);
            clipboard.destroy();
        });

        clipboard.on('error', (e) => {
            console.error('Failed to copy BibTeX code:', e);
            clipboard.destroy();
        });

        copyButton.click();
    };

    return (
        <Box
            sx={{ minWidth : 600, position: "absolute", width: '96%', paddingLeft:"2%", top:"300px",opacity:"0.95"
            }}>
            {/*<Paper elevation={12} sx={{ width: '100%', mb: 2,borderRadius: 5 }}>*/}
            <Paper elevation={12} sx={{ width: '100%', mt: 2, mb: 2, borderRadius: 5 }}>
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
                        Citation (When using our website, please cite the following)
                    </Typography>
                </Toolbar>
                {/*<Typography*/}
                {/*    sx={{ flex: '1 1 100%',paddingLeft :'15px' }}*/}
                {/*    variant="h7"*/}
                {/*    component="div"*/}
                {/*>*/}
                {/*   If you think our website are helpful to your research, please cite the following:*/}
                {/*</Typography>*/}
                <div className="paper-content">
                    <div className="code-viewer">
                        <SyntaxHighlighter
                            language="bibtex"
                            // style={vscDarkPlus}
                            customStyle={{ marginTop: '0', paddingTop: '0' }}
                        >
                            {bibtexEntry}
                        </SyntaxHighlighter>
                        <div className="copy-button-container">
                            {copySuccess && <span className="copy-success-message">Copied to clipboard!</span>}
                            <Tooltip title="Click to Copy" placement="top" arrow>
                                <button className="copy-button" onClick={handleCopyClick}>
                                    <FileCopyIcon />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </Paper>
                <Paper elevation={12} sx={{ width: '100%', mt: 2, mb: 2,borderRadius: 5}}>
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
                            Advisor Board
                        </Typography>
                    </Toolbar>
                    {/*<Divider variant="middle" style={{ margin: '1rem 0' }} />*/}
                    <div style={{width: "100%",   display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(320px, 1fr))",
                        paddingTop:10

                    }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar
                                    alt="Daniel Harabor"
                                    src= {require("./assets/photo/daniel.jpg")}
                                    sx={{ width : item_width-100,  height: item_width-100 }}
                                />
                                <Typography
                                    sx={{ width: item_width, m: 2,  textAlign: 'center'}}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Daniel Harabor (Lab Leader)
                                </Typography>
                                <Typography
                                    sx={{ width: item_width, m: 2,  textAlign: 'center' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Associate Professor,
                                    Faculty of Information Technology,
                                    Monash University
                                </Typography>
                            </Box>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar
                                    alt="Peter Stuckey"
                                    src= {require("./assets/photo/Peter.jpg")}
                                    sx={{width : item_width-100, height: item_width-100 }}
                                />

                                <Typography
                                    sx={{ width : item_width,  m: 2,  textAlign: 'center'}}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Peter Stuckey
                                </Typography>
                                <Typography
                                    sx={{ width : item_width,  m: 2,  textAlign: 'center' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Professor,
                                    Faculty of Information Technology,
                                    Monash University
                                </Typography>
                            </Box>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar
                                    alt="Muhammad Aamir Cheema"
                                    src= {require("./assets/photo/Aamir.jpeg")}
                                    sx={{ width: item_width-100, height: item_width-100}}
                                />
                                <Typography
                                    sx={{ width : item_width,  m: 2,  textAlign: 'center'}}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Muhammad Aamir Cheema
                                </Typography>
                                <Typography
                                    sx={{ width : item_width,  m: 2,  textAlign: 'center' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Associate Professor,
                                    Faculty of Information Technology,
                                    Monash University
                                </Typography>
                            </Box>
                        </div>
                    </div>
                </Paper>

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
                            Developer Board
                        </Typography>
                    </Toolbar>
                    <div style={{width: "100%",   display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(320px, 1fr))",
                        paddingTop:10

                    }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar alt="Bojie Shen" src= {require("./assets/photo/Bojie.jpg")}
                                        sx={{width: item_width-100, height: item_width-100 }}
                                />
                                <Typography
                                    sx={{ width :item_width,  m: 2,  textAlign: 'center'}}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Bojie Shen
                                </Typography>
                                <Typography
                                    sx={{ width :item_width,  m: 2,  textAlign: 'center' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Ph.D. Candidate, Monash University
                                </Typography>
                            </Box>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={item_width}
                            >
                                <Avatar
                                    alt="Zhe Chen"
                                    src= {require("./assets/photo/zhe_chen.jpg")}
                                    sx={{ width: item_width-100, height: item_width-100 }}
                                />
                                <Typography
                                    sx={{ width : item_width,  m: 2,  textAlign: 'center'}}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Zhe Chen
                                </Typography>
                                <Typography
                                    sx={{ width : item_width,  m: 2,  textAlign: 'center' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Ph.D. Candidate, Monash University
                                </Typography>
                            </Box>
                        </div>
                    </div>
                </Paper>
            {/*<textarea ref={textareaRef} className="hidden-textarea" readOnly value={bibtexEntry} />*/}



            {/*</Paper>*/}

        </Box>
    );
}