import React, { Component } from 'react';

class NewCountry extends Component {
  state = {
    country: ""
  };

  render() {
    
    const { countryName} = this.props;

    function handleClick() {
      const newCountry = prompt("Enter the name of a new country:");
      countryName(newCountry)
      
    };

    return (
      <div>
        <button onClick={handleClick}>Add a new country</button>
        
      </div>
    );
  }

}

export default NewCountry;


