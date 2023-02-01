import React, {Component} from 'react'; 
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



class Medal extends Component {   
    
    
    render() {
        const {medal, countryId} = this.props;
        const {increment,decrease} = this.props;

        return(
        <Typography className='counter' align='center'>
            {medal.type} Medals: {medal.count}
            <Button variant="contained" align='center' onClick={()=> {increment(countryId, medal.id);}}>
            +
            </Button>
            <Button variant="contained" align='center' onClick={() => {decrease(countryId, medal.id);}}>
                -
            </Button>
        </Typography>   
        )

    }
}
export default Medal