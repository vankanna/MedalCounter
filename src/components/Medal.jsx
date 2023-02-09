import React, {Component} from 'react'; 


class Medal extends Component {   
    
    
    render() {
        const {medal, countryId} = this.props;
        const {increment,decrease} = this.props;

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
}
export default Medal