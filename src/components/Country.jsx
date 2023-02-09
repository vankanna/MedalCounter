import React, {Component} from 'react';
import Medal from './Medal'


class Country extends Component {    
    
    getTotalMedals(medals){
        return medals.reduce((total, medal) => total + medal.count, 0);
    };
    render() {
        const {country, increment, decrease, onDelete} = this.props;
        function handleDelete () {
            onDelete(country.id);
        };
    return (
        <div className='card'>
            <div>
                <p variant="h5" component="h5" align='center'>
                    {country.name}: {this.getTotalMedals(country.medals)}
                </p>
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
                
                <button onClick={handleDelete}>Delete</button>              
            </div>
        </div>
    )
    }
}
export default Country