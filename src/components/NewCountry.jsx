import React from 'react';

const NewCountry = (props) => {
  const {countryName} = props;

  function handleClick() {
    const newCountry = prompt("Enter the name of a new country:");
    countryName(newCountry)    
  };

  return (
    <div align='center'>
      <button onClick={handleClick}>Add a new country</button>      
    </div>
  );
}



export default NewCountry;


