import React, {Component} from 'react';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
 



class Country extends Component {    
    render() {
        const {country, increment, decrease } = this.props;
    return (

        <Card>
            <CardContent>
                <Typography variant="h5" component="h5" align='center'>
                    {country.name}
                </Typography>                
                <Typography className='counter' align='center'>
                    Gold Medal Count : {country.goldMedalCount}            
                </Typography>              
                <Button variant="contained" align='center' onClick={()=> increment(country.id)}>
                    <AddCircleIcon/>  
                </Button>
                <Button variant="contained" align='center' onClick={() => decrease(country.id)}>
                    <RemoveCircleIcon/>
                </Button>
            </CardContent>
        </Card>

        
    )
    }
}
export default Country