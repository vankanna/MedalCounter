import React from 'react'; 


const Medal = (props) => {      
    
    const {medal, countryId} = props;
    const {increment,decrease} = props;

    return(
    <div className='counter' align='center'>
        {medal.type} Medals: {medal.count} 
        <button align='center' onClick={()=> {increment(countryId, medal.id);}}>
        +
        </button>
        <button align='center' onClick={() => {decrease(countryId, medal.id);}}>
        -
        </button>
    </div>   
    )
}
export default Medal;