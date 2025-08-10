// import { useState } from 'react';
// import {
//     Box,
//     TextField,
//     Button,
// } from '@mui/material';
// import axios from 'axios';

// const endpointMapping = {
//     'Notion': 'notion',
//     'Airtable': 'airtable',
//     'HubSpot': 'hubspot',
// };

// export const DataForm = ({ integrationType, credentials }) => {
//     const [loadedData, setLoadedData] = useState(null);
//     const endpoint = endpointMapping[integrationType];

//     const handleLoad = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('credentials', JSON.stringify(credentials));
//             const response = await axios.post(`http://localhost:8000/integrations/${endpoint}/load`, formData);
//             const data = response.data;
//             setLoadedData(data);
//         } catch (e) {
//             alert(e?.response?.data?.detail);
//         }
//     }

//     return (
//         <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' width='100%'>
//             <Box display='flex' flexDirection='column' width='100%'>
//                 <TextField
//                     label="Loaded Data"
//                     // value={loadedData || ''}
//                     value={loadedData ? JSON.stringify(loadedData, null, 2) : ''}
//                     sx={{mt: 2}}
//                     InputLabelProps={{ shrink: true }}
//                     disabled
//                 />
//                 <Button
//                     onClick={handleLoad}
//                     sx={{mt: 2}}
//                     variant='contained'
//                 >
//                     Load Data
//                 </Button>
//                 <Button
//                     onClick={() => setLoadedData(null)}
//                     sx={{mt: 1}}
//                     variant='contained'
//                 >
//                     Clear Data
//                 </Button>
//             </Box>
//         </Box>
//     );
// }
import { useState } from 'react';
import axios from 'axios';

const endpointMapping = {
    'Notion': 'notion',
    'Airtable': 'airtable',
    'HubSpot': 'hubspot',
};

export const DataForm = ({ integrationType, credentials }) => {
    const [loadedData, setLoadedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const endpoint = endpointMapping[integrationType];

    const handleLoad = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('credentials', JSON.stringify(credentials));
            const response = await axios.post(`http://localhost:8000/integrations/${endpoint}/load`, formData);
            const data = response.data;
            setLoadedData(data);
        } catch (e) {
            alert(e?.response?.data?.detail);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="card-gradient rounded-lg p-6 space-y-6">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-primary rounded"></div>
                <h2 className="text-xl font-semibold text-foreground">Data Management</h2>
            </div>
            
            <div className="space-y-4">
                <div className="flex space-x-4">
                    <button
                        onClick={handleLoad}
                        disabled={isLoading}
                        className="button-gradient px-6 py-3 rounded-lg text-white font-medium flex items-center space-x-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Loading...</span>
                            </>
                        ) : (
                            <>
                                <span>📊</span>
                                <span>Load Data</span>
                            </>
                        )}
                    </button>
                    
                    <button
                        onClick={() => setLoadedData(null)}
                        className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-all duration-300"
                    >
                        🗑️ Clear Data
                    </button>
                </div>
                
                {loadedData && (
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Loaded Data</label>
                        <textarea
                            value={JSON.stringify(loadedData, null, 2)}
                            readOnly
                            className="w-full h-64 px-3 py-2 bg-secondary border border-border rounded-md text-foreground font-mono text-sm resize-none"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}