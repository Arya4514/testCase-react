import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import addWeeks from 'date-fns/addWeeks';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import moment from 'moment';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'views', headerName: 'View', width: 130 },
    { field: 'clicks', headerName: 'Click', width: 130 },
    { field: 'cost', headerName: 'Cost', width: 130 },
    { field: 'cpc', headerName: 'CPC', width: 130 },
    { field: 'cpm', headerName: 'CPM', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },

];

function Statics() {


    const [values, setValues] = React.useState([]);
    const [date, setValue] = React.useState([null, null]);

    React.useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        let response = await axios.get(`http://localhost:8001/api/stats/list`)
        if (response.status == 200) {
            setValues(response.data.data)
        }
    }

    const fetchDataFilteredData = async (value) => {
        setValue(value)
        console.log(value)
        if (value[0] && value[1]) {
            let fromDate = moment(value[0].toISOString()).format('YYYY-MM-DD'),
                toDate = moment(value[1].toISOString()).format('YYYY-MM-DD')
            let response = await axios.get(`http://localhost:8001/api/stats/list?fromDate=${fromDate}&toDate=${toDate}`)
            if (response.status == 200) {
                setValues(response.data.data)
            }
        }
    }

    const handleResetData = async () => {
        let response = await axios.delete("http://localhost:8001/api/stats/reset");
        if (response.status === 200) {
            setValues([])
            console.log(response)
        }
    }

    return (
        <div style={{ height: 400, width: '100%', margin: "15px" }}>
            <Box sx={{ mx: 2, display: "inline-flex", }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        value={date}
                        onChange={(newValue) => {
                            fetchDataFilteredData(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
                &nbsp;
                <Button
                    onClick={handleResetData}
                    sx={{ my: 2, color: 'black', backgroundColor: "#1976d2", display: 'block' }}
                >
                    Reset All Data
                </Button>
            </Box>
            <DataGrid
                rows={values}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            /* checkboxSelection */
            />
        </div >
    );
}


export default Statics;