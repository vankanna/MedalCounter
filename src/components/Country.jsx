import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Country({name, gold}) {
    const [count, setCount] = useState(parseInt(gold));
    return (
        <div className='box'>
            <Typography variant="h4" component="h4">
                {name}
            </Typography>
            <div className='counter'>
                Gold Medal Count : {count}                
            </div>
            
            <Button variant="contained" color="success"
                className='btn' 
                onClick={()=>{setCount(count+1);}}>
                +
            </Button>
        </div>
        
    )

}