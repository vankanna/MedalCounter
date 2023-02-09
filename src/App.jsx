import './App.css';
import React, {Component} from 'react';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import Typography from '@mui/material/Typography';
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
      { id: 1, name: 'United States', medals: [{id: 1, type: "gold", count: 4},{id: 2,type:"sliver", count: 2},{id: 3,type:"bronze", count: 0}]},
      { id: 2, name: 'China', medals: [{id: 1, type: "gold", count: 3},{id: 2,type:"sliver",  count: 2},{id: 3,type:"bronze", count: 1}]},
      { id: 3, name: 'Germany', medals: [{id: 1, type: "gold", count: 0},{id: 2,type:"sliver",  count: 1},{id: 3,type:"bronze", count: 1}]},
      
    ]}   


    DecreaseItem = (countryId, medalId) => {
      const newcountryList = this.state.countryList.map((country) => {
        if(country.id === countryId) {
          country.medals.map((medal) => {
            if(medal.id === medalId && medal.count > 0) {
              medal.count -= 1;
            } 
            return medal;
          });
        } 
        return country;
      })
      this.setState({countryList:newcountryList});
    }
    IncrementItem = (countryId, medalId) => {
      const newcountryList = this.state.countryList.map((country) => {
        if(country.id === countryId) {
          country.medals.map((medal) => {
            if(medal.id === medalId){
              medal.count += 1;
            } return medal;
          });
        }
        return country;
      });
      this.setState({countryList:newcountryList});
    }

    totalMedal = () => {
      const countryListCopy = [...this.state.countryList];
      let total = 0;
      countryListCopy.forEach(country => {
        total += country.medals.reduce((count, medal) => count + medal.count, 0);
      })
      return total;
    };
    
    addCountry = (countryName) => {
      const countryListCopy = [...this.state.countryList];
      countryListCopy.push({ id: Math.random(), name: countryName, medals: [{id: 1, type: "gold", count: 0},{id: 2,type:"sliver",  count: 0},{id: 3,type:"bronze", count: 0}]});
      this.setState({countryList:countryListCopy});
    }

    onDelete = (countryId) => {
      const newcountryList = this.state.countryList.filter(country => country.id !== countryId);
      this.setState({countryList:newcountryList});
    }

    render() {      
      
    return ( 
      <>
      
      <ThemeProvider theme={theme}>
        <Typography variant="h5" component="h5" align='center'>
          Olympic Medals: {this.totalMedal()}
        </Typography>
        
        <Grid container
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
                                        onDelete={this.onDelete}
                                        />
                                    ))
            }
            <NewCountry
            countryName={this.addCountry}/>
          </Grid>
          

            
      </Grid>  
    </ThemeProvider>  
    </>
    );
  }
}

export default App;
