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
import Divider from '@mui/material/Divider';

const bibtexEntry = `@misc{MAPF_Tracker,
  doi = {10.48550/arXiv.2305.08446},
  url = {https://arxiv.org/abs/2305.08446},
  author = {Bojie Shen and Zhe Chen and Muhammad Aamir Cheema and Daniel D. Harabor and Peter J. Stuckey}, 
  title = {Tracking Progress in Multi-Agent Path Finding}, 
  publisher = {arXiv},
  year = {2023}
}`;
export default function PaperPage() {
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
                        Papers and Resources
                    </Typography>
                </Toolbar>
                <Divider sx={{ borderBottomWidth: '3px' }} />
                <Box
                    sx={{ paddingTop: '15px', paddingLeft :'35px',paddingRight :'35px',paddingBottom :'35px'
                    }}>

                    <Typography
                        sx={{fontSize: 16, flex: '1 1 100%' }}
                        component="div"
                    >
                        This web platform is presented at ICAPS 2023 system demo track:
                    </Typography>
                    <ul>
                        <Typography
                            sx={{fontSize: 16, flex: '1 1 100%'}}
                            component="li"
                        >
                            The paper can be accessed at  <a href="https://icaps23.icaps-conference.org">here</a>.
                        </Typography>
                        <Typography
                            sx={{ fontSize: 16, flex: '1 1 100%' }}
                            component="li"
                        >
                            A demo video giving an overview of the system is also available at <a href="http://tracker.pathfinding.ai/systemDemo"> here</a>.

                        </Typography>
                    </ul>


                    <Typography
                        sx={{ fontSize: 16, flex: '1 1 100%'}}
                        variant="h6"
                        component="div"
                    >
                        A full length manuscript is available at <a href="https://arxiv.org/abs/2305.08446">arXiv</a>. When using our website, please cite the following:
                    </Typography>
                    <div className="paper-content">
                        <div className="code-viewer">
                            <SyntaxHighlighter
                                language="bibtex"
                                // style={vscDarkPlus}
                                customStyle={{ fontSize: 16, marginTop: '0', paddingTop: '0' }}
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
                </Box>
            </Paper>

        </Box>
    );
}