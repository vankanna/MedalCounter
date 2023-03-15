import React from 'react';


const Medal = (props) => {

    const { medal, countryId, canPatch, increment, decrease  } = props;
    

    return (
        <div className='counter' align='center'>
            {medal.type} Medals: {medal.count}
            {/* <button align='center' onClick={() => { increment(countryId, medal.id); }}>
                +
            </button>
            <button align='center' disabled={medal.count === 0} onClick={() => { decrease(countryId, medal.id); }}>
                -
            </button> */}
            { canPatch && 
            <React.Fragment>
                <button align='center' onClick={ () => { increment(countryId, medal.id); } }>+</button>
                <button align='center' disabled= {medal.count === 0} onClick={ () => { decrease(countryId, medal.id); } }>-</button>
            </React.Fragment>
      }

        </div>
    )
}
export default Medal;