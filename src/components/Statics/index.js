import * as React from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { add, reset } from '../../redux/statisticsSlice';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import moment from 'moment';
import EnhancedTable from '../Table';


function Statics() {

    const dispatch = useDispatch();
    const state = useSelector(state => state.statistics)
    const [date, setDate] = React.useState([null, null]);

    React.useEffect(() => {
        debugger
        if (state.resetData) {
            fetchData()
            setDate([null, null])
            dispatch(reset(false))
        }
    }, [state.resetData])

    React.useEffect(() => {
        fetchData()
    }, [])

    const headCells = [
        {
            id: 'id',
            numeric: true,
            disablePadding: false,
            label: 'Id',
        },
        {
            id: 'views',
            numeric: true,
            disablePadding: false,
            label: 'View',
        },
        {
            id: 'clicks',
            numeric: true,
            disablePadding: false,
            label: 'Clicks',
        },
        {
            id: 'cost',
            numeric: true,
            disablePadding: false,
            label: 'Cost (£)',
        },
        {
            id: 'cpc',
            numeric: true,
            disablePadding: false,
            label: 'CPC (£)',
        },
        {
            id: 'cpm',
            numeric: true,
            disablePadding: false,
            label: 'CPM',
        },
        {
            id: 'date',
            numeric: false,
            disablePadding: true,
            label: 'Date',
        },
    ];


    const fetchData = async () => {
        let response = await axios.get(`http://localhost:8001/api/stats/list`)
        if (response.status == 200) {
            dispatch(add(response.data.data))
        }
    }

    const fetchDataFilteredData = async (value) => {
        setDate(value)
        console.log(value)
        if (value[0] && value[1]) {
            let fromDate = moment(value[0].toISOString()).format('YYYY-MM-DD'),
                toDate = moment(value[1].toISOString()).format('YYYY-MM-DD')
            let response = await axios.get(`http://localhost:8001/api/stats/list?fromDate=${fromDate}&toDate=${toDate}`)
            if (response.status == 200) {
                dispatch(add(response.data.data))
            }
        }
    }

    return (
        <div style={{ height: 400, width: '100%', margin: "5px" }}>
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
            </Box>
            <EnhancedTable
                headers={headCells}
                rows={state.stats}
            />
        </div >
    );
}


export default Statics;