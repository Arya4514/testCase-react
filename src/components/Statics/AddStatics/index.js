import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import axios from 'axios';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';


export default function AddStatics() {
    const [values, setValues] = React.useState({
        views: "",
        clicks: "",
        cost: "",
        date: null,
        showPassword: false,
    });
    const navigate = useNavigate()
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleDate = (prop) => (event) => {
        setValues({ ...values, [prop]: event });
    };

    const submitData = async () => {
        let response = await axios.post('http://localhost:8002/api/stats/create', { views: values.views, clicks: values.clicks, cost: values.cost, date: moment(values.date.toISOString()).format('YYYY-MM-DD') })
        console.log(response)
        if (response.status === 200) {
            navigate('/')
        } else {
            console.log(response)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: "15px" }}>
            <div>
                <TextField
                    label="View"
                    id="outlined-start-adornment"
                    onChange={handleChange('views')}
                    sx={{ m: 1, width: '25ch' }}
                />
                <TextField
                    label="Clicks"
                    id="outlined-start-adornment"
                    onChange={handleChange('clicks')}
                    sx={{ m: 1, width: '25ch' }}
                />
                <FormControl sx={{ m: 1 }}>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={values.date}
                            inputFormat={'yyyy-MM-dd'}
                            onChange={handleDate('date')}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ m: 1, width: '25ch' }}
                        />

                    </LocalizationProvider>
                </FormControl >
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Cost</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={values.amount}
                        onChange={handleChange('cost')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                    />
                </FormControl>
                <Button variant="contained" onClick={submitData}>Submit</Button>
            </div>

        </Box>
    );
}
