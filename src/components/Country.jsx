import React, {Component} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import Medal from './Medal'


class Country extends Component {    

    getTotalMedals(medals){
        return medals.reduce((total, medal) => total + medal.count, 0);
    };
    render() {
        const {country, increment, decrease} = this.props;
        
    return (

        <Card>
            <CardContent>
                <Typography variant="h5" component="h5" align='center'>
                    {country.name}: {this.getTotalMedals(country.medals)}
                </Typography>
                {country.medals.map(medal => (
                                        <Medal
                                        key={medal.id}
                                        medal={medal}
                                        countryId={country.id}
                                        medalCount={medal.count}
                                        
                                        increment={increment}
                                        decrease={decrease}
                                        
                                        />
                                    ))
            }               
            </CardContent>
        </Card>
    )
    }
}
export default Country