import './App.css';
import React, {Component} from 'react';
import Country from './components/Country';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Roboto',
      textTransform: 'none',
    },
  },
});

class App extends Component {  

  state = {
    countryList :[
        { id: 1, name: 'United States', goldMedalCount: 2 },
        { id: 2, name: 'China', goldMedalCount: 3 },
        { id: 3, name: 'Germany', goldMedalCount: 0 },
      ]
  } 
  

  DecreaseItem = (id) => {
    const newcountryList = this.state.countryList.map((country) => {
      if(country.id === id && country.goldMedalCount > 0) {
        country.goldMedalCount = country.goldMedalCount - 1;
      } 
      return country;
    })
    this.setState({countryList:newcountryList});
  }
  IncrementItem = (id) => {
    const newcountryList = this.state.countryList.map((country) => {
      if(country.id === id) {
        country.goldMedalCount = country.goldMedalCount + 1;
      }
      return country;
    })
    this.setState({countryList:newcountryList});
  }
    render() {
    return (  
      <ThemeProvider theme={theme}>
        <Grid
        container
        spacing={4}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        >
    
          <Grid item xs={4} style={{textAlign: "center"}}>
            {this.state.countryList.map(country => (
                                        <Country
                                        key={country.id}
                                        country={country}
                                        increment={this.IncrementItem}
                                        decrease={this.DecreaseItem}
                                        />
                                    ))
            }
          </Grid>      
      </Grid>  
    </ThemeProvider>  
    );
  }
}

export default App;
