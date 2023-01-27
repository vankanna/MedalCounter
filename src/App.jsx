import './App.css';
import React, {Component} from 'react';
import Country from './components/Country'

class App extends Component {  

  state = {
    countryList :[
        { id: 1, name: 'United States', goldMedalCount: 2 },
        { id: 2, name: 'China', goldMedalCount: 3 },
        { id: 3, name: 'Germany', goldMedalCount: 0 },
      ]
  } 
  

  DecreaseItem = (id) => {
    const countryList = this.state.countryList.map((country) => {
      if(country.id === id && country.goldMedalCount > 0) {
        country.goldMedalCount = country.goldMedalCount - 1;
      } 
      return country;
    })
    this.setState({countryList:countryList});
  }
  IncrementItem = (id) => {
    const countryList = this.state.countryList.map((country) => {
      if(country.id === id) {
        country.goldMedalCount = country.goldMedalCount + 1;
      }
      return country;
    })
    this.setState({countryList:countryList});
  }
    render() {
    return (  
      <div className='outline'>
        {this.state.countryList.map(country => (
                                    <Country
                                    key={country.id}
                                    country={country}
                                    increment={this.IncrementItem}
                                    decrease={this.DecreaseItem}
                                    />
                                ))
        }
      </div>   
      
    );
  }
}

export default App;
