import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


class Country extends Component {    
    render() {
        const {country, increment, decrease } = this.props;
    return (
        <div className='box'>
            <Typography variant="h4" component="h4">
                {country.name}
            </Typography>
            <div className='counter'>
                Gold Medal Count : {country.goldMedalCount}            
            </div>
            
            <Button variant="contained" color="success"
                className='btn' onClick={()=> increment(country.id)}
                >
                +
            </Button>
            <Button variant="contained" color="success"
                className='btn' onClick={() => decrease(country.id)}
            >
                -
            </Button>
        </div>
        
    )
    }
}
export default Country