import React from 'react';
import Medal from './Medal'


const Country = (props) => {    
    const {country, increment, decrease, onDelete, canDelete, canPatch } = props;
    const getTotalMedals = (medals) => {
        return medals.reduce((total, medal) => total + medal.count, 0);
    };
            
    // function handleDelete () {
    //     onDelete(country.id);
    // };
    return (
        <div className='newCountryButton'>
            <div>
                <p variant="h5" component="h5" align='center'>
                    {country.name}: {getTotalMedals(country.medals)}
                </p>
                {country.medals.map(medal => (
                                        <Medal
                                        key={medal.id}
                                        medal={medal}
                                        countryId={country.id}
                                        canPatch={ canPatch }
                                        medalCount={medal.count}                                        
                                        increment={increment}
                                        decrease={decrease}                                        
                                        />
                                    ))
                }                
                {/* <button onClick={handleDelete}>Delete</button>         */}
                { canDelete && <button onClick={() => onDelete(country.id)}>Delete</button> }      
            </div>
        </div>
    )
}

export default Country;